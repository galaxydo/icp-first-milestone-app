import clsx from "clsx";
import { HTMLAttributes, ReactElement, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

import { ComponentColor, IComponentBaseProps } from "../types";

export type DividerProps = Omit<HTMLAttributes<HTMLDivElement>, "color"> &
    IComponentBaseProps & {
        vertical?: boolean;
        horizontal?: boolean;
        responsive?: boolean;
        start?: boolean;
        end?: boolean;
        color?: Exclude<ComponentColor, "ghost">;
    };

const Divider = forwardRef<HTMLDivElement, DividerProps>(
    (
        { children, vertical, horizontal, responsive, color, start, end, dataTheme, className, ...props },
        ref,
    ): ReactElement => {
        const classes = twMerge(
            "divider",
            className,
            clsx({
                "divider-vertical": vertical,
                "divider-horizontal": horizontal,
                "lg:divider-horizontal": responsive,
                "divider-neutral": color === "neutral",
                "divider-primary": color === "primary",
                "divider-secondary": color === "secondary",
                "divider-accent": color === "accent",
                "divider-warning": color === "warning",
                "divider-info": color === "info",
                "divider-error": color === "error",
                "divider-start": start,
                "divider-end": end,
            }),
        );

        return (
            <div role="separator" {...props} data-theme={dataTheme} className={classes} ref={ref}>
                {children}
            </div>
        );
    },
);
Divider.displayName = "Divider";

export default Divider;
