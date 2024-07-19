import { ReactElement, TableHTMLAttributes, forwardRef } from "react";

import { IComponentBaseProps } from "../types";

export type TableFooterProps = TableHTMLAttributes<HTMLTableSectionElement> &
    IComponentBaseProps & {
        children?: ReactElement[];
    };

const TableFooter = forwardRef<HTMLTableSectionElement, TableFooterProps>(
    ({ children, ...props }, ref): ReactElement => {
        return (
            <tfoot {...props} ref={ref}>
                <tr>
                    {children?.map((child, i) => {
                        return <th key={i}>{child}</th>;
                    })}
                </tr>
            </tfoot>
        );
    },
);

TableFooter.displayName = "Table Footer";

export default TableFooter;
