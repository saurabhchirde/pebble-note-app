import "./NewNote.css";
import { useAuth, useAxiosCalls, usePebbleNote, useTheme } from "../../Context";
import ButtonSimple from "../UI/Button/ButtonSimple";
import NoteAlert from "../Alerts/NoteAlert";

const NewNote = () => {
  const { state, dispatch, newNote, setNewNote, editModal, setEditModal } =
    usePebbleNote();
  const { newInputTitle, addState, showInput, emptyNoteError, unSavedError } =
    state;
  const { darkTheme } = useTheme();
  const { addNoteOnServer, addToTrashOnServer } = useAxiosCalls();
  const { auth } = useAuth();

  const newNoteConfig = {
    url: "/api/notes",
    body: { note: { ...newNote } },
    headers: { headers: { authorization: auth.token } },
  };

  const delNoteConfig = {
    url: `/api/notes/${newNote._id}`,
    headers: { headers: { authorization: auth.token } },
  };

  const clickOnNewNoteHandler = () => {
    dispatch({ type: "clickOnNewNoteHandler" });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (newNote.title.trim() === "" && newNote.text.trim() === "") {
      dispatch({ type: "emptyNoteError" });
    } else {
      !unSavedError && addNoteOnServer(newNoteConfig);
    }
    setNewNote({
      title: "",
      text: "",
      pinned: false,
      tags: [],
    });
  };

  // alerts on clicking close button
  const clickOnCloseNewNote = () => {
    if (unSavedError && newNote.title === "" && newNote.text === "") {
      dispatch({ type: "hideInputField" });
    } else if (newNote.title === "" && newNote.text === "") {
      dispatch({ type: "hideInputField" });
    } else {
      dispatch({ type: "hideInputWithData" });
    }
  };

  // new note input data
  const newInputOnChangeHandler = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setNewNote((oldNote) => {
      return {
        ...oldNote,
        [name]: value,
      };
    });
  };

  // unsaved alert - delete handler
  const unsavedAlertDeleteHandler = () => {
    dispatch({ type: "dontSave" });
    addToTrashOnServer(delNoteConfig);
    setNewNote({
      title: "",
      text: "",
      pinned: false,
      tags: [],
    });
    setEditModal(false);
  };

  // unsaved alert - save handler
  const unsavedAlertSaveHandler = () => {
    addNoteOnServer(newNoteConfig);
    setNewNote({
      title: "",
      text: "",
      pinned: false,
      tags: [],
    });
    setEditModal(false);
  };

  const darkThemeClass = darkTheme
    ? "new-note-input dark-mode-new-note"
    : "new-note-input";

  return (
    <>
      <form onSubmit={onSubmitHandler} className={darkThemeClass}>
        {emptyNoteError && (
          <NoteAlert
            alert="alert-error"
            icon="fas fa-exclamation-circle alert-icon"
            text="Input cannot be blank, try again."
            dispatchType="hideEmptyNoteError"
          />
        )}
        {unSavedError && (
          <div className="alert-warning-btn">
            <div className="alert-text">
              <i className="fas fa-exclamation-triangle alert-icon"></i>
              <span className="p-md">You have unsaved note! </span>
            </div>
            <ButtonSimple
              onClick={unsavedAlertSaveHandler}
              btnClassName="btn secondary-text-btn-sm mg-2-lt"
              label="Save"
            />
            <ButtonSimple
              onClick={unsavedAlertDeleteHandler}
              btnClassName="btn secondary-text-btn-sm"
              label="Delete"
            />
          </div>
        )}
        <div className="new-note-top-section">
          <input
            type="text"
            placeholder={newInputTitle}
            onMouseDownCapture={clickOnNewNoteHandler}
            onChange={newInputOnChangeHandler}
            name="title"
            autoComplete="off"
            value={editModal ? "" : newNote.title}
          />
        </div>
        {showInput && (
          <div className="new-note-bottom-section">
            <input
              type="text"
              placeholder="Take a note.."
              onChange={newInputOnChangeHandler}
              name="text"
              autoComplete="off"
              value={editModal ? "" : newNote.text}
            />
            <div>
              <ButtonSimple
                onClick={onSubmitHandler}
                btnClassName="btn primary-btn-md"
                label={addState}
              />
              <ButtonSimple
                onClick={clickOnCloseNewNote}
                btnClassName="btn secondary-text-btn-md"
                label="Close"
              />
            </div>
          </div>
        )}
      </form>
    </>
  );
};

export default NewNote;
