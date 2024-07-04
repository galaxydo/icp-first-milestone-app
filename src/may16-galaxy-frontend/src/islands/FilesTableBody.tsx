import { backendActor } from '@/sw/canister';
import state from '@/sw/state';
import { h } from 'preact';

import { IFileManagerFile } from '@/types/file-manager/file.js';
import { FilePlaceholder } from '@/components/file-manager/AllFiles.jsx';
import mockFile from '@/sw/mockFile';

type FilesTableBodyProps = {
  storageFiles: (IFileManagerFile | FilePlaceholder)[];
};

const FilesTableBody = ({ storageFiles }: FilesTableBodyProps) => {
  return (
    <tbody>
      {storageFiles.map((file, index) => (
        <tr key={index}>
          <td>{file.name}</td>
        </tr>
      ))}
    </tbody>
  );
};

export async function GET(req) {
  const collection = req.params.collectionName;
  const pictureIds: string[] = await backendActor.listPictureIds(collection);

  const storageFiles: (IFileManagerFile | FilePlaceholder)[] = [];

  if (pictureIds.length === 0) {
    const exampleFileName = 'example.jpg';

    if (state.inProcess.length === 0) {
      addFileToProcess(
        {
          name: exampleFileName,
          size: 0,
          percent: 1,
          type: 'image/png',
          id: null,
        },
        mockFile()
      );

      processFile(exampleFileName);
    }

    storageFiles.push({
      name: exampleFileName,
    });
  }

  for (const it of pictureIds) {
    const [owner, collection, fileName] = it.split('/');
    storageFiles.push({
      name: fileName,
    });
  }

  return <FilesTableBody storageFiles={storageFiles} />;
}
