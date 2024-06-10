import { ReactElement, forwardRef } from "react";

import { Button, ButtonProps } from "../Button";

export type DropdownSummaryProps = Omit<ButtonProps, "tag">;
export const DropdownSummary = forwardRef<HTMLElement, DropdownSummaryProps>((props, ref): ReactElement => {
    // @ts-ignore
    return <Button {...props} ref={ref} tag="summary" />;
});

DropdownSummary.displayName = "Dropdown Summary";

export default DropdownSummary;
