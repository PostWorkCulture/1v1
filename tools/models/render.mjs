#!/usr/bin/env node
/* Renders a baked GLB with three.js in headless Chromium (needs playwright + chromium; runs in the cloud workspace).
   node render.mjs <model.glb> <outPrefix> [--parts] [--cards]
     default : <outPrefix>_front.png, _side.png, _three.png  (textured, light grey floor)
     --parts : <outPrefix>_parts_front.png, _parts_side.png  (each body part a flat colour: torso blue, head amber, armL red, armR green, legL purple, legR teal)
     --cards : <outPrefix>_p.webp (480x608 on #e8e8ec), _x.webp (480x608 transparent), _c.webp (180x180 face crop) for the character menu */
import http from 'http';import fs from 'fs';import path from 'path';import {createRequire} from 'module';const {chromium} = createRequire(import.meta.url)('playwright');import sharp from 'sharp';
const [glb, outp] = process.argv.slice(2).filter(a => !a.startsWith('--'));const has = k => process.argv.includes('--' + k);
const dir = path.dirname(new URL(import.meta.url).pathname);
const srv = http.createServer((q, s) => { const u = decodeURIComponent(q.url.split('?')[0]); const f = u === '/model.glb' ? path.resolve(glb) : path.join(dir, u);
  if (!fs.existsSync(f)) { s.statusCode = 404; return s.end(); } s.setHeader('content-type', f.endsWith('.js') ? 'text/javascript' : f.endsWith('.html') ? 'text/html' : 'application/octet-stream'); fs.createReadStream(f).pipe(s); }).listen(0);
const port = srv.address().port;
const b = await chromium.launch({args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader']});const p = await b.newPage();
p.on('pageerror', e => console.error('page error', e.message));
await p.goto(`http://127.0.0.1:${port}/render.html`);await p.waitForFunction('window.ready');
const shot = async (o, file) => { const d = await p.evaluate(o => window.render(o), {url: '/model.glb', ...o}); const buf = Buffer.from(d.split(',')[1], 'base64'); fs.writeFileSync(file, buf); return buf; };
const out = [];
if (has('cards')) {
  const pb = await shot({w: 480, h: 608, mode: 'tex', view: 'front', bg: '#e8e8ec'}, outp + '_p.png');
  await sharp(pb).webp({quality: 80}).toFile(outp + '_p.webp');
  const xb = await shot({w: 480, h: 608, mode: 'tex', view: 'front'}, outp + '_x.png');
  await sharp(xb).webp({quality: 82, alphaQuality: 90}).toFile(outp + '_x.webp');
  const cb = await shot({w: 360, h: 360, mode: 'tex', view: 'face', bg: '#e8e8ec'}, outp + '_c.png');
  await sharp(cb).resize(180, 180).webp({quality: 80}).toFile(outp + '_c.webp');
  for (const s of ['_p.png', '_x.png', '_c.png']) fs.unlinkSync(outp + s);
  out.push(outp + '_p.webp', outp + '_x.webp', outp + '_c.webp');
} else if (has('parts')) {
  for (const v of ['front', 'side']) { await shot({w: 600, h: 700, mode: 'parts', view: v, bg: '#f4f4f6'}, `${outp}_parts_${v}.png`); out.push(`${outp}_parts_${v}.png`); }
} else {
  for (const v of ['front', 'side', 'three']) { await shot({w: 600, h: 700, mode: 'tex', view: v, bg: '#e8e8ec'}, `${outp}_${v}.png`); out.push(`${outp}_${v}.png`); }
}
await b.close();srv.close();console.log(out.join('\n'));
