import clsx from "clsx";
import { HTMLAttributes, ReactElement, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

import { IComponentBaseProps } from "../types";

export type StepsProps = HTMLAttributes<HTMLUListElement> &
    IComponentBaseProps & {
        vertical?: boolean;
        horizontal?: boolean;
    };

const Steps = forwardRef<HTMLUListElement, StepsProps>(
    ({ children, dataTheme, className, vertical, horizontal, ...props }, ref): ReactElement => {
        const classes = twMerge(
            "steps",
            className,
            clsx({
                "steps-vertical": vertical,
                "steps-horizontal": horizontal,
            }),
        );

        return (
            <ul aria-label="Steps" role="group" {...props} data-theme={dataTheme} className={classes} ref={ref}>
                {children}
            </ul>
        );
    },
);

Steps.displayName = "Steps";
export default Steps;
