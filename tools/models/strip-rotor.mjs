/* strips the main rotor blades (the four big flat islands up top) out of a baked chopper so the game can spin its own rotor */
import {NodeIO} from '@gltf-transform/core';import {ALL_EXTENSIONS} from '@gltf-transform/extensions';import {prune,getBounds} from '@gltf-transform/functions';
const [inp,out]=process.argv.slice(2);const io=new NodeIO().registerExtensions(ALL_EXTENSIONS);const d=await io.read(inp);const p=d.getRoot().listMeshes()[0].listPrimitives()[0];
const A=p.getAttribute('POSITION'),a=A.getArray(),I=p.getIndices(),ix=I.getArray(),n=a.length/3;
const key=i=>[a[i*3],a[i*3+1],a[i*3+2]].map(v=>Math.round(v*2000)).join(',');const id=new Map(),rep=new Int32Array(n);for(let i=0;i<n;i++){const k=key(i);if(!id.has(k))id.set(k,i);rep[i]=id.get(k);}
const par=new Int32Array(n).map((_,i)=>i);const f=x=>{while(par[x]!==x)x=par[x]=par[par[x]];return x;};
for(let t=0;t<ix.length;t+=3){const A0=f(rep[ix[t]]),B=f(rep[ix[t+1]]),C=f(rep[ix[t+2]]);par[B]=A0;par[f(C)]=A0;}
const box=new Map();for(let t=0;t<ix.length;t+=3){const r=f(rep[ix[t]]);let c=box.get(r);if(!c)box.set(r,c={min:[9,9,9],max:[-9,-9,-9]});for(const v of [ix[t],ix[t+1],ix[t+2]])for(let q=0;q<3;q++){c.min[q]=Math.min(c.min[q],a[v*3+q]);c.max[q]=Math.max(c.max[q],a[v*3+q]);}}
const drop=new Set();for(const [r,c] of box)if(c.min[1]>.55&&c.max[2]>-.7&&Math.max(c.max[0]-c.min[0],c.max[2]-c.min[2])>.45)drop.add(r);
const keep=[];for(let t=0;t<ix.length;t+=3)if(!drop.has(f(rep[ix[t]])))keep.push(ix[t],ix[t+1],ix[t+2]);
// compact vertices
const used=new Int32Array(n).fill(-1);let m=0;for(const v of keep)if(used[v]<0)used[v]=m++;
for(const [name,att] of p.listSemantics().map(s=>[s,p.getAttribute(s)])){const src=att.getArray(),k=att.getElementSize(),dst=new src.constructor(m*k);for(let i=0;i<n;i++)if(used[i]>=0)for(let q=0;q<k;q++)dst[used[i]*k+q]=src[i*k+q];att.setArray(dst);}
I.setArray(new Uint32Array(keep.map(v=>used[v])));
await d.transform(prune());await io.write(out,d);console.log('dropped',drop.size,'tris',ix.length/3,'->',keep.length/3,JSON.stringify(getBounds(d.getRoot().listScenes()[0])));
