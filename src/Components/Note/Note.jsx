import "./Note.css";
import pin1 from "../../Data/Images/Icons/pin1.svg";
import pin2 from "../../Data/Images/Icons/pin2.svg";
import ButtonIcon from "../UI/Button/ButtonIcon";
import { usePebbleNote } from "../../Context";

const Note = (props) => {
  const { dispatch, setNewNote, setEditModal } = usePebbleNote();

  const pinClickHandler = () => {
    dispatch({
      type: props.pinAction === "unPinNote" ? "unPinNote" : "pinNote",
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
    } else {
      dispatch({ type: "editOtherNote", payload: props });
    }
    setNewNote({
      id: props.id,
      title: props.title,
      text: props.text,
    });
  };

  const pinSrc = props.pinAction === "unPinNote" ? pin2 : pin1;
  const trashEditIcon = props.restoreAction === "restore" ? false : true;

  return (
    <div className="note-container">
      {trashEditIcon && (
        <div onClick={pinClickHandler} className="pin-icon">
          <img src={pinSrc} alt="pin" />
        </div>
      )}
      <h2>{props.title}</h2>
      <h3 placeholder="Note text will appear here">{props.text}</h3>
      <div className="note-nav-btn">
        <ButtonIcon
          onClick={delRestoreIconClickHandler}
          btnClassName="btn icon-btn-xsm"
          icon={props.icon}
        />
        {trashEditIcon && (
          <ButtonIcon
            onClick={editIconClickHandler}
            btnClassName="btn icon-btn-xsm"
            icon="fas fa-edit"
          />
        )}
      </div>
    </div>
  );
};

export default Note;
