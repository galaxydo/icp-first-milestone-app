import { backendActor } from '@/canister';
import state from '@/state';
import { h } from 'preact';
import { TableRow, Checkbox, Button } from '@/components/daisyui';
import Icon from '@/components/Icon';
import fileTextIcon from "@iconify/icons-lucide/file-text";
import eyeIcon from "@iconify/icons-lucide/eye";
import shieldIcon from "@iconify/icons-lucide/shield";
import globeIcon from "@iconify/icons-lucide/globe";
import DateUtil from "@/utils/date";
import { StringUtil } from "@/utils/string";
import fs from "@/fs";
import path from "path-browserify";

export async function GET(req, res) {
  const fileName = req.params.name;
  const collection = req.params.collection;
  const owner = req.params.owner;

  const fileId = `${owner}/${collection}/${fileName}`;
  const dirPath = `/${fileId}`;

  try {
    await ensureDirectoryExists(`${dirPath}`);
  } catch (err) {
    console.error('Error creating directory', dirPath, err);
  }
  
  let cachedFile;
  let fileStats;
  try {
    cachedFile = await fs.readFile(`/${fileId}`);
    fileStats = await fs.stat(`/${fileId}`);
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

  if (cachedFile && fileStats) {
    file.size = fileStats.size;
    file.uploadedAt = fileStats.mtimeMs;
    file.content = cachedFile;
    return [<StorageFileRow file={file} />, { 'HX-Trigger': 'FileRow' }];
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

    return [<StorageFileRow file={file} />, { 'HX-Trigger': 'FileSaved' }];
  } else {
    const filePath = `/${fileId}`;
    try {
      const resp = await fs.unlink(filePath);
      console.log(resp)
    } catch (err) { console.error(err) }
    return [<div>Deleted</div>, { 'HX-Trigger': 'FileDeleted' }]
  }

  // return <LoadingFileRow file={file} />;
}

async function ensureDirectoryExists(dirPath) {
  const parts = dirPath.split('/');
  let currentPath = '';

  for (const part of parts) {
    if (part) {
      currentPath += `/${part}`;
      try {
        await fs.mkdir(currentPath);
      } catch (err) {
        if (err.code !== 'EEXIST') {
          throw err;
        }
      }
    }
  }
}

export const LoadingFileRow = ({ file, ...props }) => {
  return (
    <TableRow className="cursor-pointer hover:bg-base-200/40 animate-pulse"
      role="status"
      {...props}
      hx-get={`/FileRow?name=${file.name}&collection=${file.collection}&owner=${file.owner}`} hx-swap="outerHTML"
      hx-trigger="load delay:1s"
    >
      <Checkbox
        size={"xs"}
        checked={false}
        disabled
      />
      <div className="flex items-center space-x-3 truncate">
        <div className={`rounded bg-base-content/5 p-1.5 text-base-content/80`}>
          <Icon icon={fileTextIcon} fontSize={20} />
        </div>
        <div>{file.name}</div>
      </div>
      <div className="text-sm font-medium w-6"></div>
      <div>
        <div className="text-sm w-2"></div>
      </div>
      <div className="text-sm w-2"></div>
      <div className="w-4"></div>
      <div className="w-2">
      </div>
      <div>
        <Button color="ghost" size="sm" shape={"square"} aria-label="Show file" disabled>
          <Icon icon={eyeIcon} className="text-base-content/70" fontSize={16} />
        </Button>
      </div>
      <div></div>
    </TableRow>
  );
};

export const StorageFileRow = ({ file, ...props }: { file: FileData; checkedAll?: boolean }) => {
  const shared_with = "private";

  return (
    
      <TableRow className="cursor-pointer hover:bg-base-200/40"
        _="on click set ut to first <input[type='checkbox']/> in me then toggle @checked on ut then ut.click()"
        {...props}
      >
        <Checkbox
          name="FileRow"
          value={`${file.owner}/${file.collection}/${file.name}`}
          _="on click halt the event's bubbling"
          size={"xs"}
          checked={false}
          aria-label="Single check"
        />
        <div className="flex items-center space-x-3 truncate">
          <div className={`rounded bg-base-content/5 p-1.5 text-base-content/80`}>
            <Icon icon={fileTextIcon} fontSize={20} />
          </div>
          <div>{file.name}</div>
        </div>
        <div className="text-sm font-medium">{file.collection}</div>
        <div className="text-sm font-medium">{file.owner}</div>
        <div>
          <div className="text-sm">{StringUtil.convertToStorageUnits(file.size)}</div>
        </div>
        <div className="text-sm">{DateUtil.formatted(file.uploadedAt)}</div>
        <div>
          {shared_with === "private" ? (
            <span className="flex items-center gap-2 text-error">
              <Icon icon={shieldIcon} fontSize={15} />
              Private
            </span>
          ) : shared_with === "public" ? (
            <span className="flex items-center gap-2 text-success">
              <Icon icon={globeIcon} fontSize={15} />
              Public
            </span>
          ) : (
            <span className="text-base-content/60">{shared_with} members</span>
          )}
        </div>
        <div>
          <Button color="ghost" size="sm" shape={"square"} aria-label="Show file" _={`on click go to url "/__fs__/${file.fileId}" in new window`}>
            <Icon icon={eyeIcon} className="text-base-content/70" fontSize={16} />
          </Button>
        </div>
        <div></div>
      </TableRow>
    
  );
};
