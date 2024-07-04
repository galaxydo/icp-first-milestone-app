## july3

components are shared between layouts and islands and are only used in case when htey are needed in both island and layout

# Galaxy Web App

## Overview

Galaxy Web App allows users to upload images into a canister hosted on the Internet Computer, organize images into collections, and view images on a canvas.

It enables users to benefit through many possible scenarios. For example, a user can upload all pages of a book/presentation/documentation through the file uploader, then authorize with the same identity on another device to sync images, and switch to Canvas view to visualize all of the images from the collection on the canvas and rearrange them into a new layout.

## How it Works

### 1. User Login

- When the user opens the app for the first time, they are presented with a login page.
- The statically generated `index.html` is bundled with `index.ts` and served from the Internet Computer assets canister.
- The login button has an on-click handler to redirect the user to the Internet Identity canister.
- After authorization with Internet Identity (II), the identity is stored in local storage using `@dfinity/auth-client`.
- The Service Worker (SW) is then registered to handle all subsequent requests.
- The page is refreshed to give control over the page to the SW.

### 2. File Manager Page

- When the user opens the File Manager page, it is rendered by the SW.
- The page layout is rendered with Preact in response to the page request.
- Client-side hydration happens with hyperscript, not React.
- The upload file button allows users to select files and shows a preview gallery.
- The file blob is added to hidden input fields, and then the form is submitted.
- The SW route `POST /uploadFiles` receives files and calls the `putFile` method on the canister asynchronously.
- When file uploading starts, it immediately adds a loading row into the file table, triggering a `/fileInfo` request with htmx.
- `/fileInfo` waits for the canister `getFileInfo` method to return details of the uploaded file and then renders the actual file row.

### 3. Canvas Page

- When the user opens the Canvas page, it shows the Excalidraw Canvas.
- It can read all the uploaded images from the canister middleware endpoint `__fs__/fileId`.
- `fileId` is composed of the Owner Principal, Collection Name, and File Name.
- The canister only allows the user to read images from their own collection to ensure privacy.

## Pictures Canister Documentation

### Types

#### PictureId
- **Type**: `Text`
- **Description**: A unique identifier for a picture, composed of the owner's principal, collection name, and picture name.

#### Picture
- **Type**: `record`
- **Fields**:
  - `pictureId: PictureId`: The unique identifier for the picture.
  - `uploadedAt: Time.Time`: The timestamp when the picture was uploaded.
  - `name: Text`: The name of the picture.
  - `content: Blob`: The binary content of the picture.
  - `collection: Text`: The name of the collection to which the picture belongs.
  - `owner: Text`: The principal ID of the owner of the picture.

#### Map<X, Y>
- **Type**: `TrieMap.TrieMap<X, Y>`
- **Description**: A generic map type used to store key-value pairs.

#### State
- **Type**: `record`
- **Fields**:
  - `pictures: Map<PictureId, Picture>`: A map storing pictures by their unique identifiers.
  - `collections: Map<Text, [PictureId]>`: A map storing arrays of picture IDs by collection names.

### State

The canister maintains a state variable of type `State` to store pictures and collections.

### Methods

#### whoami
- **Type**: `shared query(msg) func whoami() : async Principal`
- **Description**: Returns the principal ID of the caller.
- **Parameters**:
  - `msg`: The message context containing the caller's information.
- **Returns**: The principal ID of the caller.

#### uploadPicture
- **Type**: `shared(msg) func uploadPicture(name: Text, collection: Text, content: Blob) : async ?PictureId`
- **Description**: Uploads a picture to the canister.
- **Parameters**:
  - `name: Text`: The name of the picture.
  - `collection: Text`: The name of the collection to which the picture belongs.
  - `content: Blob`: The binary content of the picture.
- **Returns**: The unique identifier of the uploaded picture, or `null` if the upload fails.

#### readPicture
- **Type**: `query(msg) func readPicture(collection: Text, fileName: Text) : async ?Picture`
- **Description**: Reads a picture from the canister.
- **Parameters**:
  - `collection: Text`: The name of the collection to which the picture belongs.
  - `fileName: Text`: The name of the picture.
- **Returns**: The picture record, or `null` if the picture is not found.

#### listPictureIds
- **Type**: `shared query(msg) func listPictureIds(collection: Text) : async [PictureId]`
- **Description**: Lists the picture IDs within a specific collection.
- **Parameters**:
  - `collection: Text`: The name of the collection.
- **Returns**: An array of picture IDs within the specified collection.

#### getMemorySize
- **Type**: `func getMemorySize() : async Nat`
- **Description**: Returns the current memory size of the canister.
- **Returns**: The memory size in bytes.

#### wallet_balance
- **Type**: `func wallet_balance() : async Nat`
- **Description**: Returns the current cycle balance of the canister.
- **Returns**: The cycle balance.

### Usage

#### Uploading a Picture

To upload a picture, call the `uploadPicture` method with the picture's name, collection, and content. The method will return the unique identifier of the uploaded picture.

```motoko
let pictureId = await pictures.uploadPicture("my_picture", "my_collection", myPictureBlob);
```

#### Reading a Picture

To read a picture, call the `readPicture` method with the collection name and picture name. The method will return the picture record if found.

```motoko
let picture = await pictures.readPicture("my_collection", "my_picture");
```

#### Listing Picture IDs

To list the picture IDs within a specific collection, call the `listPictureIds` method with the collection name. The method will return an array of picture IDs.

```motoko
let pictureIds = await pictures.listPictureIds("my_collection");
```

#### Getting Memory Size

To get the current memory size of the canister, call the `getMemorySize` method.

```motoko
let memorySize = await pictures.getMemorySize();
```

#### Getting Wallet Balance

To get the current cycle balance of the canister, call the `wallet_balance` method.

```motoko
let balance = await pictures.wallet_balance();
```

### Notes

- The `uploadPicture` method generates a unique `pictureId` by concatenating the owner's principal, collection name, and picture name.
- The `state` variable is used to store the pictures and collections in a `TrieMap` for efficient retrieval.
- The `whoami` method can be used to verify the caller's principal ID.
- The canister uses the `Time.now()` function to timestamp the upload time of pictures.
- The `Debug.print` statements are used for logging purposes and can be removed or modified as needed.

## Development

### Frontend

```sh
cd src/may16-galaxy-frontend
ls src/**/*.ts* | entr -r -s 'vite build --mode development && cp dist/galaxy-service-worker.js galaxy-service-worker'
```

```sh
cd src/may16-galaxy-frontend
cd dist && ~/.deno/bin/file_server
```

### Backend

```sh
dfx start --clean
```

```sh
dfx deps pull
dfx deps init --argument '(null)' internet-identity
dfx deps deploy
```

```sh
dfx canister create may16-galaxy-frontend
```

```sh
ls src/**/*.mo* | entr -r -s 'dfx deploy --yes may16-galaxy-backend && dfx build may16-galaxy-frontend'
```

## Deployment

```sh
dfx ledger --network ic create-canister h3sxa-x3fh3-c2fxp-ubrqw-upjcq-fbjt5-lt2e5-oasjv-utks3-oeer3-wqe --amount 0.15

dfx identity --network ic --identity april30 top-up --amount 0.15 ylngo-viaaa-aaaal-qja2a-cai

dfx deploy --identity april30 --network ic may16-galaxy-frontend

dfx deploy --identity april30 --network ic may16-galaxy-backend
```
