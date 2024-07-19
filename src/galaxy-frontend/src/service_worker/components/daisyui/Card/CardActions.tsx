import { HTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

import { IComponentBaseProps } from "../types";

export type CardActionsProps = HTMLAttributes<HTMLDivElement> & IComponentBaseProps;

const CardActions = forwardRef<HTMLDivElement, CardActionsProps>(({ className, ...props }, ref) => (
    <div {...props} className={twMerge("card-actions", className)} ref={ref} />
));

CardActions.displayName = "Card actions";

export default CardActions;
