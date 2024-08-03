import Random "mo:base/Random";
import Nat "mo:base/Nat";
import Time "mo:base/Time";
import Principal "mo:base/Principal";
import Blob "mo:base/Blob";
import Nat8 "mo:base/Nat8";
import Debug "mo:base/Debug";
import Prim "mo:prim";
import Buffer "mo:base/Buffer";
import Cycles "mo:base/ExperimentalCycles";
import Text "mo:base/Text";
import Trie "mo:base/Trie";
import TrieMap "mo:base/TrieMap";
import Array "mo:base/Array";

actor class Pictures () = this {
  //.types
  public type PictureId = Text;
  public type Picture = {
    pictureId: PictureId;
    uploadedAt: Time.Time;
    name: Text;
    content: Blob;
    collection: Text;
    owner: Text;
  };
  public type Map<X, Y> = TrieMap.TrieMap<X, Y>;
  public type State = {
    pictures: Map<PictureId, Picture>;
    collections: Map<Text, [PictureId]>;
  };

  //.state
  var state: State = {
    pictures = TrieMap.TrieMap<PictureId, Picture>(Text.equal, Text.hash);
    collections = TrieMap.TrieMap<Text, [PictureId]>(Text.equal, Text.hash);
  };

  //.whoami
  public shared query(msg) func whoami() : async Principal {
    return msg.caller;
  };

  //.uploadPicture
  public shared(msg) func uploadPicture(name: Text, collection: Text, content: Blob, timestamp : Time.Time) : async ?PictureId {
    let owner = Principal.toText(msg.caller);
    let pictureId = owner # "/" # collection # "/" # name;
    let newPicture: Picture = {
      pictureId = pictureId;
      owner = owner;
      collection = collection;
      name = name;
      content = content;
      uploadedAt = timestamp;
    };

    Debug.print("uploading..." # debug_show(pictureId) # "...timestamp = " # debug_show(timestamp));

    let pictureExists = state.pictures.get(pictureId);
    state.pictures.put(pictureId, newPicture);

    if (pictureExists != null) {
      Debug.print("Picture already exists in the collection: " # pictureId);
    } else {
      let collectionKey = owner # "/" # collection;
      let fileIds = state.collections.get(collectionKey);
      switch (fileIds) {
        case null {
          state.collections.put(collectionKey, [pictureId]);
        };
        case (?ids) {
          state.collections.put(collectionKey, Array.append(ids, [pictureId]));
        };
      };
    };

    Debug.print("done! -" # debug_show(pictureId));

    return ?pictureId;
  };

  //.readPicture
  public query(msg) func readPicture(collection: Text, fileName: Text) : async ?Picture {
    let owner = Principal.toText(msg.caller);
    let fileId = owner # "/" # collection # "/" # fileName;
    return state.pictures.get(fileId);
  };

  //.listPictureIds
  public shared query(msg) func listPictureIds(collection: Text) : async [PictureId] {
    let owner = Principal.toText(msg.caller);
    let collectionKey = owner # "/" # collection;
    switch (state.collections.get(collectionKey)) {
      case null { return []; };
      case (?fileIds) { return fileIds; };
    }
  };

  //.deletePicture
  public shared(msg) func deletePicture(collection: Text, fileName: Text) : async ?Text {
      let owner = Principal.toText(msg.caller);
      let pictureId = owner # "/" # collection # "/" # fileName;

      Debug.print("Attempting to delete picture: " # pictureId);

      // Check if the picture exists
      switch (state.pictures.get(pictureId)) {
          case null {
              Debug.print("Picture not found: " # pictureId);
              return null;
          };
          case (?_) {
              // Remove the picture from the pictures map and handle the return value
              switch (state.pictures.remove(pictureId)) {
                  case null {
                      Debug.print("Failed to remove picture: " # pictureId);
                      return null;
                  };
                  case (?removedPicture) {
                      Debug.print("Picture removed: " # pictureId);

                      // Update the collections map
                      let collectionKey = owner # "/" # collection;
                      switch (state.collections.get(collectionKey)) {
                          case null { 
                              Debug.print("Collection not found: " # collectionKey);
                              return null; 
                          };
                          case (?fileIds) {
                              let updatedFileIds = Array.filter<Text>(fileIds, func(id) { id != pictureId });
                              if (Array.size(updatedFileIds) == 0) {
                                  ignore state.collections.remove(collectionKey);
                                  Debug.print("Collection removed: " # collectionKey);
                              } else {
                                  state.collections.put(collectionKey, updatedFileIds);
                                  Debug.print("Updated collection: " # collectionKey);
                              }
                          };
                      };
                      return ?pictureId;
                  };
              };
          };
      };
  };

  //.getMemorySize
  public func getMemorySize() : async Nat {
    return Prim.rts_memory_size();
  };

  //.walletBalance
  public func getCanisterBalance() : async Nat {
    Debug.print("canister balance: " # Nat.toText(Cycles.balance()));
    return Cycles.balance();
  };
}
