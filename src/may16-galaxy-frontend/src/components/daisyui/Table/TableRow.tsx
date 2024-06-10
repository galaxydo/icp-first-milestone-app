import clsx from "clsx";
import { ReactElement, TableHTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

import { IComponentBaseProps } from "../types";

export type TableRowProps = TableHTMLAttributes<HTMLTableRowElement> &
    IComponentBaseProps & {
        children?: ReactElement[];
        active?: boolean;
        hover?: boolean;
    };

const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
    ({ children, active, hover, className, ...props }, ref): ReactElement => {
        const classes = twMerge(
            className,
            clsx({
                active: active,
                hover: hover,
            }),
        );

        return (
            <tr {...props} className={classes} ref={ref}>
                {children?.map((child, i) => (i < 1 ? <th key={i}>{child}</th> : <td key={i}>{child}</td>))}
            </tr>
        );
    },
);

TableRow.displayName = "Table Row";

export default TableRow;
