//.imports

import styles from '@/'

import { h, Fragment, type ComponentChildren } from 'preact'
import { render } from 'preact-render-to-string'
import { pathToRegexp, match, parse, compile } from "path-to-regexp";

//.router

import { Wayne } from '@jcubic/wayne';

const app = new Wayne();


//.components

import InputText from './InputText.tsx';
import FileManager from './FileManager.tsx';

//.agent

import { Actor, ActorSubclass, HttpAgent, Identity } from "@dfinity/agent";

const urlParams = new URLSearchParams(location.search);
console.log(urlParams)
const { CANISTER_ID_MAY16_GALAXY_BACKEND, DFX_NETWORK } = Object.fromEntries(urlParams);

// export const canisterId =
//   'bw4dl-smaaa-aaaaa-qaacq-cai';

import { idlFactory, FileData, FileInfo, _SERVICE } from "../../declarations/may16-galaxy-backend/may16-galaxy-backend.did.js";
import UploadProcess, { ProcessPercent, SingleProcess } from './components/file-manager/UploadProcess.jsx';
import { IFileManagerUploadProcess } from './types/apps/file-manager/upload.js';

console.log('DFX_NETWORK', DFX_NETWORK)


const agent = new HttpAgent({
  host: DFX_NETWORK == 'local' ? 'http://127.0.0.1:4943/' : undefined,
  verifyQuerySignatures: false,
  // 'identity': identity,
});

let accountName = 'Anonymous';

const authorize = async () => {
  try {
    const days = BigInt(1);
    const hours = BigInt(24);
    const nanoseconds = BigInt(3600000000000);

    const defaultOptions = {
      createOptions: {
        idleOptions: {
          disableIdle: true,
        },
      },
      loginOptions: {
        identityProvider:
          process.env.DFX_NETWORK === "ic"
            ? "https://identity.ic0.app/#authorize"
            : `http://localhost:4943?canisterId=rdmx6-jaaaa-aaaaa-aaadq-cai#authorize`,
        // Maximum authorization expiration is 8 days
        maxTimeToLive: days * hours * nanoseconds,
      },
    };

    const authClient =
      await AuthClient.create(defaultOptions.createOptions);

    // authClient.login({
    //   ...defaultOptions.loginOptions,
    //   onSuccess: async () => {
    //     handleAuthenticated(authClient);
    //   },
    // });

    console.log('authClient', authClient)

    const identity = authClient.getIdentity() as unknown as Identity;

    if (identity) {
      Actor.agentOf(backend)?.replaceIdentity(identity);
    } else {
      console.error('NOT authorized', identity)
    }
  } catch (e) {
    console.error('authorize', e.toString());
  }
}

// authorize();

if (DFX_NETWORK !== "ic") {
  agent.fetchRootKey().catch((err) => {
    console.warn(
      "Unable to fetch root key. Check to ensure that your local replica is running"
    );
    console.error(err);
  });
}

console.log('CANISTER_ID_MAY16_GALAXY_BACKEND', CANISTER_ID_MAY16_GALAXY_BACKEND)

const backend = Actor.createActor(idlFactory, {
  agent,
  canisterId: CANISTER_ID_MAY16_GALAXY_BACKEND,
}) as ActorSubclass<_SERVICE>;

console.log(backend)

let sizeInKb = '0';

async function updateSize() {
  const size = await backend.getSize();

  sizeInKb = (size / BigInt(1000)).toString();

  console.log('bucket size', size, sizeInKb)
}

// updateSize();

// .worker

/// <reference lib="webworker" />
export type { }

declare const self: ServiceWorkerGlobalScope

self.addEventListener('error', console.error)

// these 2 event listeners make sure the browser replaces the server worker
// as soon as possible if it detects an update.
self.addEventListener('install', event => {
  event.waitUntil(self.skipWaiting())
})

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim())
})


// state - we use a local variable here, which roughly translates to a session variable.
// IndexedDB is also available in service workers if you need to persist stuff.
let count = 0

