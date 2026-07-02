/* Service worker for Redline.
 *
 * It caches every file the game needs on install, then serves those files from
 * the cache first. Once you have opened the game online once, it runs with the
 * network turned off — which is what makes "add to home screen" work offline on
 * a phone or a Chromebook.
 *
 * When you add or rename a file the game loads, add it to FILES below AND bump
 * CACHE_VERSION, or returning players will keep the old cached copy.
 */
const CACHE_VERSION = "redline-v3";

const FILES = [
  ".",
  "index.html",
  "manifest.webmanifest",
  "css/style.css",
  "js/levels.js",
  "js/input.js",
  "js/audio.js",
  "js/game.js",
  "assets/favicon.png",
  "assets/icon-192.png",
  "assets/icon-512.png",
  "assets/apple-touch-icon.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => cache.addAll(FILES)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request)
        .then((resp) => {
          // cache newly seen same-origin files so later visits work offline too
          if (resp && resp.ok && event.request.url.startsWith(self.location.origin)) {
            const copy = resp.clone();
            caches.open(CACHE_VERSION).then((cache) => cache.put(event.request, copy));
          }
          return resp;
        })
        .catch(() => caches.match("index.html"));
    })
  );
});
