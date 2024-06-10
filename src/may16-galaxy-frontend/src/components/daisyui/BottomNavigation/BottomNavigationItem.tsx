import clsx from "clsx";
import { ButtonHTMLAttributes, ReactElement, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

import { ComponentBrandColors, ComponentStatus, IComponentBaseProps } from "../types";

export type BottomNavigationItemProps = ButtonHTMLAttributes<HTMLButtonElement> &
    IComponentBaseProps & {
        color?: ComponentBrandColors | ComponentStatus;
        active?: boolean;
    };

const BottomNavigationItem = forwardRef<HTMLButtonElement, BottomNavigationItemProps>(
    ({ children, className, color, dataTheme, active, disabled, ...props }, ref): ReactElement => {
        const classes = twMerge(
            className,
            clsx({
                "text-neutral": color === "neutral",
                "text-primary": color === "primary",
                "text-secondary": color === "secondary",
                "text-accent": color === "accent",
                "text-info": color === "info",
                "text-success": color === "success",
                "text-warning": color === "warning",
                "text-error": color === "error",
                active: active,
                disabled: disabled,
            }),
        );
        return (
            <button {...props} className={classes} data-theme={dataTheme} ref={ref}>
                {children}
            </button>
        );
    },
);

BottomNavigationItem.displayName = "Bottom Navigation Item";

export default BottomNavigationItem;
