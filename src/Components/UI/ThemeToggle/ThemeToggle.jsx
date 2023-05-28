import { useTheme } from "Context/ThemeProvider/ThemeProvider";
import "./ThemeToggle.css";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  const themeIcon = theme === "dark" ? "fas fa-sun" : "fas fa-moon";

  return (
    <div className="theme-toggle" onClick={toggleTheme}>
      <i className={themeIcon}></i>
    </div>
  );
};
