#!/usr/bin/env node
/* imok 1v1 model baker: turns a raw Tripo export (30-70 MB, 4K textures) into a small game-ready GLB.
   Usage:
     node bake.mjs <in.glb> <out.glb> --kind prop|tree|car|char [options]
   Options:
     --tris N        target triangle count (default: prop 8000, tree 8000, car 20000, char 20000)
     --tex N         colour map size in px (default: char 1024, others 512)
     --height H      final height in metres (default: char 3.03, tree 1, prop 1; car keeps its size and is scaled by length in-game)
     --rot x,y,z     extra rotation in degrees before normalising (e.g. --rot 0,90,0 to turn a model to face +z)
     --pbr           keep metal/roughness + normal maps (sword style); default drops them
   char only (splits into torso/head/armL/armR/legL/legR for loadPartsGLB):
     --neck Y --hip Y --armx X --shoulder Y   cut overrides in metres on the 3.03 m model (see split.mjs)
     --rules cuts.json           hand-made boxes for awkward shapes (see split.mjs)
     --preview out.json          write part stats for checking
   Output layout matches the hand-written loaders in index.html: one mesh, one primitive, non-interleaved
   attributes, JPEG textures, nodes only for the parts. */
import {NodeIO, Document, VertexLayout} from '@gltf-transform/core';
import {ALL_EXTENSIONS} from '@gltf-transform/extensions';
import {dedup, flatten, join, weld, simplify, prune, getBounds, transformMesh} from '@gltf-transform/functions';
import {MeshoptSimplifier} from 'meshoptimizer';
import sharp from 'sharp';
import {splitCharacter} from './split.mjs';

const args = process.argv.slice(2);
const pos = args.filter((a, i) => !a.startsWith('--') && !(args[i - 1] || '').startsWith('--'));
const opt = k => { const i = args.indexOf('--' + k); return i < 0 ? undefined : (args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : true); };
const [inp, out] = pos;
if (!inp || !out) { console.error('usage: node bake.mjs <in.glb> <out.glb> --kind prop|tree|car|char [--tris N] [--tex N] [--height H] [--rot x,y,z] [--pbr] [--error E]'); process.exit(1); }
const kind = opt('kind') || 'prop';
const D = {prop: [8000, 512, 1], tree: [8000, 512, 1], car: [20000, 512, 0], char: [20000, 1024, 3.03]}[kind];
if (!D) { console.error('unknown --kind ' + kind); process.exit(1); }
const tris = +(opt('tris') || D[0]), texSize = +(opt('tex') || D[1]), height = opt('height') != null ? +opt('height') : D[2];

const io = new NodeIO().registerExtensions(ALL_EXTENSIONS);
const doc = await io.read(inp);
const root = doc.getRoot();
const triCount = () => { let t = 0; for (const m of root.listMeshes()) for (const p of m.listPrimitives()) { const i = p.getIndices(); t += (i ? i.getCount() : p.getAttribute('POSITION').getCount()) / 3; } return t; };
const before = triCount();

// strip what the game never uses
for (const a of root.listAnimations()) a.dispose();
for (const s of root.listSkins()) s.dispose();
for (const e of root.listExtensionsUsed()) if (!['KHR_texture_transform'].includes(e.extensionName)) e.dispose();
for (const m of root.listMeshes()) for (const p of m.listPrimitives()) for (const s of p.listSemantics()) if (!['POSITION', 'NORMAL', 'TEXCOORD_0'].includes(s)) p.setAttribute(s, null);

const mats = root.listMaterials();
if (mats.length > 1) console.warn(`WARNING: ${mats.length} materials. The game loaders read one primitive with one material; join will keep only same-material parts together. Bake to a single atlas in Blender first if the result has more than one primitive.`);

