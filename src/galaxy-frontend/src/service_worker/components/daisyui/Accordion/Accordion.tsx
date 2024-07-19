import clsx from "clsx";
import { HTMLAttributes, ReactElement, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

import { IComponentBaseProps } from "../types";

export type AccordionProps = Omit<HTMLAttributes<HTMLInputElement>, "type"> &
    IComponentBaseProps & {
        name?: string;
        icon?: "arrow" | "plus";
    };

const Accordion = forwardRef<HTMLInputElement, AccordionProps>(
    ({ name = "accordion", icon, dataTheme, className, children, ...props }, ref): ReactElement => {
        const classes = twMerge(
            "collapse",
            clsx({
                "collapse-arrow": icon === "arrow",
                "collapse-plus": icon === "plus",
            }),
            className,
        );

        return (
            <div data-theme={dataTheme} className={classes}>
                <input {...props} ref={ref} type="radio" aria-label="Accordion radio" name={name} />
                {children}
            </div>
        );
    },
);

Accordion.displayName = "Accordion";

export default Accordion;
