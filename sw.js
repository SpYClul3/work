// เปิดแอปได้แม้เน็ตไม่ดี: ใช้ไฟล์ล่าสุดจากเน็ตก่อน ถ้าไม่มีเน็ตใช้ไฟล์ที่เก็บไว้ (ไม่ยุ่งกับการส่งข้อมูลไป Google)
const C='rb-'+"1795571756447";
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(['./','./manifest.json','./icon-192.png'])).catch(()=>{}));self.skipWaiting()});
const F='rb-fonts-1';   // ฟอนต์ Kanit เก็บไว้ในเครื่อง → ตัวอักษรเหมือนเดิมทุกครั้ง แม้เน็ตไม่ดี
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C&&k!==F).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
 if(/^fonts\.(googleapis|gstatic)\.com$/.test(u.hostname)){e.respondWith(caches.open(F).then(c=>c.match(r).then(m=>m||fetch(r).then(res=>{if(res.ok||res.type==='opaque')c.put(r,res.clone()).catch(()=>{});return res}))).catch(()=>fetch(r)));return}
 if(u.origin!==location.origin)return;
 e.respondWith(fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp)).catch(()=>{})}return res}).catch(()=>caches.match(r).then(m=>m||caches.match('./'))))});
