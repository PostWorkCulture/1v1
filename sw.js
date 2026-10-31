/* imok 1v1 offline cache.
   The page itself is fetched fresh whenever there's a connection (so updates show up straight away) and falls back to the cached copy offline.
   Sounds, icons, three.js and fonts are served from the cache after the first visit. Music streams normally (browsers fetch it in ranges). */
const CACHE='imok-1v1-v25';
const CORE=['./','index.html','manifest.webmanifest','icons/icon-192.png','icons/icon-512.png','icons/apple-touch-icon.png',
  'chars/blaze.glb','chars/blink.glb','chars/blaze_p.webp','chars/blaze_c.webp','chars/brute_p.webp','chars/brute_c.webp','chars/jet_p.webp','chars/jet_c.webp','chars/blink_p.webp','chars/blink_c.webp','chars/tank_p.webp','chars/tank_c.webp','chars/ghost_p.webp','chars/ghost_c.webp','chars/frost_p.webp','chars/frost_c.webp','chars/patch_p.webp','chars/patch_c.webp','chars/thorn_p.webp','chars/thorn_c.webp','chars/angel_p.webp','chars/angel_c.webp','chars/crusty_p.webp','chars/crusty_c.webp','chars/wednesday_p.webp','chars/wednesday_c.webp','chars/antihero_p.webp','chars/antihero_c.webp','chars/thor_p.webp','chars/thor_c.webp','chars/isaac_p.webp','chars/isaac_c.webp',
  'https://cdn.jsdelivr.net/npm/three@0.158.0/build/three.min.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>Promise.all(CORE.map(u=>c.add(u).catch(()=>{})))).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||r.headers.has('range'))return;const u=new URL(r.url);
  if(u.pathname.includes('/music/'))return;
  if(r.mode==='navigate'||(u.origin===location.origin&&/\/(index\.html)?$/.test(u.pathname))){
    e.respondWith(fetch(r.url,{cache:'no-cache'}).then(res=>{if(res.ok){const c=res.clone();caches.open(CACHE).then(x=>x.put('index.html',c));}return res;}).catch(()=>caches.match('index.html')));return;}
  const ok=u.origin===location.origin||/cdn\.jsdelivr\.net|fonts\.(googleapis|gstatic)\.com/.test(u.host);if(!ok)return;
  e.respondWith(caches.match(r).then(hit=>{const net=fetch(r).then(res=>{if(res&&(res.ok||res.type==='opaque')){const c=res.clone();caches.open(CACHE).then(x=>x.put(r,c));}return res;}).catch(()=>hit);
    return hit||net;}));});
