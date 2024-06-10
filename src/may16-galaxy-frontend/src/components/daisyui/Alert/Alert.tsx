import clsx from "clsx";
import { HTMLAttributes, ReactElement, ReactNode, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

import { ComponentStatus, IComponentBaseProps } from "../types";

export type AlertProps = HTMLAttributes<HTMLDivElement> &
    IComponentBaseProps & {
        icon?: ReactNode;
        status?: ComponentStatus;
    };

const Alert = forwardRef<HTMLDivElement, AlertProps>(
    ({ children, icon, status, dataTheme, className, ...props }, ref): ReactElement => {
        const classes = twMerge(
            "alert",
            className,
            clsx({
                "alert-info": status === "info",
                "alert-success": status === "success",
                "alert-warning": status === "warning",
                "alert-error": status === "error",
            }),
        );

        return (
            <div role="alert" {...props} ref={ref} data-theme={dataTheme} className={classes}>
                {icon}
                {children}
            </div>
        );
    },
);

Alert.displayName = "Alert";

export default Alert;
