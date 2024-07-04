import { SingleProcess } from '@/components/file-manager/UploadProcess';
import { defaultCollectionName } from '@/sw';
import { backendActor } from '@/sw/canister';
import state, { StorageFile } from '@/sw/state';
import { b64toBlob } from '@/sw/utils';
import { IFileManagerUploadProcess } from '@/types/file-manager';

type FileHiddenInput = {
  data: string,
  id: string,
  metadata: any,
  name: string,
  size: number,
  type: string,
};

export const addFileToProcess = (file: StorageFile, fileContent: any) => {
  state.inProcess.push(file);
  state.contentCache[file.name] = fileContent;
};

const encodeArrayBuffer = (file: ArrayBuffer): number[] =>
  Array.from(new Uint8Array(file));

export async function processFile(fileName: string) {
  console.log(`processFile: Start processing file with name: ${fileName}`);

  const file = state.inProcess.find(it => it.name == fileName)!;
  console.log(`processFile: Found file in state.inProcess: ${JSON.stringify(file)}`);

  const encoded = state.contentCache[fileName];
  console.log(`processFile: Retrieved file content from state.contentCache: ${encoded.length}`);

  const blob = b64toBlob(encoded, file.type);
  const bsf = await blob.arrayBuffer();

  const collectionName = defaultCollectionName;
  const content = encodeArrayBuffer(bsf);

  const fileId = (await backendActor.uploadPicture(file.name, collectionName, content))[0] as string;
  console.log(`processFile: Received fileId from backend: ${fileId}`);

  if (fileId) {
    console.log(`processFile: fileId exists, updating state.inProcess`);
    state.inProcess = state.inProcess.map(it => {
      if (it.name == fileName) {
        it.id = fileId;
        it.percent = 100;
        console.log(`processFile: Updated file in state.inProcess: ${JSON.stringify(it)}`);
      }
      return it;
    });
  } else {
    console.log(`processFile: fileId does not exist, no updates made to state.inProcess`);
  }

  console.log(`processFile: Finished processing file with name: ${fileName}`);
}

export async function POST(req: Request) {
  const formData = await req.formData();
  const files = [];

  for (let entry of formData.entries()) {
    if (entry[0] === 'filepond') {
      const file = JSON.parse(entry[1]) as FileHiddenInput;

      files.push(file);

      addFileToProcess({
        'name': file.name,
        'size': file.size,
        'percent': 0,
        'type': file.type,
        'id': null,
      }, file.data);
      processFile(file.name);
    }
  }

  const uploadData: IFileManagerUploadProcess[] = files.map(file => {
    return {
      'name': file.name,
      'size': file.size,
      'percent': 0,
    };
  });

  return (
    <div>{uploadData.map((process, index) => (
      <SingleProcess process={process} key={index} />
    ))}</div>
  );
}
