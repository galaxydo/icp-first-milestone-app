import { ReactElement, forwardRef } from "react";

import { CollapseProps, classesFn } from "./Collapse";

export type CollapseDetailsProps = Omit<
    CollapseProps<HTMLDetailsElement>,
    "checkbox" | "onOpen" | "onClose" | "onToggle"
>;
const CollapseDetails = forwardRef<HTMLDetailsElement, CollapseDetailsProps>(
    ({ children, icon, open, dataTheme, className, ...props }, ref): ReactElement => {
        return (
            <details
                {...props}
                ref={ref}
                data-theme={dataTheme}
                className={classesFn({ className, icon, open })}
                open={open}>
                {children}
            </details>
        );
    },
);

CollapseDetails.displayName = "Collapse Details";

export default CollapseDetails;
