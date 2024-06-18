export const idlFactory = ({ IDL }) => {
  const Timestamp = IDL.Int;
  const FileId__1 = IDL.Text;
  const FileExtension = IDL.Variant({
    'aac' : IDL.Null,
    'avi' : IDL.Null,
    'gif' : IDL.Null,
    'jpg' : IDL.Null,
    'mp3' : IDL.Null,
    'mp4' : IDL.Null,
    'png' : IDL.Null,
    'svg' : IDL.Null,
    'wav' : IDL.Null,
    'jpeg' : IDL.Null,
  });
  const FileData = IDL.Record({
    'content' : IDL.Vec(IDL.Nat8),
    'collection' : IDL.Text,
    'owner' : IDL.Text,
    'name' : IDL.Text,
    'createdAt' : Timestamp,
    'size' : IDL.Nat,
    'fileId' : FileId__1,
    'extension' : FileExtension,
    'uploadedAt' : Timestamp,
  });
  const FileId = IDL.Text;
  const FileInfo = IDL.Record({
    'content' : IDL.Vec(IDL.Nat8),
    'collection' : IDL.Text,
    'name' : IDL.Text,
    'createdAt' : Timestamp,
    'size' : IDL.Nat,
    'extension' : FileExtension,
  });
  const Bucket = IDL.Service({
    'getFileInfo' : IDL.Func(
        [IDL.Text, IDL.Text],
        [IDL.Opt(FileData)],
        ['query'],
      ),
    'getMyFileIds' : IDL.Func([IDL.Text], [IDL.Vec(FileId)], ['query']),
    'getSize' : IDL.Func([], [IDL.Nat], []),
    'putFile' : IDL.Func([FileInfo, IDL.Text], [IDL.Opt(FileId)], []),
    'wallet_balance' : IDL.Func([], [IDL.Nat], []),
    'whoami' : IDL.Func([], [IDL.Principal], ['query']),
  });
  return Bucket;
};
export const init = ({ IDL }) => { return []; };
