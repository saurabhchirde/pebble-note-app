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
import NoteLabel from "../UI/NoteLabel/NoteLabel";

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
    showLabel,
    setShowLabel,
    editModal,
    setEditModal,
    initialNoteDetails,
  } = usePebbleNote();

  const { newInputTitle, showInput, tempLabels } = state;

  const {
    alertState: { emptyNoteError, unSavedError },
    alertDispatch,
  } = useAlert();

  const { darkTheme } = useTheme();
  const { addNoteOnServer, updateNoteOnServer } = useAxiosCalls();
  const { auth } = useAuth();

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["blockquote", "code-block"],
      ["link", "image", "video"],
    ],
  };

  const resetData = () => {
    setNewNote(initialNoteDetails);
    setShowColor(false);
    setNoteText("");
    setNoteColor("#ffffff");
    setEditNote(false);
    dispatch({ type: "clearTempLabel" });
  };

  const newNoteConfig = {
    url: "/api/notes",
    body: {
      note: {
        ...newNote,
        text: noteText,
        color: noteColor,
        labels: [...tempLabels],
      },
    },
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
    resetData();
  };

  // alerts on clicking close button
  const clickOnCloseNewNote = () => {
    if (
      unSavedError &&
      newNote.title.trim() === "" &&
      (noteText === "" || noteText === "<p><br></p>")
    ) {
      dispatch({ type: "hideInputField" });
      alertDispatch({ type: "hideInputField" });
      setNewNote(initialNoteDetails);
      setNoteText("");
    } else if (
      newNote.title.trim() === "" &&
      (noteText === "" || noteText === "<p><br></p>")
    ) {
      dispatch({ type: "hideInputField" });
      alertDispatch({ type: "hideInputField" });
      setNewNote(initialNoteDetails);
      setNoteText("");
    } else {
      alertDispatch({ type: "hideInputWithData" });
    }
    setShowColor(false);
    setNoteColor("#ffffff");
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

  const showLabelInputHandler = () => {
    setShowLabel(true);
  };

  const hideLabelInputHandler = () => {
    setShowLabel(false);
  };

  // unsaved alert - delete handler
  const unsavedAlertDeleteHandler = () => {
    alertDispatch({ type: "dontSave" });
    dispatch({ type: "dontSave" });
    setEditModal(false);
    resetData();
  };

  // unsaved alert - save handler
  const unsavedAlertSaveHandler = () => {
    alertDispatch({ type: "noteSavedAlert" });
    dispatch({ type: "noteSavedAlert" });
    onSubmitHandler();
    setEditModal(false);
  };

  // label
  const removeLabelsHandler = (label) => {
    dispatch({ type: "removeLabel", payload: label });
  };

  const darkThemeClass = darkTheme
    ? "new-note-input card-shadow-two dark-mode-new-note"
    : "new-note-input card-shadow-two";

  const darkThemeEditor = darkTheme
    ? "text-editor dark-mode-new-note"
    : "text-editor ";

  return (
    <>
      <div className="new-note-main-container">
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
                  <div onMouseLeave={hideLabelInputHandler}>
                    <img
                      onMouseEnter={showLabelInputHandler}
                      src={labelIcon}
                      alt="label-icon"
                      className="nav-icons"
                    />
                    {showLabel && <NoteLabel />}
                  </div>
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
        {tempLabels.length > 0 ? (
          <div
            className="new-note-label card-shadow-two"
            style={{ backgroundColor: editModal ? "#f0fbff" : noteColor }}
          >
            <p>Labels: </p>
            {tempLabels.map((label, index) => {
              return (
                <div key={index} className="single-label">
                  <li>{label}</li>
                  <i
                    className="fas fa-times"
                    onClick={() => {
                      removeLabelsHandler(label);
                    }}
                  ></i>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default NewNote;
