import Note from "../../Components/Note/Note";
import NewNote from "../../Components/NewNote/NewNote";
import { usePebbleNote } from "../../Context/PebbleNoteProvider";
import { useEffect } from "react";
import "./HomePage.css";

const HomePage = () => {
  const { state, dispatch } = usePebbleNote();
  const { allNotes, pinnedNote } = state;

  useEffect(() => {
    localStorage.setItem("savedNotes", JSON.stringify(allNotes));
    localStorage.setItem("pinnedNotes", JSON.stringify(pinnedNote));
  }, [allNotes, pinnedNote]);

  const outsideClickHandler = () => {
    dispatch({ type: "outsideClick" });
  };

  return (
    <>
      <div onDoubleClick={outsideClickHandler} className="body-content">
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
                        pinAction="unPinNote"
                        delAction="del"
                        editAction="editPinned"
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
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
