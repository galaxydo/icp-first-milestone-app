//.import-preact
import { h } from 'preact'
import { render } from 'preact-render-to-string'

//.import-components
import FileManager from '@/FileManager';
import { SingleProcess } from '@/components/file-manager/UploadProcess.jsx';
import { IFileManagerUploadProcess } from '@/types/file-manager/upload';

import state, { StorageFile } from './state';
import { ActivityItem } from '@/components/file-manager/Activity.jsx';
import { Progress } from '@/components/daisyui/index.js';
import { IFileManagerFile } from '@/types/file-manager/file.js';
import DateUtil from '@/helpers/utils/date.js';
import AllFiles, { FilePlaceholder, FilesTable, FilesTableBody, LoadingFileRow, StorageFileRow } from '@/components/file-manager/AllFiles.jsx';
import CanvasPage from '@/pages/CanvasPage.jsx';

import mockFile from './mockFile'
import { b64toBlob, getFileExtension, sleep } from './utils';
import NotFoundPage from '@/pages/not-found';
import { authorize, backendActor } from './canister';
import LoginPage from '@/pages/Login';

import { FileData, FileId, FileInfo } from "../../../declarations/may16-galaxy-backend/may16-galaxy-backend.did.d"

//.import-wayne
import { Wayne, FileSystem } from '@jcubic/wayne';

import FS from "@isomorphic-git/lightning-fs";
import mime from "mime";
import path from "path-browserify";
import FilesPage from '@/pages/FilesPage';

export declare const self: ServiceWorkerGlobalScope;

/// <reference lib="webworker" />
export type { }

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
  debugger;
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

const app = new Wayne();

//.file-system
const { promises: fs } = new FS("__galaxy__");

app.use(FileSystem({ path, fs, mime, prefix: '__fs__' }));

const defaultCollectionName = "Personal";

//.getMyFileIds
app.get('/myFileIds', async (req, res) => {
  const collection = req.params.collection;
  
  const pictureIds: string[] = await backendActor.listPictureIds(collection);

  const storageFiles: IFileManagerFile | FilePlaceholder[] = []

  if (pictureIds.length == 0) {
    const exampleFileName = 'example.jpg'

    //.x can be single function with explicit no-await
    {
      addFileToProcess({
        name: exampleFileName,
        size: 0,
        percent: 1,
        type: 'image/png',
        id: null,
      }, mockFile())

      processFile(exampleFileName);
    }

    storageFiles.push({
      'name': exampleFileName,
    })
  }

  for (const it of pictureIds) {
    const [owner, collection, fileName] = it.split('/');
    storageFiles.push({
      'name': fileName,
    })
  }

  return res.html(render(<FilesTableBody storageFiles={storageFiles} />))
})

//.getFileInfo
app.get('/fileInfo/{name}', async (req, res) => {
  const fileName = req.params.name;

  const owner = state.principal;
  const collection = state.principal;
  const fileId = `${owner}/${collection}/${fileName}`;

  const cachedFile = await fs.readFile(`${fileId}`)

  const file: FileData = {
    'name': fileName,
    'collection': collection,
    'owner': owner,
    'content': [],
    'createdAt': 0,
    'extension': '',
    'fileId': fileId,
    'uploadedAt': 0,
  }

  //.x but what if the file with same name has been updated by another device then we surely still need to refresh cache
  if (cachedFile) {
    file.size = cachedFile.length;
    file.content = cachedFile;
    return <StorageFileRow file={file} />
  }

  const remoteFile = await backendActor.readPicture(collection, fileName)

  if (remoteFile && remoteFile[0]) {
    await fs.writeFile(`${fileId}`, remoteFile[0].content);

    file.content = remoteFile[0].content;
    file.size = remoteFile[0].content.length;
    file.uploadedAt = remoteFile[0].uploadedAt;

    return <StorageFileRow file={
      file
    } />
  }

  //.x wait a sec..
  // use hx-trigger delay 2s instead
  await sleep(1000);

  return <LoadingFileRow file={file} />
})

//.getSize
app.get('/size', async (req, res) => {
  const size = await backendActor.getMemorySize();
  state.sizeInKb = (size / BigInt(1000)).toString();
  return res.html(render(<span>{state.sizeInKb}</span>))
});

//.whoami
app.get('/whoami', async (req, res) => {
  await authorize();
  const principal = await backendActor.whoami();
  state.principal = principal.toString();
  return res.html(render(<span>{state.principal}</span>))
});

