import clsx from "clsx";
import { InputHTMLAttributes, ReactElement, forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { twMerge } from "tailwind-merge";

import { ComponentColor, ComponentSize, IComponentBaseProps } from "../types";

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> &
    IComponentBaseProps & {
        color?: Exclude<ComponentColor, "ghost">;
        size?: ComponentSize;
        indeterminate?: boolean;
    };

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
    ({ color, size, indeterminate, dataTheme, className, ...props }, ref): ReactElement => {
        const classes = twMerge(
            "checkbox",
            className,
            clsx({
                "checkbox-lg": size === "lg",
                "checkbox-md": size === "md",
                "checkbox-sm": size === "sm",
                "checkbox-xs": size === "xs",
                "checkbox-primary": color === "primary",
                "checkbox-secondary": color === "secondary",
                "checkbox-accent": color === "accent",
                "checkbox-info": color === "info",
                "checkbox-success": color === "success",
                "checkbox-warning": color === "warning",
                "checkbox-error": color === "error",
            }),
        );

        const checkboxRef = useRef<HTMLInputElement>(null);
        useImperativeHandle(ref, () => checkboxRef.current as HTMLInputElement);

        useEffect(() => {
            if (!checkboxRef.current) {
                return;
            }

            checkboxRef.current.indeterminate = !!indeterminate;
        }, [indeterminate]);

        return <input {...props} ref={checkboxRef} type="checkbox" data-theme={dataTheme} className={classes} />;
    },
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
