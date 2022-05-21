import { createContext, useContext, useReducer } from "react";
import { alertReducer } from "./alertReducer";

const alertContext = createContext(null);

const alertInitialState = {
  unSavedError: false,
  noteDiscardAlert: false,
};

const AlertProvider = ({ children }) => {
  const [alertState, alertDispatch] = useReducer(
    alertReducer,
    alertInitialState
  );
  return (
    <alertContext.Provider value={{ alertState, alertDispatch }}>
      {children}
    </alertContext.Provider>
  );
};

const useAlert = () => useContext(alertContext);

export { AlertProvider, useAlert };
