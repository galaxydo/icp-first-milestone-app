import clsx from "clsx";
import { LiHTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

import { IComponentBaseProps } from "../types";

export type MenuItemProps = LiHTMLAttributes<HTMLLIElement> &
    IComponentBaseProps & {
        disabled?: boolean;
    };

const MenuItem = forwardRef<HTMLLIElement, MenuItemProps>(({ className, disabled, ...props }, ref) => {
    const classes = twMerge(
        className,
        clsx({
            disabled: disabled,
        }),
    );

    return <li className={classes} {...props} ref={ref} />;
});

MenuItem.displayName = "Menu Item";

export default MenuItem;
