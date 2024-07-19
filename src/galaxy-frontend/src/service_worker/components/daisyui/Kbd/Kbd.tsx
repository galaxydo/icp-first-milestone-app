import clsx from "clsx";
import { HTMLAttributes, ReactElement, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

import { ComponentSize, IComponentBaseProps } from "../types";

export type KbdProps = HTMLAttributes<HTMLElement> &
    IComponentBaseProps & {
        size?: ComponentSize;
    };

const Kbd = forwardRef<HTMLElement, KbdProps>(
    ({ children, size, dataTheme, className, ...props }, ref): ReactElement => {
        const classes = twMerge(
            "kbd",
            className,
            clsx({
                "kbd-lg": size === "lg",
                "kbd-md": size === "md",
                "kbd-sm": size === "sm",
                "kbd-xs": size === "xs",
            }),
        );

        return (
            <kbd {...props} data-theme={dataTheme} className={classes} ref={ref}>
                {children}
            </kbd>
        );
    },
);

Kbd.displayName = "Kbd";

export default Kbd;