// const greetHandler = async (params, req) => {
//   console.log('third', params)
//   await new Promise(resolve => setTimeout(resolve, 1000))
//   console.log('fourth', req)
//   const result: string = await backend!.greet('May17')
//   return <h1>{result}</h1>
// }

// const greet = post('/greet', greetHandler)

// router. see @jreusch/router-node
// const router = compile(
//   // how to get the method/pathname
//   (req: Request) => req.method,
//   (req: Request) => new URL(req.url).pathname,

//   // actual routes. we return JSX fragments here.
//   get('/', (params, req) => <Index count={count} />),
//   post('/increment', (params, req) => <Count count={++count} />),
//   post('/decrement', (params, req) => <Count count={--count} />),
// )

// const asyncRouter = routes(greet)

function renderResponse(vdom) {
  const html = '<!DOCTYPE html>\n' + render(vdom)
  const response = new Response(html, {
    headers: {
      'Content-Type': 'text/html'
    }
  })
  return response
}

//.routes

// const IndexRoute = () => <Index count={count} />


const GreetRoute = async (request) => {
  if (request.method !== 'POST') {
    return 'wrong method'
  }

  const formData = await request.formData();
  const body = {};
  for (const entry of formData.entries()) {
    body[entry[0]] = entry[1];
  }

  const name = body['name'];

  const result = await backend?.greet(name);
  return `${result}`
}

let isDarkTheme = true;

app.get('/size', async (req, res) => {
  await updateSize();
  return res.html(render(<span>{sizeInKb}</span>))
});

app.get('/whoami', async (req, res) => {
  await authorize();
  const principal = await backend.whoami();
  return res.html(render(<span>{principal.toString()}</span>))
});

app.get('/jun8', async (req, res) => {
  return res.html('      <link href="/main.css" rel="stylesheet" /> <script type="module" src="/scripts/may16.js"></script>' + render(<June8 />))
})

