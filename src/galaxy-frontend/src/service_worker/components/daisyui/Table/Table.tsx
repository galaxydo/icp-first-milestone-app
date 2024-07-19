import clsx from "clsx";
import { ReactElement, TableHTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

import { ComponentSize, IComponentBaseProps } from "../types";

export type TableProps = TableHTMLAttributes<HTMLTableElement> &
    IComponentBaseProps & {
        size?: ComponentSize;
        zebra?: boolean;
        pinRows?: boolean;
        pinCols?: boolean;
    };

const Table = forwardRef<HTMLTableElement, TableProps>(
    ({ children, size, zebra, pinRows, pinCols, dataTheme, className, ...props }, ref): ReactElement => {
        const classes = twMerge(
            "table",
            className,
            clsx({
                "table-zebra": zebra,
                "table-lg": size === "lg",
                "table-md": size === "md",
                "table-sm": size === "sm",
                "table-xs": size === "xs",
                "table-pin-rows": pinRows,
                "table-pin-cols": pinCols,
            }),
        );

        return (
            <table {...props} data-theme={dataTheme} className={classes} ref={ref}>
                {children}
            </table>
        );
    },
);

Table.displayName = "Table";

export default Table;
