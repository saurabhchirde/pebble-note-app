import Note from "../../Components/Note/Note";
import { usePebbleNote } from "../../Context/Notes/NoteProvider";
import "./LabelPage.css";
import labelIcon from "../../Data/Images/Icons/label.svg";

const LabelPage = () => {
  const {
    state: { allLabels, allNotes },
  } = usePebbleNote();

  return (
    <div className="body-content">
      <div className="label-list">
        {allLabels.length > 1
          ? allLabels.map((label, index) => {
              const filteredLabelList = allNotes.filter((note) =>
                note.labels.includes(label)
              );
              {
                return (
                  <div key={index}>
                    {filteredLabelList.length > 0 ? (
                      <>
                        <div className="single-label label-page">
                          <li>{label}</li>
                        </div>
                        <div className="allNotes">
                          {filteredLabelList.map((item) => {
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
                      </>
                    ) : null}
                  </div>
                );
              }
            })
          : null}
      </div>
      {allNotes.length < 1 && (
        <img src={labelIcon} className="label-icon" alt="label-icon" />
      )}
    </div>
  );
};

export { LabelPage };
