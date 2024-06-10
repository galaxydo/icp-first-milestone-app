import { Card, CardBody, Progress } from "@/components/daisyui";

import { cn } from "@/helpers/utils/cn";
import { StringUtil } from "@/helpers/utils/string";
import { IFileManagerProviderStat } from "@/types/apps/file-manager";

import { useFileManager, useFileManagerHook } from "@/hooks/use-file-manager";

const SingleStat = ({ stat }: { stat: IFileManagerProviderStat }) => {
    const { image, name, total, used, color } = stat;

    return (
        <Card className="cursor-pointer bg-base-100 transition-[transform,border] duration-300 hover:-translate-y-0.5 hover:border-base-content/20">
            <CardBody className="">
                <div className={cn(`bg-${color} inline w-fit rounded bg-opacity-5 p-2`)}>
                    <img src={image} className="size-6" alt="" />
                </div>
                <div className="flex items-center justify-between">
                    <p className="font-medium">{name}</p>
                    <span className="text-sm text-base-content/80">
                        {StringUtil.convertToFixed((used * 100) / total)}%
                    </span>
                </div>
                <Progress max={total} value={used} color={color} className={`h-1.5 bg-base-content/10`} />
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{used} GB</span>
                    <span className="text-xs text-base-content/80">{total} GB</span>
                </div>
            </CardBody>
        </Card>
    );
};

const StorageStat = () => {
    const { stats } = useFileManagerHook();

    return (
        <>
            {stats.map((stat, index) => (
                <SingleStat stat={stat} key={index} />
            ))}
        </>
    );
};

export default StorageStat;
