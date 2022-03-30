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

    case "restoreNote":
      return {
        ...state,
        deletedNotes: [
          ...state.deletedNotes.filter((item) => item.id !== action.payload.id),
        ],
        allNotes: [action.payload, ...state.allNotes],
        noteDeletedAlert: false,
        noteRestoredAlert: true,
      };

    case "emptyTrash":
      return { ...state, deletedNotes: [], deletedMsgNotification: true };

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

    case "addToArchive":
      return {
        ...state,
        allNotes: [
          ...state.allNotes.filter((item) => item.id !== action.payload.id),
        ],
        archivedNotes: [action.payload, ...state.archivedNotes],
        noteArchiveAlert: true,
      };

    case "addPinnedToArchive":
      return {
        ...state,
        pinnedNote: [
          ...state.pinnedNote.filter((item) => item.id !== action.payload.id),
        ],
        archivedNotes: [action.payload, ...state.archivedNotes],
        pinNote: false,
        noteArchiveAlert: true,
      };

    case "removeFromArchive":
      return {
        ...state,
        archivedNotes: [
          ...state.archivedNotes.filter(
            (item) => item.id !== action.payload.id
          ),
        ],
        allNotes: [action.payload, ...state.allNotes],
        noteUnarchiveAlert: true,
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

    case "clickOnNewNoteHandler":
      return {
        ...state,
        showInput: true,
        showIcon: false,
        newInputTitle: "Title",
        pinNote: false,
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
