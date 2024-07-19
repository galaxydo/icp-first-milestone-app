import { HTMLAttributes, ReactElement, Ref, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

import { IComponentBaseProps } from "../types";
import { BreadcrumbsItemProps } from "./BreadcrumbsItem";

export type BreadcrumbsProps = HTMLAttributes<HTMLDivElement> &
    IComponentBaseProps & {
        children?: ReactElement<BreadcrumbsItemProps> | ReactElement<BreadcrumbsItemProps>[];
        innerRef?: Ref<HTMLUListElement>;
        innerProps?: HTMLAttributes<HTMLUListElement>;
    };

const Breadcrumbs = forwardRef<HTMLDivElement, BreadcrumbsProps>(
    ({ children, dataTheme, className, innerProps, innerRef, ...props }, ref): ReactElement => {
        const classes = twMerge("breadcrumbs", "text-sm", className);

        return (
            <div aria-label="Breadcrumbs" {...props} data-theme={dataTheme} className={classes} ref={ref}>
                <ul {...innerProps} ref={innerRef}>
                    {children}
                </ul>
            </div>
        );
    },
);

Breadcrumbs.displayName = "Breadcrumbs";

export default Breadcrumbs;
