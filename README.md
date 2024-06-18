## Overview

Galaxy Web App allows to upload images into canister hosted on Internet Computer, to organize images into collections, and then view images on the canvas.

It enables users to benefit through many possible scenarios such as example of simplest scenario, where user uploads all pages of book/presentation/documentation through file uploader, then authorizes with the same identity on another device to sync images, and then can switch to Canvas view to visualize all of the images from collection on the canvas and rearrange them to a new layout.

## How it Works

1. When user opens the app first time, he is presented with login page

- statically generated index.html bundled with index.ts
- served from internet computer assets canister
- login button has on click handler to redirect user into Internet Identity canister
- after authorization with II the identity is stored in local storage using @dfinity/auth-client
- then Service Worker is registered to handle all following requests
- then page is refreshed to give the control over the page to SW

2. When user opens File Manager page, its rendered by SW

- the page layout is rendered with Preact in response to page request
- client-side hydration happens with hyperscript, not React
- upload file button allows to select files and shows a preview gallery
- files blob is added to hidden input fields and then form is submitted
- SW route POST /uploadFiles receives files and calls putFile method on canister asynchronously
- when file uploading starts, it immediately adds loading row into file table triggering /fileInfo request with htmx
- /fileInfo is waiting for canister getFileInfo method to return details of uploaded file and then renders actual file row

3. When user opens Canvas page, it shows Excalidraw Canvas
- it can read all the uploaded images from canister middleware endpoint __fs__/fileId
- fileId = Owner Principal + Collection Name + File Name
- canister only allows user to read images from his own collection to ensure privacy

## development

### frontend

```
ls src/**/*.ts* | entr -r -s 'vite build --mode development && cp dist/galaxy-service-worker.js galaxy-service-worker
```

```
cd dist && ~/.deno/bin/file_server
```

### backend

```
dfx start --clean
```

```
dfx deps pull
dfx deps init --argument '(null)' internet-identity
dfx deps deploy
```

```
ls src/**/*.mo* | entr -r -s 'dfx deploy --yes may16-galaxy-backend && dfx build may16-galaxy-frontend'
```

## deployment

```
dfx ledger --network ic create-canister h3sxa-x3fh3-c2fxp-ubrqw-upjcq-fbjt5-lt2e5-oasjv-utks3-oeer3-wqe --amount 0.15

dfx identity --network ic --identity april30 top-up --amount 0.15 ylngo-viaaa-aaaal-qja2a-cai

dfx deploy --identity april30 --network ic may16-galaxy-frontend
```
