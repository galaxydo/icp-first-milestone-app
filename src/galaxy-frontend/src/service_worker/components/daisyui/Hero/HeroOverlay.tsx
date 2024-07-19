import { HTMLAttributes, ReactElement, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

import { IComponentBaseProps } from "../types";

export type HeroOverlayProps = HTMLAttributes<HTMLDivElement> & IComponentBaseProps;

const HeroOverlay = forwardRef<HTMLDivElement, HeroOverlayProps>(
    ({ dataTheme, className, children, ...props }, ref): ReactElement => {
        const classes = twMerge("hero-overlay", className);

        return (
            <div {...props} data-theme={dataTheme} className={classes} ref={ref}>
                {children}
            </div>
        );
    },
);

HeroOverlay.displayName = "Hero Overlay";

export default HeroOverlay;
