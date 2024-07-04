//.import-preact
import { h } from 'preact'
import { render } from 'preact-render-to-string'

import { SingleProcess } from '@/components/file-manager/UploadProcess.jsx';
import { IFileManagerUploadProcess } from '@/types/file-manager/upload';

import state, { StorageFile } from './state';
import { ActivityItem } from '@/components/file-manager/Activity.jsx';
import { Progress } from '@/components/daisyui/index.js';
import { IFileManagerFile } from '@/types/file-manager/file.js';
import { FilePlaceholder, FilesTableBody, LoadingFileRow, StorageFileRow } from '@/components/file-manager/AllFiles.jsx';
import CanvasPage from '@/pages/CanvasPage.jsx';

import mockFile from './mockFile'
import { b64toBlob, getFileExtension, sleep } from './utils';
import NotFoundPage from '@/pages/not-found';
import { authorize, backendActor } from './canister';
import LoginPage from '@/pages/Login';

import { Picture } from "../../../declarations/may16-galaxy-backend/may16-galaxy-backend.did.d"

//.import-wayne
import { Wayne, FileSystem } from '@jcubic/wayne';

import FS from "@isomorphic-git/lightning-fs";
import mime from "mime";
import path from "path-browserify";
import FilesPage from '@/pages/FilesPage';
import { FreeSpaceValue } from "@/components/file-manager/FreeSpaceValue";

//.declare-sw
export declare const self: ServiceWorkerGlobalScope;

self.addEventListener('error', (err) => {
  console.error('SW error', err.toString());
})

self.addEventListener('install', event => {
  console.log('Service Worker installing.');
  // Skip waiting to activate the new service worker immediately
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log('Service Worker activating.');
  // Claim clients to take control of all pages immediately
  event.waitUntil(self.clients.claim());
});

self.addEventListener('message', event => {
  console.log('YYY')
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

//.init-app
export const app = new Wayne();

const { promises: fs } = new FS("__galaxy__");

app.use(FileSystem({ path, fs, mime, prefix: '__fs__' }));

export const defaultCollectionName = "Personal";

//.getMyFileIds
// FilesTableBody.registerIsland(app)

import { registerRoutes } from '@/../generated/routes';

registerRoutes(app);

//.main-page
import { GET as GET_FullLayout } from '@/islands/FilesPage';

async function renderMainPage(res) {
  const content = await GET_FullLayout();
  const html = render(content);
  return res.html(html);
}

app.get('/', async (req, res) => {
  return renderMainPage(res);
});

app.get('/files', async (req, res) => {
  return renderMainPage(res);
});

//.canvas
import { GET as GET_CanvasPage } from '@/islands/CanvasPage';

app.get('/canvas', async (req, res) => {
  const content = await GET_CanvasPage();
  const html = render(content);
  return res.html(html);
});

//.get-image
app.get('/image/{id}', async function(req, res) {
  const imageId = encodeURIComponent(req.params.id);
  const file = await backendActor.getFileInfo(imageId);
  const content = file[0].content;
  console.log('content', content)
  return res.blob(content)
})

//.get-now
app.get('/now', (req, res) => {
  const now = new Date().toLocaleTimeString();
  console.log('second now', now);
  return res.html(`<h1>${now}</h1>`)
})

//.not-found
app.get('*', function(req, res) {
  const accept = req.headers.get('Accept');
  if (accept.match(/text\/html/)) {
    res.html(render(<NotFoundPage />));
  } else {
    res.fetch(req);
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack trace
});

//.end
