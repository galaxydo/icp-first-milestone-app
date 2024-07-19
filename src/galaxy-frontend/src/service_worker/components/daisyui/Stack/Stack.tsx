import { HTMLAttributes, ReactElement, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

import { IComponentBaseProps } from "../types";

export type StackProps = HTMLAttributes<HTMLDivElement> & IComponentBaseProps;

const Stack = forwardRef<HTMLDivElement, StackProps>(
    ({ dataTheme, className, children, ...props }, ref): ReactElement => {
        const classes = twMerge("stack", className);

        return (
            <div aria-label="Stack" {...props} ref={ref} data-theme={dataTheme} className={classes}>
                {children}
            </div>
        );
    },
);

Stack.displayName = "Stack";

export default Stack;
