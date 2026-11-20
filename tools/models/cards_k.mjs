// face card (_c) and picker card (_k) for a model whose head isn't at the blocky default: node cards_k.mjs <glb> <outPrefix> <c_ty> <c_far> <k_ty> <k_far>
import http from 'http';import fs from 'fs';import path from 'path';import {createRequire} from 'module';const {chromium} = createRequire(import.meta.url)('playwright');import sharp from 'sharp';
const [glb, outp, cty, cfar, kty, kfar] = process.argv.slice(2);const dir = path.dirname(new URL(import.meta.url).pathname);
const srv = http.createServer((q, s) => { const u = decodeURIComponent(q.url.split('?')[0]); const f = u === '/model.glb' ? path.resolve(glb) : path.join(dir, u);
  if (!fs.existsSync(f)) { s.statusCode = 404; return s.end(); } s.setHeader('content-type', f.endsWith('.js') ? 'text/javascript' : f.endsWith('.html') ? 'text/html' : 'application/octet-stream'); fs.createReadStream(f).pipe(s); }).listen(0);
const b = await chromium.launch({args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader']});const p = await b.newPage();
await p.goto(`http://127.0.0.1:${srv.address().port}/render.html`);await p.waitForFunction('window.ready');
const shot = async o => Buffer.from((await p.evaluate(o => window.render(o), {url: '/model.glb', mode: 'tex', view: 'face', ...o})).split(',')[1], 'base64');
const c = await shot({w: 360, h: 360, bg: '#e8e8ec', ty: +cty, far: +cfar});
await sharp(c).resize(180, 180).webp({quality: 80}).toFile(outp + '_c.webp');
const k = await shot({w: 480, h: 480, ty: +kty, far: +kfar});
const {data, info} = await sharp(k).resize(240, 240).ensureAlpha().raw().toBuffer({resolveWithObject: true});
const W = 240, out = Buffer.alloc(W * W * 3), R = 2;
for (let y = 0; y < W; y++) for (let x = 0; x < W; x++) { const i = (y * W + x) * 4, a = data[i + 3] / 255; let near = 0;
  if (a < 0.5) for (let dy = -R; dy <= R && !near; dy++) for (let dx = -R; dx <= R; dx++) { const yy = y + dy, xx = x + dx; if (yy >= 0 && yy < W && xx >= 0 && xx < W && data[(yy * W + xx) * 4 + 3] > 127 && dx*dx+dy*dy <= R*R) { near = 1; break; } }
  const base = near ? [200, 204, 210] : [0, 0, 0];
  for (let k2 = 0; k2 < 3; k2++) out[(y * W + x) * 3 + k2] = Math.round(data[i + k2] * a + base[k2] * (1 - a)); }
await sharp(out, {raw: {width: W, height: W, channels: 3}}).webp({quality: 82}).toFile(outp + '_k.webp');
await b.close(); srv.close(); console.log(outp + '_c.webp', outp + '_k.webp');
