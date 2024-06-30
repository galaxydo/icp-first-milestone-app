import { Progress } from "@/components/daisyui";

import Icon from "@/components/Icon";
import { cn } from "@/utils/cn";
import { IFileManagerCategoryItem } from "@/types/apps/file-manager";

import { useFileManager, useFileManagerHook } from "@/hooks/use-file-manager";

const SingleCategory = ({ category }: { category: IFileManagerCategoryItem }) => {
    const { icon, name, color, size, percent, files } = category;

    return (
        <div className="rounded-box border border-base-content/10 p-3 py-2">
            <div className="flex items-center gap-3">
                <div className={cn(`rounded bg-base-content/10 p-2 bg-${color} bg-opacity-5 text-${color}`)}>
                    <Icon icon={icon} fontSize={16} />
                </div>
                <div className="grow">
                    <p className="text-sm font-medium">{name}</p>
                    <p className="text-xs text-base-content/80">{files} files</p>
                </div>
                <span className="font-semibold">{size}</span>
            </div>

            <Progress className="h-1 bg-base-content/10" color={color} max={100} value={percent} />
        </div>
    );
};

export const Usages = () => {
    const { categories } = useFileManagerHook();
    return (
        <div className="space-y-4">
            {categories.map((category, index) => (
                <SingleCategory category={category} key={index} />
            ))}
        </div>
    );
};
