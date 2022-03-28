import React from "react";

const ButtonSimple = (props) => {
  return (
    <>
      <button onClick={props.onClick} className={props.btnClassName}>
        {props.label}
      </button>
    </>
  );
};

export default ButtonSimple;
