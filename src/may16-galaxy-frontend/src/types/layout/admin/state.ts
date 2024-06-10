import { ILayoutThemeMode } from "./theme";

export type ILayoutState = {
    theme: ILayoutThemeMode;
    leftbar: {
        hide: boolean;
        drawerOpen: boolean;
    };
};
