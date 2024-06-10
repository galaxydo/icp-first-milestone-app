import { HTMLAttributes, ReactElement, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

import { IComponentBaseProps } from "../types";
import StatSection, { StatSectionProps } from "./StatSection";

export type StatProps = HTMLAttributes<HTMLDivElement> & IComponentBaseProps;

const Stat = forwardRef<HTMLDivElement, StatProps>(({ dataTheme, className, ...props }, ref): ReactElement => {
    const classes = twMerge("stat", className);

    return <div {...props} data-theme={dataTheme} className={classes} ref={ref} />;
});

const StatTitle = forwardRef<HTMLDivElement, Omit<StatSectionProps, "section">>((props, ref) => (
    <StatSection {...props} section="title" ref={ref} />
));

const StatValue = forwardRef<HTMLDivElement, Omit<StatSectionProps, "section">>((props, ref) => (
    <StatSection {...props} section="value" ref={ref} />
));

const StatDesc = forwardRef<HTMLDivElement, Omit<StatSectionProps, "section">>((props, ref) => (
    <StatSection {...props} section="desc" ref={ref} />
));

const StatFigure = forwardRef<HTMLDivElement, Omit<StatSectionProps, "section">>((props, ref) => (
    <StatSection {...props} section="figure" ref={ref} />
));

const StatActions = forwardRef<HTMLDivElement, Omit<StatSectionProps, "section">>((props, ref) => (
    <StatSection {...props} section="actions" ref={ref} />
));

Stat.displayName = "Stat";
StatTitle.displayName = "Stat title";
StatValue.displayName = "Stat value";
StatDesc.displayName = "Stat desc";
StatFigure.displayName = "Stat figure";
StatActions.displayName = "Stat actions";

export default Stat;

export { StatTitle, StatValue, StatDesc, StatFigure, StatActions };
