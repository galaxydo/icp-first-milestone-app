import clsx from "clsx";
import { InputHTMLAttributes, ReactElement, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

import { ComponentColor, ComponentSize, IComponentBaseProps } from "../types";

export type RadioProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> &
    IComponentBaseProps & {
        color?: ComponentColor;
        size?: ComponentSize;
    };

const Radio = forwardRef<HTMLInputElement, RadioProps>(
    ({ color, size, name, dataTheme, className, ...props }, ref): ReactElement => {
        const classes = twMerge(
            "radio",
            className,
            clsx({
                "radio-lg": size === "lg",
                "radio-md": size === "md",
                "radio-sm": size === "sm",
                "radio-xs": size === "xs",
                "radio-primary": color === "primary",
                "radio-secondary": color === "secondary",
                "radio-accent": color === "accent",
                "radio-info": color === "info",
                "radio-success": color === "success",
                "radio-warning": color === "warning",
                "radio-error": color === "error",
            }),
        );

        return <input {...props} ref={ref} type="radio" name={name} data-theme={dataTheme} className={classes} />;
    },
);

Radio.displayName = "Radio";

export default Radio;
