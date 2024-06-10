import clsx from "clsx";
import { HTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

import { IComponentBaseProps } from "../types";

export type FooterProps = HTMLAttributes<HTMLDivElement> &
    IComponentBaseProps & {
        center?: boolean;
    };

const Footer = forwardRef<HTMLDivElement, FooterProps>(({ center, dataTheme, className, ...props }, ref) => {
    const classes = twMerge(
        "footer",
        className,
        clsx({
            "footer-center": center,
        }),
    );

    return <div role="contentinfo" {...props} data-theme={dataTheme} className={classes} ref={ref} />;
});

Footer.displayName = "Footer";

export default Footer;
