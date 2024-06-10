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
  
  public func getSize(): async Nat {
    Debug.print("canister balance: " # Nat.toText(Cycles.balance()));
    Prim.rts_memory_size();
  };

  func getrByte(f : Random.Finite) : ? Nat8 {
    do ? {
      f.byte()!
    };
  };

  public func generateRandom(name: Text): async Text {
    var n : Text = name;
    let entropy = await Random.blob();
    var f = Random.Finite(entropy);
    let count : Nat = 2;
    var i = 1;
    label l loop {
      if (i >= count) break l;
      let b = getrByte(f);
      switch (b) {
        case (?b) { n := n # Nat8.toText(b); i += 1 };
        case null {
          Debug.print("need more entropy...");
          let entropy = await Random.blob();
          f := Random.Finite(entropy);
        };
      };
    };
    n
  };

  func createFileInfo(fileId: Text, fi: FileInfo) : ?FileId {
          switch (state.files.get(fileId)) {
              case (?_) { null }; 
              case null {
                  Debug.print("id is..." # debug_show(fileId));   
                  state.files.put(fileId,
                                      {
                                          fileId = fileId;
                                          cid = Principal.fromActor(this);
                                          name = fi.name;
                                          createdAt = fi.createdAt;
                                          uploadedAt = Time.now();
                                          size = fi.size ;
                                          extension = fi.extension;
                                          content = fi.content;
                                      }
                  );
                  ?fileId
              };
          }
  };

  public func putFile(fi: FileInfo) : async ?FileId {
    do ? {
      let fileId = await generateRandom(fi.name);
      createFileInfo(fileId, fi)!;
    }
  };

  func getFileInfoData(fileId : FileId) : ?FileData {
      do ? {
          let v = state.files.get(fileId)!;
            {
            fileId = v.fileId;
            cid = v.cid;
            name = v.name;
            size = v.size;
            extension = v.extension;
            createdAt = v.createdAt;
            uploadedAt = v.uploadedAt;
            content = v.content;
          }
      }
  };

  public query func getFileInfo(fileId : FileId) : async ?FileData {
    do ? {
      getFileInfoData(fileId)!
    }
  };

  public query func getInfo() : async [FileData] {
    let b = Buffer.Buffer<FileData>(0);
    let _ = do ? {
      for ((f, _) in state.files.entries()) {
        b.add(getFileInfoData(f)!)
      };
    };
    b.toArray()
  };

  public func wallet_balance() : async Nat {
    return Cycles.balance();
  };
}
