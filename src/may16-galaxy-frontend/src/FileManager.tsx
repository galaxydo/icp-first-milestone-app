import { h } from 'preact';

import folderKanbanIcon from "@iconify/icons-lucide/folder-kanban";

import Topbar from './components/layout/admin/slots/Topbar';
import { Alert, Button, Drawer, Toast } from './components/daisyui';
import Leftbar from './components/layout/admin/slots/Leftbar';
import { useLayoutContext } from './states/layout';

import { adminMenuItems } from "@/data/layout/admin";

import AllFiles from "./components/file-manager/AllFiles";
import AllFolders from "./components/file-manager/AllFolders";
import Overview from "./components/file-manager/Overview";
import StorageStat from "./components/file-manager/StorageStat";
import UploadButton from "./components/file-manager/UploadButton";
// import { FileManagerContextProvfileider, useFileManager, useFileManagerHook } from "./hooks/use-file-manager";
import Icon from './components/Icon';


export default function FileManager(props: { theme: string; }) {
  // const {
  //     state: { leftbar },
  //     toggleLeftbarDrawer,
  // } = useLayoutContext();

  // const { pathname } = useLocation();

  // useEffect(() => {
  //     toggleLeftbarDrawer(false);
  // }, [pathname]);

  const { showOverviewDrawer, setShowOverviewDrawer } = {} // useFileManagerHook();

  return <div class="size-full">
    <div class="flex overflow-hidden">
      <div className="block">
        <Drawer
          role="leftDrawer"
          open={false}
          // onClickOverlay={() => toggleLeftbarDrawer(false)}
          className={`z-20 `}
          side={<Leftbar menuItems={adminMenuItems} />}></Drawer>
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
                        // onClick={() => setShowOverviewDrawer(true)}
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
                onClickOverlay={() => setShowOverviewDrawer(false)}
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
