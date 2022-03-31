import { usePebbleNote } from "../../../Context";
import { v4 as uuid } from "uuid";
import "./EditNoteModal.css";

const EditNoteModal = () => {
  const { state, newNote, setNewNote, dispatch, setEditModal } =
    usePebbleNote();

  const closeEditModal = () => {
    if (
      (state.unSavedError &&
        newNote.title.trim() === "" &&
        newNote.text.trim() === "") ||
      (newNote.title.trim() === "" && newNote.text.trim() === "")
    ) {
      dispatch({ type: "hideInputField" });
      setEditModal(false);
    } else {
      dispatch({ type: "hideInputWithData" });
    }
  };

  const onChangeHandler = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setNewNote((oldNote) => {
      return {
        ...oldNote,
        [name]: value,
      };
    });
  };

  const seveNoteClick = () => {
    if (newNote.title.trim() === "" && newNote.text.trim() === "") {
      dispatch({ type: "emptyNoteError" });
      setTimeout(() => {
        dispatch({ type: "hideEmptyNoteError" });
      }, 3000);
      setEditModal(true);
    } else {
      if (!state.unSavedError) {
        if (state.pinNote) {
          dispatch({ type: "pinNote", payload: newNote });
        } else {
          dispatch({ type: "newNote", payload: newNote });
        }
        setEditModal(false);
      }
    }
    setNewNote({
      id: uuid(),
      title: "",
      text: "",
    });
  };

  return (
    <>
      <div className="modal-backdrop"></div>
      <div className="signin-modal">
        <a onClick={closeEditModal}>
          <i className="fas fa-times"></i>
        </a>
        <div className="edit-note- mg-1-top">
          <div>
            <div className="input-icon">
              <textarea
                onChange={onChangeHandler}
                type="text"
                name="title"
                autoComplete="off"
                className="note-title-area"
                value={newNote.title}
              />
            </div>
          </div>
          <div>
            <div className="input-icon">
              <textarea
                onChange={onChangeHandler}
                type="text"
                name="text"
                autoComplete="off"
                className="note-text-area"
                value={newNote.text}
              />
            </div>
          </div>
          <div className="signin-btn edit-modal-btn">
            <button
              onClick={seveNoteClick}
              type="submit"
              className="btn primary-btn-md"
              disabled={state.unSavedError}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditNoteModal;
