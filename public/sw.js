// Caching strategy: Stale-While-Revalidate
// This strategy allows serving content from the cache for a fast response,
// and then updates the cache with a fresh version from the network in the background.

const CACHE_NAME = 'adhkar-app-cache-v2';
const DYNAMIC_CACHE_NAME = 'adhkar-dynamic-cache-v2';

// Pre-cache essential shell assets
const urlsToCache = [
  '/',
  '/manifest.json',
  '/favicon.ico',
  '/completion-sound.mp3',
  'https://fonts.googleapis.com/css2?family=Alegreya:wght@400;700&display=swap',
  'https://fonts.gstatic.com/s/alegreya/v35/clc_KjEtQuc0Vfbt_Q_gPjsA78yo.woff2'
];

// Install event: pre-cache the app shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache and caching app shell');
      return cache.addAll(urlsToCache).catch(err => {
        console.error('Failed to cache app shell:', err);
      });
    })
  );
  self.skipWaiting();
});

// Activate event: clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME && name !== DYNAMIC_CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  return self.clients.claim();
});

// Fetch event: serve from cache, update in background
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Serve from cache first for app shell and pages
  if (urlsToCache.includes(url.pathname) || request.destination === 'document') {
    event.respondWith(
      caches.open(CACHE_NAME).then(cache => {
        return cache.match(request).then(cachedResponse => {
          const fetchedResponse = fetch(request).then(networkResponse => {
            if (networkResponse.ok) {
              cache.put(request, networkResponse.clone());
            }
            return networkResponse;
          }).catch(() => {
             // If network fails, and there's no cache, it will fail. This is expected for first-time offline.
          });
          return cachedResponse || fetchedResponse;
        });
      })
    );
    return;
  }
  
  // Stale-while-revalidate for other assets (JS, CSS, images)
  event.respondWith(
      caches.open(DYNAMIC_CACHE_NAME).then(cache => {
          return cache.match(request).then(cachedResponse => {
              const fetchedResponse = fetch(request).then(networkResponse => {
                  if (networkResponse.ok) {
                    cache.put(request, networkResponse.clone());
                  }
                  return networkResponse;
              }).catch(() => {
                 // The network request failed, probably offline.
                 // The cached response will be used if available.
              });

              return cachedResponse || fetchedResponse;
          });
      })
  );
});