// high-res menu pictures with transparent backgrounds: node cards_hd.mjs <glb> <outPrefix> [k_ty k_far c_ty c_far]
//   _k 512x512 (picker tile, scoreboard avatar), _c 360x360 face crop, _x 960x1216 full body, all transparent; _p 960x1216 on #e8e8ec (fallback)
import http from 'http';import fs from 'fs';import path from 'path';import {createRequire} from 'module';const {chromium} = createRequire(import.meta.url)('playwright');import sharp from 'sharp';
const [glb, outp, kty = '.35', kfar = '1.6', cty = '.17', cfar = '1'] = process.argv.slice(2);const dir = path.dirname(new URL(import.meta.url).pathname);
const srv = http.createServer((q, s) => { const u = decodeURIComponent(q.url.split('?')[0]); const f = u === '/model.glb' ? path.resolve(glb) : path.join(dir, u);
  if (!fs.existsSync(f)) { s.statusCode = 404; return s.end(); } s.setHeader('content-type', f.endsWith('.js') ? 'text/javascript' : f.endsWith('.html') ? 'text/html' : 'application/octet-stream'); fs.createReadStream(f).pipe(s); }).listen(0);
const b = await chromium.launch({args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader']});const p = await b.newPage();
await p.goto(`http://127.0.0.1:${srv.address().port}/render.html`);await p.waitForFunction('window.ready');
const shot = async o => Buffer.from((await p.evaluate(o => window.render(o), {url: '/model.glb', mode: 'tex', ...o})).split(',')[1], 'base64');
const W = {webp: {quality: 90, alphaQuality: 95, effort: 6}};
await sharp(await shot({view: 'face', w: 1024, h: 1024, ty: +kty, far: +kfar})).resize(512, 512).webp(W.webp).toFile(outp + '_k.webp');
await sharp(await shot({view: 'face', w: 720, h: 720, ty: +cty, far: +cfar})).resize(360, 360).webp(W.webp).toFile(outp + '_c.webp');
await sharp(await shot({view: 'front', w: 960, h: 1216})).webp(W.webp).toFile(outp + '_x.webp');
await sharp(await shot({view: 'front', w: 960, h: 1216, bg: '#e8e8ec'})).webp({quality: 88}).toFile(outp + '_p.webp');
await b.close(); srv.close(); console.log(outp);
