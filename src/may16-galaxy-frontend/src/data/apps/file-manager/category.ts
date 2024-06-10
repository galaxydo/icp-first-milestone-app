import fileTextIcon from "@iconify/icons-lucide/file-text";
import imageIcon from "@iconify/icons-lucide/image";
import serverIcon from "@iconify/icons-lucide/server";
import videoIcon from "@iconify/icons-lucide/video";

import { IFileManagerCategoryItem } from "@/types/apps/file-manager";

export const getFileManagerCategoryItemData: IFileManagerCategoryItem[] = [
    {
        name: "Documents",
        files: 124,
        size: "1.2 GB",
        percent: 40,
        color: "success",
        icon: fileTextIcon,
    },
    {
        name: "Images",
        files: 425,
        size: "3 GB",
        percent: 15,
        color: "info",
        icon: imageIcon,
    },
    {
        name: "Videos",
        files: 102,
        size: "8 GB",
        percent: 60,
        color: "error",
        icon: videoIcon,
    },
    {
        name: "Other",
        files: 256,
        size: "5.5 GB",
        percent: 30,
        color: "warning",
        icon: serverIcon,
    },
];
