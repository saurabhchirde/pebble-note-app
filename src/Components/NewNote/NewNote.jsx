import "./NewNote.css";
import {
  useAlert,
  useAuth,
  useAxiosCalls,
  useFilter,
  usePebbleNote,
  useTheme,
} from "../../Context";
import ButtonSimple from "../UI/Button/ButtonSimple";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import labelIcon from "../../Data/Images/Icons/label.svg";
import ColorPicker from "../UI/ColorPicker/ColorPicker";
import NoteLabel from "../UI/NoteLabel/NoteLabel";
import ButtonIcon from "../UI/Button/ButtonIcon";
import { FilterIconSvg } from "./FilterIconSvg/FilterIconSvg";
import { AllLabels } from "./AllLabels/AllLabels";
import { FilterSection } from "./FilterSection/FilterSection";
import { AlertToast } from "../Alerts/AlertToast";

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

  const { newInputTitle, showInput, tempLabels, allLabels } = state;

  const {
    alertState: { unSavedError },
    alertDispatch,
  } = useAlert();

  const { theme } = useTheme();
  const { addNoteOnServer, updateNoteOnServer } = useAxiosCalls();
  const { auth } = useAuth();
  const {
    filterState: { sortByDate, sortByPriority, selectedLabel },
    filterDispatch,
    showFilter,
    setShowFilter,
  } = useFilter();

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
    setNoteColor("");
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
    setShowFilter(false);
  };

  const onSubmitHandler = () => {
    if (
      newNote.title.trim() === "" &&
      (noteText === "" || noteText === "<p><br></p>")
    ) {
      AlertToast("error", "Input cannot be blank, try again.");
    } else {
      if (editNote) {
        updateNoteOnServer(updateNoteConfig);
        alertDispatch({ type: "alertNoteEdited" });
      } else {
        addNoteOnServer(newNoteConfig);
        AlertToast("success", "New Note added");
      }
    }
    dispatch({ type: "addLabelToAllLabels", payload: tempLabels });
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
    noteColor ? setNoteColor(noteColor) : setNoteColor("");
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
    setShowColor((show) => !show);
    setShowLabel(false);
  };

  const hidePaletteLabelHandler = () => {
    setShowColor(false);
    setShowLabel(false);
  };

  const showLabelInputHandler = () => {
    setShowLabel((show) => !show);
    setShowColor(false);
  };

  const onFilterToggle = () => {
    setShowFilter((show) => !show);
    dispatch({ type: "hideInputField" });
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
    AlertToast("info", "Note Saved");
    onSubmitHandler();
    setEditModal(false);
  };

  const onSortByDate = (e) => {
    filterDispatch({ type: "byDate", payload: e.target.value });
  };

  const onSortByPriority = (e) => {
    filterDispatch({ type: "byPriority", payload: e.target.value });
  };

  const onSortByLabel = (e) => {
    filterDispatch({ type: "byLabel", payload: e.target.value });
  };

  const onResetFilterHandler = () => {
    filterDispatch({ type: "resetFilter" });
  };

  // selecting priority
  const selectPriorityHandler = (e) => {
    setNewNote((oldData) => {
      return {
        ...oldData,
        priority: e.target.value,
      };
    });
  };

  // label
  const removeLabelsHandler = (label) => {
    dispatch({ type: "removeLabel", payload: label });
  };

  const filterIconColor =
    theme === "dark" ? (noteColor ? "black" : "white") : "black";

  return (
    <div className="new-note-main-container">
      <div
        className="new-note-input"
        style={{
          backgroundColor: editModal ? "" : noteColor,
        }}
      >
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
            style={{
              backgroundColor: editModal ? "" : noteColor,
              color: noteColor ? "black" : "",
            }}
          />
          <FilterIconSvg
            onFilterToggle={onFilterToggle}
            filterIconColor={filterIconColor}
          />
        </div>
        {showInput && (
          <div
            className="new-note-bottom-section"
            onClick={() => {
              setShowFilter(false);
            }}
          >
            <div className="rich-text-editor">
              <ReactQuill
                modules={modules}
                value={noteText}
                placeholder="Take a note..."
                onChange={setNoteText}
                className="text-editor"
                style={{
                  backgroundColor: noteColor,
                  color: noteColor ? "black" : "",
                }}
              />
            </div>
            <div className="new-note-nav-btn">
              <div
                className="note-nav-btn-left"
                onMouseLeave={hidePaletteLabelHandler}
              >
                <div>
                  <button
                    onClick={showColorPaletteHandler}
                    className="btn icon-btn-sm"
                  >
                    <i className="fas fa-palette"></i>
                  </button>
                  {showColor && <ColorPicker setter={setNoteColor} />}
                </div>
                <div className="flex-row-center pd-point6-all">
                  <img
                    onClick={showLabelInputHandler}
                    src={labelIcon}
                    alt="label-icon"
                    className="nav-icons"
                  />
                  {showLabel && <NoteLabel />}
                </div>
                <h2
                  style={{
                    color: noteColor ? "black" : "",
                  }}
                >
                  {newNote.date}
                </h2>
                <div className="set-priority">
                  <p
                    style={{
                      color: noteColor ? "black" : "",
                    }}
                  >
                    Priority
                  </p>
                  <select
                    onChange={selectPriorityHandler}
                    value={newNote.priority}
                    style={{ color: noteColor ? "black" : "" }}
                  >
                    <option>Low</option>
                    <option>High</option>
                  </select>
                </div>
              </div>
              <div className="note-nav-btn-right">
                <ButtonIcon
                  onClick={onSubmitHandler}
                  btnClassName="btn icon-btn-lg"
                  icon="fas fa-plus-circle"
                />
                <ButtonIcon
                  onClick={clickOnCloseNewNote}
                  btnClassName="btn icon-btn-lg"
                  icon="fas fa-times"
                />
              </div>
            </div>
          </div>
        )}
      </div>
      {showFilter && (
        <FilterSection
          editModal={editModal}
          noteColor={noteColor}
          onSortByDate={onSortByDate}
          sortByDate={sortByDate}
          onSortByPriority={onSortByPriority}
          sortByPriority={sortByPriority}
          onSortByLabel={onSortByLabel}
          selectedLabel={selectedLabel}
          allLabels={allLabels}
          onResetFilterHandler={onResetFilterHandler}
        />
      )}
      {tempLabels.length > 0 ? (
        <AllLabels
          editModal={editModal}
          noteColor={noteColor}
          tempLabels={tempLabels}
          removeLabelsHandler={removeLabelsHandler}
        />
      ) : null}
    </div>
  );
};

export default NewNote;
