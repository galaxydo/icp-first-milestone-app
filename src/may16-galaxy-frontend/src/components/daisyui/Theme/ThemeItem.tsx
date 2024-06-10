import clsx from "clsx";
import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export type ThemeItemProps = HTMLAttributes<HTMLDivElement> & {
    dataTheme: string;
    selected?: boolean;
};

const ThemeItem = ({ selected, children, dataTheme, className, ...props }: ThemeItemProps) => {
    const classes = twMerge(
        className,
        "border-base-content/20 hover:border-base-content/40 outline-base-content\
        overflow-hidden rounded-lg border outline-2 outline-offset-2",
        clsx({
            outline: selected,
        }),
    );

    return (
        <div {...props} data-theme={dataTheme} className={classes}>
            <div className="w-full cursor-pointer bg-base-100 text-base-content">
                <div className="grid grid-cols-5 grid-rows-3">
                    <div className="col-start-1 row-span-2 row-start-1 bg-base-200" />
                    <div className="col-start-1 row-start-3 bg-base-300" />
                    <div className="col-span-4 col-start-2 row-span-3 row-start-1 flex flex-col gap-1 bg-base-100 p-2">
                        <div className="font-bold">{dataTheme}</div>
                        <div className="flex flex-wrap gap-1">
                            <div className="flex aspect-square w-5 items-center justify-center rounded bg-primary lg:w-6">
                                <div className="text-sm font-bold text-primary-content">A</div>
                            </div>

                            <div className="flex aspect-square w-5 items-center justify-center rounded bg-secondary lg:w-6">
                                <div className="text-sm font-bold text-primary-content">A</div>
                            </div>

                            <div className="flex aspect-square w-5 items-center justify-center rounded bg-accent lg:w-6">
                                <div className="text-sm font-bold text-primary-content">A</div>
                            </div>

                            <div className="flex aspect-square w-5 items-center justify-center rounded bg-neutral lg:w-6">
                                <div className="text-sm font-bold text-primary-content">A</div>
                            </div>
                        </div>
                        {children && <div className="my-2">{children}</div>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ThemeItem;
