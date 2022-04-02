import Note from "../../Components/Note/Note";
import NewNote from "../../Components/NewNote/NewNote";
import { useAlert, usePebbleNote } from "../../Context";
import "./HomePage.css";
import NoteAlert from "../../Components/Alerts/NoteAlert";

const HomePage = () => {
  const {
    state: { allNotes },
  } = usePebbleNote();

  const {
    alertState: {
      noteAddedAlert,
      noteEditedAlert,
      noteSavedAlert,
      noteDiscardAlert,
      noteDeletedAlert,
      noteArchiveAlert,
    },
  } = useAlert();

  const pinnedNotes = [...allNotes.filter((item) => item.pinned)];
  const otherNotes = [...allNotes.filter((item) => !item.pinned)];

  return (
    <div className="body-content">
      {noteAddedAlert && (
        <NoteAlert
          alert="alert-info"
          icon="fas fa-info alert-icon"
          text="New Note added"
          dispatchType="hideNoteAddedAlert"
        />
      )}
      {noteEditedAlert && (
        <NoteAlert
          alert="alert-info"
          icon="fas fa-info alert-icon"
          text="Note Edited Successfully"
          dispatchType="hideNoteEditedAlert"
        />
      )}
      {noteSavedAlert && (
        <NoteAlert
          alert="alert-info"
          icon="fas fa-info alert-icon"
          text="Note Saved"
          dispatchType="hideNoteSavedAlert"
        />
      )}
      {noteDiscardAlert && (
        <NoteAlert
          alert="alert-info"
          icon="fas fa-info alert-icon"
          text="Note Discarded"
          dispatchType="hideDiscardAlert"
        />
      )}
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
          {pinnedNotes.length !== 0 ? (
            <div>
              <h2>Pinned Notes</h2>
              <div className="allNotes">
                {pinnedNotes.map((item) => {
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
            <h2>Other Notes</h2>
          ) : null}
          <div className="allNotes">
            {otherNotes.map((item) => {
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

export default HomePage;
