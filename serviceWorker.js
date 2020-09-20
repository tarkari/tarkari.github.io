const cacheName = "tarkari-v1.0.1";
const assets = [
  "/",
  "/index.html",
  "/assets/style.css",
  "/assets/app.js",
  "/icons/icon-128x128.png",
];

self.addEventListener("install", (installEvent) => {
  caches.keys().then(function (names) {
    for (let name of names) {
      if (name !== cacheName) caches.delete(name);
    }
  });
  installEvent.waitUntil(
    caches.open(cacheName).then((cache) => {
      cache.addAll(assets);
    })
  );
});
