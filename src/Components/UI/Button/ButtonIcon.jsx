import React from "react";

const ButtonIcon = (props) => {
  return (
    <button onClick={props.onClick} className={props.btnClassName}>
      <i className={props.icon}></i>
    </button>
  );
};

export default ButtonIcon;
