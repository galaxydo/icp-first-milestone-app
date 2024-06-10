import clsx from "clsx";
import { HTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import { IComponentBaseProps } from "../types";

export type DrawerProps = HTMLAttributes<HTMLDivElement> &
    IComponentBaseProps & {
        side: ReactNode;
        open?: boolean;
        end?: boolean;
        toggleClassName?: string;
        contentClassName?: string;
        sideClassName?: string;
        overlayClassName?: string;
        onClickOverlay?: () => void;
    };

const Drawer = ({
    children,
    side,
    open,
    end,
    dataTheme,
    className,
    toggleClassName,
    contentClassName,
    sideClassName,
    overlayClassName,
    onClickOverlay,
    ...props
}: DrawerProps) => {
    const classes = twMerge(
        "drawer",
        className,
        clsx({
            "drawer-end": end,
        }),
    );

    return (
        <div
            // aria-expanded={open}
            {...props}
            data-theme={dataTheme}
            className={classes}>
            <input
                aria-label="Drawer handler"
                type="checkbox"
                className={clsx("drawer-toggle", toggleClassName)}
                checked={open}
                readOnly
            />
            <div className={clsx("drawer-content", contentClassName)}>{children}</div>
            <div className={clsx("drawer-side", sideClassName)}>
                <label className={clsx("drawer-overlay", overlayClassName)} _="on click remove [@checked] from .drawer-toggle"></label>
                {side}
            </div>
        </div>
    );
};

export default Drawer;
