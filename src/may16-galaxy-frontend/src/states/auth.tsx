import { useCallback } from "react";

import createHookedContext from "@/hooks/create-hooked-context";
import useSessionStorage from "@/hooks/use-session-storage";
import { IAuthState, IAuthUser } from "@/types/auth";

const useHook = () => {
    const [state, setState] = useSessionStorage<IAuthState>("__NEXUS_REACT_ADMIN_AUTH__", {});

    const setLoggedInUser = (user: IAuthUser) => {
        updateState({ user });
    };

    const updateState = (changes: Partial<IAuthState>) => {
        setState({
            ...state,
            ...changes,
        });
    };

    const isLoggedIn = useCallback(() => {
        return true;
        return state.user != null;
    }, [state.user]);

    const logout = () => {
        updateState({
            user: undefined,
        });
    };

    return {
        state,
        setLoggedInUser,
        isLoggedIn,
        logout,
    };
};

const [useAuthContext, AuthContextProvider] = createHookedContext(useHook);

export { useAuthContext, AuthContextProvider };
