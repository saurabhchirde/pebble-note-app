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
    url: `/api/notes/${props.id}`,
    headers: { headers: { authorization: auth.token } },
  };

  const restoreFromTrashConfig = {
    url: "/api/notes",
    body: { note: { ...props } },
    headers: { headers: { authorization: auth.token } },
  };

  const archiveNoteConfig = {
    url: `/api/notes/archives/${props.id}`,
    body: { note: { ...props } },
    headers: { headers: { authorization: auth.token } },
  };

  const restoreFromArchiveConfig = {
    url: `/api/archives/restore/${props.id}`,
    headers: { headers: { authorization: auth.token } },
  };

  const pinClickHandler = () => {
    dispatch({
      type: props.pinAction === "pinnedNote" ? "unPinNote" : "pinNote",
      payload: props,
    });
  };

  const delRestoreIconClickHandler = () => {
    props.delAction === "del"
      ? addToTrashOnServer(delNoteConfig)
      : addNoteOnServer(restoreFromTrashConfig);

    // dispatch({
    //   type: props.delAction === "del" ? "deleteNote" : "restoreNote",
    //   payload: props,
    // });
  };

  const editIconClickHandler = () => {
    setEditModal(true);
    if (props.editAction === "editPinned") {
      dispatch({ type: "editPinnedNote", payload: props });
    } else if (props.editAction === "editUnPinned") {
      dispatch({ type: "editUnPinned", payload: props });
    } else if (props.editAction === "editArchive") {
      dispatch({ type: "editArchived", payload: props });
    }
    setNewNote({
      id: props.id,
      title: props.title,
      text: props.text,
    });
  };

  const archiveIconClickHandler = () => {
    props.archiveAction === "archive"
      ? addNoteToArchiveOnServer(archiveNoteConfig)
      : restoreArchiveFromServer(restoreFromArchiveConfig);

    dispatch({
      type:
        props.archiveAction === "archive"
          ? props.pinAction === "pinnedNote"
            ? "addPinnedToArchive"
            : "addToArchive"
          : "removeFromArchive",
      payload: props,
    });
  };

  const pinSrc = props.pinAction === "pinnedNote" ? pin2 : pin1;
  const trashEditIcon = props.restoreAction === "restore" ? false : true;
  const showArchiveIcon =
    props.archiveAction === "restore" ? unarchiveIcon : archiveIcon;
  const hidePinInArchive = props.archiveAction === "restore" ? false : true;
  const darkThemeClass = darkTheme
    ? "note-container dark-mode-card"
    : "note-container";

  return (
    <div className={darkThemeClass}>
      {trashEditIcon && hidePinInArchive && (
        <div onClick={pinClickHandler} className="pin-icon">
          <img src={pinSrc} alt="pin" />
        </div>
      )}
      <h2>{props.title}</h2>
      <h3 placeholder="Note text will appear here">{props.text}</h3>
      <div className="note-nav-btn">
        <ButtonIcon
          onClick={delRestoreIconClickHandler}
          btnClassName="btn icon-btn-sm"
          icon={props.icon}
        />
        {trashEditIcon && (
          <div onClick={archiveIconClickHandler} className="note-icons">
            <img src={showArchiveIcon} alt="icon" />
          </div>
        )}
        {trashEditIcon && (
          <ButtonIcon
            onClick={editIconClickHandler}
            btnClassName="btn icon-btn-sm"
            icon="fas fa-edit"
          />
        )}
      </div>
    </div>
  );
};

export default Note;
