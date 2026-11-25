/* imok 1v1 offline cache.
   The page itself is fetched fresh whenever there's a connection (so updates show up straight away) and falls back to the cached copy offline.
   Sounds, icons, three.js and fonts are served from the cache after the first visit. Music streams normally (browsers fetch it in ranges). */
const CACHE='imok-1v1-v407';
const CORE=['./','index.html','manifest.webmanifest','icons/icon-192.png','icons/icon-512.png','icons/apple-touch-icon.png',
  'chars/wednesday_p.webp','chars/wednesday_c.webp','chars/wednesday_k.webp','chars/lilpink_k.webp','chars/neonrave_p.webp','chars/neonrave_c.webp','chars/neonrave_k.webp','chars/spike_p.webp','chars/spike_c.webp','chars/spike_k.webp','chars/bun_p.webp','chars/bun_c.webp','chars/bun_k.webp','chars/glitch_p.webp','chars/glitch_c.webp','chars/glitch_k.webp','chars/kitty_p.webp','chars/kitty_c.webp','chars/kitty_k.webp','chars/puffer_p.webp','chars/puffer_c.webp','chars/puffer_k.webp','chars/raven_p.webp','chars/raven_c.webp','chars/raven_k.webp','chars/toxic_p.webp','chars/toxic_c.webp','chars/toxic_k.webp','chars/roboid_p.webp','chars/roboid_c.webp','chars/roboid_k.webp',
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
