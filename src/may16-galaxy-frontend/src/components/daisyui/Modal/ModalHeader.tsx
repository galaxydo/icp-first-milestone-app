import { HTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export type ModalHeaderProps = HTMLAttributes<HTMLDivElement>;

const ModalHeader = forwardRef<HTMLDivElement, ModalHeaderProps>(({ children, className, ...props }, ref) => {
    const classes = twMerge("w-full mb-8 text-xl", className);
    return (
        <div {...props} className={classes} ref={ref}>
            {children}
        </div>
    );
});

ModalHeader.displayName = "ModalHeader";

export default ModalHeader;
