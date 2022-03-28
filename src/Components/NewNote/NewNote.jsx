import "./NewNote.css";
import { usePebbleNote } from "../../Context/PebbleNoteProvider";
import ButtonSimple from "../UI/Button/ButtonSimple";
import { v4 as uuid } from "uuid";

const NewNote = () => {
  const { state, dispatch, newNote, setNewNote, editModal, setEditModal } =
    usePebbleNote();
  const {
    newInputTitle,
    addState,
    showInput,
    emptyNoteError,
    unSavedError,
    pinNote,
  } = state;

  const clickOnNewNoteHandler = () => {
    dispatch({ type: "clickOnNewNoteHandler" });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (newNote.title.trim() === "" && newNote.text.trim() === "") {
      dispatch({ type: "emptyNoteError" });
      setTimeout(() => {
        dispatch({ type: "hideEmptyNoteError" });
      }, 3000);
    } else {
      if (!unSavedError) {
        if (pinNote) {
          dispatch({ type: "pinNote", payload: newNote });
        } else {
          dispatch({ type: "newNote", payload: newNote });
        }
      }
    }
    setNewNote({
      id: uuid(),
      title: "",
      text: "",
    });
  };

  const clickOnCloseNewNote = () => {
    if (unSavedError && newNote.title === "" && newNote.text === "") {
      dispatch({ type: "hideInputField" });
    } else if (newNote.title === "" && newNote.text === "") {
      dispatch({ type: "hideInputField" });
    } else {
      dispatch({ type: "hideInputWithData" });
    }
  };

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

  const unsavedAlertDeleteHandler = () => {
    dispatch({ type: "dontSave" });
    setNewNote({
      id: uuid(),
      title: "",
      text: "",
      pinned: false,
    });
    setEditModal(false);
  };

  const unsavedAlertSaveHandler = () => {
    if (state.pinNote) {
      dispatch({ type: "pinNote", payload: newNote });
    } else {
      dispatch({ type: "newNote", payload: newNote });
    }
    setNewNote({
      id: uuid(),
      title: "",
      text: "",
    });
    setEditModal(false);
  };

  return (
    <>
      <form onSubmit={onSubmitHandler} className="new-note-input">
        {emptyNoteError && (
          <div className="alert-error">
            <i className="fas fa-exclamation-circle alert-icon"></i>
            <span className="p-md">Input cannot be blank, try again.</span>
          </div>
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
