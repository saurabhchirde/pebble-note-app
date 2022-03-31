const noteReducer = (state, action) => {
  switch (action.type) {
    case "clickOnNewNoteHandler":
      return {
        ...state,
        showInput: true,
        showIcon: false,
        newInputTitle: "Title",
        pinNote: false,
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
        unSavedError: false,
      };

    //  after deleting
    case "notesAfterDelete": {
      return {
        ...state,
        allNotes: action.payload,
        pinnedNote: [
          ...state.pinnedNote.filter((item) => item._id !== action.payload._id),
        ],
      };
    }

    // after archving
    case "notesAfterArchive": {
      return {
        ...state,
        allNotes: action.payload.notes,
        archivedNotes: action.payload.archives,
        noteArchiveAlert: true,
      };
    }

    // after unArchiving
    case "notesAfterUnArchive": {
      return {
        ...state,
        allNotes: action.payload.notes,
        archivedNotes: action.payload.archives,
        noteUnarchiveAlert: true,
      };
    }

    // on client side
    case "deleteNote":
      return {
        ...state,
        deletedNotes: [...state.deletedNotes, action.payload],
        pinnedNote: [
          ...state.pinnedNote.filter((item) => item._id !== action.payload._id),
        ],
        noteDeletedAlert: true,
        noteRestoredAlert: false,
      };

    case "restoreNote":
      return {
        ...state,
        deletedNotes: [
          ...state.deletedNotes.filter(
            (item) => item._id !== action.payload._id
          ),
        ],
        noteDeletedAlert: false,
        noteRestoredAlert: true,
      };

    case "pinNote":
      return {
        ...state,
        allNotes: [
          ...state.allNotes.filter((item) => item._id !== action.payload._id),
        ],
        pinnedNote: [action.payload, ...state.pinnedNote],
        unSavedError: false,
      };

    case "unPinNote":
      return {
        ...state,
        allNotes: [action.payload, ...state.allNotes],
        pinnedNote: [
          ...state.pinnedNote.filter((item) => item._id !== action.payload._id),
        ],
      };

    case "editUnPinned":
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

    case "editArchived":
      return {
        ...state,
        archivedNotes: [
          ...state.archivedNotes.filter((item) => {
            return item.id !== action.payload.id;
          }),
        ],
        archivedNote: true,
      };

    case "emptyTrash":
      return { ...state, deletedNotes: [], deletedMsgNotification: true };

    // all alerts
    case "alertDeleted":
      return {
        ...state,
        noteDeletedAlert: true,
        noteRestoredAlert: false,
      };

    case "hideDeletedAlert":
      return {
        ...state,
        noteDeletedAlert: false,
      };

    case "hideRestoredAlert":
      return {
        ...state,
        noteRestoredAlert: false,
      };

    case "hideDeletedMsgNotification":
      return {
        ...state,
        deletedMsgNotification: false,
        errorMsgForEmptyTrash: false,
      };

    case "errorMsgForEmptyTrash":
      return {
        ...state,
        errorMsgForEmptyTrash: true,
      };

    case "hideUnarchiveAlert":
      return {
        ...state,
        noteUnarchiveAlert: false,
      };

    case "hideArchiveAlert":
      return {
        ...state,
        noteArchiveAlert: false,
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
        newInputTitle: "Take a new note..",
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
        newInputTitle: "Take a new note..",
      };

    default:
      return state;
  }
};

export { noteReducer };
