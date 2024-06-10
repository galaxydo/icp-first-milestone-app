import { HTMLAttributes, forwardRef } from "react";

type IConnectType = "both" | "start" | "end";
export type TimelineItemProps = HTMLAttributes<HTMLLIElement> & {
    connect?: IConnectType;
    startClassName?: string;
    endClassName?: string;
};

const TimelineItem = forwardRef<HTMLLIElement, TimelineItemProps>(
    ({ children, className, connect, startClassName, endClassName, ...props }, ref) => {
        return (
            <li {...props} className={className} ref={ref}>
                {(connect === "both" || connect === "start") && <hr className={startClassName} />}
                {children}
                {(connect === "both" || connect === "end") && <hr className={endClassName} />}
            </li>
        );
    },
);

TimelineItem.displayName = "TimelineItem";
export default TimelineItem;
