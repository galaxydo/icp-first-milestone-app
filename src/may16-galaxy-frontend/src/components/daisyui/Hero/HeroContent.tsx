import { HTMLAttributes, ReactElement, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

import { IComponentBaseProps } from "../types";

export type HeroContentProps = HTMLAttributes<HTMLDivElement> & IComponentBaseProps;

const HeroContent = forwardRef<HTMLDivElement, HeroContentProps>(
    ({ dataTheme, className, children, ...props }, ref): ReactElement => {
        const classes = twMerge("hero-content", className);

        return (
            <div {...props} data-theme={dataTheme} className={classes} ref={ref}>
                {children}
            </div>
        );
    },
);

HeroContent.displayName = "Hero Content";

export default HeroContent;
