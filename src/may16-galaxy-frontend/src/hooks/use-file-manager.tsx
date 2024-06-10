import { ProcessServerConfigFunction } from "filepond";
import { ReactNode, createContext, useContext, useRef, useState } from "react";

import {
    getFileManagerCategoryItemData,
    getFileManagerFileData,
    getFileManagerFolderData,
    getFileManagerStatData,
    getFileManagerUploadProcessData,
} from "@/data/apps/file-manager";

type IFileManagerInformationType = "detail" | "activity";
type IFileManagerFilterViewType = "grid" | "list";

export const useFileManagerHook = () => {
    const [filterFileType, setFilterFileType] = useState<string>("default");
    const uploadModalRef = useRef<HTMLDialogElement>(null);
    const [fileInformationTab, setFileInformationTab] = useState<IFileManagerInformationType>("detail");
    const [filterViewType, setFilterViewType] = useState<IFileManagerFilterViewType>("list");
    const [showOverviewDrawer, setShowOverviewDrawer] = useState(false);

    const showUploadModal = () => {
        uploadModalRef.current?.showModal();
    };

    const uploadFileProcess: ProcessServerConfigFunction = (_, __, ___, load) => load({ message: "done" });

    return {
        files: getFileManagerFileData,
        folders: getFileManagerFolderData,
        uploadData: getFileManagerUploadProcessData,
        stats: getFileManagerStatData,
        categories: getFileManagerCategoryItemData,
        filterFileType,
        showOverviewDrawer,
        setShowOverviewDrawer,
        setFilterFileType,
        fileInformationTab,
        setFileInformationTab,
        filterViewType,
        setFilterViewType,
        uploadModalRef,
        uploadFileProcess,
        showUploadModal,
    };
};

type HookReturnType = ReturnType<typeof useFileManagerHook>;

const Context = createContext<HookReturnType>({} as HookReturnType);

export const FileManagerContextProvider = ({ children }: { children: ReactNode }) => {
    return <Context.Provider value={useFileManagerHook()}>{children}</Context.Provider>;
};
export const useFileManager = () => useContext(Context);
