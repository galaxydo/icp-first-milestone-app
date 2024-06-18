import { IconifyIcon } from "@iconify/react";

import { IColor } from "@/types/theme";

export type IFileManagerCategoryItem = {
    icon: IconifyIcon;
    name: string;
    files: number;
    size: string;
    color: IColor;
    percent: number;
};
