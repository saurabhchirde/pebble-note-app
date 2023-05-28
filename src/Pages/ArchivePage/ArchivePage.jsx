import Note from "Components/Note/Note";
import { usePebbleNote } from "Context";
import { useEffect } from "react";
import "./ArchivePage.css";
import archiveIcon from "Data/Images/Icons/archive.svg";

const ArchivePage = () => {
  const { state } = usePebbleNote();
  const { archivedNotes } = state;

  useEffect(() => {
    localStorage.setItem("archivedNotes", JSON.stringify(archivedNotes));
  }, [archivedNotes]);

  return (
    <div className="body-content">
      <div className="allNotes">
        {archivedNotes.length < 1 ? (
          <img src={archiveIcon} alt="archive-icon" className="archive-page" />
        ) : (
          archivedNotes.map((item) => {
            return (
              <Note
                item={item}
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

export { ArchivePage };
