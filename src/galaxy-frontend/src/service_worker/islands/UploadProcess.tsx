import { defaultCollectionName } from '@/';
import { backendActor } from '@//canister';
import state, { StorageFile } from '@//state';
import { b64toBlob } from '@//utils';
import { IFileManagerUploadProcess } from '@/types/file-manager';
import { SingleProcessIsland } from '@generated/islands';

type FileHiddenInput = {
  data: string,
  id: string,
  metadata: any,
  name: string,
  size: number,
  type: string,
};

const encodeArrayBuffer = (file: ArrayBuffer): number[] =>
  Array.from(new Uint8Array(file));

export const addAndProcessFile = async (file: StorageFile, fileContent: any) => {
  state.inProcess.push(file);
  state.contentCache[file.name] = fileContent;

  console.log(`processFile: Start processing file with name: ${file.name}`);

  try {
    const encoded = state.contentCache[file.name];
    console.log(`processFile: Retrieved file content from state.contentCache: ${encoded.length}`);

    const blob = b64toBlob(encoded, file.type);
    const bsf = await blob.arrayBuffer();

    const collectionName = defaultCollectionName;
    const content = encodeArrayBuffer(bsf);

    const fileId = (await backendActor.uploadPicture(file.name, collectionName, content))[0] as string;
    console.log(`processFile: Received fileId from backend: ${fileId}`);

    if (fileId) {
      console.log(`processFile: fileId exists, updating state.inProcess`);
      state.activity.push({ fileName: file.name, size: file.size });
    } else {
      console.log(`processFile: fileId does not exist, no updates made to state.inProcess`);
    }
  } catch (error) {
    console.error(`processFile: Error processing file with name: ${file.name}`, error);
    state.activity.push({ fileName: file.name, size: file.size, error: error.message });
  }

  state.inProcess = state.inProcess.filter(it => it.name !== file.name);

  console.log(`processFile: Finished processing file with name: ${file.name}`);
}

// if mock parameter true then take mockFile instead of formData
export async function POST(req: Request) {
  const formData = await req.formData();
  const files = [];

  for (let entry of formData.entries()) {
    if (entry[0] === 'filepond') {
      const file = JSON.parse(entry[1]) as FileHiddenInput;

      files.push(file);

      addAndProcessFile({
        'name': file.name,
        'size': file.size,
        'percent': 0,
        'type': file.type,
        'id': null,
      }, file.data);
    }
  }

  const uploadData: IFileManagerUploadProcess[] = files.map(file => {
    return {
      'name': file.name,
      'size': file.size,
      'percent': 0,
    };
  });

  return <UploadProcess uploadData={uploadData} />;
}

export async function GET(req: Request) {
  const uploadData: IFileManagerUploadProcess[] = state.inProcess;

  return <UploadProcess uploadData={uploadData} />;
}

const UploadProcess = ({ uploadData }: { uploadData: IFileManagerUploadProcess[] }) => {
  console.log('xx uploadData', uploadData);
  return (
    <div className="space-y-2 rounded-box border border-base-content/20 px-4 pb-2 pt-3" id="UploadProcess">
      {uploadData.map((process, index) => (
        <SingleProcessIsland params={{'name': process.name}} key={index} />
      ))}
    </div>
  );
};