await doc.transform(dedup(), flatten(), join({keepNamed: false}), weld(), prune());
const ratio = Math.min(1, tris / Math.max(1, triCount()));
// --error E: how far (as a fraction of the model's size) the simplifier may move the surface; 0.01 keeps fine detail but stalls on very dense
// Tripo exports (2M tris), so pass 0.05-0.2 for those. It runs up to three passes until the target is reached.
const err = +(opt('error') || 0.01);
for (let pass = 0; pass < 3 && triCount() > tris * 1.15; pass++) { const r = Math.min(1, tris / Math.max(1, triCount())); await doc.transform(simplify({simplifier: MeshoptSimplifier, ratio: r, error: err, lockBorder: false}), prune()); }
// dense Tripo exports (2M tris of tiny disconnected detail) stall the normal simplifier far above the target, so finish the job with meshopt's
// pruning pass (drops tiny islands) and, if still over, the sloppy simplifier, which always reaches the target at the cost of some surface accuracy
if (triCount() > tris * 1.3) {
  await MeshoptSimplifier.ready;
  for (const m of root.listMeshes()) for (const p of m.listPrimitives()) {
    const pos = p.getAttribute('POSITION'), idx = p.getIndices(); if (!idx) continue; const P = pos.getArray(), I = new Uint32Array(idx.getArray()); if (I.length / 3 <= tris) continue;
    // permissive mode collapses across UV seams too (texture joins drift a little); the UVs are weighted so the simplifier keeps them as straight as it can
    const uv = p.getAttribute('TEXCOORD_0');
    let [ni] = uv ? MeshoptSimplifier.simplifyWithAttributes(I, P, 3, uv.getArray(), 2, [1, 1], null, tris * 3, 0.5, ['Permissive', 'Prune'])
                  : MeshoptSimplifier.simplify(I, P, 3, tris * 3, 0.5, ['Permissive', 'Prune']);
    if (ni.length / 3 > tris * 1.5) { console.warn('permissive pass stalled at ' + ni.length / 3 + ', using the sloppy simplifier'); [ni] = MeshoptSimplifier.simplifySloppy(I, P, 3, null, tris * 3, 1); }
    const map = new Map(), out = new Uint32Array(ni.length); let n = 0;
    for (let k = 0; k < ni.length; k++) { const v = ni[k]; let r = map.get(v); if (r == null) { r = n++; map.set(v, r); } out[k] = r; }
    for (const sem of p.listSemantics()) { const a = p.getAttribute(sem), arr = a.getArray(), es = a.getElementSize(), na = new (arr.constructor)(n * es); for (const [v, r] of map) for (let c = 0; c < es; c++) na[r * es + c] = arr[v * es + c]; a.setArray(na); }
    idx.setArray(n > 65535 ? out : new Uint16Array(out));
    console.warn(`dense mesh: meshopt prune/sloppy pass -> ${ni.length / 3} tris`);
  }
}

// one mesh, one node
const meshes = root.listMeshes();
const prims = meshes.flatMap(m => m.listPrimitives());
if (prims.length > 1) console.warn(`WARNING: ${prims.length} primitives after join (multiple materials). Only the first is used by the game loaders.`);

// bake node transforms into the vertices, then normalise: centred on x/z, base at y=0, scaled to height
const scene = root.listScenes()[0];
for (const n of root.listNodes()) if (n.getMesh()) { transformMesh(n.getMesh(), n.getWorldMatrix()); }
for (const n of root.listNodes()) { n.setTranslation([0, 0, 0]).setRotation([0, 0, 0, 1]).setScale([1, 1, 1]); }
const rot = (opt('rot') || '0,0,0').split(',').map(v => +v * Math.PI / 180);
const P0 = prims[0], pa = P0.getAttribute('POSITION'), na = P0.getAttribute('NORMAL');
const rotV = (v) => { let [x, y, z] = v; let [a, b, c] = rot; // X then Y then Z
  [y, z] = [y * Math.cos(a) - z * Math.sin(a), y * Math.sin(a) + z * Math.cos(a)];
  [x, z] = [x * Math.cos(b) + z * Math.sin(b), -x * Math.sin(b) + z * Math.cos(b)];
  [x, y] = [x * Math.cos(c) - y * Math.sin(c), x * Math.sin(c) + y * Math.cos(c)]; return [x, y, z]; };
