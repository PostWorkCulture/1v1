/* Splits a normalised character (feet at y=0, ~3.03 tall, facing +z, centred) into the six moving parts the game rigs:
   torso (pivot 0,0,0), head (pivot 0,2.01,0, fixed by the rig), armL/armR (shoulder pivots), legL/legR (hip pivots).
   armL/legL are on -x. Each triangle goes to a part by its centroid:
     y > neck                      -> head
     |x| > armx and y > hand floor -> arm (side by sign of x)
     y < hip                       -> leg (side by sign of x)
     otherwise                     -> torso
   Cuts default to auto-detected values (arm gap at chest height); override with --neck/--hip as heights in metres on the 3.03 m
   model, --armx as metres from the centre line, --shoulder for the shoulder pivot height. For awkward shapes (a tunic wider than the
   chest, a held weapon, wings) add --rules cuts.json: boxes tested before the cuts, e.g.
     [{"part":"torso","x":[-0.56,0.56],"y":[0.93,1.25]}, {"part":"armL","x":[-9,-0.47],"y":[0.7,1.95]}]
   x/y/z are triangle-centre ranges in metres on the 3.03 m model (armL/legL are on -x). Check the colour preview every time. */
import {Document} from '@gltf-transform/core';
import sharp from 'sharp';

const HEAD_PIVOT = 2.01;

// triangle spans (not vertices: big flat faces have no vertices in the middle)
function tris(P, I) { const T = []; for (let t = 0; t < I.length; t += 3) { const a = I[t] * 3, b = I[t + 1] * 3, c = I[t + 2] * 3;
  T.push({x0: Math.min(P[a], P[b], P[c]), x1: Math.max(P[a], P[b], P[c]), y0: Math.min(P[a + 1], P[b + 1], P[c + 1]), y1: Math.max(P[a + 1], P[b + 1], P[c + 1]),
    z0: Math.min(P[a + 2], P[b + 2], P[c + 2]), z1: Math.max(P[a + 2], P[b + 2], P[c + 2]), cx: (P[a] + P[b] + P[c]) / 3, cy: (P[a + 1] + P[b + 1] + P[c + 1]) / 3}); } return T; }

// crotch: lowest height where the centre line (x=0) is covered; below it the legs are apart (clamped to 28-40% of height: tunics and skirts hang lower)
function autoHip(T, H) { const step = H / 200; const cover = y => T.some(t => t.y0 <= y && t.y1 >= y && t.x0 <= 0 && t.x1 >= 0);
  if (cover(H * 0.08)) return {hip: 0.31 * H, found: false};
  for (let y = H * 0.08; y < H * 0.5; y += step) if (cover(y)) return {hip: Math.min(0.4 * H, Math.max(0.28 * H, y + step)), found: true};
  return {hip: 0.31 * H, found: false}; }

// arm cut: first uncovered |x| run outward from the torso in the chest band
function autoArmX(T, hip, neck) { const y0 = hip + (neck - hip) * 0.35, y1 = neck - (neck - hip) * 0.1, bins = 160;
  const band = T.filter(t => t.cy > y0 && t.cy < y1); let W = 0; for (const t of band) W = Math.max(W, Math.abs(t.x0), Math.abs(t.x1));
  const occ = new Array(bins).fill(0); const bin = x => Math.min(bins - 1, Math.floor(Math.abs(x) / W * bins));
  for (const t of band) { if (t.x0 <= 0 && t.x1 >= 0) { for (let b = 0; b <= Math.max(bin(t.x0), bin(t.x1)); b++) occ[b]++; } else { const a = bin(t.x0), b2 = bin(t.x1); for (let b = Math.min(a, b2); b <= Math.max(a, b2); b++) occ[b]++; } }
  const minB = Math.floor(legOuter(T, hip) * 0.6 / W * bins);
  for (let b = minB; b < bins - 2; b++) if (occ[b] === 0 && occ.slice(b).some(v => v > 0)) { let e = b; while (e < bins && occ[e] === 0) e++; return {armx: ((b + e) / 2) / bins * W, found: true}; }
  // no gap (arms touching the body): use the width of the legs, which is close to the torso's on these blocky figures
  return {armx: legOuter(T, hip) * 1.02, found: false}; }