//.generate-login-page
// static generated page: run this endpoint locally - inspect source code - replace to index.html then build
app.get('/generate-login-page', async (req, res) => {
  const loginPage = render(<LoginPage />)
  // const landingPage = render(<RegisterPage/>)
  const it = `
    <!DOCTYPE html>
    <html lang="en">

    <head>
      <meta charset="UTF-8" />
      <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Galaxy IC</title>
          <link href="/main.css" rel="stylesheet" />
      <link href="/index.css" rel="stylesheet" />
          <link href="/styles/app.css" rel="stylesheet" />
          <script src="/htmx/htmx2.min.js"></script>
          <script src="/htmx/sse.js"></script>
          <script type="text/hyperscript" src="/scripts/may26._hs"></script>
          <script src="/htmx/_hyperscript.min.js"></script>
          <script type="module" src="/assets/login.js"></script>
    </head>
    <body>
      ${loginPage}
      <script type="module" src="/src/main.js"></script>
    </body>

    </html>
  `
  return res.html(it)
})

//.main-page
app.get('/', async (req, res) => {
  const theme = state.isDarkTheme ? 'dark' : 'light';

  // <script type="module" src="/may16.js"></script>
  // <script src="/scripts/june9.js"></script>
  const prefix = `<!DOCTYPE html><html data-theme="${theme}" >
    <head lang="en">
      <meta charSet="UTF-8" />
      <title>Galaxy File Manager</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link href="/main.css" rel="stylesheet" />
  <link href="/index.css" rel="stylesheet" />
      <link href="/styles/app.css" rel="stylesheet" />
      <script src="/htmx/htmx2.min.js"></script>
      <script src="/htmx/sse.js"></script>
      <script type="text/hyperscript" src="/scripts/may26._hs"></script>
      <script src="/htmx/_hyperscript.min.js"></script>
      <script src="/htmx/eventsource.js"></script>
      <script type="module" src="/scripts/jun2.js"></script>
            
      <link href="/filepond/filepond.css" rel="stylesheet" />
      <link
          href="/filepond/filepond-plugin-image-preview.css"
          rel="stylesheet"
      />
      <script src="/tagify/tagify.js"></script>
      <script src="/tagify/tagify.polyfills.min.js"></script>
      <link href="/tagify/tagify.css" rel="stylesheet" type="text/css" />
    </head>
    <body _="on every htmx:beforeSend in <button:not(.no-disable)/> 
         tell it 
             toggle [@disabled='true'] until htmx:afterOnLoad
  on every htmx:sendError call alert('sendError' + it)

  on htmx:responseError
    put 'Unexpected Response Error' into #htmx-alert's innerHTML
    then remove .hidden from #htmx-alert
    then wait 2s then add .hidden to #htmx-alert
  "
    
  >`
  const suffix = `
      <script src="/filepond/filepond-plugin-image-preview.js"></script>
      <script src="/filepond/filepond-plugin-file-encode.js"></script>
      <script src="/filepond/filepond-plugin-file-validate-type.js"></script>
      <script src="/filepond/filepond-plugin-image-validate-size.js"></script>
      <script src="/filepond/filepond.js"></script>
      <script>
          FilePond.registerPlugin(FilePondPluginImagePreview);
          FilePond.registerPlugin(FilePondPluginFileEncode);
          FilePond.registerPlugin(FilePondPluginFileValidateType);
          FilePond.registerPlugin(FilePondPluginImageValidateSize);
      </script>
  </body></html>`
  const content = render(<FilesPage theme={theme} />)
  const html = prefix + content + suffix;
  return res.html(html)
})

app.get('/canvas', async (req, res) => {
  const theme = state.isDarkTheme ? 'dark' : 'light';

  const prefix = `<!DOCTYPE html><html data-theme="${theme}">
    <head lang="en">
      <meta charSet="UTF-8" />
      <title>Galaxy File Manager</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link href="/main.css" rel="stylesheet" />
      <link href="/index.css" rel="stylesheet" />
      <link href="styles/app.css" rel="stylesheet" />
      <script src="/htmx/htmx2.min.js"></script>
      <script src="/htmx/_hyperscript.min.js"></script>
      <script src="/excalidraw/react.development.js"></script>
      <script src="/excalidraw/react-dom.development.js"></script>
      <script
        type="text/javascript"
        src="/excalidraw/excalidraw.development.js"
      ></script>
    </head>
    <body>`

  const suffix = `
    <script type="text/javascript">
      const App = () => {
        return React.createElement(
          React.Fragment,
          null,
          React.createElement(
            "div",
            {
              style: { height: "500px" },
            },
            React.createElement(ExcalidrawLib.Excalidraw),
          ),
        );
      };

      const excalidrawWrapper = document.getElementById("app");
      const root = ReactDOM.createRoot(excalidrawWrapper);
      root.render(React.createElement(App));

      // ea.updateScene()
    </script>
    </body></html>`

  //.x we should update the scene with list of files persisted in cache by collection we do readFolder from param collection argument

  const content = render(<CanvasPage theme={theme} />
  )

  const html = prefix + content + suffix;

  res.html(html)
})


