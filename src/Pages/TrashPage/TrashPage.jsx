import Note from "../../Components/Note/Note";
import { usePebbleNote } from "../../Context";
import { useEffect } from "react";
import ButtonSimple from "../../Components/UI/Button/ButtonSimple";
import "./TrashPage.css";
import { AlertToast } from "../../Components/Alerts/AlertToast";

const TrashPage = () => {
  const { state, dispatch } = usePebbleNote();
  const { deletedNotes } = state;

  useEffect(() => {
    localStorage.setItem("deletedNotes", JSON.stringify(deletedNotes));
  }, [deletedNotes]);

  const emptyTrashClickHandler = () => {
    if (state.deletedNotes.length < 1) {
      AlertToast("info", "No items to delete");
    } else {
      dispatch({ type: "emptyTrash" });
      AlertToast("success", "Trash cleared successfully");
    }
  };

  return (
    <div className="body-content">
      <div className="trash-page-title flex-row mg-point6-rt mg-2-bot">
        <p className="mg-1-lr">
          Trash will be automatically cleared after <strong> 30 days</strong>.
        </p>
        <ButtonSimple
          label="Empty Trash"
          btnClassName="btn primary-outline-btn-md"
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

export { TrashPage };
