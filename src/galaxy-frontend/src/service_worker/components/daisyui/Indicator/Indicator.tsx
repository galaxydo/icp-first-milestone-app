import { HTMLAttributes, ReactElement, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

import { IComponentBaseProps } from "../types";
import { IndicatorItemProps as ItemProps } from "./IndicatorItem";

export type IndicatorItemProps = ItemProps;
export type IndicatorProps = HTMLAttributes<HTMLDivElement> & IComponentBaseProps;

const classesFn = ({ className }: Pick<IndicatorProps, "className"> = {}) => twMerge("indicator", className);

const Indicator = forwardRef<HTMLDivElement, IndicatorProps>(
    ({ children, className, dataTheme, ...props }, ref): ReactElement => {
        return (
            <div {...props} data-theme={dataTheme} className={classesFn({ className })} ref={ref}>
                {children}
            </div>
        );
    },
);

export default Object.assign(Indicator, {
    className: classesFn,
});

Indicator.displayName = "Indicator";
