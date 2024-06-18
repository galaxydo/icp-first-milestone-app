import Hash "mo:base/Hash";
import Text "mo:base/Text";
import Int "mo:base/Int";
import Trie "mo:base/Trie";
import TrieMap "mo:base/TrieMap";
import Blob "mo:base/Blob";

module {
  
  public type Service = actor {
    getFileInfo : shared FileId -> async ?FileData;
    getSize : shared () -> async Nat;
    putFile : shared FileInfo -> async ?FileId;
  };
  
  public type Timestamp = Int;

  public type FileId = Text;

  public type FileExtension = {
    #jpeg;
    #jpg;
    #png;
    #gif;
    #svg;
    #mp3;
    #wav;
    #aac;
    #mp4;
    #avi;
  };

  // public type FileExtension = Text;

  public type FileInfo = {
    createdAt : Timestamp;
    name: Text;
    size: Nat;
    extension: FileExtension;
    content: Blob;
    collection: Text;
  }; 

  public type FileData = {
    fileId : FileId;
    uploadedAt : Timestamp;
    createdAt : Timestamp;
    name: Text;
    size: Nat;
    extension: FileExtension;
    content: Blob;
    collection: Text;
    owner: Text;
  };

  public type Map<X, Y> = TrieMap.TrieMap<X, Y>;

  public type State = {
      files : Map<FileId, FileData>;
  };

  public func empty () : State {
    let st : State = {
      files = TrieMap.TrieMap<FileId, FileData>(Text.equal, Text.hash);
    };
    st
  };
}
