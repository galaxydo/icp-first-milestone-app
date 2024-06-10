import { HTMLAttributes, ReactElement, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

import { IComponentBaseProps } from "../types";
import NavbarSection, { NavbarSectionProps } from "./NavbarSection";

export type NavbarProps = HTMLAttributes<HTMLDivElement> & IComponentBaseProps;

const Navbar = forwardRef<HTMLDivElement, NavbarProps>(
    ({ children, dataTheme, className, ...props }, ref): ReactElement => {
        const classes = twMerge("navbar", className);

        return (
            <div role="navigation" aria-label="Navbar" {...props} data-theme={dataTheme} className={classes} ref={ref}>
                {children}
            </div>
        );
    },
);

const NavbarStart = forwardRef<HTMLDivElement, Omit<NavbarSectionProps, "section">>((props, ref) => (
    <NavbarSection {...props} section="start" ref={ref} />
));

const NavbarCenter = forwardRef<HTMLDivElement, Omit<NavbarSectionProps, "section">>((props, ref) => (
    <NavbarSection {...props} section="center" ref={ref} />
));

const NavbarEnd = forwardRef<HTMLDivElement, Omit<NavbarSectionProps, "section">>((props, ref) => (
    <NavbarSection {...props} section="end" ref={ref} />
));

Navbar.displayName = "Navbar";
NavbarStart.displayName = "Navbar Start";
NavbarCenter.displayName = "Navbar Center";
NavbarEnd.displayName = "Navbar End";

export default Navbar;

export { NavbarStart, NavbarCenter, NavbarEnd };
