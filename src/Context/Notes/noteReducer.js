const noteReducer = (state, action) => {
  switch (action.type) {
    case "clickOnNewNoteHandler":
      return {
        ...state,
        showInput: true,
        showIcon: false,
        newInputTitle: "Title",
      };

    // add label
    case "addLabelToNote":
      return {
        ...state,
        tempLabels: [...state.tempLabels, action.payload],
      };

    // remove label from note
    case "removeLabelFromNote":
      console.log(action.payload);
      return {
        ...state,
        tempLabels: [
          ...state.tempLabels.filter((item) => item != action.payload),
        ],
      };

    // remove label
    case "removeLabel":
      console.log(action.payload);
      return {
        ...state,
        tempLabels: [
          ...state.tempLabels.filter((item) => item != action.payload),
        ],
      };

    // clear temp labels
    case "clearTempLabel":
      return {
        ...state,
        tempLabels: [],
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
      console.log("after adding note", action.payload);
      return {
        ...state,
        allNotes: [...action.payload],
      };

    // after updating notes
    case "notesAfterUpdating":
      console.log(action.payload);
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
