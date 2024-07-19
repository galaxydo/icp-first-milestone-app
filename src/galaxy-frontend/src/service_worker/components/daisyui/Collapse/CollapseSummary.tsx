import { ReactElement, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

import { CollapseTitleProps } from "./CollapseTitle";

const classesFn = ({ className }: Pick<CollapseTitleProps, "className">) => twMerge("collapse-title", className);

export type CollapseSummaryProps = CollapseTitleProps<HTMLElement>;
export const CollapseSummary = forwardRef<HTMLElement, CollapseSummaryProps>(
    ({ children, className }, ref): ReactElement => {
        return (
            <summary ref={ref} className={classesFn({ className })}>
                {children}
            </summary>
        );
    },
);

CollapseSummary.displayName = "Collapse Summary";

export default CollapseSummary;
