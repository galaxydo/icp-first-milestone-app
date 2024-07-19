import clsx from "clsx";
import { HTMLAttributes, ReactElement, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

import { IComponentBaseProps } from "../types";

export type StatsProps = HTMLAttributes<HTMLDivElement> &
    IComponentBaseProps & {
        direction?: "horizontal" | "vertical";
    };

const Stats = forwardRef<HTMLDivElement, StatsProps>(
    ({ direction = "horizontal", dataTheme, className, children, ...props }, ref): ReactElement => {
        const classes = twMerge(
            "stats",
            className,
            clsx({
                "stats-vertical": direction === "vertical",
                "stats-horizontal": direction === "horizontal",
            }),
        );

        return (
            <div {...props} ref={ref} data-theme={dataTheme} className={classes}>
                {children}
            </div>
        );
    },
);

Stats.displayName = "Stats";

export default Stats;
