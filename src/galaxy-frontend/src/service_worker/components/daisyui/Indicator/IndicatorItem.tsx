import clsx from "clsx";
import { HTMLAttributes, ReactElement, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

import { IComponentBaseProps } from "../types";

export type IndicatorItemProps = HTMLAttributes<HTMLDivElement> &
    IComponentBaseProps & {
        horizontal?: "start" | "center" | "end";
        vertical?: "top" | "middle" | "bottom";
    };
const classesFn = ({
    className,
    horizontal,
    vertical,
}: Pick<IndicatorItemProps, "className" | "horizontal" | "vertical"> = {}) =>
    twMerge(
        "indicator-item",
        className,
        clsx({
            "indicator-start": horizontal === "start",
            "indicator-center": horizontal === "center",
            "indicator-end": horizontal === "end",
            "indicator-top": vertical === "top",
            "indicator-middle": vertical === "middle",
            "indicator-bottom": vertical === "bottom",
        }),
    );

const IndicatorItem = forwardRef<HTMLDivElement, IndicatorItemProps>(
    ({ children, horizontal = "end", vertical = "top", dataTheme, className, ...props }, ref): ReactElement => {
        return (
            <div aria-label="Indicator" {...props} className={classesFn({ className, horizontal, vertical })} ref={ref}>
                {children}
            </div>
        );
    },
);
IndicatorItem.displayName = "Indicator Item";

export default Object.assign(IndicatorItem, { className: classesFn });
