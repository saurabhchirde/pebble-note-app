import "./Note.css";
import pin1 from "../../Data/Images/Icons/pin1.svg";
import pin2 from "../../Data/Images/Icons/pin2.svg";
import ButtonIcon from "../UI/Button/ButtonIcon";
import { usePebbleNote } from "../../Context";

const Note = (props) => {
  const { state, dispatch, setNewNote, setEditModal } = usePebbleNote();

  const pinClickHandler = () => {
    dispatch({
      type: props.pinAction === "pinnedNote" ? "unPinNote" : "pinNote",
      payload: props,
    });
  };

  const delRestoreIconClickHandler = () => {
    dispatch({
      type: props.delAction === "del" ? "deleteNote" : "restoreNote",
      payload: props,
    });
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
  const archiveIcon =
    props.archiveAction === "restore" ? "fas fa-upload" : "fas fa-file-archive";
  const hidePinInArchive = props.archiveAction === "restore" ? false : true;

  return (
    <div className="note-container">
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
          <ButtonIcon
            onClick={archiveIconClickHandler}
            btnClassName="btn icon-btn-sm"
            icon={archiveIcon}
          />
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
