import { ReactElement, ReactNode, TableHTMLAttributes, forwardRef } from "react";

export type TableHeadProps = TableHTMLAttributes<HTMLTableSectionElement> & {
    children?: ReactNode[];
};

const TableHead = forwardRef<HTMLTableSectionElement, TableHeadProps>(({ children, ...props }, ref): ReactElement => {
    return (
        <thead {...props} ref={ref}>
            <tr>
                {children?.map((child, i) => {
                    return <th key={i}>{child}</th>;
                })}
            </tr>
        </thead>
    );
});

TableHead.displayName = "Table Head";

export default TableHead;
