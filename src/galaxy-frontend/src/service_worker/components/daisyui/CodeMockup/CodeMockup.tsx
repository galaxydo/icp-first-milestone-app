import { Children, HTMLAttributes, ReactElement, cloneElement, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

import { IComponentBaseProps } from "../types";
import { CodeMockupLineProps } from "./CodeMockupLine";

export type CodeMockupProps = HTMLAttributes<HTMLDivElement> & IComponentBaseProps;

const CodeMockup = forwardRef<HTMLDivElement, CodeMockupProps>(
    ({ dataTheme, className, children, ...props }, ref): ReactElement => {
        const classes = twMerge("mockup-code", className);

        return (
            <div aria-label="Code mockup" {...props} data-theme={dataTheme} className={classes} ref={ref}>
                {Children.map(children, (child, index) => {
                    const childComponent = child as ReactElement<CodeMockupLineProps>;
                    return cloneElement(childComponent, {
                        key: index,
                    });
                })}
            </div>
        );
    },
);

CodeMockup.displayName = "CodeMockup";

export default CodeMockup;
