export const FloatingButton = (props) => {
  return (
    <button className={props.btnClassName} onClick={props.onClick}>
      <i className={props.icon}></i>
    </button>
  );
};
