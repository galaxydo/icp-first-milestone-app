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

