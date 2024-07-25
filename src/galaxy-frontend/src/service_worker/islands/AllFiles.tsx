import { h } from 'preact';
import { TableRow, Checkbox, Button, TableBody, Table, TableHead, Card, CardBody, Input } from '@/components/daisyui';
import Icon from '@/components/Icon';
import { IFileManagerFile } from '@/types/file-manager/file';
import mockFile from '@//mockFile';
import fileTextIcon from "@iconify/icons-lucide/file-text";
import eyeIcon from "@iconify/icons-lucide/eye";
import shieldIcon from "@iconify/icons-lucide/shield";
import globeIcon from "@iconify/icons-lucide/globe";
import DateUtil from "@/utils/date";
import { StringUtil } from "@/utils/string";
import { backendActor } from '@//canister';
import state from '@//state';
// import { addFileToProcess, processFile } from "@/islands/UploadProcess";
import folderGit2Icon from "@iconify/icons-lucide/folder-git-2";
import searchIcon from "@iconify/icons-lucide/search";
import { FileRowIsland } from "@generated/islands";
import { LoadingFileRow } from "@/islands/FileRow";
import { DeleteButtonIsland } from "@generated/islands";

import { routes } from "@generated/routes";

export async function GET(req) {
  const collection = state.collectionName;
  console.log('get collection', collection);

  const pictureIds: string[] = await backendActor.listPictureIds(collection);

  const storageFiles = [];

  for (const it of pictureIds) {
    const [owner, collection, fileName] = it.split('/');
    storageFiles.push({
      name: fileName,
      owner: owner,
      collection: collection,
    });
  }

  return <AllFiles storageFiles={storageFiles} />
}

export async function DELETE(req) {
  const { files } = await req.json(); // Expecting an array of files to delete
  const results = await Promise.all(files.map(file => backendActor.deletePicture(file.collection, file.name)));

  if (results.every(result => result !== null)) {
    return new Response(null, { status: 200 });
  } else {
    return new Response(null, { status: 500 });
  }
}

const FilesTable = ({ storageFiles }) => {
  return (
    <Table className="mt-2 rounded-box">
      <TableHead>
        <Checkbox
          id="SelectAllCheckbox"
          _="
on click set tit to ((<#Files input[type='checkbox']:checked/>).length) log tit set nit to ((<#Files input[type='checkbox']/>).length) log nit set tinit to (tit == nit) log tinit repeat in <#Files input[type='checkbox']/> set it.checked to not(tinit) set me.checked to not(tinit)"
          size={"xs"}
          aria-label="Check all"
        />
        <span className="text-sm font-medium text-base-content/80">Name</span>
        <span className="text-sm font-medium text-base-content/80">Collection</span>
        <span className="text-sm font-medium text-base-content/80">Owner</span>
        <span className="text-sm font-medium text-base-content/80">Size</span>
        <span className="text-sm font-medium text-base-content/80">Created At</span>
        <span className="text-sm font-medium text-base-content/80">Shared With</span>
        <span className="text-sm font-medium text-base-content/80">View</span>
      </TableHead>

      <TableBody id="Files">
        {storageFiles.map((file, index) => {
          return <LoadingFileRow key={index} file={file} />
        })}
      </TableBody>
    </Table>
  );
};

const AllFiles = ({ storageFiles }) => {
  return (
    <Card className="bg-base-100">
      <CardBody className={"p-0"}>
        <div className="flex items-center justify-between gap-3 px-5 pt-5">
          <div className="inline-flex items-center gap-3">
            <DeleteButtonIsland trigger="load, FileRow from:body" />
          </div>

          <div className="inline-flex items-center gap-3">
            <div className="form-control flex flex-row items-center rounded-box border border-base-content/20 px-2">
              <Icon icon={searchIcon} className="text-base-content/60" fontSize={15} />
              <Input
                disabled={true}
                size="sm"
                placeholder="Search along files"
                className="w-full focus:border-transparent focus:outline-0 disabled"
                bordered={false}
                borderOffset={false}></Input>
            </div>
          </div>
        </div>
        <div className="overflow-auto">
          <FilesTable storageFiles={storageFiles} />
        </div>
      </CardBody>
    </Card>
  );
};
