import "./ColorPicker.css";

const palette = [
  { color: "#ffffd8", className: "color yellow" },
  { color: "#ffd9fa", className: "color red" },
  { color: "#dcffe3", className: "color green" },
  { color: "#d9f2ff", className: "color blue" },
  { color: "#ecdbff", className: "color violet" },
  { color: "#ffffff", className: "color white" },
];

const ColorPicker = (props) => {
  return (
    <div className="color-input color-palette-drawer">
      {palette.map((item) => {
        return (
          <div
            key={item.color}
            onClick={() => {
              props.setter(item.color);
            }}
            className={item.className}
          />
        );
      })}
    </div>
  );
};

export default ColorPicker;
