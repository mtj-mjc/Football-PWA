importScripts('./scripts/libs/workbox-sw-3.5.0.js');

if (workbox) {
    console.log(`Yay! Workbox is loaded 🎉`);

    // Precache all static Files and register route
    workbox.precaching.precacheAndRoute([], {
        // Ignore all URL parameters.
        ignoreUrlParametersMatching: [/.*/]
    });

    // Register Competitions Route with CacheFirst Strategy
    workbox.routing.registerRoute(
        /\b\/competitions(?!\/)/,
        workbox.strategies.cacheFirst({
            cacheName: 'competition-cache',
            plugins: [
                new workbox.expiration.Plugin({
                    maxAgeSeconds: 7 * 24 * 60 * 60, // Expires in 7 Days
                })
            ]
        })
    );

    // Register Competitions Route with staleWhileRevalidate Strategy
    workbox.routing.registerRoute(
        /\/competitions\/[0-9]+\/matches/,
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'match-cache',
            plugins: [
                new workbox.expiration.Plugin({
                    maxEntries: 20  // Max 20 Responses should be saved
                })
            ]
        })
    );
} else {
    console.log(`Boo! Workbox didn't load 😬`);
}