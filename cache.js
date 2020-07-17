const STATIC_CACHE_NAME = 'static-cache-v4'

const assetsToCache = [
  './',
  './index.html',
  './favicon.ico',
  './css/style.css',
  './js/libs/moment.min.js',
  './js/app.js',
  'https://fonts.googleapis.com/css?family=Open+Sans:400,300,300italic,400italic,600,600italic,700,700italic'
]

function removeOldCache(key) {
  if (key !== STATIC_CACHE_NAME) {
    console.log(`[Service Worker] Removing old cache: ${key}`)
    return caches.delete(key)
  }
}

async function cacheCleanup() {
  const keyList = await caches.keys()
  return Promise.all(keyList.map(removeOldCache))
}

async function cacheStaticAssets() {
  const cache = await caches.open(STATIC_CACHE_NAME)
  return cache.addAll(assetsToCache)
}

async function fetchFromNetwork(request) {
  console.log('[Service Worker] Fetching from network')
  return await fetch(request)
}

async function fetchFromCache(request) {
  const cache = await caches.open(STATIC_CACHE_NAME)
  const cachedResponse = await cache.match(request)

  if (cachedResponse) {
    console.log('[Service Worker] Fetching from cache')
    return cachedResponse
  }

  return fetchFromNetwork(request)
}

self.addEventListener('install', event => {
  console.log('[Service Worker] Installing service worker...', event)
  event.waitUntil(cacheStaticAssets())
  self.skipWaiting()
})

self.addEventListener('activate', event => {
  console.log('[Service Worker] Activating service worker...', event)
  event.waitUntil(cacheCleanup())
  self.clients.claim()
})

self.addEventListener('fetch', event => {
  event.respondWith(fetchFromCache(event.request))
})
