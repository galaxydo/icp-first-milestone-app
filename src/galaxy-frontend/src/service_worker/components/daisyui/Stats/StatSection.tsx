import clsx from "clsx";
import { HTMLAttributes, ReactElement, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

import { IComponentBaseProps } from "../types";

export type StatSectionProps = HTMLAttributes<HTMLDivElement> &
    IComponentBaseProps & {
        section: "title" | "value" | "desc" | "figure" | "actions";
    };

const StatSection = forwardRef<HTMLDivElement, StatSectionProps>(
    ({ children, section, className, ...props }, ref): ReactElement => {
        const classes = twMerge(
            className,
            clsx({
                "stat-title": section === "title",
                "stat-value": section === "value",
                "stat-desc": section === "desc",
                "stat-figure": section === "figure",
                "stat-actions": section === "actions",
            }),
        );

        return (
            <div {...props} className={classes} ref={ref}>
                {children}
            </div>
        );
    },
);

StatSection.displayName = "Stat Section";

export default StatSection;
