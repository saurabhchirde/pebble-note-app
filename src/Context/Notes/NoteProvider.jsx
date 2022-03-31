import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { v4 as uuid } from "uuid";
import { noteReducer } from "./noteReducer";
import { useAuth } from "../Auth/AuthProvider";
import { useModal } from "../Modal/ModalProvider";
import axios from "axios";

const initialState = {
  deletedNotes: [],
  allNotes: [],
  deletedMsgNotification: false,
  newInputTitle: "Take a new note..",
  addState: "Add New Note",
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
  const [state, dispatch] = useReducer(noteReducer, {
    ...initialState,
    deletedNotes: JSON.parse(localStorage.getItem("deletedNotes")) ?? [],
    allNotes: JSON.parse(localStorage.getItem("savedNotes")) ?? [],
    pinnedNote: JSON.parse(localStorage.getItem("pinnedNotes")) ?? [],
    archivedNotes: JSON.parse(localStorage.getItem("archivedNotes")) ?? [],
  });
  const [newNote, setNewNote] = useState({
    id: uuid(),
    title: "",
    text: "",
    tags: [],
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
      value={{ state, dispatch, newNote, setNewNote, editModal, setEditModal }}
    >
      {children}
    </noteContext.Provider>
  );
};

const usePebbleNote = () => useContext(noteContext);

export { NoteProvider, usePebbleNote };
