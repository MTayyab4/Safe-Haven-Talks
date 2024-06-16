const cacheName = 'my-cache';
const resourcesToCache = [
  './index.html',
  './about.html',
  './article.html',
  './blog.html',
  './category.html',
  './contact-us.html',
  './feature.html',
  './pricing.html',
  './privacy-policy.html',
  './resources.html',
  './sessions.html',
  './css/about.css',
  './css/ano.css',
  './css/cat.css',
  './css/nav.css',
  './css/cssn/nav.css',
  './css/new.css',
  './css/pricing.css',
  './css/search.css',
  './css/style.css',
  './css/styles.css',
  './js/article.js',
  './js/banner.js',
  './js/blog.js',
  './js/category.js',
  './js/mail.js',
  './js/res.js',
  './js/script.js',
  './js/search.js',
  './js/src.js',
  './js/test.js'
];

// Install service worker and cache resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        return cache.addAll(resourcesToCache);
      })
      .then(() => {
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('Error caching resources:', error);
      })
  );
});

// Fetch resources from cache or network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request)
          .then(networkResponse => {
            if (networkResponse.ok) {
              return networkResponse;
            }
            throw new Error('Failed to fetch resource');
          })
          .catch(error => {
            console.error('Error fetching resource:', error);
            return caches.open(cacheName).then(cache => {
              return cache.match(event.request);
            });
          });
      })
      .catch(error => {
        console.error('Error responding to fetch event:', error);
      })
  );
});

// Update cache periodically
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        return cache.keys().then(keys => {
          keys.forEach(key => {
            if (!resourcesToCache.includes(key.url)) {
              cache.delete(key);
            }
          });
        });
      })
      .then(() => {
        return self.clients.claim();
      })
      .catch(error => {
        console.error('Error updating cache:', error);
      })
  );
});

// Handle offline and online events
self.addEventListener('offline', () => {
  console.log('Offline mode activated');
});

self.addEventListener('online', () => {
  console.log('Online mode activated');
});