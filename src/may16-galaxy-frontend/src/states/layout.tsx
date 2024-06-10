import { useEffect, useMemo, cache } from "react";

// import { useTheme as daisyUseTheme } from "@/components/daisyui";

// import createHookedContext from "@/hooks/create-hooked-context";
import useLocalStorage from "@/hooks/use-local-storage";
import { ILayoutState } from "@/types/layout/admin";

const INIT_STATE: ILayoutState = {
  theme: "light",
  leftbar: {
    hide: false,
    drawerOpen: false,
  },
};

const useLayoutContext = () => {
  console.log('useLayoutContext');
  
  const [persistentState, setPersistentState] = useLocalStorage<ILayoutState>("__NEXUS_REACT_ADMIN_LAYOUT__", INIT_STATE);
  // const { setTheme } = daisyUseTheme();

  useEffect(() => {
    console.log(persistentState)
    // setTheme(state.theme);
    debugger;
    const htmlRef = document.querySelector("html")
    if (htmlRef) {
      if (persistentState.theme == "dark") {
        htmlRef.classList.add("dark");
      } else {
        htmlRef.classList.remove("dark");
      }
    }
  }, [persistentState.theme]);

  // const toggleLeftbarDrawer = (open: boolean) => {
  //     updateState({
  //         leftbar: {
  //             ...state.leftbar,
  //             drawerOpen: open,
  //             hide: open,
  //         },
  //     });
  // };

  const updatePersistentState = (newState: Partial<ILayoutState>) => {
    setPersistentState({ ...persistentState, ...newState });
  };

  const changeTheme = (theme: ILayoutState["theme"]) => {
    console.log('changeTheme')
    debugger;
    updatePersistentState({
      theme,
    });
  };

  // const reset = () => {
  //     setState(INIT_STATE);
  // };

  return {
    state: persistentState,
    // toggleLeftbarDrawer,
    changeTheme,
    // reset,
  };
};

// const MyContext = createContext({});

// console.log('MyContext', MyContext)

// const useLayoutContext = () => useContext(MyContext);

// const LayoutContextProvider = ({ children }: { children: ReactNode }) => {
//   return <MyContext.Provider value={useHook()}>{children}</MyContext.Provider>;
// };

// const [useLayoutContext, LayoutContextProvider] = createHookedContext(useHook);

export { useLayoutContext };
