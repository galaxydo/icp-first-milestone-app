import { HTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export type FooterTitleProps = HTMLAttributes<HTMLSpanElement>;

const FooterTitle = forwardRef<HTMLSpanElement, FooterTitleProps>(({ className, ...props }, ref) => {
    const classes = twMerge("footer-title", className);

    return <span {...props} className={classes} ref={ref} />;
});

FooterTitle.displayName = "Footer Title";

export default FooterTitle;
