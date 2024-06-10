import { IFileManagerFile, IFileManagerUploadProcess } from "./types/apps/file-manager"

export type StorageFile = IFileManagerUploadProcess & { type: string }

export type State = {
  inProcess: StorageFile[],
  activity: any,
  storageFiles: IFileManagerFile[],
  contentCache: any,
}

const state: State = {
  inProcess: [],
  activity: [],
  storageFiles: [

  ],
  contentCache: {},
}

export default state;
