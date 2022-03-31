import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { noteReducer } from "./noteReducer";
import { useAuth } from "../Auth/AuthProvider";
import { useModal } from "../Modal/ModalProvider";
import axios from "axios";

const initialState = {
  deletedNotes: [],
  allNotes: [],
  deletedMsgNotification: false,
  newInputTitle: "Take a new note..",
  addState: "Add",
  showInput: false,
  pinnedNote: [],
  archivedNotes: [],
  emptyNoteError: false,
  unSavedError: false,
  showIcon: true,
  pinNote: false,
  archivedNote: false,
  errorMsgForEmptyTrash: false,
  noteDeletedAlert: false,
  noteRestoredAlert: false,
  noteArchiveAlert: false,
  noteUnarchiveAlert: false,
};

const noteContext = createContext(initialState);

const NoteProvider = ({ children }) => {
  const [state, dispatch] = useReducer(noteReducer, initialState);
  const [noteText, setNoteText] = useState("");
  const [newNote, setNewNote] = useState({
    title: "",
    pinned: false,
    labels: [],
    color: "",
  });

  const [editModal, setEditModal] = useState(false);
  const { auth } = useAuth();
  const { setError, setShowError } = useModal();

  useEffect(() => {
    if (auth.login) {
      const fetchData = async () => {
        try {
          const res = await axios.get("/api/notes", {
            headers: { authorization: auth.token },
          });
          dispatch({ type: "getNotesFromServer", payload: res.data.notes });
          console.log(res.data.notes);
        } catch (error) {
          setError(error.message);
          setShowError(true);
        }
      };
      fetchData();
    } else {
      dispatch({ type: "emptyAllNotes" });
    }
  }, [auth.login]);

  return (
    <noteContext.Provider
      value={{
        state,
        dispatch,
        newNote,
        setNewNote,
        noteText,
        setNoteText,
        editModal,
        setEditModal,
      }}
    >
      {children}
    </noteContext.Provider>
  );
};

const usePebbleNote = () => useContext(noteContext);

export { NoteProvider, usePebbleNote };
