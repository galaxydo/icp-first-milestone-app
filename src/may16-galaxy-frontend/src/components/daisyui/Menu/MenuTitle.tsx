import { LiHTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

import { IComponentBaseProps } from "../types";

export type MenuTitleProps = LiHTMLAttributes<HTMLLIElement> & IComponentBaseProps;

const MenuTitle = forwardRef<HTMLLIElement, MenuTitleProps>(({ className, ...props }, ref) => {
    const classes = twMerge("menu-title", className);

    return <li {...props} className={classes} ref={ref} />;
});

MenuTitle.displayName = "Menu Title";

export default MenuTitle;
