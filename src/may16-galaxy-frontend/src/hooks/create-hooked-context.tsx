import { ReactNode, createContext, useContext } from "react";

const createHookedContext = <T,>(fn: () => T) => {
    type HookReturnType = ReturnType<typeof fn>;

    const Context = createContext({} as HookReturnType);

    const ContextProvider = ({ children }: { children: ReactNode }) => {
        return <Context.Provider value={fn()}>{children}</Context.Provider>;
    };

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const hook = () => useContext(Context);

    return [hook, ContextProvider] as const;
};

export default createHookedContext;
