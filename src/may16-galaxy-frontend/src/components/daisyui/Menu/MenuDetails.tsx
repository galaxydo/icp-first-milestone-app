import { DetailsHTMLAttributes, ReactNode, forwardRef } from "react";

import { IComponentBaseProps } from "../types";

export type MenuDetailsProps = DetailsHTMLAttributes<HTMLDetailsElement> &
    IComponentBaseProps & {
        label: ReactNode;
        open?: boolean;
    };

const MenuDetails = forwardRef<HTMLDetailsElement, MenuDetailsProps>(
    ({ className, label, open, children, ...props }, ref) => {
        return (
            <details {...props} open={open} className={className} ref={ref}>
                <summary>{label}</summary>
                <ul>{children}</ul>
            </details>
        );
    },
);

MenuDetails.displayName = "Menu Details";

export default MenuDetails;
