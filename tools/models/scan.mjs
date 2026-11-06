#!/usr/bin/env node
/* Lists Tripo exports in the project that haven't been baked into the game yet (or changed since they were).
   node tools/models/scan.mjs            -> table of NEW / CHANGED / done / ignored sources
   node tools/models/scan.mjs --json     -> same as JSON
   node tools/models/scan.mjs --record <source> <out> <kind> [bake args...]   -> mark a source as baked (after a successful bake)
   node tools/models/scan.mjs --ignore <source> [reason]                       -> never list this source as new again
   Sources: every .glb/.fbx/.obj under images/ and chars/ that isn't itself a game file (chars/<id>.glb, anything in a baked/ folder).
   The record lives in tools/models/manifest.json (paths relative to the repo root). */
import fs from 'fs'; import path from 'path';
const here = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'));
const repo = path.resolve(here, '..', '..'), mf = path.join(here, 'manifest.json');
const M = fs.existsSync(mf) ? JSON.parse(fs.readFileSync(mf, 'utf8')) : {baked: {}, ignored: {}};
const save = () => fs.writeFileSync(mf, JSON.stringify(M, null, 1) + '\n');
const rel = p => path.relative(repo, path.resolve(repo, p)).split(path.sep).join('/');
const stat = p => { const s = fs.statSync(path.join(repo, p)); return {bytes: s.size, mtime: Math.round(s.mtimeMs)}; };
const a = process.argv.slice(2);
if (a[0] === '--record') { const [src, out, kind, ...args] = a.slice(1); M.baked[rel(src)] = {out: rel(out), kind, args, ...stat(rel(src)), outBytes: stat(rel(out)).bytes, at: new Date().toISOString().slice(0, 10)}; delete M.ignored[rel(src)]; save(); console.log('recorded', rel(src), '->', rel(out)); process.exit(0); }
if (a[0] === '--ignore') { M.ignored[rel(a[1])] = a.slice(2).join(' ') || 'ignored'; save(); console.log('ignored', rel(a[1])); process.exit(0); }

const found = [];
const walk = d => { for (const e of fs.readdirSync(path.join(repo, d), {withFileTypes: true})) { const p = d + '/' + e.name;
  if (e.isDirectory()) { if (!['baked', 'node_modules', '.git'].includes(e.name)) walk(p); continue; }
  if (!/\.(glb|fbx|obj)$/i.test(e.name)) continue;
  if (d === 'chars' && /^[a-z0-9_]+\.glb$/.test(e.name)) continue; // game character files
  found.push(p); } };
for (const d of ['images', 'chars']) if (fs.existsSync(path.join(repo, d))) walk(d);
const rows = found.map(p => { const s = stat(p), b = M.baked[p];
  const status = M.ignored[p] ? 'ignored' : !b ? 'NEW' : (b.bytes !== s.bytes || b.mtime !== s.mtime) ? 'CHANGED' : 'done';
  return {status, source: p, mb: +(s.bytes / 1048576).toFixed(1), out: b?.out || '', note: M.ignored[p] || ''}; })
  .sort((x, y) => ['NEW', 'CHANGED', 'done', 'ignored'].indexOf(x.status) - ['NEW', 'CHANGED', 'done', 'ignored'].indexOf(y.status) || x.source.localeCompare(y.source));
if (a.includes('--json')) console.log(JSON.stringify(rows, null, 1));
else for (const r of rows) console.log(`${r.status.padEnd(8)} ${String(r.mb).padStart(6)} MB  ${r.source}${r.out ? '  ->  ' + r.out : ''}${r.note ? '  (' + r.note + ')' : ''}`);
