import Note from "../../Components/Note/Note";
import NewNote from "../../Components/NewNote/NewNote";
import { usePebbleNote } from "../../Context";
import { useEffect } from "react";
import "./HomePage.css";
import NoteAlert from "../../Components/Alerts/NoteAlert";

const HomePage = () => {
  const { state, dispatch } = usePebbleNote();
  const { allNotes, pinnedNote, noteDeletedAlert, noteArchiveAlert } = state;

  useEffect(() => {
    localStorage.setItem("savedNotes", JSON.stringify(allNotes));
    localStorage.setItem("pinnedNotes", JSON.stringify(pinnedNote));
  }, [allNotes, pinnedNote]);

  const outsideClickHandler = () => {
    dispatch({ type: "outsideClick" });
  };

  return (
    <div onDoubleClick={outsideClickHandler} className="body-content">
      {noteDeletedAlert && (
        <NoteAlert
          alert="alert-info"
          icon="fas fa-info alert-icon"
          text="Note Deleted"
          dispatchType="hideDeletedAlert"
        />
      )}
      {noteArchiveAlert && (
        <NoteAlert
          alert="alert-info"
          icon="fas fa-info alert-icon"
          text="Note Archived"
          dispatchType="hideArchiveAlert"
        />
      )}
      <NewNote />
      <div>
        <div className="pinnedNotes">
          {pinnedNote.length !== 0 ? (
            <div>
              <h2>Pinned Notes</h2>
              <div className="allNotes">
                {pinnedNote.map((item) => {
                  return (
                    <Note
                      title={item.title}
                      text={item.text}
                      id={item.id}
                      key={item.id}
                      icon={"fas fa-trash"}
                      pinAction="pinnedNote"
                      delAction="del"
                      editAction="editPinned"
                      archiveAction="archive"
                    />
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>
        <div className="otherNotes">
          {pinnedNote.length !== 0 && allNotes.length !== 0 ? (
            <h2>Other Notes</h2>
          ) : null}
          <div className="allNotes">
            {allNotes.map((item) => {
              return (
                <Note
                  title={item.title}
                  text={item.text}
                  id={item.id}
                  key={item.id}
                  icon={"fas fa-trash"}
                  delAction="del"
                  editAction="editUnPinned"
                  archiveAction="archive"
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
