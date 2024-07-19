import clsx from "clsx";
import { ForwardedRef, ReactElement, SelectHTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

import { ComponentColor, ComponentSize, IComponentBaseProps, ListOrItem } from "../types";
import { SelectOptionProps } from "./SelectOption";

export type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, "size" | "color"> &
    IComponentBaseProps & {
        children: ListOrItem<ReactElement<SelectOptionProps>>;
        size?: ComponentSize;
        color?: ComponentColor;
        bordered?: boolean;
        borderOffset?: boolean;
    };

const SelectInner = (props: SelectProps, ref: ForwardedRef<HTMLSelectElement>): ReactElement => {
    const { children, size, color, bordered = true, borderOffset, dataTheme, className, ...rest } = props;

    const classes = twMerge(
        "select",
        className,
        clsx({
            "select-lg": size === "lg",
            "select-md": size === "md",
            "select-sm": size === "sm",
            "select-xs": size === "xs",
            "select-primary": color === "primary",
            "select-secondary": color === "secondary",
            "select-accent": color === "accent",
            "select-ghost": color === "ghost",
            "select-info": color === "info",
            "select-success": color === "success",
            "select-warning": color === "warning",
            "select-error": color === "error",
            "select-bordered": bordered,
            "focus:outline-offset-0": !borderOffset,
        }),
    );

    return (
        <select {...rest} ref={ref} data-theme={dataTheme} className={classes}>
            {children}
        </select>
    );
};

const Select = forwardRef(SelectInner);
export default Select;
