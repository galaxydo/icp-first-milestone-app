import { LoadingFileRow, StorageFileRow } from '@/components/file-manager/AllFiles';
import { backendActor } from '@/sw/canister';
import state from '@/sw/state';
import fs from 'fs/promises';
import path from 'path';

export async function GET(req, res) {
  const fileName = req.params.name;

  const owner = state.principal;
  const collection = 'defaultCollectionName'; // Replace with your actual collection name
  const fileId = `${owner}/${collection}/${fileName}`;

  const dirPath = path.dirname(fileId);

  try {
    await ensureDirectoryExists(`${dirPath}`);
  } catch (err) {
    console.error('Error creating directory', dirPath, err);
  }
  
  let cachedFile;
  try {
    cachedFile = await fs.readFile(`${fileId}`);
  } catch (err) {
    console.log('cache file not found', fileId);
  }

  const file = {
    'name': fileName,
    'collection': collection,
    'owner': owner,
    'content': [],
    'createdAt': 0,
    'extension': '',
    'fileId': fileId,
    'uploadedAt': 0,
  };

  if (cachedFile) {
    file.size = cachedFile.length;
    file.content = cachedFile;
    return <StorageFileRow file={file} />;
  }

  const remoteFile = await backendActor.readPicture(collection, fileName);

  if (remoteFile && remoteFile[0]) {
    file.content = remoteFile[0].content;
    file.size = remoteFile[0].content.length;
    file.uploadedAt = Number(remoteFile[0].uploadedAt);

    try {
      await fs.writeFile(`/${fileId}`, file.content);
    } catch (err) {
      console.error('Error writing file', fileId, err);
    }

    return <StorageFileRow file={file} />;
  }

  return <LoadingFileRow file={file} />;
}

//.ensureDirectoryExists
async function ensureDirectoryExists(dirPath) {
  const parts = dirPath.split(path.sep);
  let currentPath = '';

  for (const part of parts) {
    currentPath = path.join(currentPath, part);
    try {
      await fs.mkdir(`/${currentPath}`);
    } catch (err) {
      if (err.code !== 'EEXIST') {
        throw err;
      }
    }
  }
}

// async function ensureDirectoryExists(dirPath) {
//   try {
//     await fs.mkdir(dirPath, { recursive: true });
//   } catch (err) {
//     if (err.code !== 'EEXIST') throw err;
//   }
// }
