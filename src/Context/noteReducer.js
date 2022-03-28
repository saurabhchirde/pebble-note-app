const noteReducer = (state, action) => {
  switch (action.type) {
    case "deleteNote":
      return {
        ...state,
        deletedNotes: [...state.deletedNotes, action.payload],
        allNotes: [
          ...state.allNotes.filter((item) => item.id !== action.payload.id),
        ],
        pinnedNote: [
          ...state.pinnedNote.filter((item) => item.id !== action.payload.id),
        ],
      };

    case "restoreNote":
      return {
        ...state,
        deletedNotes: [
          ...state.deletedNotes.filter((item) => item.id !== action.payload.id),
        ],
        allNotes: [action.payload, ...state.allNotes],
      };

    case "emptyTrash":
      return { ...state, deletedNotes: [], deletedMsgNotification: true };

    case "editOtherNote":
      return {
        ...state,
        allNotes: [
          ...state.allNotes.filter((item) => {
            return item.id !== action.payload.id;
          }),
        ],
        pinNote: false,
      };

    case "editPinnedNote":
      return {
        ...state,
        pinnedNote: [
          ...state.pinnedNote.filter((item) => {
            return item.id !== action.payload.id;
          }),
        ],
        pinNote: true,
      };

    case "clickOnNewNoteHandler":
      return {
        ...state,
        showInput: true,
        showIcon: false,
        newInputTitle: "Title",
      };

    case "newNote":
      return {
        ...state,
        allNotes: [action.payload, ...state.allNotes],
        unSavedError: false,
      };

    case "emptyNoteError":
      return {
        ...state,
        emptyNoteError: true,
      };

    case "hideEmptyNoteError":
      return {
        ...state,
        emptyNoteError: false,
      };

    case "dontSave":
      return {
        ...state,
        unSavedError: false,
      };

    case "hideInputField":
      return {
        ...state,
        showInput: false,
        unSavedError: false,
      };

    case "hideInputWithData":
      return {
        ...state,
        unSavedError: true,
      };

    case "outsideClick":
      return {
        ...state,
        showInput: false,
        newInputTitle: "Take a note..",
      };

    case "pinNote":
      return {
        ...state,
        allNotes: [
          ...state.allNotes.filter((item) => item.id !== action.payload.id),
        ],
        pinnedNote: [action.payload, ...state.pinnedNote],
        unSavedError: false,
      };

    case "unPinNote":
      return {
        ...state,
        allNotes: [action.payload, ...state.allNotes],
        pinnedNote: [
          ...state.pinnedNote.filter((item) => item.id !== action.payload.id),
        ],
      };

    default:
      return state;
  }
};

export { noteReducer };
