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
import NoteAlert from "../Alerts/NoteAlert";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import labelIcon from "../../Data/Images/Icons/label.svg";
import filterIcon from "../../Data/Images/Icons/filter.svg";
import ColorPicker from "../UI/ColorPicker/ColorPicker";
import NoteLabel from "../UI/NoteLabel/NoteLabel";
import ButtonIcon from "../UI/Button/ButtonIcon";

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
    alertState: { emptyNoteError, emptyLabelError, unSavedError },
    alertDispatch,
  } = useAlert();

  const { darkTheme } = useTheme();
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
    setShowFilter(false);
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
    dispatch({ type: "noteSavedAlert" });
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
          {emptyLabelError && (
            <NoteAlert
              alert="alert-error"
              icon="fas fa-exclamation-circle alert-icon"
              text="Label cannot be blank, try again."
              dispatchType="hideEmptyLabelError"
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
            <img
              src={filterIcon}
              alt="icon"
              className="filter-icon"
              onClick={onFilterToggle}
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
                  className={darkThemeEditor}
                  style={{ backgroundColor: noteColor }}
                />
              </div>
              <div className="new-note-nav-btn">
                <div className="note-nav-btn-left">
                  <div onMouseLeave={hideColorPaletteHandler}>
                    <button
                      onMouseEnter={showColorPaletteHandler}
                      className="btn icon-btn-sm"
                    >
                      <i className="fas fa-palette"></i>
                    </button>
                    {showColor && <ColorPicker setter={setNoteColor} />}
                  </div>
                  <div
                    className="flex-row-center"
                    onMouseLeave={hideLabelInputHandler}
                  >
                    <img
                      onMouseEnter={showLabelInputHandler}
                      src={labelIcon}
                      alt="label-icon"
                      className="nav-icons"
                    />
                    {showLabel && <NoteLabel />}
                  </div>
                  <h2>{newNote.date}</h2>
                  <div className="set-priority">
                    <p>Priority</p>
                    <select
                      onChange={selectPriorityHandler}
                      value={newNote.priority}
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
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="new-note-label filter-section card-shadow-two"
            style={{ backgroundColor: editModal ? "#f0fbff" : noteColor }}
          >
            <div>
              <p>Date</p>
              <select onChange={onSortByDate} value={sortByDate}>
                <option>All</option>
                <option>New First</option>
                <option>Old First</option>
              </select>
            </div>
            <div>
              <p>Priority</p>
              <select onChange={onSortByPriority} value={sortByPriority}>
                <option>All</option>
                <option>Low</option>
                <option>High</option>
              </select>
            </div>
            <div>
              <p>Label</p>
              <select onChange={onSortByLabel} value={selectedLabel}>
                {allLabels.map((label, index) => {
                  return (
                    <option key={index} className="single-label">
                      {label}
                    </option>
                  );
                })}
              </select>
            </div>
            <button
              onClick={onResetFilterHandler}
              className="btn secondary-text-btn-sm"
              type="reset"
            >
              Reset Filter
            </button>
          </form>
        )}
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
