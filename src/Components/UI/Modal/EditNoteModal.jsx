import { useAlert, useAuth, useAxiosCalls, usePebbleNote } from "Context";
import "./EditNoteModal.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ColorPicker from "../ColorPicker/ColorPicker";
import { AlertToast } from "../../Alerts/AlertToast";

const EditNoteModal = () => {
  const {
    newNote,
    setNewNote,
    noteText,
    setNoteText,
    editNote,
    noteColor,
    setNoteColor,
    showColor,
    setShowColor,
    setEditNote,
    setEditModal,
    initialNoteDetails,
  } = usePebbleNote();
  const {
    alertState: { unSavedError },
    alertDispatch,
  } = useAlert();
  const { addNoteOnServer, updateNoteOnServer } = useAxiosCalls();
  const { auth } = useAuth();

  const newNoteConfig = {
    url: "/api/notes",
    body: { note: { ...newNote } },
    headers: { headers: { authorization: auth.token } },
  };

  const updateNoteConfig = {
    url: `/api/notes/${newNote._id}`,
    body: {
      note: { ...newNote, text: noteText, color: noteColor },
    },
    headers: { headers: { authorization: auth.token } },
  };

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["blockquote", "code-block"],
      ["link", "image", "video"],
    ],
  };

  const closeEditModal = () => {
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
    setNoteColor("");
  };

  const onChangeHandler = (e) => {
    setNewNote((oldData) => {
      return {
        ...oldData,
        title: e.target.value,
      };
    });
  };

  const seveNoteClick = () => {
    if (
      newNote.title.trim() === "" &&
      (noteText === "" || noteText === "<p><br></p>")
    ) {
      AlertToast("error", "Input cannot be blank, try again.");
      setEditModal(true);
    } else {
      if (editNote) {
        updateNoteOnServer(updateNoteConfig);
      } else {
        addNoteOnServer(newNoteConfig);
      }
      setEditNote(false);
      setEditModal(false);
      setNewNote(initialNoteDetails);
      setShowColor(false);
      setNoteText("");
      setNoteColor("");
    }
  };

  const showColorPaletteHandler = () => {
    setShowColor((show) => !show);
  };

  const hideColorPaletteHandler = () => {
    setShowColor(false);
  };

  return (
    <>
      <div className="modal-backdrop"></div>
      <div className="signin-modal" style={{ backgroundColor: noteColor }}>
        <a onClick={closeEditModal}>
          <i className="fas fa-times"></i>
        </a>
        <div className="edit-modal mg-1-top">
          <p className="mg-point6-bot">Title</p>
          <div className="edit-title">
            <input
              onChange={onChangeHandler}
              type="text"
              name="title"
              autoComplete="off"
              value={newNote.title}
              style={{ backgroundColor: noteColor }}
            />
          </div>
          <div className="edit-text rich-text-editor">
            <ReactQuill
              modules={modules}
              value={noteText}
              placeholder="Take a note..."
              onChange={setNoteText}
              className="text-editor"
              style={{ backgroundColor: noteColor }}
            />
          </div>
          <div className="note-nav-btn-left">
            <div onMouseLeave={hideColorPaletteHandler}>
              <button
                onClick={showColorPaletteHandler}
                className="btn icon-btn-md"
              >
                <i className="fas fa-palette"></i>
              </button>
              {showColor && <ColorPicker setter={setNoteColor} />}
            </div>
          </div>
          <div className="signin-btn edit-modal-btn">
            <button
              onClick={seveNoteClick}
              type="submit"
              className="btn primary-btn-md"
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
