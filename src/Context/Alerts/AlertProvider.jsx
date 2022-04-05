import { createContext, useContext, useReducer } from "react";
import { alertReducer } from "./alertReducer";

const alertContext = createContext(null);

const alertInitialState = {
  emptyNoteError: false,
  emptyLabelError: false,
  unSavedError: false,
  showIcon: true,
  archivedNote: false,
  errorMsgForEmptyTrash: false,
  noteAddedAlert: false,
  noteEditedAlert: false,
  noteDiscardAlert: false,
  noteDeletedAlert: false,
  noteRestoredAlert: false,
  noteArchiveAlert: false,
  noteUnarchiveAlert: false,
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
