#!/usr/bin/env node
/* Safety check for imok 1v1: every inline <script> in index.html, plus sw.js, must parse.
   Run before committing (the pre-commit hook does it) and on GitHub before Pages publishes.
   Usage: node tools/check.js            -> syntax check
          node tools/check.js --smoke    -> also load the page in headless Chromium and make sure Duels starts */
const fs=require('fs'),path=require('path'),os=require('os'),{execFileSync}=require('child_process');
const root=path.join(__dirname,'..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'imok-check-'));
let bad=0,n=0;
const check=(label,code,ext)=>{const f=path.join(tmp,'s'+(n++)+ext);fs.writeFileSync(f,code);
  try{execFileSync(process.execPath,['--check',f],{stdio:'pipe'});console.log('ok   '+label);}
  catch(e){bad++;const msg=String(e.stderr||e.message).replace(f,label);console.error('FAIL '+label+'\n'+msg.split('\n').slice(0,6).join('\n'));}};
const re=/<script([^>]*)>([\s\S]*?)<\/script>/g;let m;
while((m=re.exec(html))){const attrs=m[1],body=m[2];if(/\bsrc=/.test(attrs)||!body.trim())continue;
  const type=(attrs.match(/type="([^"]*)"/)||[])[1];if(type&&!/module|javascript/.test(type))continue;
  const line=html.slice(0,m.index).split('\n').length;const id=(attrs.match(/id="([^"]*)"/)||[])[1];
  check(`index.html <script${id?' id='+id:''}> (line ${line})`,body,type==='module'?'.mjs':'.js');}
if(fs.existsSync(path.join(root,'sw.js')))check('sw.js',fs.readFileSync(path.join(root,'sw.js'),'utf8'),'.js');
// in one-line code a // comment silently eats everything after it on that line: flag any // that has code after it
{const lines=html.split('\n');lines.forEach((l,i)=>{const k=l.indexOf(' // ');if(k<0)return;const before=l.slice(0,k),after=l.slice(k+4);
  if(/^\s*$/.test(before)||/['"`]/.test(before.slice(-1)))return;
  if(/[a-z]\(.*\)\s*\{|\w+=\w|\}\);|\breturn\b.*;/.test(after)){bad++;console.error(`FAIL index.html line ${i+1}: a // comment has more code after it on the same line, which it silently disables (use /* ... */ instead)`);}});}
fs.rmSync(tmp,{recursive:true,force:true});
if(bad){console.error(`\n${bad} problem(s): fix before publishing.`);process.exit(1);}
if(!process.argv.includes('--smoke')){console.log('\nAll scripts parse.');process.exit(0);}
/* ---- smoke test: page loads with no errors and a Duels match starts ---- */
(async()=>{const http=require('http');const {chromium}=require('playwright');
  const types={'.html':'text/html','.js':'application/javascript','.json':'application/json','.webmanifest':'application/manifest+json','.png':'image/png','.webp':'image/webp','.glb':'model/gltf-binary','.mp3':'audio/mpeg','.ogg':'audio/ogg','.wav':'audio/wav'};
  const srv=http.createServer((q,r)=>{let p=decodeURIComponent(q.url.split('?')[0]);if(p.endsWith('/'))p+='index.html';const f=path.join(root,p);
    if(!f.startsWith(root)||!fs.existsSync(f)){r.writeHead(404);return r.end();}r.writeHead(200,{'content-type':types[path.extname(f)]||'application/octet-stream'});fs.createReadStream(f).pipe(r);}).listen(0);
  const port=srv.address().port;const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-unsafe-swiftshader']});
  const p=await b.newPage({viewport:{width:480,height:270}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
  if(process.env.THREE_LOCAL)await p.route(/three\.min\.js/,r=>r.fulfill({body:fs.readFileSync(process.env.THREE_LOCAL),contentType:'application/javascript'}));/* offline testing only */
  await p.route(/fonts\.googleapis|peerjs/,r=>r.abort());
  let ok=false,state='';
  try{await p.goto(`http://localhost:${port}/index.html`,{waitUntil:'load',timeout:60000});await p.waitForFunction(()=>!!window.__duel,null,{timeout:60000});
    state=await p.evaluate(()=>{const D=window.__duel;D.enterMenu();D.startMatch();for(let k=0;k<40;k++)D.frame(.05);return D.S.state;});ok=['countdown','fight'].includes(state);}
  catch(e){errs.push(e.message);}
  await b.close();srv.close();
  if(errs.length||!ok){console.error('FAIL smoke test: '+(errs.join(' | ')||'match did not start (state '+state+')'));process.exit(1);}
  console.log('ok   smoke test: page loads and a Duels match starts ('+state+')');})();
