import { createContext, useContext, useEffect, useState } from "react";

const themeContext = createContext(null);

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(
    localStorage.getItem("data-pebbleNote-theme") ?? "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-pebbleNote-theme", theme);
    localStorage.setItem("data-pebbleNote-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((preTheme) => (preTheme === "light" ? "dark" : "light"));
  };

  return (
    <themeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </themeContext.Provider>
  );
};

const useTheme = () => useContext(themeContext);

export { ThemeProvider, useTheme };