// run this endpoint locally - inspect source code - replace to index.html then build
app.get('/login-ssg', async (req, res) => {
  const landingPage = render(<AuthLayout><LoginPage /></AuthLayout>)
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
      <script type="module" src="/assets/authenticate.js"></script>
</head>


<body>
  ${landingPage}
  <script type="module" src="/src/main.js"></script>
</body>

</html>
  `
  return res.html(it)
})

app.get('/', async (req, res) => {
  const theme = isDarkTheme ? 'dark' : 'light';

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
  const theme = isDarkTheme ? 'dark' : 'light';

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


app.get('/toggleTheme', (req, res) => {
  isDarkTheme = !isDarkTheme;
  res.text('OK')
})

//.uploadFiles

type FileHiddenInput = {
  data: string,
  id: string
  metadata
  :
  any,
  name
  :
  string,
  size
  :
  number,
  type
  :
  string,
};

import state, { StorageFile } from './state';
import { ActivityItem } from './components/file-manager/Activity.jsx';
import { Progress } from './components/daisyui/index.js';
import { IFileManagerFile } from './types/apps/file-manager/file.js';
import DateUtil from './helpers/utils/date.js';
import { StorageFileRow } from './components/file-manager/AllFiles.jsx';
import CanvasPage from './CanvasPage.jsx';
import June8 from './June8.jsx';

// const addFileToStorage = (file: IFileManagerFile) => {
//   state.storageFiles.push(file)
// }

// addFileToStorage({
//   name: "Latest File",
//   size: 5478512354,
//   last_modified_at: DateUtil.minusDays(1),
//   owner_name: "Denish Navadiya",
//   shared_with: 3,
// })

//.addFileToProcess
const addFileToProcess = (file: StorageFile, fileContent: any) => {
  state.inProcess.push(file)
  state.contentCache[file.name] = fileContent;
}

const addFileToProcessMock = (file: IFileManagerUploadProcess) => {
  state.inProcess.push(file)
}


// addFileToProcess({
//   name: 'stuck.jpg',
//   size: 3000,
//   percent: 99,
// })

import mockFile from './mockFile'
import { b64toBlob, getFileExtension } from './utils.js';
import { AuthClient } from '@dfinity/auth-client';
import NotFoundPage from './pages/not-found.jsx';
import LoginPage from './pages/auth/login/index.jsx';
import RegisterPage from './pages/auth/register/index.jsx';
import AuthLayout from './components/layout/auth/index.jsx';

addFileToProcess({
  name: 'success.jpg',
  size: 2000,
  percent: 55,
  type: 'image/png',
  id: 'unknown',
}, mockFile())

processFile('success.jpg')

async function sleep(ms = 100) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const version = Date.now()

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

  const fileId = (await backend.putFile(fileInfo))[0] as string;
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

async function processFileMock(fileName: string) {
  const file = state.inProcess.find(it => it.name == fileName);
  if (file) {
    while (file.percent < 100) {
      state.inProcess = state.inProcess.map(it => {
        if (it.name == fileName) {
          it.percent += 1;
          console.log('processFile', it)
        }
        return it;
      })
      await sleep(200);
    }
  }
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
  // const name = req.params.name;
  console.log('xx /sse')
  const stream = res.sse({
    onClose() {
      clearInterval(timerId);
    }
  });
  var timerId = setInterval(function() {
    for (const it of state.inProcess) {
      console.log('yy sse it', it, `v${version}`);
      if (it.percent < 100) {
        // const node = (<ProcessPercent percent={it.percent} />)
        stream.send({ event: 'progress-' + it.name, data: render(<span>{it.percent}%</span>) });
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
          console.log('sending completed event')
          const node = (<ActivityItem fileName={it.name} size={`${it.size}`} />)
          stream.send({ event: 'completed-' + it.name })
          stream.send({ event: 'completed', data: render(node) })
          state.inProcess = state.inProcess.filter(ut => {
            console.log('delete this one?', it.name, ut.name)
            return it.name != ut.name;
          })

          stream.send({ event: 'completed-fileRow', data: render(<StorageFileRow file={fileRow} />) })

        } else {

        }
      }
    }
  }, 1000);
});

app.get('/image/{id}', async function(req, res) {
  const imageId = req.params.id;
  const imageContent = await backend.getFileInfo(imageId);
  console.log('imageContent', imageContent)
  return res.blob(imageContent)
})

app.get('/now', (req, res) => {
  const now = new Date().toLocaleTimeString();
  console.log('second now', now);
  return res.html(`<h1>${now}</h1>`)
})

app.get('*', function(req, res) {
  const accept = req.headers.get('Accept');
  if (accept.match(/text\/html/)) {
    res.html(render(<NotFoundPage />));
  } else {
    res.fetch(req);
  }
});

// POST pushFile should start uploading process and establish ssr connection to notify of completion after promise resolved

//.done

// So cookies are not accessible in service worker any route nor fetch handler, but those asset requests actually contain cookies because they were dismissed by service worker fetch handler returning false then being processed normally by web server

// self.addEventListener('fetch', async event => {
//   const url = new URL(event.request.url);

//   console.log('url', event.request.headers.get('Cookie'))

//   if (url.hostname !== location.hostname) {
//     return;
//   }

//   const route = Object.keys(routes).find(route => match(route, { decode: decodeURIComponent })(url.pathname));

//   if (route) {
//     const handler = async (r) => routes[route](r);
//     event.respondWith(handler(event.request));
//     // event.respondWith(handler(event.request).then(renderResponse));
//   }

//   return false;
// });

// app.get('/user/{id}', function(req, res) {
//   const user = users[req.params.id];
//   if (user) {
//     res.json({result: user});
//   } else {
//     res.json({error: 'User Not Found'});
//   }
// });

// app.get('/error', function(req, res) {
//   nonExisting();
// });

// app.get('/redirect', function(req, res) {
//   res.redirect(301, '/message');
// });

// app.get('/message', function(req, res) {
//   res.text('Lorem Ipsum');
// });

// app.get('/external', function(req, res) {
//   // lorem ipsum API
//   res.redirect('https://api.buildable.dev/@62d55492951509001abc363e/live/lorem-ipsum');
// });


//.end
