import dropboxImg from "@/assets/images/apps/files/dropbox.svg";
import googleDriveImg from "@/assets/images/apps/files/google_drive.svg";
import megaImg from "@/assets/images/apps/files/mega.svg";
import oneDriveImg from "@/assets/images/apps/files/one_drive.svg";

import { IFileManagerProviderStat } from "@/types/apps/file-manager";

export const getFileManagerStatData: IFileManagerProviderStat[] = [
    {
        image: oneDriveImg,
        name: "One Drive",
        color: "primary",
        total: 250,
        used: 85,
    },
    { image: googleDriveImg, name: "Google Drive", color: "warning", total: 100, used: 56 },
    {
        image: megaImg,
        name: "Mega",
        color: "error",
        total: 150,
        used: 128,
    },
    { image: dropboxImg, name: "Dropbox", color: "info", total: 40, used: 22 },
];
