import { ReactElement, TableHTMLAttributes, forwardRef } from "react";

export type TableBodyProps = TableHTMLAttributes<HTMLTableSectionElement>;

const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(({ children, ...props }, ref): ReactElement => {
    return (
        <tbody {...props} ref={ref}>
            {children}
        </tbody>
    );
});

TableBody.displayName = "TableBody";

export default TableBody;
