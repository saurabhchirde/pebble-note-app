import "./NewNote.css";
import {
  useAlert,
  useAuth,
  useAxiosCalls,
  usePebbleNote,
  useTheme,
} from "../../Context";
import ButtonSimple from "../UI/Button/ButtonSimple";
import NoteAlert from "../Alerts/NoteAlert";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import labelIcon from "../../Data/Images/Icons/label.svg";
import ColorPicker from "../UI/ColorPicker/ColorPicker";

const NewNote = () => {
  const {
    state,
    dispatch,
    newNote,
    setNewNote,
    noteText,
    setNoteText,
    editNote,
    setEditNote,
    noteColor,
    setNoteColor,
    showColor,
    setShowColor,
    editModal,
    setEditModal,
  } = usePebbleNote();

  const { newInputTitle, showInput } = state;

  const {
    alertState: { emptyNoteError, unSavedError },
    alertDispatch,
  } = useAlert();

  const { darkTheme } = useTheme();
  const { addNoteOnServer, updateNoteOnServer } = useAxiosCalls();
  const { auth } = useAuth();

  const initialNoteDetails = {
    title: "",
    pinned: false,
    tags: [],
    date: new Date().toLocaleDateString(),
  };

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["blockquote", "code-block"],
      ["link", "image", "video"],
    ],
  };

  const newNoteConfig = {
    url: "/api/notes",
    body: { note: { ...newNote, text: noteText, color: noteColor } },
    headers: { headers: { authorization: auth.token } },
  };

  const updateNoteConfig = {
    url: `/api/notes/${newNote._id}`,
    body: {
      note: { ...newNote, text: noteText },
    },
    headers: { headers: { authorization: auth.token } },
  };

  const clickOnNewNoteHandler = () => {
    dispatch({ type: "clickOnNewNoteHandler" });
  };

  const onSubmitHandler = () => {
    if (
      newNote.title.trim() === "" &&
      (noteText === "" || noteText === "<p><br></p>")
    ) {
      alertDispatch({ type: "emptyNoteError" });
    } else {
      if (editNote) {
        updateNoteOnServer(updateNoteConfig);
        alertDispatch({ type: "alertNoteEdited" });
      } else {
        addNoteOnServer(newNoteConfig);
        alertDispatch({ type: "alertNewAdded" });
      }
    }
    setNewNote(initialNoteDetails);
    setShowColor(false);
    setNoteText("");
    setNoteColor("#f0fbff");
    setEditNote(false);
  };

  // alerts on clicking close button
  const clickOnCloseNewNote = () => {
    if (
      unSavedError &&
      newNote.title.trim() === "" &&
      (noteText === "" || noteText === "<p><br></p>")
    ) {
      alertDispatch({ type: "hideInputField" });
      setNewNote(initialNoteDetails);
      setNoteText("");
    } else if (
      newNote.title.trim() === "" &&
      (noteText === "" || noteText === "<p><br></p>")
    ) {
      alertDispatch({ type: "hideInputField" });
      setNewNote(initialNoteDetails);
      setNoteText("");
    } else {
      alertDispatch({ type: "hideInputWithData" });
    }
    setShowColor(false);
    setNoteColor("#f0fbff");
  };

  // new note input data
  const newInputOnChangeHandler = (e) => {
    setNewNote((oldData) => {
      return {
        ...oldData,
        title: e.target.value,
      };
    });
  };

  const showColorPaletteHandler = () => {
    setShowColor(true);
  };

  const hideColorPaletteHandler = () => {
    setShowColor(false);
  };

  // unsaved alert - delete handler
  const unsavedAlertDeleteHandler = () => {
    alertDispatch({ type: "dontSave" });
    setEditModal(false);
    setNewNote(initialNoteDetails);
    setShowColor(false);
    setNoteText("");
    setNoteColor("#f0fbff");
    setEditNote(false);
  };

  // unsaved alert - save handler
  const unsavedAlertSaveHandler = () => {
    alertDispatch({ type: "noteSavedAlert" });
    onSubmitHandler();
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
      <div
        className={darkThemeClass}
        style={{ backgroundColor: editModal ? "#f0fbff" : noteColor }}
      >
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
            style={{ backgroundColor: editModal ? "#f0fbff" : noteColor }}
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
                style={{ backgroundColor: noteColor }}
              />
            </div>

            <div className="new-note-nav-btn">
              <div className="note-nav-btn-left">
                <div onMouseLeave={hideColorPaletteHandler}>
                  <button
                    onMouseEnter={showColorPaletteHandler}
                    className="btn icon-btn-md"
                  >
                    <i className="fas fa-palette"></i>
                  </button>
                  {showColor && <ColorPicker setter={setNoteColor} />}
                </div>
                <img src={labelIcon} alt="label-icon" className="nav-icons" />
                <h2>{newNote.date}</h2>
              </div>
              <div className="note-nav-btn-right">
                <ButtonSimple
                  onClick={onSubmitHandler}
                  btnClassName="btn primary-btn-md"
                  label={editNote ? "Edit" : "Add"}
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
      </div>
    </>
  );
};

export default NewNote;
