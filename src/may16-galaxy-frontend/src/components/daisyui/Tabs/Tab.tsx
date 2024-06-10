import clsx from "clsx";
import { AnchorHTMLAttributes, ReactElement, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export type TabProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
    active?: boolean;
    disabled?: boolean;
};

const Tab = forwardRef<HTMLAnchorElement, TabProps>(
    ({ children, className, active, disabled, ...props }, ref): ReactElement => {
        const classes = twMerge(
            "tab",
            className,
            clsx({
                "tab-active": active,
                "tab-disabled": disabled,
            }),
        );
        return (
            <a role="tab" {...props} ref={ref} className={classes}>
                {children}
            </a>
        );
    },
);

Tab.displayName = "Tab";

export default Tab;
