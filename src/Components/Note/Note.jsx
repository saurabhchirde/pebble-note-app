import "./Note.css";
import pin1 from "../../Data/Images/Icons/pin1.svg";
import pin2 from "../../Data/Images/Icons/pin2.svg";
import ButtonIcon from "../UI/Button/ButtonIcon";
import {
  useAlert,
  useAuth,
  useAxiosCalls,
  usePebbleNote,
  useTheme,
} from "../../Context";
import archiveIcon from "../../Data/Images/Icons/archive.svg";
import unarchiveIcon from "../../Data/Images/Icons/unarchive.svg";
import ColorPicker from "../UI/ColorPicker/ColorPicker";
import { useEffect, useState } from "react";

const Note = ({
  item,
  icon,
  pinAction,
  delAction,
  archiveAction,
  restoreAction,
}) => {
  const { title, text, color, _id } = item;
  const {
    dispatch,
    setNewNote,
    setNoteText,
    setNoteColor,
    setEditNote,
    editModal,
    setEditModal,
  } = usePebbleNote();

  const { alertDispatch } = useAlert();
  const { darkTheme } = useTheme();
  const {
    addToTrashOnServer,
    addNoteOnServer,
    updateNoteOnServer,
    addNoteToArchiveOnServer,
    restoreArchiveFromServer,
  } = useAxiosCalls();
  const { auth } = useAuth();
  const [showColorForNote, setShowColorForNote] = useState(false);
  const [singleNoteColor, setSingleNoteColor] = useState(false);

  useEffect(() => {
    setSingleNoteColor(color);
  }, [color]);

  const updateNoteConfig = {
    url: `/api/notes/${_id}`,
    body: {
      note: {
        ...item,
        color: singleNoteColor,
        pinned: pinAction === "pinnedNote" ? false : true,
      },
    },
    headers: { headers: { authorization: auth.token } },
  };

  const delNoteConfig = {
    url: `/api/notes/${_id}`,
    headers: { headers: { authorization: auth.token } },
  };

  const restoreFromTrashConfig = {
    url: "/api/notes",
    body: { note: { ...item } },
    headers: { headers: { authorization: auth.token } },
  };

  const archiveNoteConfig = {
    url: `/api/notes/archives/${_id}`,
    body: { note: { ...item } },
    headers: { headers: { authorization: auth.token } },
  };

  const restoreFromArchiveConfig = {
    url: `/api/archives/restore/${_id}`,
    headers: { headers: { authorization: auth.token } },
  };

  const pinClickHandler = () => {
    pinAction === "pinnedNote"
      ? alertDispatch({ type: "alertUnPinned" })
      : alertDispatch({ type: "alertPinned" });
    updateNoteOnServer(updateNoteConfig);
  };

  const onOutsideClickHandler = () => {
    setShowColorForNote(false);
  };

  const showColorPaletteHandler = () => {
    setShowColorForNote(true);
  };

  const hideColorPaletteHandler = () => {
    setShowColorForNote(false);
  };

  // label
  const removeLabelsHandler = (label) => {
    dispatch({ type: "removeLabelFromNote", payload: label });

    const updateLabelsConfig = {
      ...updateNoteConfig,
      body: {
        note: {
          ...item,
          labels: item.labels.filter((el) => {
            return el !== label;
          }),
        },
      },
    };

    updateNoteOnServer(updateLabelsConfig);
  };

  const delRestoreNoteHandler = () => {
    if (delAction === "del") {
      addToTrashOnServer(delNoteConfig);
      dispatch({ type: "deleteNote", payload: item });
      alertDispatch({ type: "alertDeleted" });
    } else {
      addNoteOnServer(restoreFromTrashConfig);
      dispatch({ type: "restoreNote", payload: item });
      alertDispatch({ type: "alertRestored" });
    }
  };

  const editNoteHandler = () => {
    setEditNote(true);
    setEditModal(true);
    dispatch({ type: "editNote" });
    setNewNote(item);
    setNoteText(text);
    setNoteColor(color);
  };

  const archiveNoteHandler = () => {
    if (archiveAction === "archive") {
      addNoteToArchiveOnServer(archiveNoteConfig);
      alertDispatch({ type: "alertArchived" });
    } else {
      restoreArchiveFromServer(restoreFromArchiveConfig);
      alertDispatch({ type: "alertUnArchived" });
    }
  };

  const pinSrc = pinAction === "pinnedNote" ? pin2 : pin1;
  const trashEditIcon = restoreAction === "restore" ? false : true;
  const hideEditIcon =
    restoreAction !== "restore" && archiveAction === "archive" ? true : false;

  const showArchiveIcon =
    archiveAction === "restore" ? unarchiveIcon : archiveIcon;

  const hidePinIcon =
    archiveAction !== "restore" && restoreAction !== "restore" ? true : false;

  const hideDelButton = archiveAction === "restore" ? false : true;

  const darkThemeClass = darkTheme
    ? "note-container card-shadow-two dark-mode-card"
    : "note-container card-shadow-two";

  return (
    <>
      <div
        className="note-backdrop"
        onDoubleClick={onOutsideClickHandler}
      ></div>
      <div
        className={darkThemeClass}
        style={{ backgroundColor: singleNoteColor }}
      >
        {hidePinIcon && (
          <div onClick={pinClickHandler} className="pin-icon">
            <img src={pinSrc} alt="pin" />
          </div>
        )}
        <h2>{title}</h2>
        <div className="note-text" dangerouslySetInnerHTML={{ __html: text }} />
        {item.labels.length > 0 ? (
          <div
            className="new-note-label"
            style={{ backgroundColor: editModal ? "#f0fbff" : singleNoteColor }}
          >
            {item.labels.map((label, index) => {
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
        <div className="note-nav-btn">
          <div onMouseLeave={hideColorPaletteHandler}>
            {hideEditIcon && (
              <button
                onMouseEnter={showColorPaletteHandler}
                className="btn icon-btn-md"
              >
                <i className="fas fa-palette"></i>
              </button>
            )}
            {showColorForNote && <ColorPicker setter={setSingleNoteColor} />}
          </div>
          {hideDelButton && (
            <ButtonIcon
              onClick={delRestoreNoteHandler}
              btnClassName="btn icon-btn-sm"
              icon={icon}
            />
          )}
          {trashEditIcon && (
            <div onClick={archiveNoteHandler} className="note-icons">
              <img
                src={showArchiveIcon}
                alt="icon"
                className="archive-btn-icon"
              />
            </div>
          )}
          {hideEditIcon && (
            <ButtonIcon
              onClick={editNoteHandler}
              btnClassName="btn icon-btn-sm"
              icon="fas fa-edit"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Note;
