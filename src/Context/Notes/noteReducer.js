const noteReducer = (state, action) => {
  switch (action.type) {
    case "clickOnNewNoteHandler":
      return {
        ...state,
        showInput: true,
        showIcon: false,
        newInputTitle: "Title",
      };

    // Server side functionality

    // getNotesFromServer
    case "getNotesFromServer":
      return {
        ...state,
        allNotes: action.payload,
      };

    // after login
    case "authNoteInitiate":
      return {
        ...state,
        allNotes: action.payload.notes,
        archivedNotes: action.payload.archives,
      };

    // for not loged in
    case "emptyAllNotes":
      return {
        ...state,
        allNotes: [],
        archivedNotes: [],
      };

    // after adding notes
    case "notesAfterAddingNew":
      return {
        ...state,
        allNotes: [...action.payload],
      };

    //  after deleting
    case "notesAfterDelete": {
      return {
        ...state,
        allNotes: [...action.payload],
      };
    }

    // after archving
    case "notesAfterArchive": {
      return {
        ...state,
        allNotes: action.payload.notes,
        archivedNotes: action.payload.archives,
      };
    }

    // after unArchiving
    case "notesAfterUnArchive": {
      return {
        ...state,
        allNotes: action.payload.notes,
        archivedNotes: action.payload.archives,
      };
    }

    // on client side
    case "deleteNote":
      return {
        ...state,
        deletedNotes: [action.payload, ...state.deletedNotes],
      };

    case "restoreNote":
      return {
        ...state,
        deletedNotes: [
          ...state.deletedNotes.filter(
            (item) => item._id !== action.payload._id
          ),
        ],
      };

    case "editNote":
      return {
        ...state,
        showInput: false,
      };

    case "hideInputField":
      return {
        ...state,
        showInput: false,
        newInputTitle: "Take a new note..",
      };

    case "emptyTrash":
      return { ...state, deletedNotes: [], deletedMsgNotification: true };

    case "hideEmptyTrashMessage":
      return { ...state, deletedMsgNotification: false };

    default:
      return state;
  }
};

export { noteReducer };
