import clsx from "clsx";
import { HTMLAttributes, ReactElement, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

import { IComponentBaseProps } from "../types";

export type ModalProps = HTMLAttributes<HTMLDialogElement> &
    IComponentBaseProps & {
        open?: boolean;
        responsive?: boolean;
        backdrop?: boolean;
    };

const Modal = forwardRef<HTMLDialogElement, ModalProps>(
    ({ children, open, responsive, backdrop, dataTheme, className, ...props }, ref): ReactElement => {
        const containerClasses = twMerge(
            "modal",
            clsx({
                "modal-open": open,
                "modal-bottom sm:modal-middle": responsive,
            }),
        );

        const bodyClasses = twMerge("modal-box", className);

        return (
            <dialog
                {...props}
                aria-label="Modal"
                // aria-hidden={!open}
                open={open}
                aria-modal={open}
                data-theme={dataTheme}
                className={containerClasses}
                ref={ref}>
                <div data-theme={dataTheme} className={bodyClasses}>
                    {children}
                </div>
                {backdrop && (
                    <form method="dialog" className="modal-backdrop">
                        <button _="on click remove @open from <dialog/> then remove .modal-open from <dialog/>">close</button>
                    </form>
                )}
            </dialog>
        );
    },
);

Modal.displayName = "Modal";

export default Modal;

export type DialogProps = Omit<ModalProps, "ref">;
