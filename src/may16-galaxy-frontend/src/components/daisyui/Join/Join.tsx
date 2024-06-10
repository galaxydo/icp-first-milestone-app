import clsx from "clsx";
import { HTMLAttributes, ReactElement, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

import { IComponentBaseProps } from "../types";

export type JoinProps = HTMLAttributes<HTMLDivElement> &
    IComponentBaseProps & {
        responsive?: boolean;
        vertical?: boolean;
        horizontal?: boolean;
    };

const Join = forwardRef<HTMLDivElement, JoinProps>(
    ({ dataTheme, className, children, responsive, vertical, horizontal, ...props }, ref): ReactElement => {
        const classes = twMerge(
            "join",
            clsx({
                "join-vertical": !responsive && vertical,
                "join-horizontal": !responsive && horizontal,
                "join-vertical lg:join-horizontal": responsive,
            }),
            className,
        );

        return (
            <div {...props} data-theme={dataTheme} className={classes} ref={ref}>
                {children}
            </div>
        );
    },
);

Join.displayName = "Join";

export default Join;
