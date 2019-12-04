importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js');

if (workbox) {
    console.log(`Yay! Workbox is loaded 🎉`);

    workbox.precaching.precacheAndRoute([], {
        // Ignore all URL parameters.
        ignoreUrlParametersMatching: [/.*/]
    });

    workbox.routing.registerRoute(
        /\b\/competitions(?!\/)/,
        workbox.strategies.cacheFirst({
            cacheName: 'competition-cache',
            plugins: [
                new workbox.expiration.Plugin({
                    maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
                })
            ]
        })
    );

    workbox.routing.registerRoute(
        /\/competitions\/[0-9]+\/matches/,
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'match-cache',
            plugins: [
                new workbox.expiration.Plugin({
                    maxEntries: 20
                })
            ]
        })
    );
} else {
    console.log(`Boo! Workbox didn't load 😬`);
}