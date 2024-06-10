import { IMenuItem } from "@/types/layout/admin";

const findItem = (menuItems: IMenuItem[], url: string): IMenuItem | null => {
    for (const item of menuItems) {
        if (item.url == url) {
            return item;
        }
        if (item.children) {
            const fItem = findItem(item.children, url);
            if (fItem) {
                return fItem;
            }
        }
    }
    return null;
};

export const getActivatedLeftbarParentKeys = (menuItems: IMenuItem[], url: string): string[] => {
    const menuItem = findItem(menuItems, url);
    if (!menuItem) return [];

    for (const item of menuItems) {
        if (item.key == menuItem.key) {
            return [item.key];
        }

        if (item.children) {
            for (const iItem of item.children) {
                if (iItem.key == menuItem.key) {
                    return [item.key, iItem.key];
                }
            }
        }
    }
    return [];
};
