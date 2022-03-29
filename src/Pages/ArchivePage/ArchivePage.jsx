import Note from "../../Components/Note/Note";
import { usePebbleNote } from "../../Context";
import { useEffect } from "react";
import NoteAlert from "../../Components/Alerts/NoteAlert";

const ArchivePage = () => {
  const { state } = usePebbleNote();
  const { archivedNotes, noteUnarchiveAlert } = state;

  useEffect(() => {
    localStorage.setItem("archivedNotes", JSON.stringify(archivedNotes));
  }, [archivedNotes]);

  return (
    <div className="body-content">
      {noteUnarchiveAlert && (
        <NoteAlert
          alert="alert-info"
          icon="fas fa-info alert-icon"
          text="Note Sent to Inbox"
          dispatchType="hideUnarchiveAlert"
        />
      )}
      <div className="allNotes">
        {archivedNotes.map((item) => {
          return (
            <Note
              title={item.title}
              text={item.text}
              id={item.id}
              key={item.id}
              archiveAction="restore"
              editAction="editArchive"
            />
          );
        })}
      </div>
    </div>
  );
};

export default ArchivePage;
