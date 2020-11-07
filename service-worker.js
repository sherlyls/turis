const CACHE_NAME = "cache45";
var urlsToCache = [
    "/",
    "/nav.html",
    "/index.html",
    "/pages/home.html",
    "/pages/destinasi.html",
    "/pages/atraksi.html",
    "/pages/eventfestival.html",
    "/pages/img/cover.jpg",
    "/pages/img/bali.jpg",
    "/pages/img/bandung.jpg",
    "/pages/img/yogyakarta.jpg",
    "/pages/img/jakarta.jpg",
    "/pages/img/probolinggo.jpg",
    "/pages/img/orooroombo.jpg",
    "/pages/img/rajaampat.jpg",
    "/pages/img/agam.jpg",
    "/pages/img/garut.jpg",
    "/pages/img/debus.jpg",
    "/pages/img/subak.jpg",
    "/pages/img/sasakwedding.jpg",
    "/pages/img/saungangklungudjo.jpg",
    "/pages/img/karapansapi.jpg",
    "/pages/img/lompatbatu.jpg",
    "/pages/img/artjog.jpg",
    "/css/materialize.min.css",
    "/js/materialize.min.js",
    "/js/nav.js",
    "/manifest.json",
    "/icon.png"
];

self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", function(event) {
    event.respondWith(
        caches
        .match(event.request, { cacheName: CACHE_NAME })
        .then(function(response) {
            if (response) {
                console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
                return response;
            }

            console.log(
                "ServiceWorker: Memuat aset dari server: ",
                event.request.url
            );
            return fetch(event.request);
        })
    );
});

self.addEventListener("activate", function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName != CACHE_NAME) {
                        console.log("ServiceWorker: cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});