import clsx from "clsx";
import { HTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

import { ComponentSize, IComponentBaseProps } from "../types";
import { MenuDetailsProps as DetailsProps } from "./MenuDetails";
import { MenuDropdownProps as DropdownProps } from "./MenuDropdown";
import { MenuItemProps as ItemProps } from "./MenuItem";
import { MenuTitleProps as TitleProps } from "./MenuTitle";

export type MenuTitleProps = TitleProps;
export type MenuItemProps = ItemProps;
export type MenuDropdownProps = DropdownProps;
export type MenuDetailsProps = DetailsProps;

export type MenuProps = HTMLAttributes<HTMLUListElement> &
    IComponentBaseProps & {
        vertical?: boolean; // Vertical menu (default)
        horizontal?: boolean; // Horizontal menu
        responsive?: boolean;
        size?: ComponentSize;
    };

const Menu = forwardRef<HTMLUListElement, MenuProps>(
    ({ responsive, horizontal, vertical, dataTheme, className, size, ...props }, ref) => {
        const classes = twMerge(
            "menu",
            className,
            clsx({
                "menu-vertical lg:menu-horizontal": responsive,
                "menu-lg": size === "lg",
                "menu-md": size === "md",
                "menu-sm": size === "sm",
                "menu-xs": size === "xs",
                "menu-vertical": vertical,
                "menu-horizontal": horizontal,
            }),
        );

        return <ul data-theme={dataTheme} className={classes} {...props} ref={ref} />;
    },
);

Menu.displayName = "Menu";

export default Menu;
