import { HTMLAttributes, ReactElement, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

import { IComponentBaseProps } from "../types";

export type HeroProps = HTMLAttributes<HTMLDivElement> & IComponentBaseProps;

const Hero = forwardRef<HTMLDivElement, HeroProps>(
    ({ dataTheme, className, children, ...props }, ref): ReactElement => {
        const classes = twMerge("hero", className);

        return (
            <div role="banner" {...props} data-theme={dataTheme} className={classes} ref={ref}>
                {children}
            </div>
        );
    },
);

Hero.displayName = "Hero";

export default Hero;
