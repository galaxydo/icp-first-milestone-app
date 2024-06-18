import airplayIcon from "@iconify/icons-lucide/airplay";
import bookOpenTextIcon from "@iconify/icons-lucide/book-open-text";
import fileIcon from "@iconify/icons-lucide/file";
import fileTextIcon from "@iconify/icons-lucide/file-text";
import messagesSquareIcon from "@iconify/icons-lucide/messages-square";
import packageIcon from "@iconify/icons-lucide/package";
import serverIcon from "@iconify/icons-lucide/server";
import shieldCheckIcon from "@iconify/icons-lucide/shield-check";

import routes from "@/services/routes";
import { IMenuItem } from "@/types/layout/admin";

export const menuItems: IMenuItem[] = [
  {
    key: "First",
    label: "Storage",
    isTitle: true,
  },
  {
    key: "storage-images",
    label: "My Images",
    url: "/",
    icon: serverIcon,
  },
  {
    key: "my-whiteboards",
    label: "My Collections",
    children: []
  },
  {
    key: "Second",
    label: "Whiteboards",
    isTitle: true,
  },
  {
    key: "default-canvas",
    label: "My Canvas",
    url: "/canvas",
    icon: fileTextIcon,
  },
  {
    key: "my-whiteboards",
    label: "My Layouts",
    children: []
  },
];
