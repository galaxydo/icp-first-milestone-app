import { LabelHTMLAttributes, ReactElement, forwardRef } from "react";

import { cn } from "@/helpers/utils/cn";

import { IComponentBaseProps } from "../types";

export type FormLabelProps = LabelHTMLAttributes<HTMLLabelElement> &
    IComponentBaseProps & {
        title?: string;
        hidden?: boolean;
    };

const FormLabel = forwardRef<HTMLLabelElement, FormLabelProps>(
    ({ children, title, dataTheme, hidden, className, ...props }, ref): ReactElement => {
        const classes = cn(
            "label",
            {
                hidden: hidden,
            },
            className,
        );

        return (
            <label {...props} className={classes}>
                <span className="label-text cursor-pointer" ref={ref}>
                    {title}
                </span>
                {children}
            </label>
        );
    },
);

FormLabel.displayName = "Form Label";

export default FormLabel;
