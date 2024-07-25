import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Picture {
  'content' : Uint8Array | number[],
  'collection' : string,
  'owner' : string,
  'name' : string,
  'pictureId' : PictureId,
  'uploadedAt' : Time,
}
export type PictureId = string;
export interface Pictures {
  'deletePicture' : ActorMethod<[string, string], [] | [string]>,
  'getCanisterBalance' : ActorMethod<[], bigint>,
  'getMemorySize' : ActorMethod<[], bigint>,
  'listPictureIds' : ActorMethod<[string], Array<PictureId>>,
  'readPicture' : ActorMethod<[string, string], [] | [Picture]>,
  'uploadPicture' : ActorMethod<
    [string, string, Uint8Array | number[]],
    [] | [PictureId]
  >,
  'whoami' : ActorMethod<[], Principal>,
}
export type Time = bigint;
export interface _SERVICE extends Pictures {}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
