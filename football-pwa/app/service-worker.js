'use strict';

// Update cache names any time any of the cached files change.
const CACHE_NAME = 'static-cache-v1';
const DATA_CACHE_NAME = 'data-cache-v1';

// Add list of files to cache here.
const FILES_TO_CACHE = [
    '/',
    '/index.html',
    '/manifest.json',
    '/scripts/app.js',
    '/scripts/matches.js',
    '/scripts/install.js',
    '/scripts/libs/bootstrap-4.0.0.min.js',
    '/scripts/libs/jquery-3.2.1.slim.min.js',
    '/pages/matches.html',
    '/images/referee.svg',
    '/images/BL1.svg',
    '/images/BSA.svg',
    '/images/CL.svg',
    '/images/DED.svg',
    '/images/EC.svg',
    '/images/ELC.svg',
    '/images/FL1.svg',
    '/images/PD.svg',
    '/images/PL.svg',
    '/images/PPL.svg',
    '/images/SA.svg',
    '/images/WC.svg',
    '/images/icons/favicon.ico',
    '/images/icons/football-32x32.png',
    '/images/icons/football-64x64.png',
    '/images/icons/football-128x128.png',
    '/images/icons/football-256x256.png',
    '/images/icons/football-512x512.png',
    '/images/icons/download.svg',
    `/css/bootstrap-4.4.1.min.css`
];

self.addEventListener('install', (evt) => {
    console.log('[ServiceWorker] Install');
    // Precache static resources here.
    evt.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[ServiceWorker] Pre-caching offline page');
            return cache.addAll(FILES_TO_CACHE);
        })
    );

    self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
    console.log('[ServiceWorker] Activate');
    // Remove previous cached data from disk.
    evt.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );

    self.clients.claim();
});

self.addEventListener('fetch', (evt) => {
    console.log('[ServiceWorker] Fetch', evt.request.url);
    if (evt.request.url.includes('/competitions')) {
        console.log('[Service Worker] Fetch (data)', evt.request.url);
        evt.respondWith(
            caches.open(DATA_CACHE_NAME).then((cache) => {
                return fetch(evt.request)
                    .then((response) => {
                        // If the response was good, clone it and store it in the cache.
                        if (response.status === 200) {
                            cache.put(evt.request.url, response.clone());
                        }
                        return response;
                    }).catch((err) => {
                        // Network request failed, try to get it from the cache.
                        return cache.match(evt.request);
                    });
            }));
        return;
    }

    if (evt.request.url.includes('/competitions/[0-9]+/matches')) {
        console.log('[Service Worker] Fetch (data)', evt.request.url);
        evt.respondWith(
            caches.open(DATA_CACHE_NAME).then((cache) => {
                return fetch(evt.request)
                    .then((response) => {
                        // If the response was good, clone it and store it in the cache.
                        if (response.status === 200) {
                            cache.put(evt.request.url, response.clone());
                        }
                        return response;
                    }).catch((err) => {
                        // Network request failed, try to get it from the cache.
                        return cache.match(evt.request);
                    });
            }));
        return;
    }

    evt.respondWith(
        caches.open(CACHE_NAME).then((cache) => {
            // Split Parameter from url, so we don't have to save e.g match.html for every Competition
            return cache.match(evt.request.url.split('?')[0])
                .then((response) => {
                    return response || fetch(evt.request);
                });
        })
    );

});