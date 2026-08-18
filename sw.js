// sw.js — يخلي التطبيق يفتح فورًا (زي App حقيقي) ويشتغل حتى لو الاتصال ضعيف.
// البيانات نفسها (شقق، مدفوعات...) لسه بتحتاج نت لأنها بتيجي من Supabase مباشرة.

const CACHE_NAME = "borg-elresala-v1";
const APP_SHELL = ["./", "./index.html", "./manifest.json", "./icons/icon-192.png", "./icons/icon-512.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const req = event.request;

  // اطلب أي حاجة من Supabase (بيانات حيّة) دايمًا من النت، من غير أي تخزين مؤقت.
  if (req.url.includes("supabase.co")) return;

  // لباقي الملفات (شكل التطبيق نفسه): جرّب النت الأول، ولو فشل استخدم النسخة المحفوظة.
  event.respondWith(
    fetch(req)
      .then((res) => {
        const resClone = res.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(req, resClone));
        return res;
      })
      .catch(() => caches.match(req).then((cached) => cached || caches.match("./index.html")))
  );
});
