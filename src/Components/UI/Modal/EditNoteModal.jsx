import {
  useAuth,
  useAxiosCalls,
  usePebbleNote,
  useTheme,
} from "../../../Context";
import "./EditNoteModal.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import labelIcon from "../../../Data/Images/Icons/label.svg";
import ButtonIcon from "../Button/ButtonIcon";
import ColorPicker from "../ColorPicker/ColorPicker";

const EditNoteModal = () => {
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
  const { newInputTitle, showInput, emptyNoteError, unSavedError } = state;
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
      note: { ...newNote, text: noteText },
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

  const initialNoteDetails = {
    title: "",
    pinned: false,
    tags: [],
    date: new Date().toLocaleDateString(),
  };

  const closeEditModal = () => {
    if (
      unSavedError &&
      newNote.title.trim() === "" &&
      (noteText === "" || noteText === "<p><br></p>")
    ) {
      dispatch({ type: "hideInputField" });
      setNewNote(initialNoteDetails);
      setNoteText("");
    } else if (
      newNote.title.trim() === "" &&
      (noteText === "" || noteText === "<p><br></p>")
    ) {
      dispatch({ type: "hideInputField" });
      setNewNote(initialNoteDetails);
      setNoteText("");
    } else {
      dispatch({ type: "hideInputWithData" });
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
      dispatch({ type: "emptyNoteError" });
      setTimeout(() => {
        dispatch({ type: "hideEmptyNoteError" });
      }, 3000);
      setEditModal(true);
    } else {
      if (editNote) {
        updateNoteOnServer(updateNoteConfig);
      } else {
        addNoteOnServer(newNoteConfig);
      }
    }
    setNewNote(initialNoteDetails);
    setShowColor(false);
    setNoteText("");
    setNoteColor("#f0fbff");
    setEditNote(false);
  };

  const colorPaletteHandler = () => {
    setShowColor((showPalette) => !showPalette);
  };

  const changeNoteColorHandler = (e) => {
    setNoteColor(e.target.value);
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
              <ReactQuill
                modules={modules}
                value={noteText}
                placeholder="Take a note..."
                onChange={setNoteText}
                className={darkThemeEditor}
                style={{ backgroundColor: noteColor }}
              />
            </div>
          </div>
          <div className="note-nav-btn-left">
            <ButtonIcon
              btnClassName="btn icon-btn-md"
              icon="fas fa-palette"
              onMouseEnter={colorPaletteHandler}
            />
            {showColor && (
              <ColorPicker
                onChange={changeNoteColorHandler}
                label={noteColor}
                value={noteColor}
              />
            )}
            <img src={labelIcon} alt="label-icon" className="nav-icons" />
            <h2>{newNote.date}</h2>
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