const PA = pa.getArray(); const v = [0, 0, 0];
let mn = [1e9, 1e9, 1e9], mx = [-1e9, -1e9, -1e9];
for (let i = 0; i < PA.length; i += 3) { const r = rotV([PA[i], PA[i + 1], PA[i + 2]]); PA.set(r, i); for (let k = 0; k < 3; k++) { mn[k] = Math.min(mn[k], r[k]); mx[k] = Math.max(mx[k], r[k]); } }
if (na) { const NA = na.getArray(); for (let i = 0; i < NA.length; i += 3) NA.set(rotV([NA[i], NA[i + 1], NA[i + 2]]), i); na.setArray(NA); }
const s = height > 0 ? height / (mx[1] - mn[1]) : 1, cx = (mn[0] + mx[0]) / 2, cz = (mn[2] + mx[2]) / 2;
for (let i = 0; i < PA.length; i += 3) { PA[i] = (PA[i] - cx) * s; PA[i + 1] = (PA[i + 1] - mn[1]) * s; PA[i + 2] = (PA[i + 2] - cz) * s; }
pa.setArray(PA);

// textures: colour map resized to JPEG; other maps dropped unless --pbr
const keepPbr = !!opt('pbr');
const M = P0.getMaterial();
if (M) {
  if (!keepPbr) { M.setMetallicRoughnessTexture(null); M.setNormalTexture(null); M.setOcclusionTexture(null); }
  M.setEmissiveTexture(null); M.setAlphaMode('OPAQUE');
  if (kind === 'char') { M.setName('char'); M.setMetallicFactor(0.05); M.setRoughnessFactor(0.72); }
  else if (!keepPbr) { M.setMetallicFactor(0); M.setRoughnessFactor(0.9); }
}
await doc.transform(prune());
for (const t of root.listTextures()) {
  const isColour = M && t === M.getBaseColorTexture();
  const size = isColour ? texSize : Math.min(texSize, 512);
  const img = await sharp(Buffer.from(t.getImage())).resize(size, size, {fit: 'fill'}).removeAlpha().jpeg({quality: 82, mozjpeg: true}).toBuffer();
  t.setImage(new Uint8Array(img)).setMimeType('image/jpeg').setURI('');
}

let outDoc = doc;
if (kind === 'char') {
  outDoc = await splitCharacter(doc, {neck: opt('neck'), hip: opt('hip'), armx: opt('armx'), shoulder: opt('shoulder'), rules: opt('rules'), preview: opt('preview')});
} else {
  // drop the original node hierarchy: one node, one mesh, straight in the scene
  const mesh = root.listMeshes()[0];
  for (const n of root.listNodes()) n.dispose();
  for (const m of root.listMeshes()) if (m !== mesh) m.dispose();
  const node = doc.createNode(kind).setMesh(mesh); scene.addChild(node);
  await doc.transform(prune());
}
await io.setVertexLayout(VertexLayout.SEPARATE).write(out, outDoc);
const b = getBounds(outDoc.getRoot().listScenes()[0]);
const fs = await import('fs');
console.log(JSON.stringify({in: inp, out, kind, trisBefore: before, trisAfter: (() => { let t = 0; for (const m of outDoc.getRoot().listMeshes()) for (const p of m.listPrimitives()) t += p.getIndices().getCount() / 3; return t; })(), kb: Math.round(fs.statSync(out).size / 1024), size: b.max.map((x, i) => +(x - b.min[i]).toFixed(3)), min: b.min.map(x => +x.toFixed(3)), max: b.max.map(x => +x.toFixed(3))}));
