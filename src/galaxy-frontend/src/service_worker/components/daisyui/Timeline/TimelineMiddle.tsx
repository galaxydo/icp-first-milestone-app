import { HTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export type TimelineMiddleProps = HTMLAttributes<HTMLDivElement> & {};

const TimelineMiddle = forwardRef<HTMLDivElement, TimelineMiddleProps>(
    (
        {
            children = (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                    <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clipRule="evenodd"
                    />
                </svg>
            ),
            className,
            ...props
        },
        ref,
    ) => {
        const classes = twMerge("timeline-middle", className);
        return (
            <div {...props} className={classes} ref={ref}>
                {children}
            </div>
        );
    },
);

TimelineMiddle.displayName = "Timeline Middle";
export default TimelineMiddle;
