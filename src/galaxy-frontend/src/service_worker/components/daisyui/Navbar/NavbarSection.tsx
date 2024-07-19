import clsx from "clsx";
import { ReactElement, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

import { NavbarProps } from "./Navbar";

export type NavbarSectionProps = NavbarProps & {
    section: "start" | "center" | "end";
};

const NavbarSection = forwardRef<HTMLDivElement, NavbarSectionProps>(
    ({ children, section, dataTheme, className, style }, ref): ReactElement => {
        const classes = twMerge(
            className,
            clsx({
                "navbar-start": section === "start",
                "navbar-center": section === "center",
                "navbar-end": section === "end",
            }),
        );

        return (
            <div data-theme={dataTheme} className={classes} style={style} ref={ref}>
                {children}
            </div>
        );
    },
);

NavbarSection.displayName = "Navbar Section";

export default NavbarSection;
