import { usePebbleNote } from "../../../Context";
import "./ColorPicker.css";

const ColorPicker = (props) => {
  return (
    <div className="color-input color-palette-drawer">
      <div
        onClick={() => {
          props.setter("#ffffd8");
        }}
        className="color yellow"
      ></div>
      <div
        onClick={() => {
          props.setter("#ffd9fa");
        }}
        className="color red"
      ></div>
      <div
        onClick={() => {
          props.setter("#dcffe3");
        }}
        className="color green"
      ></div>
      <div
        onClick={() => {
          props.setter("#d9f2ff");
        }}
        className="color blue"
      ></div>
      <div
        onClick={() => {
          props.setter("#ecdbff");
        }}
        className="color violet"
      ></div>
      <div
        onClick={() => {
          props.setter("#ffffff");
        }}
        className="color white"
      ></div>
    </div>
  );
};

export default ColorPicker;
