import { usePebbleNote } from "../../../Context";
import ButtonSimple from "../Button/ButtonSimple";
import "./NoteLabel.css";

const NoteLabel = () => {
  const { label, setLabel, dispatch } = usePebbleNote();

  const submitLabel = (e) => {
    e.preventDefault();
    dispatch({ type: "addLabelToNote", payload: label });
    setLabel("");
  };

  return (
    <form className="note-label">
      <input
        type="text"
        value={label}
        placeholder="Enter label..."
        onChange={(e) => {
          setLabel(e.target.value);
        }}
      />
      <ButtonSimple
        label="add"
        onClick={submitLabel}
        btnClassName="btn primary-outline-btn-sm"
      />
    </form>
  );
};
export default NoteLabel;
