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
  public shared(msg) func uploadPicture(name: Text, collection: Text, content: Blob) : async ?PictureId {
    let owner = Principal.toText(msg.caller);
    let pictureId = owner # "/" # collection # "/" # name;
    let newPicture: Picture = {
      pictureId = pictureId;
      owner = owner;
      collection = collection;
      name = name;
      content = content;
      uploadedAt = Time.now();
    };

    Debug.print("id is..." # debug_show(pictureId));

    state.pictures.put(pictureId, newPicture);

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

  //.getMemorySize
  public func getMemorySize() : async Nat {
    return Prim.rts_memory_size();
  };

  //.walletBalance
  public func wallet_balance() : async Nat {
    Debug.print("canister balance: " # Nat.toText(Cycles.balance()));
    return Cycles.balance();
  };
}
