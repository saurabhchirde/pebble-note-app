import Note from "Components/Note/Note";
import NewNote from "Components/NewNote/NewNote";
import { useAlert, useFilter, usePebbleNote } from "Context";
import "./HomePage.css";
import NoteAlert from "Components/Alerts/NoteAlert";
import { finalFilteredData } from "Utils/finalFilteredData";
import { useEffect } from "react";

const HomePage = () => {
  const {
    state: { allNotes },
    dispatch,
  } = usePebbleNote();
  const { filterState } = useFilter();

  const {
    alertState: { noteDiscardAlert },
  } = useAlert();

  useEffect(() => {
    if (allNotes.length < 1) {
      dispatch({ type: "resetNotesAndLabels" });
    }
  }, [allNotes.length, dispatch]);

  const pinnedNotes = [...allNotes.filter((item) => item.pinned)];
  const otherNotes = [...allNotes.filter((item) => !item.pinned)];

  return (
    <div className="body-content">
      {noteDiscardAlert && (
        <NoteAlert
          alert="alert-info"
          icon="fas fa-info alert-icon"
          text="Note Discarded"
          dispatchType="hideDiscardAlert"
        />
      )}
      <NewNote />
      <div className="all-notes-container">
        <div className="pinnedNotes">
          {pinnedNotes.length !== 0 ? (
            <div>
              <h2 className="title-md-wt-5 mg-1-top mg-point6-lt">
                Pinned Notes
              </h2>
              <div className="allNotes">
                {finalFilteredData(pinnedNotes, filterState).map((item) => {
                  return (
                    <Note
                      item={item}
                      key={item._id}
                      icon={"fas fa-trash"}
                      delAction="del"
                      editAction="editPinned"
                      archiveAction="archive"
                      pinAction="pinnedNote"
                    />
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>
        <div className="otherNotes">
          {pinnedNotes.length !== 0 && otherNotes.length !== 0 ? (
            <h2 className="title-md-wt-5 mg-1-top mg-point6-lt">Other Notes</h2>
          ) : null}
          <div className="allNotes">
            {finalFilteredData(otherNotes, filterState).map((item) => {
              return (
                <Note
                  item={item}
                  key={item._id}
                  icon={"fas fa-trash"}
                  delAction="del"
                  editAction="editUnPinned"
                  archiveAction="archive"
                  pinAction="unPinnedNote"
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export { HomePage };
