import clsx from "clsx";
import { LiHTMLAttributes, ReactElement, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

import { ComponentColor, IComponentBaseProps } from "../types";

export type StepProps = Omit<LiHTMLAttributes<HTMLLIElement>, "value" | "color"> &
    IComponentBaseProps & {
        value?: string;
        color?: "neutral" | ComponentColor;
    };

const Step = forwardRef<HTMLLIElement, StepProps>(
    ({ children, value, color, dataTheme, className, ...props }, ref): ReactElement => {
        const classes = twMerge(
            "step",
            className,
            clsx({
                "step-primary": color === "primary",
                "step-secondary": color === "secondary",
                "step-accent": color === "accent",
                "step-info": color === "info",
                "step-success": color === "success",
                "step-warning": color === "warning",
                "step-error": color === "error",
            }),
        );

        return (
            <li aria-label="Step" {...props} data-theme={dataTheme} data-content={value} className={classes} ref={ref}>
                {children}
            </li>
        );
    },
);

Step.displayName = "Step";

export default Step;
