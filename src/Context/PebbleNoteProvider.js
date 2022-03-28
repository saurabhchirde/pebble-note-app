import { createContext, useContext, useReducer, useState } from "react";
import { v4 as uuid } from "uuid";
import { noteReducer } from "./noteReducer";
import { demoNotes } from "../Data/demoNotes";

const initialState = {
  deletedNotes: [],
  allNotes: [...demoNotes],
  deletedMsgNotification: false,
  newInputTitle: "Take a note..",
  addState: "Add New Note",
  showInput: false,
  pinnedNote: [],
  noteActionIcon: "fas fa-trash",
  emptyNoteError: false,
  unSavedError: false,
  showIcon: true,
  pinNote: false,
  errorMsgForEmptyTrash: false,
};

const noteContext = createContext(initialState);

const PebbleNoteProvider = ({ children }) => {
  const [state, dispatch] = useReducer(noteReducer, {
    ...initialState,
    deletedNotes: JSON.parse(localStorage.getItem("deletedNotes")) ?? [],
    allNotes: JSON.parse(localStorage.getItem("savedNotes")) ?? [...demoNotes],
    pinnedNote: JSON.parse(localStorage.getItem("pinnedNotes")) ?? [],
  });
  const [newNote, setNewNote] = useState({
    id: uuid(),
    title: "",
    text: "",
  });
  const [editModal, setEditModal] = useState(false);

  return (
    <noteContext.Provider
      value={{ state, dispatch, newNote, setNewNote, editModal, setEditModal }}
    >
      {children}
    </noteContext.Provider>
  );
};

const usePebbleNote = () => useContext(noteContext);

export { PebbleNoteProvider, usePebbleNote };
