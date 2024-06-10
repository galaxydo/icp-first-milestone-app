import clsx from "clsx";
import { HTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export type TimelineEndProps = HTMLAttributes<HTMLDivElement> & {
    box?: boolean;
};

const TimelineEnd = forwardRef<HTMLDivElement, TimelineEndProps>(
    ({ children, className, box = true, ...props }, ref) => {
        const classes = twMerge(
            "timeline-end",
            clsx({
                "timeline-box": box,
            }),
            className,
        );
        return (
            <div {...props} className={classes} ref={ref}>
                {children}
            </div>
        );
    },
);

TimelineEnd.displayName = "TimelineEnd";
export default TimelineEnd;
