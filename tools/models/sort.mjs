#!/usr/bin/env node
/* Files a downloaded Tripo export into the right images/ folder of the 1v1 project.
   node tools/models/sort.mjs <downloaded file> <kind> "<Clean Name>" [--tripo <id>] [--for "<what it's for>"] [--keep]
     kind: character | vehicle | landscape | weapon   (trains and wagons are vehicles; containers, drums, crates, signals, trees, furniture are landscape)
   -> images/Characters | images/Vehicles | images/Landscape | images/Weapons /<Clean Name>.glb
   Never overwrites: if the name is taken it adds " 2", " 3"...  The copy is checked byte-for-byte before the original is
   removed; if removing isn't allowed (no delete permission on Downloads) the original stays and the script says so.
   --keep leaves the original where it is. Each filed model is noted in manifest.json under "incoming" so the next
   scan shows it as NEW with where it came from. */
import fs from 'fs'; import path from 'path';
const FOLDERS = {character: 'Characters', vehicle: 'Vehicles', landscape: 'Landscape', weapon: 'Weapons'};
const a = process.argv.slice(2), flag = k => { const i = a.indexOf('--' + k); return i < 0 ? undefined : a[i + 1]; };
const [src, kind, name] = a.filter((v, i) => !v.startsWith('--') && !(a[i - 1] || '').startsWith('--'));
if (!src || !FOLDERS[kind] || !name) { console.error('usage: node sort.mjs <file> character|vehicle|landscape|weapon "<Clean Name>" [--tripo id] [--for "..."] [--keep]'); process.exit(1); }
if (!fs.existsSync(src)) { console.error('not found: ' + src); process.exit(1); }
const here = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), repo = path.resolve(here, '..', '..');
const dir = path.join(repo, 'images', FOLDERS[kind]); fs.mkdirSync(dir, {recursive: true});
const ext = path.extname(src).toLowerCase() || '.glb', clean = name.replace(/[\\/:*?"<>|]/g, '').replace(/\s+/g, ' ').trim();
let dest = path.join(dir, clean + ext), n = 2; while (fs.existsSync(dest)) dest = path.join(dir, `${clean} ${n++}${ext}`);
fs.copyFileSync(src, dest, fs.constants.COPYFILE_EXCL);
if (!fs.readFileSync(src).equals(fs.readFileSync(dest))) { fs.unlinkSync(dest); console.error('copy check failed, nothing moved'); process.exit(1); }
let moved = false;
if (!a.includes('--keep')) { try { fs.unlinkSync(src); moved = true; } catch (e) { console.warn('copied, but the original could not be removed (' + e.code + '); it is still at ' + src); } }
const rel = path.relative(repo, dest).split(path.sep).join('/');
const mf = path.join(here, 'manifest.json'), M = fs.existsSync(mf) ? JSON.parse(fs.readFileSync(mf, 'utf8')) : {baked: {}, ignored: {}};
M.incoming = M.incoming || {};
M.incoming[rel] = {kind, tripo: flag('tripo') || '', for: flag('for') || '', from: path.basename(src), at: new Date().toISOString().slice(0, 10)};
fs.writeFileSync(mf, JSON.stringify(M, null, 1) + '\n');
console.log(`${moved ? 'moved' : 'copied'} -> ${rel} (${(fs.statSync(dest).size / 1048576).toFixed(1)} MB)`);
