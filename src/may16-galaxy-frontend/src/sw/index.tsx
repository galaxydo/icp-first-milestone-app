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
import CanvasPage from '@/CanvasPage.jsx';

import mockFile from './mockFile'
import { b64toBlob, getFileExtension, sleep } from './utils';
import NotFoundPage from '@/pages/not-found';
import { authorize, backend } from './canister';
import { self } from './self';
import LoginPage from '@/pages/Login';

import { FileData, FileId, FileInfo } from "../../../declarations/may16-galaxy-backend/may16-galaxy-backend.did.d"

//.import-wayne
import { Wayne, FileSystem } from '@jcubic/wayne';

import FS from "@isomorphic-git/lightning-fs";
import mime from "mime";
import path from "path-browserify";

const app = new Wayne();

//.file-system
const { promises: fs } = new FS("__galaxy__");

app.use(FileSystem({ path, fs, mime, prefix: '__fs__' }));

//.my-files-canister
// when page is refreshed there might've been some new files added into canister so we refresh the table with list of files from canister
// or just on refresh button?
// or optimistic update

const defaultCollectionName = "Personal";

//.getMyFileIds
app.get('/myFileIds', async (req, res) => {
  const fileIds: string[] = await backend.getMyFileIds();

  const storageFiles: IFileManagerFile|FilePlaceholder[] = []

  if (fileIds.length == 0) {
    const exampleFileName = 'example.jpg'

    addFileToProcess({
      name: exampleFileName,
      size: 0,
      percent: 1,
      type: 'image/png',
      id: null,
    }, mockFile())

    processFile(exampleFileName)

    storageFiles.push({
      'name': exampleFileName,
    })
  }

  for (const it of fileIds) {
    const [owner, collection, fileName] = it.split('/');
    storageFiles.push({
      'name': fileName,
    })
  }

  return res.html(render(<FilesTableBody storageFiles={storageFiles} />))
})

  // const files: FileData[] = await backend.getMyFiles();

  // if (fileIds.length == 0) {
  //   addFileToProcess({
  //     name: 'success.jpg',
  //     size: 2000,
  //     percent: 55,
  //     type: 'image/png',
  //     id: 'unknown',
  //   }, mockFile())

  //   processFile('success.jpg')
  // }

  // const storageFiles: IFileManagerFile[] = [];

  // fs.writeFile('./', mockFile())

  // TODO.. we reload files from canister whenever page is full refreshed, otherwise we reload full files table from cache when files are uploaded
  // also, on refresh when no files in canister present, we simulate uploading a mock file

  // for (const it of files) {
  //   storageFiles.push({
  //     'id': it.fileId,
  //     'name': it.name,
  //     'owner_name': it.cid.toString(),
  //     'shared_with': 'public',
  //     'size': Number.parseInt(BigInt(it.size).toString()),
  //     'last_modified_at': new Date(it.createdAt.toString()),
  //   })
  // }


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
  
  if (cachedFile) {
    file.size = cachedFile.length;
    file.content = cachedFile;
    return <StorageFileRow file={file} />
  }

  const remoteFile = await backend.getFileInfo(collection, fileName)

  if (remoteFile && remoteFile[0]) {
    await fs.writeFile(`${fileId}`, remoteFile[0].content);

    file.content = remoteFile[0].content;
    file.size = remoteFile[0].size;
    file.createdAt = remoteFile[0].createdAt;
    file.uploadedAt = remoteFile[0].uploadedAt;
    
    return <StorageFileRow file={
      file
    } />
  }

  return <LoadingFileRow file={file} hx-get={`/fileInfo/${fileName}`} hx-target="outerHTML" hx-trigger="load, delay: 500ms" />
})

//.getSize
app.get('/size', async (req, res) => {
  const size = await backend.getSize();
  state.sizeInKb = (size / BigInt(1000)).toString();
  return res.html(render(<span>{state.sizeInKb}</span>))
});

//.whoami
app.get('/whoami', async (req, res) => {
  await authorize();
  const principal = await backend.whoami();
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
  const content = render(<FileManager theme={theme} />)
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
      <link href="styles//app.css" rel="stylesheet" />
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
    <script type="text/javascript" src="/scripts/canvas.js"></script>
    </body></html>`

  const content = render(<CanvasPage theme={theme} />
  )

  const html = prefix + content + suffix;

  res.html(html)
})


//.toggle-theme
app.get('/toggleTheme', (req, res) => {
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
  console.log(`processFile: Retrieved file content from state.contentCache: ${encoded}`);

  const blob = b64toBlob(encoded, file.type);
  const bsf = await blob.arrayBuffer();

  const fileInfo: FileInfo = {
    name: file.name,
    createdAt: Number(Date.now() * 1000),
    size: file.size,
    // @ts-ignore
    extension: getFileExtension(file.type),
    content: encodeArrayBuffer(bsf),
  };
  console.log(`processFile: Created fileInfo object: ${JSON.stringify(fileInfo)}`);

  const fileId = (await backend.putFile(fileInfo, defaultCollectionName))[0] as string;
  console.log(`processFile: Received fileId from backend: ${fileId}`);

  if (fileId) {
    console.log(`processFile: fileId exists, updating state.inProcess`);
    state.inProcess = state.inProcess.map(it => {
      if (it.name == fileName) {
        it.percent = 100;
        // it.name = `${it.name} - ${fileId}`
        console.log(`processFile: Updated file in state.inProcess: ${JSON.stringify(it)}`);
      }
      return it;
    })
    const fileRow: IFileManagerFile = {
      'id': fileId,
      'name': fileInfo.name,
      'owner_name': 'You',
      'shared_with': 'private',
      'size': fileInfo.size,
      'last_modified_at': DateUtil.minusMinutes(1),
    }
    state.storageFiles.push(fileRow)

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
  const stream = res.sse({
    onClose() {
      clearInterval(timerId);
    }
  });
  var timerId = setInterval(function() {
    for (const it of state.inProcess) {
      if (it.percent <= 100) {
        // update percent value
        stream.send({ event: 'progress-' + it.name, data: render(<span>{it.percent}%</span>) });

        // update indicator
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
        const fileRow: IFileManagerFile | undefined = state.storageFiles.find(ut => ut.name == it.name);
        if (fileRow) {
          // remove processing
          stream.send({ event: 'completed-' + it.name })
          state.inProcess = state.inProcess.filter(ut => {
            return it.name != ut.name;
          })

          // append activity
          const node = (<ActivityItem fileName={it.name} size={`${it.size}`} />)
          stream.send({ event: 'completed', data: render(node) })

          // append file list
          stream.send({ event: 'completed-fileRow', data: render(<StorageFileRow file={fileRow} />) })
        }
      }
    }
  }, 1000);
});

//.get-image
// alternatively we use filesystem middleware now
app.get('/image/{id}', async function(req, res) {
  const imageId = encodeURIComponent(req.params.id);
  const file = await backend.getFileInfo(imageId);
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
