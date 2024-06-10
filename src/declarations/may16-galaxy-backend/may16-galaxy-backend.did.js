export const idlFactory = ({ IDL }) => {
  const FileId = IDL.Text;
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
    'cid' : IDL.Principal,
    'content' : IDL.Vec(IDL.Nat8),
    'name' : IDL.Text,
    'createdAt' : Timestamp,
    'size' : IDL.Nat,
    'fileId' : FileId__1,
    'extension' : FileExtension,
    'uploadedAt' : Timestamp,
  });
  const FileInfo = IDL.Record({
    'content' : IDL.Vec(IDL.Nat8),
    'name' : IDL.Text,
    'createdAt' : Timestamp,
    'size' : IDL.Nat,
    'extension' : FileExtension,
  });
  const Bucket = IDL.Service({
    'generateRandom' : IDL.Func([IDL.Text], [IDL.Text], []),
    'getFileInfo' : IDL.Func([FileId], [IDL.Opt(FileData)], ['query']),
    'getInfo' : IDL.Func([], [IDL.Vec(FileData)], ['query']),
    'getSize' : IDL.Func([], [IDL.Nat], []),
    'putFile' : IDL.Func([FileInfo], [IDL.Opt(FileId)], []),
    'wallet_balance' : IDL.Func([], [IDL.Nat], []),
    'whoami' : IDL.Func([], [IDL.Principal], ['query']),
  });
  return Bucket;
};
export const init = ({ IDL }) => { return []; };