//.toggle-theme
app.get('/toggleTheme', (req, res) => {
  //.x should be post method
  state.isDarkTheme = !state.isDarkTheme;
  res.text('OK')
})

//.uploadFiles
type FileHiddenInput = {
  data: string,
  id: string
  metadata: any,
  name: string,
  size: number,
  type: string,
};

const addFileToProcess = (file: StorageFile, fileContent: any) => {
  state.inProcess.push(file)
  state.contentCache[file.name] = fileContent;
}

const encodeArrayBuffer = (file: ArrayBuffer): number[] =>
  Array.from(new Uint8Array(file));

async function processFile(fileName: string) {
  console.log(`processFile: Start processing file with name: ${fileName}`);

  const file = state.inProcess.find(it => it.name == fileName)!;
  console.log(`processFile: Found file in state.inProcess: ${JSON.stringify(file)}`);

  // its can be just another field in inProcess
  const encoded = state.contentCache[fileName];
  console.log(`processFile: Retrieved file content from state.contentCache: ${encoded.length}`);

  const blob = b64toBlob(encoded, file.type);
  const bsf = await blob.arrayBuffer();

  const fileInfo: FileInfo = {
    'name': file.name,
    'createdAt': Number(Date.now() * 1000),
    'size': file.size,
    'collection': defaultCollectionName,
    'extension': getFileExtension(file.type),
    'content': encodeArrayBuffer(bsf),
  };
  console.log(`processFile: Created fileInfo object: ${JSON.stringify(fileInfo.name)}`);

  const fileId = (await backendActor.putFile(fileInfo))[0] as string;
  console.log(`processFile: Received fileId from backend: ${fileId}`);

  if (fileId) {
    console.log(`processFile: fileId exists, updating state.inProcess`);
    state.inProcess = state.inProcess.map(it => {
      if (it.name == fileName) {
        it.id = fileId;
        it.percent = 100;
        // it.name = `${it.name} - ${fileId}`
        console.log(`processFile: Updated file in state.inProcess: ${JSON.stringify(it)}`);
      }
      return it;
    })
  } else {
    console.log(`processFile: fileId does not exist, no updates made to state.inProcess`);
  }

  console.log(`processFile: Finished processing file with name: ${fileName}`);
}

app.post('/uploadFiles', async (req: Request, res) => {
  const formData = await req.formData();
  const files = [];

  for (let entry of formData.entries()) {
    if (entry[0] === 'filepond') {
      const file = JSON.parse(entry[1]) as FileHiddenInput;

      files.push(file);

      addFileToProcess({
        'name': file.name,
        'size': file.size,
        'percent': 0,
        'type': file.type,
        'id': null,
      }, file.data)
      processFile(file.name);
    }
  }

  const uploadData: IFileManagerUploadProcess[] = files.map(file => {
    return {
      'name': file.name,
      'size': file.size,
      'percent': 0,
    }
  })

  res.html(
    render(<div>{uploadData.map((process, index) => (
      <SingleProcess process={process} key={index} />
    ))}</div>)
  )
});

app.get('/sse', function(req, res) {
  console.log('sse handler')
  const stream = res.sse({
    onClose() {
      clearInterval(timerId);
    }
  });
  var timerId = setInterval(function() {
    for (const it of state.inProcess) {
      if (it.percent < 100) {
        it.percent += Math.ceil(Math.random() * 7)
        if (it.percent >= 100) {
          it.percent = 99;
        }
        stream.send({ event: 'progress-' + it.name, data: render(<span>{it.percent}%</span>) })
        stream.send({
          event: `progress-${it.name}-indicator`, data: render(
            <Progress
              sse-swap={`progress-${it.name}-indicator`}
              className="mt-0 h-1 bg-base-content/10 align-super"
              color="success"
              max={100}
              value={it.percent}
            />
          )
        })
      } else {
        const fileRow: FilePlaceholder = {
          'name': it.name,
        }

        // remove processing
        stream.send({ event: 'completed-' + it.name })
        state.inProcess = state.inProcess.filter(ut => {
          return it.name != ut.name;
        })

        // append activity
        const node = (<ActivityItem fileName={it.name} size={`${it.size}`} />)
        stream.send({ event: 'completed', data: render(node) })

        // append file list
        stream.send({ event: 'completed-fileRow', data: render(<LoadingFileRow file={fileRow} />) })

        console.log('completed')
      }
    }
  }, 1000);
});

//.get-image
// alternatively we use filesystem middleware now
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

//.end
