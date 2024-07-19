export const idlFactory = ({ IDL }) => {
  const PictureId = IDL.Text;
  const Time = IDL.Int;
  const Picture = IDL.Record({
    'content' : IDL.Vec(IDL.Nat8),
    'collection' : IDL.Text,
    'owner' : IDL.Text,
    'name' : IDL.Text,
    'pictureId' : PictureId,
    'uploadedAt' : Time,
  });
  const Pictures = IDL.Service({
    'getCanisterBalance' : IDL.Func([], [IDL.Nat], []),
    'getMemorySize' : IDL.Func([], [IDL.Nat], []),
    'listPictureIds' : IDL.Func([IDL.Text], [IDL.Vec(PictureId)], ['query']),
    'readPicture' : IDL.Func(
        [IDL.Text, IDL.Text],
        [IDL.Opt(Picture)],
        ['query'],
      ),
    'uploadPicture' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Vec(IDL.Nat8)],
        [IDL.Opt(PictureId)],
        [],
      ),
    'whoami' : IDL.Func([], [IDL.Principal], ['query']),
  });
  return Pictures;
};
export const init = ({ IDL }) => { return []; };
