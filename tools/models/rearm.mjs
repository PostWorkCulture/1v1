#!/usr/bin/env node
/* Lowers T-pose arms on a baked character so they hang down like the rest of the roster (the rig expects arms hanging along -y).
   node rearm.mjs <in.glb> <out.glb> --px X --py Y [--deg 90]
   Each arm is moved to a new shoulder pivot (±X, Y, 0) and swung down about z by --deg (positions and normals). */
import {NodeIO,VertexLayout} from '@gltf-transform/core';
const a=process.argv.slice(2),[inp,out]=a.filter(x=>!x.startsWith('--')&&isNaN(+x)),opt=k=>{const i=a.indexOf('--'+k);return i>=0?+a[i+1]:null;};
const px=opt('px'),py=opt('py'),deg=opt('deg')??90;if(px==null||py==null){console.error('need --px and --py');process.exit(1);}
const io=new NodeIO().setVertexLayout(VertexLayout.SEPARATE),doc=await io.read(inp); // the game's GLB reader needs separate (not interleaved) attributes
for(const n of doc.getRoot().listNodes()){const nm=n.getName();if(nm!=='armL'&&nm!=='armR')continue;const s=nm==='armL'?-1:1,T=n.getTranslation(),P=[s*px,py,0];
  const th=(nm==='armL'?1:-1)*deg*Math.PI/180,c=Math.cos(th),si=Math.sin(th);
  for(const pr of n.getMesh().listPrimitives()){const pos=pr.getAttribute('POSITION'),nor=pr.getAttribute('NORMAL'),v=[0,0,0];
    for(let i=0;i<pos.getCount();i++){pos.getElement(i,v);const x=v[0]+T[0]-P[0],y=v[1]+T[1]-P[1],z=v[2]+T[2]-P[2];pos.setElement(i,[x*c-y*si,x*si+y*c,z]);}
    if(nor)for(let i=0;i<nor.getCount();i++){nor.getElement(i,v);nor.setElement(i,[v[0]*c-v[1]*si,v[0]*si+v[1]*c,v[2]]);}}
  n.setTranslation(P);}
await io.write(out,doc);console.log('rearmed',out,{px,py,deg});
