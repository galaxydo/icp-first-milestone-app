import folderKanbanIcon from "@iconify/icons-lucide/folder-kanban";

import { Button, Drawer } from "@/components/daisyui";

import Icon from "@/components/Icon";
import PageMetaData from "@/components/PageMetaData";

import AllFiles from "./components/AllFiles";
import AllFolders from "./components/AllFolders";
import Overview from "./components/Overview";
import StorageStat from "./components/StorageStat";
import UploadButton from "./components/UploadButton";
import { FileManagerContextProvider, useFileManager } from "./use-file-manager";

const FileManagerApp = () => {
    const { showOverviewDrawer, setShowOverviewDrawer } = useFileManager();
    return (
        <div>
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
                <div className="col-span-1 xl:col-span-9">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">File Manager</h3>
                        <div className="inline-flex items-center gap-3">
                            <Button
                                onClick={() => setShowOverviewDrawer(true)}
                                startIcon={<Icon icon={folderKanbanIcon} fontSize={16} />}
                                size="sm"
                                color={"ghost"}
                                className="inline border-base-content/20 xl:hidden"></Button>
                            <UploadButton />
                        </div>
                    </div>
                    <div className="mt-6 grid gap-6 md:grid-cols-2 2xl:grid-cols-4">
                        <StorageStat />
                    </div>
                    <h3 className="mt-6 text-base font-medium">Folders</h3>
                    <div className="mt-3 grid grid-cols-1 gap-6 md:grid-cols-3 2xl:grid-cols-5 ">
                        <AllFolders />
                    </div>
                    <h3 className="mt-6 text-base font-medium">Your Files</h3>
                    <div className="mt-3">{<AllFiles />}</div>
                </div>
                <div className="hidden xl:col-span-3 xl:block">
                    <Overview />
                </div>
            </div>

            <Drawer
                open={showOverviewDrawer}
                end
                onClickOverlay={() => setShowOverviewDrawer(false)}
                sideClassName={"z-[100]"}
                side={<Overview />}></Drawer>
        </div>
    );
};

const FileApp = () => {
    return (
        <div>
            <PageMetaData title={"File Manager"} />
            <FileManagerContextProvider>
                <FileManagerApp />
            </FileManagerContextProvider>
        </div>
    );
};

export default FileApp;
