import { IconifyIcon } from "@iconify/react";

import { IColor } from "@/types/theme";

export type IFileManagerFolder = {
    name: string;
    files: number;
    icon: IconifyIcon;
    color: IColor;
};
