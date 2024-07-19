import { HTMLAttributes, ReactElement, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export type BottomNavigationLabelProps = HTMLAttributes<HTMLSpanElement>;

const BottomNavigationLabel = forwardRef<HTMLSpanElement, BottomNavigationLabelProps>(
    ({ children, className, ...props }, ref): ReactElement => {
        const classes = twMerge("btm-nav-label", className);
        return (
            <span {...props} className={classes} ref={ref}>
                {children}
            </span>
        );
    },
);

BottomNavigationLabel.displayName = "Bottom Navigation Label";

export default BottomNavigationLabel;
