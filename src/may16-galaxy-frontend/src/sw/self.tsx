export declare const self: ServiceWorkerGlobalScope;

/// <reference lib="webworker" />
export type { }

self.addEventListener('error', console.error)

// these 2 event listeners make sure the browser replaces the server worker
// as soon as possible if it detects an update.
self.addEventListener('install', event => {
  event.waitUntil(self.skipWaiting())
})

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim())
})

