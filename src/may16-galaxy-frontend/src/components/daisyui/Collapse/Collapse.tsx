import clsx from "clsx";
import { FocusEvent, HTMLAttributes, ReactElement, forwardRef, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

import { IComponentBaseProps } from "../types";

export type CollapseProps<T extends HTMLElement = HTMLDivElement> = HTMLAttributes<T> &
    IComponentBaseProps & {
        checkbox?: boolean;
        icon?: "arrow" | "plus";
        open?: boolean;
        onOpen?: () => void;
        onClose?: () => void;
        onToggle?: () => void;
    };

export const classesFn = ({ className, icon, open }: Pick<CollapseProps, "className" | "icon" | "open">) =>
    twMerge(
        "collapse",
        className,
        clsx({
            "collapse-arrow": icon === "arrow",
            "collapse-plus": icon === "plus",
            "collapse-open": open === true,
            "collapse-close": open === false,
        }),
    );

const Collapse = forwardRef<HTMLDivElement, CollapseProps>(
    (
        { children, checkbox, icon, open, dataTheme, className, onOpen, onClose, onToggle, ...props },
        ref,
    ): ReactElement => {
        const [isChecked, setIsChecked] = useState(open);
        const checkboxRef = useRef<HTMLInputElement>(null);

        // Handle events for checkbox changes
        const handleCheckboxChange = () => {
            if (onToggle) {
                onToggle();
            }
            if (onOpen && checkboxRef.current?.checked) {
                onOpen();
            } else if (onClose && !checkboxRef.current?.checked) {
                onClose();
            }

            setIsChecked(checkboxRef.current?.checked);
        };

        // Handle blur events, specifically handling open/close for non checkbox types
        const handleBlur = (event: FocusEvent<HTMLDivElement, Element>) => {
            if (!checkbox && onToggle) onToggle();
            if (!checkbox && onClose) onClose();
            if (props.onBlur) props.onBlur(event);
        };

        // Handle focus events, specifically handling open/close for non checkbox types
        const handleFocus = (event: FocusEvent<HTMLDivElement, Element>) => {
            if (!checkbox && onToggle) onToggle();
            if (!checkbox && onOpen) onOpen();
            if (props.onFocus) props.onFocus(event);
        };

        return (
            <div
                aria-expanded={open}
                {...props}
                ref={ref}
                tabIndex={isChecked === true ? undefined : 0}
                data-theme={dataTheme}
                className={classesFn({ className, icon, open })}
                onBlur={handleBlur}
                onFocus={handleFocus}>
                {checkbox && (
                    <input
                        type="checkbox"
                        tabIndex={isChecked === true ? 0 : undefined}
                        className="peer"
                        ref={checkboxRef}
                        onChange={handleCheckboxChange}
                    />
                )}
                {children}
            </div>
        );
    },
);

Collapse.displayName = "Collapse";

export default Collapse;
