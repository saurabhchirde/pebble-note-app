const alertReducer = (alertState, action) => {
  switch (action.type) {
    // all alerts

    case "alertNewAdded":
      return {
        ...alertState,
        noteAddedAlert: true,
        unSavedError: false,
      };

    case "hideNoteAddedAlert":
      return {
        ...alertState,
        noteAddedAlert: false,
      };

    case "alertNoteEdited":
      return {
        ...alertState,
        noteEditedAlert: true,
      };

    case "hideNoteEditedAlert":
      return {
        ...alertState,
        noteEditedAlert: false,
      };

    case "alertDeleted":
      return {
        ...alertState,
        noteDeletedAlert: true,
        noteRestoredAlert: false,
      };

    case "hideDeletedAlert":
      return {
        ...alertState,
        noteDeletedAlert: false,
      };

    case "hideDeletedMsgNotification":
      return {
        ...alertState,
        deletedMsgNotification: false,
        errorMsgForEmptyTrash: false,
      };

    case "alertRestored":
      return {
        ...alertState,
        noteDeletedAlert: false,
        noteRestoredAlert: true,
      };

    case "hideRestoredAlert":
      return {
        ...alertState,
        noteRestoredAlert: false,
      };

    case "alertArchived":
      return {
        ...alertState,
        noteArchiveAlert: true,
      };

    case "alertUnArchived":
      return {
        ...alertState,
        noteUnarchiveAlert: true,
      };

    case "errorMsgForEmptyTrash":
      return {
        ...alertState,
        errorMsgForEmptyTrash: true,
      };

    case "hideUnarchiveAlert":
      return {
        ...alertState,
        noteUnarchiveAlert: false,
      };

    case "hideArchiveAlert":
      return {
        ...alertState,
        noteArchiveAlert: false,
      };

    case "emptyNoteError":
      return {
        ...alertState,
        emptyNoteError: true,
      };

    case "hideEmptyNoteError":
      return {
        ...alertState,
        emptyNoteError: false,
      };

    case "noteSavedAlert":
      return {
        ...alertState,
        noteSavedAlert: true,
        unSavedError: false,
        showInput: true,
      };

    case "hideNoteSavedAlert":
      return {
        ...alertState,
        noteSavedAlert: false,
      };

    case "dontSave":
      return {
        ...alertState,
        noteDiscardAlert: true,
        unSavedError: false,
        showInput: true,
      };

    case "hideDiscardAlert":
      return {
        ...alertState,
        noteDiscardAlert: false,
      };

    case "hideInputField":
      return {
        ...alertState,
        showInput: false,
        unSavedError: false,
        newInputTitle: "Take a new note..",
      };

    case "hideInputWithData":
      return {
        ...alertState,
        unSavedError: true,
      };

    case "outsideClick":
      return {
        ...alertState,
        showInput: false,
        newInputTitle: "Take a new note..",
      };

    default:
      return alertState;
  }
};

export { alertReducer };
