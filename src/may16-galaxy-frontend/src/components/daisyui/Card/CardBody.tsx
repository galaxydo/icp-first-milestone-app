import { HTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

import { IComponentBaseProps } from "../types";

export type CardBodyProps = HTMLAttributes<HTMLDivElement> & IComponentBaseProps;

const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(({ className, ...props }, ref) => (
    <div {...props} className={twMerge("card-body", className)} ref={ref} />
));

CardBody.displayName = "Card Body";

export default CardBody;
