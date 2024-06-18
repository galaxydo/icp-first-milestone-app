import { h } from 'preact';

import folderKanbanIcon from "@iconify/icons-lucide/folder-kanban";

import Topbar from '@/components/Topbar';
import { Alert, Button, Drawer, Toast } from '@/components/daisyui';
import Leftbar from '@/components/Leftbar';

import Overview from "./components/file-manager/Overview";
import UploadButton from "./components/file-manager/UploadButton";
import Icon from './components/Icon';
import { menuItems } from './menu';
import AllFiles from './components/file-manager/AllFiles';

export default function FileManager(props: { theme: string; }) {
  return <div class="size-full">
    <div class="flex overflow-hidden">
      <div className="block">
        <Drawer
          role="leftDrawer"
          open={false}
          className={`z-20 `}
          side={<Leftbar menuItems={menuItems} activated="/" />}></Drawer>
      </div>
      <div class="main-wrapper overflow-auto">
        <div class="flex h-full flex-col ">
          <Topbar theme={props.theme} />
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
                        className="inline border-base-content/20"></Button>
                      <UploadButton />
                    </div>
                  </div>
                  <h3 className="mt-6 text-base font-medium">My Images</h3>
                  <div className="mt-3">{<AllFiles />}</div>
                </div>
              </div>

              <Drawer
                role="rightDrawer"
                open={false}
                end
                sideClassName={"z-[100]"}
                side={<Overview />}></Drawer>
            </div>
            <Toast vertical={"bottom"} horizontal={"end"}>
              <Alert id="htmx-alert" status="error" className="hidden"></Alert>
            </Toast>
          </div>
        </div>
      </div>
    </div>
  </div>
}
