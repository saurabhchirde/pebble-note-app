const Button = (props) => {
  return (
    <div className={props.btnWrapper}>
      <button
        onClick={props.onClick}
        type={props.type}
        className={props.btnClassName}
      >
        {props.label}
      </button>
    </div>
  );
};

export default Button;
