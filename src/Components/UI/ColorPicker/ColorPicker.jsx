import "./ColorPicker.css";

const ColorPicker = (props) => {
  return (
    <div className="color-input color-palette-drawer">
      <label>
        Color : {props.label}
        <input
          onChange={props.onChange}
          type="color"
          name="color"
          className="color-pick"
          value={props.value}
        />
      </label>
    </div>
  );
};

export default ColorPicker;
