import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Bucket {
  'getFileInfo' : ActorMethod<[string, string], [] | [FileData]>,
  'getMyFileIds' : ActorMethod<[string], Array<FileId>>,
  'getSize' : ActorMethod<[], bigint>,
  'putFile' : ActorMethod<[FileInfo, string], [] | [FileId]>,
  'wallet_balance' : ActorMethod<[], bigint>,
  'whoami' : ActorMethod<[], Principal>,
}
export interface FileData {
  'content' : Uint8Array | number[],
  'collection' : string,
  'owner' : string,
  'name' : string,
  'createdAt' : Timestamp,
  'size' : bigint,
  'fileId' : FileId__1,
  'extension' : FileExtension,
  'uploadedAt' : Timestamp,
}
export type FileExtension = { 'aac' : null } |
  { 'avi' : null } |
  { 'gif' : null } |
  { 'jpg' : null } |
  { 'mp3' : null } |
  { 'mp4' : null } |
  { 'png' : null } |
  { 'svg' : null } |
  { 'wav' : null } |
  { 'jpeg' : null };
export type FileId = string;
export type FileId__1 = string;
export interface FileInfo {
  'content' : Uint8Array | number[],
  'collection' : string,
  'name' : string,
  'createdAt' : Timestamp,
  'size' : bigint,
  'extension' : FileExtension,
}
export type Timestamp = bigint;
export interface _SERVICE extends Bucket {}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
