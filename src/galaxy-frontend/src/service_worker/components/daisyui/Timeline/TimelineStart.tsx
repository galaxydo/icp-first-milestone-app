import clsx from "clsx";
import { HTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export type TimelineStartProps = HTMLAttributes<HTMLDivElement> & {
    box?: boolean;
};

const TimelineStart = forwardRef<HTMLDivElement, TimelineStartProps>(({ children, className, box, ...props }, ref) => {
    const classes = twMerge(
        "timeline-start",
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
});

TimelineStart.displayName = "TimelineStart";
export default TimelineStart;
