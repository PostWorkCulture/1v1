import {NodeIO, VertexLayout} from '@gltf-transform/core'; import {ALL_EXTENSIONS} from '@gltf-transform/extensions'; import {prune, dedup} from '@gltf-transform/functions'; import sharp from 'sharp';
const [inp, out] = process.argv.slice(2); const io = new NodeIO().registerExtensions(ALL_EXTENSIONS); const doc = await io.read(inp); const root = doc.getRoot();
const m = root.listMaterials()[0];
for (const t of root.listTextures()) { const em = t === m.getEmissiveTexture(); const S = em ? 256 : 1024;
  const img = await sharp(Buffer.from(t.getImage())).resize(S, S, {fit: 'fill', kernel: em ? 'nearest' : 'lanczos3'}).removeAlpha().jpeg({quality: em ? 90 : 84, mozjpeg: true}).toBuffer();
  t.setImage(new Uint8Array(img)).setMimeType('image/jpeg').setURI(''); }
for (const me of root.listMeshes()) for (const p of me.listPrimitives()) { const w = p.getAttribute('WEIGHTS_0'); const a = w.getArray(); const q = new Uint8Array(a.length);
  for (let i = 0; i < a.length; i += 4) { let s = 0; const v = [0,1,2,3].map(k => Math.round(a[i+k]*255)); s = v.reduce((x,y)=>x+y,0); let mi = v.indexOf(Math.max(...v)); v[mi] += 255 - s; for (let k = 0; k < 4; k++) q[i+k] = v[k]; }
  w.setArray(q).setNormalized(true); }
for (const an of root.listAnimations()) if (['Left Strafe','Right Strafe','Hit Reaction','Reloading'].includes(an.getName())) an.dispose();
for (const an of root.listAnimations()) for (const ch of an.listChannels()) { const path = ch.getTargetPath(), n = ch.getTargetNode().getName();
  if (path === 'scale' || (path === 'translation' && !/Hips$/.test(n))) { const sm = ch.getSampler(); ch.dispose(); sm.dispose(); } }
await doc.transform(dedup(), prune());
await io.setVertexLayout(VertexLayout.SEPARATE).write(out, doc); const fs = await import('fs'); console.log('KB', Math.round(fs.statSync(out).size / 1024));
