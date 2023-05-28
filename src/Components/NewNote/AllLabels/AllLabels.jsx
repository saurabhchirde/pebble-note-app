export const AllLabels = ({
  editModal,
  noteColor,
  tempLabels,
  removeLabelsHandler,
}) => {
  return (
    <div
      className="new-note-label card-shadow-two"
      style={{
        backgroundColor: editModal ? "" : noteColor,
        color: noteColor ? "black" : "",
      }}
    >
      <p>Labels: </p>
      {tempLabels.map((label, index) => {
        return (
          <div
            key={index}
            className="single-label"
            style={{
              border: noteColor ? "1px solid gray" : "1px solid gray",
            }}
          >
            <li>{label}</li>
            <i
              className="fas fa-times"
              onClick={() => {
                removeLabelsHandler(label);
              }}
            ></i>
          </div>
        );
      })}
    </div>
  );
};
