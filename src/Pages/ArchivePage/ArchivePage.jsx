import Note from "../../Components/Note/Note";
import { usePebbleNote } from "../../Context";
import { useEffect } from "react";
import NoteAlert from "../../Components/Alerts/NoteAlert";
import "./ArchivePage.css";
import archiveIcon from "../../Data/Images/Icons/archive.svg";

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
        {archivedNotes.length < 1 ? (
          <img src={archiveIcon} alt="archive-icon" className="archive-page" />
        ) : (
          archivedNotes.map((item) => {
            return (
              <Note
                title={item.title}
                text={item.text}
                _id={item._id}
                key={item._id}
                archiveAction="restore"
                editAction="editArchive"
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default ArchivePage;
