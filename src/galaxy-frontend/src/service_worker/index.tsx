//.import-preact
import { h } from 'preact';
import { render } from 'preact-render-to-string';

//.import-wayne
import { Wayne, FileSystem } from '@jcubic/wayne';
import mime from "mime";
import path from "path-browserify";
import fs from "@/fs";
import state from '@/state';

import mockFile from "@/mockFile";

//.import-islands
import * as Islands from '@generated/islands';
console.log('Islands', Object.keys(Islands));

//.import-backend
import { backendActor } from './canister';

//.declare-sw
export declare const self: ServiceWorkerGlobalScope;

//.sw-event-listeners
self.addEventListener('error', (err) => {
  console.error('SW error', err.toString());
});

self.addEventListener('install', event => {
  console.log('Service Worker installing.');
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log('Service Worker activating.');
  event.waitUntil(self.clients.claim());

  self.swEval = async function(code) {
    const response = await fetch('/ReplEval', {
      method: 'POST',
      body: new URLSearchParams({ code }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const result = await response.text();
    console.log('Eval result:', result);
    return result;
  };
});

self.addEventListener('message', event => {
  console.log('YYY');
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

//.init-app
const app = new Wayne();
app.use(FileSystem({ path, fs, mime, prefix: '__fs__' }));

export const defaultCollectionName = "Personal";

//.import-routes
import { registerRoutes } from '@generated/routes';

function queryParamsMiddleware(req, res, next) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  // console.log('url', url)
  req.params = Object.fromEntries(url.searchParams.entries());
  // console.log('req.params', req.params)
  next();
}

app.use(queryParamsMiddleware);

registerRoutes(app);

//.import-island-components
import { GET as GET_FilesPage } from '@/islands/FilesPage';
import { GET as GET_CanvasPage } from '@/islands/CanvasPage';
import { GET as GET_NotFoundPage } from '@/islands/NotFoundPage';

//.render-main-page
async function renderMainPage(res) {
  const content = await GET_FilesPage();
  const html = render(content);
  return res.html(html);
}

//.define-routes

// Define the readdir endpoint
app.get('/readdir', async (req, res) => {
  const files = await fs.readdir(`/${state.principal}/${state.collectionName}`);
  res.json(files);
});

// Define the readFile endpoint
app.get('/readFile', async (req, res) => {
  const fileName = req.params.fileName;
  const filePath = `/${state.principal}/${state.collectionName}/${fileName}`;
  try {
    const fileContent = await fs.readFile(filePath);
    return res.blob(fileContent);
  } catch (error) {
    console.error(`File not found: ${filePath}`, error);
    // const placeholderBuffer = Buffer.from(mockFile().split(",")[1], 'base64');

    const placeholderBase64 = mockFile().split(",")[1];
    const binaryString = atob(placeholderBase64);
    const len = binaryString.length;
    const placeholderBuffer = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      placeholderBuffer[i] = binaryString.charCodeAt(i);
    }
    return res.blob(placeholderBuffer);
    
    // return res.blob(new Uint8Array(placeholderBuffer));
  }
});

app.get('/', async (req, res) => {
  return renderMainPage(res);
});

app.get('/files', async (req, res) => {
  return renderMainPage(res);
});

app.get('/canvas', async (req, res) => {
  const content = await GET_CanvasPage();
  const html = render(content);
  return res.html(html);
});

// app.get('/image/{id}', async function(req, res) {
//   const imageId = encodeURIComponent(req.params.id);
//   const file = await backendActor.getFileInfo(imageId);
//   const content = file[0].content;
//   console.log('content', content);
//   return res.blob(content);
// });

app.get('/now', (req, res) => {
  const now = new Date().toLocaleTimeString();
  console.log('second now', now);
  return res.html(`<h1>${now}</h1>`);
});

//.not-found-route
app.get('*', async function(req, res) {
  const accept = req.headers.get('Accept');
  if (accept.match(/text\/html/)) {
    const content = await GET_NotFoundPage();
    res.html(render(content));
  } else {
    res.fetch(req);
  }
});

//.error-handling
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack trace
});
