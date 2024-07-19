import { LiHTMLAttributes, ReactElement, forwardRef } from "react";

export type BreadcrumbsItemProps = LiHTMLAttributes<HTMLLIElement> & {
    href?: string;
};

const BreadcrumbsItem = forwardRef<HTMLLIElement, BreadcrumbsItemProps>(
    ({ children, href, ...props }, ref): ReactElement => {
        return (
            <li {...props} ref={ref}>
                {href ? <a href={href}>{children}</a> : <>{children}</>}
            </li>
        );
    },
);

BreadcrumbsItem.displayName = "Breadcrumbs Item";

export default BreadcrumbsItem;
