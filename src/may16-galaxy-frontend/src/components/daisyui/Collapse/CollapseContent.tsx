import { HTMLAttributes, ReactElement } from "react";
import { twMerge } from "tailwind-merge";

import { IComponentBaseProps } from "../types";

export type CollapseContentProps = HTMLAttributes<HTMLDivElement> & IComponentBaseProps;

const CollapseContent = ({ children, className, ...props }: CollapseContentProps): ReactElement => {
    const classes = twMerge("collapse-content", className);

    return (
        <div {...props} className={classes}>
            {children}
        </div>
    );
};

export default CollapseContent;
