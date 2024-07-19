import { ElementType, HTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

import { IComponentBaseProps } from "../types";

export type CardTitleProps = HTMLAttributes<HTMLDivElement> &
    IComponentBaseProps & {
        tag?: ElementType;
    };

const CardTitle = forwardRef<HTMLElement, CardTitleProps>(({ className, tag = "div", ...props }, ref) => {
    const Tag = tag;

    return <Tag {...props} className={twMerge("card-title", className)} ref={ref} />;
});

CardTitle.displayName = "Card title";

export default CardTitle;
