import {
  useAlert,
  useAuth,
  useAxiosCalls,
  usePebbleNote,
  useTheme,
} from "../../../Context";
import "./EditNoteModal.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import labelIcon from "../../../Data/Images/Icons/label.svg";
import ColorPicker from "../ColorPicker/ColorPicker";

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
  const { darkTheme } = useTheme();

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
    setNoteColor("#f0fbff");
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
      alertDispatch({ type: "emptyNoteError" });
      setEditModal(true);
    } else {
      if (editNote) {
        updateNoteOnServer(updateNoteConfig);
        alertDispatch({ type: "alertNoteEdited" });
      } else {
        addNoteOnServer(newNoteConfig);
        alertDispatch({ type: "alertNewAdded" });
      }
      setEditNote(false);
      setEditModal(false);
      setNewNote(initialNoteDetails);
      setShowColor(false);
      setNoteText("");
      setNoteColor("#f0fbff");
    }
  };

  const showColorPaletteHandler = () => {
    setShowColor(true);
  };

  const hideColorPaletteHandler = () => {
    setShowColor(false);
  };

  const darkThemeClass = darkTheme
    ? "new-note-input card-shadow-two dark-mode-new-note"
    : "new-note-input card-shadow-two";

  const darkThemeEditor = darkTheme
    ? "text-editor dark-mode-new-note"
    : "text-editor ";

  return (
    <>
      <div className="modal-backdrop"></div>
      <div className="signin-modal" style={{ backgroundColor: noteColor }}>
        <a onClick={closeEditModal}>
          <i className="fas fa-times"></i>
        </a>
        <div className="edit-modal mg-1-top">
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
              className={darkThemeEditor}
              style={{ backgroundColor: noteColor }}
            />
          </div>
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
