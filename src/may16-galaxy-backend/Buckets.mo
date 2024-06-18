import Types "./BucketTypes";
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


actor class Bucket () = this {

  type FileId = Types.FileId;
  type FileInfo = Types.FileInfo;
  type FileData = Types.FileData;
  type State = Types.State;

  var state = Types.empty();
  let limit = 20_000_000_000_000;

  public shared query (msg) func whoami() : async Principal {
      msg.caller
  };
  
  func createFileInfo(fileId: Text, fi: FileInfo, owner: Text, collection: Text) : ?FileId {
    let newFileInfo = {
      fileId = fileId;
      owner = owner;
      name = fi.name;
      createdAt = fi.createdAt;
      uploadedAt = Time.now();
      size = fi.size;
      extension = fi.extension;
      content = fi.content;
      collection = collection;
    };
    let oldFileInfo = state.files.replace(fileId, newFileInfo);
    switch (oldFileInfo) {
      case null {
        Debug.print("id is..." # debug_show(fileId));
        ?fileId
      };
      case _ {
        null
      };
    }
  };

  public shared(msg) func putFile(fi: FileInfo) : async ?FileId {
    do ? {
      let collection = fi.collection;
      let owner = Principal.toText(msg.caller);
      let fileId = owner # "/" # collection # "/" # fi.name;
      let _ = createFileInfo(fileId, fi, owner, collection);
      fileId;
    }
  };

  public query(msg) func getFileInfo(collection: Text, fileName: Text) : async ?FileData {
    do ? {
        let owner = Principal.toText(msg.caller);
        let fileId = owner # "/" # collection # "/" # fileName;

        let v = state.files.get(fileId)!;
          {
          fileId = v.fileId;
          owner = v.owner;
          name = v.name;
          size = v.size;
          extension = v.extension;
          createdAt = v.createdAt;
          uploadedAt = v.uploadedAt;
          content = v.content;
          collection = v.collection;
        }
    }
  };

  public shared query(msg) func getMyFileIds(collection: Text) : async [FileId] {
    let b = Buffer.Buffer<FileId>(0);
    let ownerPrincipal = msg.caller;
    let _ = do ? {
      for ((k, v) in state.files.entries()) {
        if (v.collection == collection and Text.equal(v.owner, Principal.toText(ownerPrincipal))) {
          b.add(k)
        }
      };
    };
    b.toArray()
  };

  public func getSize(): async Nat {
    Prim.rts_memory_size();
  };

  public func wallet_balance() : async Nat {
    Debug.print("canister balance: " # Nat.toText(Cycles.balance()));
    return Cycles.balance();
  };
}
