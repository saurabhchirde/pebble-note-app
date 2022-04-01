import "./Note.css";
import pin1 from "../../Data/Images/Icons/pin1.svg";
import pin2 from "../../Data/Images/Icons/pin2.svg";
import ButtonIcon from "../UI/Button/ButtonIcon";
import { useAuth, useAxiosCalls, usePebbleNote, useTheme } from "../../Context";
import archiveIcon from "../../Data/Images/Icons/archive.svg";
import unarchiveIcon from "../../Data/Images/Icons/unarchive.svg";

const Note = (props) => {
  const { dispatch, setNewNote, setEditModal } = usePebbleNote();
  const { darkTheme } = useTheme();
  const {
    addToTrashOnServer,
    addNoteOnServer,
    addNoteToArchiveOnServer,
    restoreArchiveFromServer,
  } = useAxiosCalls();
  const { auth } = useAuth();

  const delNoteConfig = {
    url: `/api/notes/${props._id}`,
    headers: { headers: { authorization: auth.token } },
  };

  const restoreFromTrashConfig = {
    url: "/api/notes",
    body: { note: { ...props } },
    headers: { headers: { authorization: auth.token } },
  };

  const archiveNoteConfig = {
    url: `/api/notes/archives/${props._id}`,
    body: { note: { ...props } },
    headers: { headers: { authorization: auth.token } },
  };

  const restoreFromArchiveConfig = {
    url: `/api/archives/restore/${props._id}`,
    headers: { headers: { authorization: auth.token } },
  };

  const pinClickHandler = () => {
    dispatch({
      type: props.pinAction === "pinnedNote" ? "unPinNote" : "pinNote",
      payload: props,
    });
  };

  const delRestoreNoteHandler = () => {
    if (props.delAction === "del") {
      addToTrashOnServer(delNoteConfig);
      dispatch({ type: "deleteNote", payload: props });
    } else {
      addNoteOnServer(restoreFromTrashConfig);
      dispatch({ type: "restoreNote", payload: props });
    }
  };

  const editNoteHandler = () => {
    setEditModal(true);
    addToTrashOnServer(delNoteConfig);
    //pinned on client side only
    if (props.editAction === "editPinned") {
      dispatch({ type: "editPinnedNote", payload: props });
    } else if (props.editAction === "editUnPinned") {
      dispatch({ type: "editUnPinned", payload: props });
    } else if (props.editAction === "editArchive") {
      dispatch({ type: "editArchived", payload: props });
    }
    setNewNote({
      title: props.title,
      color: props.color,
      tags: props.tags,
    });
  };

  const archiveNoteHandler = () => {
    props.archiveAction === "archive"
      ? addNoteToArchiveOnServer(archiveNoteConfig)
      : restoreArchiveFromServer(restoreFromArchiveConfig);
  };

  const pinSrc = props.pinAction === "pinnedNote" ? pin2 : pin1;
  const trashEditIcon = props.restoreAction === "restore" ? false : true;
  const hideEditIcon =
    props.restoreAction !== "restore" && props.archiveAction === "archive"
      ? true
      : false;

  const showArchiveIcon =
    props.archiveAction === "restore" ? unarchiveIcon : archiveIcon;

  const hidePinIcon =
    props.archiveAction !== "restore" && props.restoreAction !== "restore"
      ? true
      : false;

  const hideDelButton = props.archiveAction === "restore" ? false : true;

  const darkThemeClass = darkTheme
    ? "note-container card-shadow-two dark-mode-card"
    : "note-container card-shadow-two";

  return (
    <div className={darkThemeClass}>
      {hidePinIcon && (
        <div onClick={pinClickHandler} className="pin-icon">
          <img src={pinSrc} alt="pin" />
        </div>
      )}
      <h2>{props.title}</h2>
      <div
        className="note-text"
        dangerouslySetInnerHTML={{ __html: props.text }}
      />
      <div className="note-nav-btn">
        <ButtonIcon btnClassName="btn icon-btn-sm" icon="fas fa-palette" />
        {hideDelButton && (
          <ButtonIcon
            onClick={delRestoreNoteHandler}
            btnClassName="btn icon-btn-sm"
            icon={props.icon}
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
  );
};

export default Note;
