import { useEffect } from "react";
import { usePebbleNote } from "../../Context";

const NoteAlert = (props) => {
  const { dispatch } = usePebbleNote();

  useEffect(() => {
    const alertTime = setTimeout(() => {
      dispatch({ type: props.dispatchType });
    }, 2500);
    return () => {
      clearTimeout(alertTime);
    };
  }, []);

  return (
    <div className={props.alert}>
      <i className={props.icon}></i>
      <span className="p-md">{props.text}</span>
    </div>
  );
};

export default NoteAlert;
