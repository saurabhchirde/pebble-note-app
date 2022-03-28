import Note from "../../Components/Note/Note";
import { usePebbleNote } from "../../Context/PebbleNoteProvider";
import { useEffect } from "react";
import ButtonSimple from "../../Components/UI/Button/ButtonSimple";

const TrashPage = () => {
  const { state, dispatch } = usePebbleNote();
  const { deletedNotes, deletedMsgNotification, errorMsgForEmptyTrash } = state;

  useEffect(() => {
    localStorage.setItem("deletedNotes", JSON.stringify(deletedNotes));
  }, [deletedNotes]);

  const emptyTrashClickHandler = () => {
    if (state.deletedNotes.length < 1) {
      dispatch({ type: "errorMsgForEmptyTrash" });
      setTimeout(() => {
        dispatch({ type: "hideDeletedMsgNotification" });
      }, 3000);
    } else {
      dispatch({ type: "emptyTrash" });
      setTimeout(() => {
        dispatch({ type: "hideDeletedMsgNotification" });
      }, 3000);
    }
  };

  return (
    <>
      <div className="body-content">
        {deletedMsgNotification && (
          <div className="alert-success">
            <i className="fas fa-check-circle alert-icon"></i>
            <span className="p-md">Trash cleared successfully</span>
          </div>
        )}
        {errorMsgForEmptyTrash && (
          <div className="alert-info">
            <i className="fas fa-info alert-icon"></i>
            <span className="p-md">No items in your Trash</span>
          </div>
        )}
        <div className="flex-row-center flex-justify-space-between mg-point6-rt mg-2-bot">
          <p>
            Trash will be automatically cleared after <strong> 30 days</strong>.
          </p>
          <ButtonSimple
            label="Empty Trash"
            btnClassName="btn secondary-outline-btn-md"
            onClick={emptyTrashClickHandler}
          />
        </div>
        <div className="allNotes">
          {deletedNotes.map((item) => {
            return (
              <Note
                title={item.title}
                text={item.text}
                id={item.id}
                key={item.id}
                icon={"fas fa-undo"}
                action="restore"
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default TrashPage;
