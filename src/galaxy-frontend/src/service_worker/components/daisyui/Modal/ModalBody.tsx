import { HTMLAttributes, forwardRef } from "react";

export type ModalBodyProps = HTMLAttributes<HTMLDivElement>;

const ModalBody = forwardRef<HTMLDivElement, ModalBodyProps>(({ children, className, ...props }, ref) => {
    return (
        <div {...props} className={className} ref={ref}>
            {children}
        </div>
    );
});

ModalBody.displayName = "ModalBody";

export default ModalBody;
