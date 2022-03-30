import { createContext, useContext, useState } from "react";

const themeContext = createContext(null);

const ThemeProvider = ({ children }) => {
  const [darkTheme, setDarkTheme] = useState(
    JSON.parse(localStorage.getItem("darkTheme")) ?? false
  );

  return (
    <themeContext.Provider value={{ darkTheme, setDarkTheme }}>
      {children}
    </themeContext.Provider>
  );
};

const useTheme = () => useContext(themeContext);

export { ThemeProvider, useTheme };
