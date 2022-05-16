const alertReducer = (alertState, action) => {
  switch (action.type) {
    // all alerts

    case "alertNewAdded":
      return {
        ...alertState,
        unSavedError: false,
      };

    case "noteSavedAlert":
      return {
        ...alertState,
        unSavedError: false,
      };

    case "dontSave":
      return {
        ...alertState,
        noteDiscardAlert: true,
        unSavedError: false,
      };

    case "hideDiscardAlert":
      return {
        ...alertState,
        noteDiscardAlert: false,
      };

    case "hideInputField":
      return {
        ...alertState,
        unSavedError: false,
      };

    case "hideInputWithData":
      return {
        ...alertState,
        unSavedError: true,
      };

    default:
      return alertState;
  }
};

export { alertReducer };
