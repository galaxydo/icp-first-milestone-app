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

export async function GET(req) {
  // const collection = req.params.collectionName;
  const collection = state.collectionName;
  console.log('get collection', collection);
  // const principal = req.params.principal;
  // console.log('get principal', principal);

  const pictureIds: string[] = await backendActor.listPictureIds(collection);

  const storageFiles = [];

  if (pictureIds.length === 0) {
    const exampleFileName = 'example.jpg';

    // if (state.inProcess.length === 0) {
    //   addFileToProcess(
    //     {
    //       name: exampleFileName,
    //       size: 0,
    //       percent: 1,
    //       type: 'image/png',
    //       id: null,
    //     },
    //     mockFile()
    //   );

    //   processFile(exampleFileName);
    // }

    // storageFiles.push({
    //   name: exampleFileName,
    //   owner: principal,
    //   collection: collectionName,
    // });
  }

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

const FilesTable = ({ storageFiles }) => {
  return (
    <Table className="mt-2 rounded-box">
      <TableHead>
        <Checkbox
          _="
on click
  set allChecked to ((<#Files input[type='checkbox']:checked/>).length == (<#Files input[type='checkbox']/>).length)
  repeat in <#Files input[type='checkbox']/>
    set it.checked to not(allChecked)
    it.click()
  end          "
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
            <Button disabled color="ghost" size="sm" className="hidden border-base-content/20 sm:flex">
              <Icon icon={folderGit2Icon} fontSize={16} />
              <span id="Transclude">Transclude(<strong><span _="on change from <#Files input[type='checkbox']/> or load
                    put (<#Files input[type='checkbox']:checked/>).length into me"></span></strong> files)</span>
            </Button>
          </div>

          <div className="inline-flex items-center gap-3">
            <div className="form-control flex flex-row items-center rounded-box border border-base-content/20 px-2">
              <Icon icon={searchIcon} className="text-base-content/60" fontSize={15} />
              <Input
                disabled={true}
                size="sm"
                placeholder="Search along files"
                className="w-full focus:border-transparent focus:outline-0"
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
