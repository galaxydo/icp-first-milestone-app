import { HTMLAttributes, MutableRefObject, ReactElement, forwardRef, useEffect, useRef, useState } from "react";

import { defaultTheme } from "../constants";
import { DataTheme, IComponentBaseProps } from "../types";
import { ThemeContext } from "./ThemeContext";
import { getThemeFromClosestAncestor } from "./utils";

export type ThemeProps = Omit<HTMLAttributes<HTMLDivElement>, "onChange"> &
    IComponentBaseProps & {
        onChange?: (theme: DataTheme) => void;
    };

const Theme = forwardRef<HTMLDivElement, ThemeProps>(
    ({ children, dataTheme, onChange, className, ...props }, ref): ReactElement => {
        // Either use provided ref or create a new ref
        const themeRef = useRef<HTMLDivElement>((ref as MutableRefObject<HTMLDivElement>)?.current);

        const closestAncestorTheme = getThemeFromClosestAncestor(themeRef);

        // If no theme is provided, use the closest ancestor theme, if no ancestor theme, fallback to default theme (defined in constants)
        const [theme, setTheme] = useState<DataTheme>(dataTheme || closestAncestorTheme || defaultTheme);

        const handleThemeChange = (theme: DataTheme) => {
            //  Fire custom onChange, if provided. Ie, user provided function to store theme in session/local storage
            onChange && onChange(theme);
            // Update state/context
            setTheme(theme);
        };

        // Properly handle changes to theme prop on a Theme component
        useEffect(() => {
            if (dataTheme !== theme) {
                dataTheme && handleThemeChange(dataTheme);
            }
        }, [dataTheme]);

        return (
            <ThemeContext.Provider value={{ theme, setTheme: handleThemeChange }}>
                <div {...props} data-theme={theme} className={className} ref={themeRef}>
                    {children}
                </div>
            </ThemeContext.Provider>
        );
    },
);

Theme.displayName = "Theme";

export default Theme;
