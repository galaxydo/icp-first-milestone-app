import clsx from "clsx";
import { HTMLAttributes, ReactElement, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

import { ComponentColor, ComponentPosition, IComponentBaseProps } from "../types";

export type TooltipProps = Omit<HTMLAttributes<HTMLDivElement>, "color"> &
    IComponentBaseProps & {
        message: string;
        open?: boolean;
        color?: ComponentColor;
        position?: ComponentPosition;
    };

const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
    ({ message, children, open, color, position, dataTheme, className, ...props }, ref): ReactElement => {
        const classes = twMerge(
            "tooltip",
            className,
            clsx({
                "tooltip-open": open,
                "tooltip-primary": color === "primary",
                "tooltip-secondary": color === "secondary",
                "tooltip-accent": color === "accent",
                "tooltip-info": color === "info",
                "tooltip-success": color === "success",
                "tooltip-warning": color === "warning",
                "tooltip-error": color === "error",
                "tooltip-top": position === "top",
                "tooltip-bottom": position === "bottom",
                "tooltip-left": position === "left",
                "tooltip-right": position === "right",
            }),
        );

        return (
            <div role="tooltip" {...props} ref={ref} data-theme={dataTheme} data-tip={message} className={classes}>
                {children}
            </div>
        );
    },
);

Tooltip.displayName = "Tooltip";

export default Tooltip;