function legOuter(T, hip) { let L = 0; for (const t of T) if (t.cy > hip * 0.3 && t.cy < hip * 0.65) L = Math.max(L, Math.abs(t.x0), Math.abs(t.x1)); return L; }

// neck: going up from mid-body, the first slice clearly narrower (x extent, arms excluded) than anything below it between the shoulders and the top of the head
function autoNeck(T, H, armx) { const step = H / 200;
  const area = y => { let x0 = 1e9, x1 = -1e9, z0 = 1e9, z1 = -1e9; for (const t of T) if (t.y0 <= y && t.y1 >= y && Math.abs(t.cx) < armx) { x0 = Math.min(x0, Math.max(-armx, t.x0)); x1 = Math.max(x1, Math.min(armx, t.x1)); z0 = Math.min(z0, t.z0); z1 = Math.max(z1, t.z1); } return x1 > x0 ? (x1 - x0) : 1e9; };
  let peak = 0; for (let y = H * 0.5; y < H * 0.88; y += step) { const w = area(y); if (w > 1e8) continue; if (w < peak * 0.88) return {neck: y, found: true}; peak = Math.max(peak, w); }
  return {neck: 0.66 * H, found: false}; }

export async function splitCharacter(src, o = {}) {
  const sr = src.getRoot(), prim = sr.listMeshes()[0].listPrimitives()[0];
  const P = prim.getAttribute('POSITION').getArray(), N = prim.getAttribute('NORMAL')?.getArray(), UV = prim.getAttribute('TEXCOORD_0').getArray();
  const I = prim.getIndices().getArray();
  let H = 0; for (let i = 1; i < P.length; i += 3) H = Math.max(H, P[i]);
  const T = tris(P, I);
  const ah = autoHip(T, H), hip = o.hip != null ? +o.hip : ah.hip;
  const a0 = autoArmX(T, hip, 0.66 * H);
  const an = autoNeck(T, H, o.armx != null ? +o.armx : a0.armx), neck = o.neck != null ? +o.neck : an.neck;
  const auto = autoArmX(T, hip, neck), armx = o.armx != null ? +o.armx : auto.armx;
  const handFloor = hip * 0.6;

  // optional hand-made rules (JSON file: [{part, x:[min,max], y:[min,max], z:[min,max]}, ...]); first match wins, then the cuts below
  const rules = o.rules && o.rules !== true ? JSON.parse((await import('fs')).readFileSync(o.rules, 'utf8')) : [];
  const parts = {torso: [], head: [], armL: [], armR: [], legL: [], legR: []};
  for (let t = 0; t < I.length; t += 3) {
    let cx = 0, cy = 0; for (let k = 0; k < 3; k++) { cx += P[I[t + k] * 3]; cy += P[I[t + k] * 3 + 1]; } cx /= 3; cy /= 3;
    let part = null;
    if (rules.length) { let cz = 0; for (let k = 0; k < 3; k++) cz += P[I[t + k] * 3 + 2]; cz /= 3;
      const inR = (r, v) => !r || (v >= r[0] && v <= r[1]);
      for (const r of rules) if (inR(r.x, cx) && inR(r.y, cy) && inR(r.z, cz)) { part = r.part; break; } }
    if (!part) part = cy > neck ? 'head' : (Math.abs(cx) > armx && cy > handFloor) ? (cx < 0 ? 'armL' : 'armR') : cy < hip ? (cx < 0 ? 'legL' : 'legR') : 'torso';
    parts[part].push(I[t], I[t + 1], I[t + 2]);
  }

  // pivots: shoulders at the top-centre of each arm, hips at the centre of each leg
  const centre = (idx, pick) => { let s = 0, n = 0; const seen = new Set(); for (const i of idx) { if (seen.has(i)) continue; seen.add(i); const v = pick(i); if (v == null) continue; s += v; n++; } return n ? s / n : 0; };
  const top = idx => { let m = -1e9; for (const i of idx) m = Math.max(m, P[i * 3 + 1]); return m; };
  const shoulderY = o.shoulder != null ? +o.shoulder : Math.min(neck - 0.1, (top(parts.armL.length ? parts.armL : parts.torso) + top(parts.armR.length ? parts.armR : parts.torso)) / 2 - 0.15);
  const armPX = side => { const idx = parts[side]; const near = idx.filter(i => P[i * 3 + 1] > shoulderY - 0.25); const x = centre(near.length ? near : idx, i => P[i * 3]); return x || (side === 'armL' ? -armx - 0.1 : armx + 0.1); };
  const legPX = side => centre(parts[side], i => P[i * 3]) || (side === 'legL' ? -0.25 : 0.25);
  const piv = {torso: [0, 0, 0], head: [0, HEAD_PIVOT, 0], armL: [armPX('armL'), shoulderY, 0], armR: [armPX('armR'), shoulderY, 0], legL: [legPX('legL'), hip, 0], legR: [legPX('legR'), hip, 0]};

  // new document in the 'imok split' layout
  const doc = new Document(); doc.getRoot().getAsset().generator = 'imok split';
  const buf = doc.createBuffer(), scene = doc.createScene();
  const sm = prim.getMaterial(), stex = sm.getBaseColorTexture();
  const col = doc.createTexture('colour').setImage(stex.getImage()).setMimeType('image/jpeg');
  const black = await sharp({create: {width: 64, height: 64, channels: 3, background: '#000000'}}).jpeg().toBuffer();
  const em = doc.createTexture('emissive').setImage(new Uint8Array(black)).setMimeType('image/jpeg');
  const mat = doc.createMaterial('char').setBaseColorTexture(col).setEmissiveTexture(em).setEmissiveFactor([1, 1, 1]).setMetallicFactor(0.05).setRoughnessFactor(0.72);
  const stats = {rules: rules.length, H: +H.toFixed(3), neck: +neck.toFixed(3), hip: +hip.toFixed(3), armx: +armx.toFixed(3), auto: {hip: ah.found, neck: an.found, armGap: auto.found}, shoulderY: +shoulderY.toFixed(3), parts: {}};
  for (const [name, idx] of Object.entries(parts)) {
    const map = new Map(), pos = [], nor = [], uv = [], ind = [];
    for (const i of idx) { let j = map.get(i); if (j == null) { j = map.size; map.set(i, j); const p = piv[name];
      pos.push(P[i * 3] - p[0], P[i * 3 + 1] - p[1], P[i * 3 + 2] - p[2]); nor.push(...(N ? [N[i * 3], N[i * 3 + 1], N[i * 3 + 2]] : [0, 1, 0])); uv.push(UV[i * 2], UV[i * 2 + 1]); } ind.push(j); }
    if (!pos.length) { pos.push(0, 0, 0, 0, 0, 0, 0, 0, 0); nor.push(0, 1, 0, 0, 1, 0, 0, 1, 0); uv.push(0, 0, 0, 0, 0, 0); ind.push(0, 1, 2); console.warn('WARNING: part ' + name + ' is empty, check the cuts'); }
    const acc = (type, arr) => doc.createAccessor().setType(type).setArray(arr).setBuffer(buf);
    const pr = doc.createPrimitive().setMaterial(mat)
      .setAttribute('POSITION', acc('VEC3', new Float32Array(pos))).setAttribute('NORMAL', acc('VEC3', new Float32Array(nor))).setAttribute('TEXCOORD_0', acc('VEC2', new Float32Array(uv)))
      .setIndices(acc('SCALAR', map.size > 65535 ? new Uint32Array(ind) : new Uint16Array(ind)));
    scene.addChild(doc.createNode(name).setTranslation(piv[name].map(v => +v.toFixed(4))).setMesh(doc.createMesh(name).addPrimitive(pr)));
    stats.parts[name] = {tris: ind.length / 3, pivot: piv[name].map(v => +v.toFixed(3))};
  }
  console.error(JSON.stringify(stats));
  if (o.preview && o.preview !== true) (await import('fs')).writeFileSync(o.preview, JSON.stringify(stats, null, 1));
  return doc;
}
