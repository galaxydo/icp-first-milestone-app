import figmaIcon from "@iconify/icons-lucide/figma";
import fileSpreadsheetIcon from "@iconify/icons-lucide/file-spreadsheet";
import fileTextIcon from "@iconify/icons-lucide/file-text";
import messageCircleDashedIcon from "@iconify/icons-lucide/message-circle";
import musicIcon from "@iconify/icons-lucide/music";
import videoIcon from "@iconify/icons-lucide/video";

import DateUtil from "@/helpers/utils/date";
import { IFileManagerFile } from "@/types/apps/file-manager";

export const getFileManagerFileData: IFileManagerFile[] = [
    {
        name: "Latest Video",
        icon: videoIcon,
        size: 5478512354,
        last_modified_at: DateUtil.minusDays(1),
        owner_name: "Denish Navadiya",
        shared_with: 3,
    },
    {
        name: "Company Documents",
        icon: fileTextIcon,
        size: 8178510,
        last_modified_at: DateUtil.minusDays(2),
        owner_name: "Company",
        shared_with: "private",
    },
    {
        name: "Figma Design",
        icon: figmaIcon,
        size: 1478510,
        last_modified_at: DateUtil.minusDays(4),
        owner_name: "Turkes Duis",
        shared_with: 7,
    },
    {
        name: "Top Music",
        icon: musicIcon,
        size: 5047851,
        last_modified_at: DateUtil.minusDays(8),
        owner_name: "Me",
        shared_with: "public",
    },
    {
        name: "Office Sheet",
        icon: fileSpreadsheetIcon,
        size: 57840,
        last_modified_at: DateUtil.minusDays(16),
        owner_name: "Mr. Boss",
        shared_with: 3,
    },
    {
        name: "Chat Backup",
        icon: messageCircleDashedIcon,
        size: 257840,
        last_modified_at: DateUtil.minusDays(20),
        owner_name: "Denish Navadiya",
        shared_with: "private",
    },
];
