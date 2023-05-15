import React, { createContext, useContext, useReducer } from "react";
import AppReducer, { GlobalContextState } from "./AppReducer";
import { AppAction } from "./AppActions";

const INITIAL_STATE: GlobalContextState = {
  username: undefined,
  dataChanged: false,
};

type GlobalContextValue = {
  state?: GlobalContextState,
  dispatch?: React.Dispatch<AppAction>,
}

export const AppContext = createContext<GlobalContextValue>({});

export const useGlobalContext = (): GlobalContextValue => useContext(AppContext)

export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, INITIAL_STATE);

  return (
    <AppContext.Provider
      value={{ state, dispatch, }}
    >
      {children}
    </AppContext.Provider>
  );
};
