import "./NewNote.css";
import { useAuth, useAxiosCalls, usePebbleNote, useTheme } from "../../Context";
import ButtonSimple from "../UI/Button/ButtonSimple";
import NoteAlert from "../Alerts/NoteAlert";
import ButtonIcon from "../UI/Button/ButtonIcon";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import labelIcon from "../../Data/Images/Icons/label.svg";

const NewNote = () => {
  const {
    state,
    dispatch,
    newNote,
    setNewNote,
    noteText,
    setNoteText,
    editModal,
    setEditModal,
  } = usePebbleNote();
  const { newInputTitle, addState, showInput, emptyNoteError, unSavedError } =
    state;
  const { darkTheme } = useTheme();
  const { addNoteOnServer, addToTrashOnServer } = useAxiosCalls();
  const { auth } = useAuth();

  const initialNoteDetails = {
    title: "",
    pinned: false,
    labels: [],
    color: "",
  };

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["blockquote", "code-block"],
      ["link", "image"],
    ],
  };

  const newNoteConfig = {
    url: "/api/notes",
    body: { note: { ...newNote, text: noteText } },
    headers: { headers: { authorization: auth.token } },
  };

  console.log(newNoteConfig);

  const delNoteConfig = {
    url: `/api/notes/${newNote._id}`,
    headers: { headers: { authorization: auth.token } },
  };

  const clickOnNewNoteHandler = () => {
    dispatch({ type: "clickOnNewNoteHandler" });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (newNote.title.trim() === "" && noteText.trim() === "") {
      dispatch({ type: "emptyNoteError" });
    } else {
      !unSavedError && addNoteOnServer(newNoteConfig);
    }
    setNewNote(initialNoteDetails);
    setNoteText("");
  };

  // alerts on clicking close button
  const clickOnCloseNewNote = () => {
    if (unSavedError && newNote.title === "" && noteText === "") {
      dispatch({ type: "hideInputField" });
    } else if (newNote.title === "" && noteText === "") {
      dispatch({ type: "hideInputField" });
    } else {
      dispatch({ type: "hideInputWithData" });
    }
  };

  // new note input data
  const newInputOnChangeHandler = (e) => {
    setNewNote({
      title: e.target.value,
    });
  };
  console.log(newNote);

  // unsaved alert - delete handler
  const unsavedAlertDeleteHandler = () => {
    dispatch({ type: "dontSave" });
    addToTrashOnServer(delNoteConfig);
    setNewNote(initialNoteDetails);
    setEditModal(false);
  };

  // unsaved alert - save handler
  const unsavedAlertSaveHandler = () => {
    addNoteOnServer(newNoteConfig);
    setNewNote(initialNoteDetails);
    setEditModal(false);
  };

  const darkThemeClass = darkTheme
    ? "new-note-input card-shadow-two dark-mode-new-note"
    : "new-note-input card-shadow-two";

  const darkThemeEditor = darkTheme
    ? "text-editor dark-mode-new-note"
    : "text-editor ";

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
            <div className="rich-text-editor">
              <ReactQuill
                modules={modules}
                value={noteText}
                placeholder="Take a note..."
                onChange={setNoteText}
                className={darkThemeEditor}
              />
            </div>
            <div className="new-note-nav-btn">
              <div className="note-nav-btn-left">
                <ButtonIcon
                  btnClassName="btn icon-btn-md"
                  icon="fas fa-palette"
                />
                <img src={labelIcon} alt="label-icon" className="nav-icons" />
              </div>
              <div className="note-nav-btn-right">
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
          </div>
        )}
      </form>
    </>
  );
};

export default NewNote;
