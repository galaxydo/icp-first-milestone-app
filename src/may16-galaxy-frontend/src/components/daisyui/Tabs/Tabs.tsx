import clsx from "clsx";
import { HTMLAttributes, ReactElement, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

import { ComponentSize, IComponentBaseProps } from "../types";

export type TabsProps = HTMLAttributes<HTMLDivElement> &
    IComponentBaseProps & {
        variant?: "bordered" | "lifted" | "boxed";
        size?: ComponentSize;
    };

const Tabs = forwardRef<HTMLDivElement, TabsProps>(({ children, className, variant, size }, ref): ReactElement => {
    const classes = twMerge(
        "tabs",
        className,
        clsx({
            "tabs-boxed": variant === "boxed",
            "tabs-bordered": variant === "bordered",
            "tabs-lifted": variant === "lifted",
            "tabs-lg": size === "lg",
            "tabs-md": size === "md",
            "tabs-sm": size === "sm",
            "tabs-xs": size === "xs",
        }),
    );

    return (
        <div role="tablist" className={classes} ref={ref}>
            {children}
        </div>
    );
});

Tabs.displayName = "Tabs";

export default Tabs;
