import Note from "../../Components/Note/Note";
import { usePebbleNote } from "../../Context";
import { useEffect } from "react";
import ButtonSimple from "../../Components/UI/Button/ButtonSimple";
import NoteAlert from "../../Components/Alerts/NoteAlert";
import "./TrashPage.css";

const TrashPage = () => {
  const { state, dispatch } = usePebbleNote();
  const {
    deletedNotes,
    deletedMsgNotification,
    errorMsgForEmptyTrash,
    noteRestoredAlert,
  } = state;

  useEffect(() => {
    localStorage.setItem("deletedNotes", JSON.stringify(deletedNotes));
  }, [deletedNotes]);

  const emptyTrashClickHandler = () => {
    if (state.deletedNotes.length < 1) {
      dispatch({ type: "errorMsgForEmptyTrash" });
    } else {
      dispatch({ type: "emptyTrash" });
    }
  };

  return (
    <div className="body-content">
      {deletedMsgNotification && (
        <NoteAlert
          alert="alert-success"
          icon="fas fa-check-circle alert-icon"
          text="Trash cleared successfully"
          dispatchType="hideDeletedMsgNotification"
        />
      )}
      {errorMsgForEmptyTrash && (
        <NoteAlert
          alert="alert-info"
          icon="fas fa-info alert-icon"
          text="No items to delete"
          dispatchType="hideDeletedMsgNotification"
        />
      )}
      {noteRestoredAlert && (
        <NoteAlert
          alert="alert-info"
          icon="fas fa-info alert-icon"
          text="Note has been restored to inbox"
          dispatchType="hideRestoredAlert"
        />
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
        {deletedNotes.length < 1 ? (
          <i className="fas fa-trash-alt trash-page"></i>
        ) : (
          deletedNotes.map((item) => {
            return (
              <Note
                item={item}
                key={item._id}
                icon={"fas fa-undo"}
                restoreAction="restore"
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default TrashPage;
