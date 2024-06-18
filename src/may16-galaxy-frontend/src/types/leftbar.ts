import { IconifyIcon } from "@iconify/react";

export type IMenuItem = {
    key: string;
    icon?: IconifyIcon;
    label: string;
    isTitle?: boolean;
    url?: string;
    children?: IMenuItem[];
};
