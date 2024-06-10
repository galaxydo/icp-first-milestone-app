import folderArchiveIcon from "@iconify/icons-lucide/folder-archive";
import imageIcon from "@iconify/icons-lucide/image";
import musicIcon from "@iconify/icons-lucide/music";
import shieldCheckIcon from "@iconify/icons-lucide/shield-check";
import videoIcon from "@iconify/icons-lucide/video";

import { IFileManagerFolder } from "@/types/apps/file-manager";

export const getFileManagerFolderData: IFileManagerFolder[] = [
    {
        name: "My Images",
        icon: imageIcon,
        color: "primary",
        files: 450,
    },
    {
        name: "Archive",
        icon: folderArchiveIcon,
        color: "success",
        files: 54,
    },
    {
        name: "Music",
        icon: musicIcon,
        color: "warning",
        files: 874,
    },
    {
        name: "Videos",
        icon: videoIcon,
        color: "info",
        files: 125,
    },
    {
        name: "Private",
        icon: shieldCheckIcon,
        color: "error",
        files: 8,
    },
];
