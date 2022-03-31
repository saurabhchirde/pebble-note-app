import { useTheme } from "../../../Context/ThemeProvider/ThemeProvider";
import "./BodyWrapper.css";

const BodyWrapper = ({ children }) => {
  const { darkTheme } = useTheme();

  const darkThemeClass = darkTheme ? "body dark-mode" : "body";

  return <div className={darkThemeClass}>{children}</div>;
};

export default BodyWrapper;
