import { useAuth, useAxiosCalls, usePebbleNote } from "../../../Context";
import "./EditNoteModal.css";

const EditNoteModal = () => {
  const { state, newNote, setNewNote, dispatch, setEditModal } =
    usePebbleNote();
  const { addNoteOnServer, addNoteToArchiveOnServer } = useAxiosCalls();
  const { auth } = useAuth();

  const newNoteConfig = {
    url: "/api/notes",
    body: { note: { ...newNote } },
    headers: { headers: { authorization: auth.token } },
  };

  const archiveNoteConfig = {
    url: `/api/notes/archives/${newNote._id}`,
    body: { note: { ...newNote } },
    headers: { headers: { authorization: auth.token } },
  };

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
        addNoteOnServer(newNoteConfig);
        setEditModal(false);
      }
    }
    setNewNote({
      title: "",
      text: "",
      tags: [],
    });
  };

  return (
    <>
      <div className="modal-backdrop"></div>
      <div className="signin-modal">
        <a onClick={closeEditModal}>
          <i className="fas fa-times"></i>
        </a>
        <div className="mg-1-top">
          <div className="mg-1-bot">
            Title
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
            Text
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
