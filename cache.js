const cacheName = 'v1'

const assets = [
  './',
  './index.html',
  './js/libs/moment.min.js',
  './js/app.js'
]

function removeOldCache(key) {
  if (key !== cacheName) {
    console.log('Removing old cache')
    return caches.delete(key)
  }
}

async function cacheCleanup() {
  const keyList = await caches.keys()
  return Promise.all(keyList.map(removeOldCache))
}

async function cacheStaticAssets() {
  const cache = await caches.open(cacheName)
  return cache.addAll(assets)
}

async function fetchFromNetwork(request) {
  console.log('Fetching and adding the response data into cache')

  const cache = await caches.open(cacheName)
  const requestCloned = request.clone()
  const response = await fetch(requestCloned)

  cache.put(request, response.clone())

  return response
}

async function fetchFromCache(request) {
  const cache = await caches.open(cacheName)
  const cachedResponse = await cache.match(request)

  if (cachedResponse) {
    console.log('Returning from cache')
    return cachedResponse
  }

  return fetchFromNetwork(request)
}

self.addEventListener('install', event => {
  event.waitUntil(cacheStaticAssets())
})

self.addEventListener('activate', event => {
  console.log('Activating service worker...', event)
  event.waitUntil(cacheCleanup())
  return self.clients.claim()
})

self.addEventListener('fetch', event => {
  event.respondWith(fetchFromCache(event.request))
})
