import { HTMLAttributes, ReactElement } from "react";
import { twMerge } from "tailwind-merge";

import { IComponentBaseProps } from "../types";

export type CollapseTitleProps<T extends HTMLElement = HTMLDivElement> = HTMLAttributes<T> & IComponentBaseProps;

const classesFn = ({ className }: Pick<CollapseTitleProps, "className">) => twMerge("collapse-title", className);

const CollapseTitle = ({ children, className, ...props }: CollapseTitleProps): ReactElement => {
    return (
        <div {...props} className={classesFn({ className })}>
            {children}
        </div>
    );
};

export default CollapseTitle;
