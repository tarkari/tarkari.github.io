const assets = [
  "/",
  "/index.html",
  "/assets/style.css",
  "/assets/app.js",
  "/icons/icon-128x128.png",
];

self.addEventListener("install", (installEvent) => {
  installEvent.waitUntil(
    caches.open("tarkari-v1.0.0").then((cache) => {
      cache.addAll(assets);
    })
  );
});
