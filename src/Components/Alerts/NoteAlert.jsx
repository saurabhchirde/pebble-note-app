import { useEffect } from "react";
import { useAlert } from "Context";

const NoteAlert = (props) => {
  const { alertDispatch } = useAlert();

  useEffect(() => {
    const alertTime = setTimeout(() => {
      alertDispatch({ type: props.dispatchType });
    }, 1700);
    return () => {
      clearTimeout(alertTime);
    };
  }, [alertDispatch, props.dispatchType]);

  return (
    <div className={props.alert}>
      <i className={props.icon}></i>
      <span className="p-md">{props.text}</span>
    </div>
  );
};

export default NoteAlert;
