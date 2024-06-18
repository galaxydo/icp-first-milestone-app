// import { IFileManagerFile, IFileManagerUploadProcess } from "./types/apps/file-manager"

import { IFileManagerFile, IFileManagerUploadProcess } from "@/types/file-manager";

export type StorageFile = IFileManagerUploadProcess & { type: string }

export type State = {
  inProcess: StorageFile[],
  activity: any,
  // storageFiles: IFileManagerFile[],
  contentCache: any,
  sizeInKb: string,
  isDarkTheme: boolean,
  principal: string,
}

// state roughly translates to a session variable.
// can be migrated to IndexedDB for persistence.

const state: State = {
  inProcess: [],
  activity: [],
  // storageFiles: [
  // ],
  contentCache: {},
  sizeInKb: '0',
  isDarkTheme: true,
  principal: 'Anonymous'
}

export default state;
