import { h } from 'preact';
import state from '@/state';
import { ActivityIsland } from '@generated/islands'; // Import the new ActivityIsland

import folderKanbanIcon from "@iconify/icons-lucide/folder-kanban";
import uploadIcon from "@iconify/icons-lucide/upload";
import xIcon from "@iconify/icons-lucide/x";
import arrowDownToLineIcon from "@iconify/icons-lucide/arrow-down-to-line";
import searchIcon from "@iconify/icons-lucide/search";
import hardDriveIcon from "@iconify/icons-lucide/hard-drive";
import folderGit2Icon from "@iconify/icons-lucide/folder-git-2";

import Topbar from '@/components/Topbar';
import { Alert, Button, Drawer, Toast, Card, CardBody, Checkbox, Input, Table, TableBody, TableRow, Progress, Timeline, TimelineEnd, TimelineItem, TimelineMiddle } from '@/components/daisyui';
import Icon from '@/components/Icon';
import { Modal } from "@/components/daisyui";

import DateUtil from "@/utils/date";
import { StringUtil } from "@/utils/string";
import { IFileManagerFile } from "@/types/file-manager";
import { IFileManagerUploadProcess } from "@/types/apps/file-manager";

import { backendActor } from "@//canister";
import { addAndProcessFile, defaultCollectionName } from "@/";
import mockFile from "@/mockFile";

import { useFileManager, useFileManagerHook } from "@/hooks/use-file-manager";
import routes, { hx } from "@generated/routes";
import { FreeSpaceValueIsland, UploadProcessIsland, AllFilesIsland, RemainingBalanceIsland } from "@generated/islands";

const FileUploader = () => {
    return (
        <>
            <Button
                _="on click add @open to <dialog[role='files']/> then add .modal-open to <dialog[role='files']/>"
                startIcon={<Icon icon={uploadIcon} className="size-4" />}
                size="sm"
                aria-label="Upload file"
                color={"ghost"}
                className=" border-base-content/20">
                Upload
            </Button>
            <Modal open={false} backdrop role="files">
              <form hx-post="/UploadProcess" hx-target="#UploadProcess" hx-swap="innerHTML">
                <div className="flex items-center justify-between">
                    <p className="font-medium">Pictures Canister</p>
                    <Button id="push"
                      _="
              on click
                remove @open from <dialog/> then remove .modal-open from <dialog/> then add @checked='true' to <div[role='rightDrawer'] .drawer-toggle /> then call resetFilepond()
              end
                  on FilePond:addfile from document 
                    remove @disabled from me
                    remove .btn-disabled from me
                  end
                  on FilePond:addfilestart from document 
                    add @disabled to me
                    add .btn-disabled to me
                  end"
                      disabled
                      hx-disabled-elt="this"
                      color="primary"
                      size={"sm"}
                      startIcon={<Icon icon={arrowDownToLineIcon} className="size-4" />}>
                      Push
                  </Button>
                </div>
                <div className="mt-4"><div class="filepond--wrapper"><input type="file" 
                   class="filepond"
                   name="filepond"
                   multiple
                   data-max-file-size="2MB" data-allow-reorder="true" data-credits="false"
                   /></div>
                </div>
              </form>
            </Modal>
        </>
    );
};

const Overview = () => {
  const { inProcess: uploadData, activity } = state;

  return (
    <Card className="rounded-br-none rounded-tl-none border-0 bg-base-100 w-1/3">
      <CardBody className="gap-0">
        <div className="flex items-center justify-between">
          <p className="font-medium">Canister Overview</p>
          <Button disabled color="ghost" size="sm" className="text-success hover:bg-success/20">
            Deposit Stars
          </Button>
        </div>

        <div className="mt-3 rounded bg-primary/5 p-4">
          <div className="flex items-center gap-3">
            <Icon icon={hardDriveIcon} fontSize={18} className="text-primary" />
            <FreeSpaceValueIsland trigger="whoamiFetched from:body" />
          </div>
          <RemainingBalanceIsland />
        </div>
        <p className="mt-6 text-sm font-medium text-base-content/70">In Process</p>
        <div className="mt-3">
          <UploadProcessIsland />
        </div>
        <div className="mt-6">
          <ActivityIsland trigger="load, upload-done from:body" />
        </div>
      </CardBody>
    </Card>
  );
};

function FilesPage({ theme }: { theme: string }) {
  return (
    <div class="size-full">
      <div class="flex overflow-hidden">
        <div class="main-wrapper overflow-auto">
          <div class="flex h-full flex-col">
            <Topbar theme={theme} currentPage="files" />
            <div class="content-wrapper grow bg-content-background p-6 transition-all">
              <div>
                <div className="grid grid-cols-1 gap-6">
                  <div className="col-span-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">Storage</h3>
                      <div className="inline-flex items-center gap-3">
                        <Button
                          startIcon={<Icon icon={folderKanbanIcon} fontSize={16} />}
                          _="on click toggle [@checked=true] on <div[role='rightDrawer'] .drawer-toggle />"
                          size="sm"
                          color={"ghost"}
                          className="inline border-base-content/20"
                        />
                        <FileUploader />
                      </div>
                    </div>
                    <h3 className="mt-6 text-base font-medium">My Images</h3>
                     <div className="mt-3"><AllFilesIsland trigger="whoamiFetched from:body delay:200ms, upload-done from:body, FileDeleted from:body" /></div>
                  </div>
                </div>
                <Drawer
                  role="rightDrawer"
                  open={false}
                  end
                  sideClassName={"z-[100]"}
                  side={<Overview />}
                />
              </div>
              <Toast vertical={"bottom"} horizontal={"end"}>
                <Alert id="htmx-alert" status="error" className="hidden" />
              </Toast>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function GET() {
  const theme = state.isDarkTheme ? 'dark' : 'light';

  return (
    <html data-theme={theme}>
      <head lang="en">
        <meta charSet="UTF-8" />
        <title>Galaxy File Manager</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="/styles/main.css" rel="stylesheet" />
        <link href="/index.css" rel="stylesheet" />
        <script src="/htmx/htmx2.min.js"></script>
        <script src="/htmx/sse.js"></script>
        <script type="text/hyperscript" src="/scripts/debug._hs"></script>
        <script src="/htmx/_hyperscript.min.js"></script>
        <script src="/htmx/eventsource.js"></script>
        <link href="/filepond/filepond.min.css" rel="stylesheet" />
      </head>
      <body class="slide-it-no" _="on every htmx:beforeSend in <button:not(.no-disable)/> 
           tell it 
               toggle [@disabled='true'] until htmx:afterOnLoad
        on every htmx:sendError call alert('sendError' + it)
        on htmx:responseError
          put 'Unexpected Response Error' into #htmx-alert's innerHTML
          then remove .hidden from #htmx-alert
          then wait 2s then add .hidden to #htmx-alert
        ">
        <FilesPage theme={theme} />
        <script src="/filepond/filepond-plugin-file-encode.min.js"></script>
        <script src="/filepond/filepond-plugin-file-validate-type.min.js"></script>
        <script src="/filepond/filepond-plugin-file-validate-size.min.js"></script>
        <script src="/filepond/filepond-plugin-image-exif-orientation.min.js"></script>
        <script src="/filepond/filepond.min.js"></script>
        <script src="/scripts/init-filepond.js"></script>
      </body>
    </html>
  );
}
