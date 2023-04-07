import { createContext, useReducer } from "react";
import { AppReducer } from "./AppReducer";

const INITIAL_STATE = {
  user: "",
  err: "",
  token: "",
};

export const AppContext = createContext(INITIAL_STATE);

export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, INITIAL_STATE);

  return (
    <AppContext.Provider
      value={{
        user: state.user,
        err: state.err,
        token: state.token,
        dispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
