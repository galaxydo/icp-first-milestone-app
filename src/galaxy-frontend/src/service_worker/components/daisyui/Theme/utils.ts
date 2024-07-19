import { RefObject } from "react";

export const getThemeFromClosestAncestor = (ref: RefObject<HTMLElement>) => {
    if (!ref.current) return;
    const matches = ref.current.closest("[data-theme]");
    if (matches) return matches.getAttribute("data-theme");
};
