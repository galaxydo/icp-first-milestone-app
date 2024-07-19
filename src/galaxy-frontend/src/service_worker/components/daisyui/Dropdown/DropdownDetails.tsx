import { ReactElement, forwardRef } from "react";

import { DropdownProps, classesFn } from "./Dropdown";

export type DropdownDetailsProps = Omit<DropdownProps<HTMLDetailsElement>, "item" | "hover">;
const DropdownDetails = forwardRef<HTMLDetailsElement, DropdownDetailsProps>(
    ({ children, className, horizontal, vertical, end, dataTheme, open, ...props }, ref): ReactElement => {
        return (
            <details
                role="listbox"
                {...props}
                ref={ref}
                data-theme={dataTheme}
                className={classesFn({
                    className,
                    horizontal,
                    vertical,
                    open,
                    end,
                })}
                open={open}>
                {children}
            </details>
        );
    },
);

DropdownDetails.displayName = "Dropdown Details";

export default DropdownDetails;
