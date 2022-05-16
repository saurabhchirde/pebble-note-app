export const FilterSection = ({
  editModal,
  noteColor,
  onSortByDate,
  sortByDate,
  onSortByPriority,
  sortByPriority,
  onSortByLabel,
  selectedLabel,
  allLabels,
  onResetFilterHandler,
}) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className="new-note-label filter-section"
      style={{
        backgroundColor: editModal ? "" : noteColor,
        color: noteColor ? "black" : "",
      }}
    >
      <div>
        <p>Date</p>
        <select
          onChange={onSortByDate}
          value={sortByDate}
          style={{ color: noteColor ? "black" : "" }}
        >
          <option>All</option>
          <option>New First</option>
          <option>Old First</option>
        </select>
      </div>
      <div>
        <p>Priority</p>
        <select
          onChange={onSortByPriority}
          value={sortByPriority}
          style={{ color: noteColor ? "black" : "" }}
        >
          <option>All</option>
          <option>Low</option>
          <option>High</option>
        </select>
      </div>
      <div>
        <p>Label</p>
        <select
          onChange={onSortByLabel}
          value={selectedLabel}
          style={{ color: noteColor ? "black" : "" }}
        >
          {allLabels.map((label, index) => {
            return (
              <option key={index} className="single-label">
                {label}
              </option>
            );
          })}
        </select>
      </div>
      <button
        onClick={onResetFilterHandler}
        className="btn secondary-text-btn-sm"
        type="reset"
      >
        Reset Filter
      </button>
    </form>
  );
};
