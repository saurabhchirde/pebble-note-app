import { Link } from "react-router-dom";
import logo_light from "../../../Data/Images/Logo/logo-light.svg";
import logo_dark from "../../../Data/Images/Logo/logo-dark.svg";
import SearchBar from "../SearchBar/SearchBar";
import ButtonIcon from "../Button/ButtonIcon";
import "./NavBar.css";
import { useTheme } from "../../../Context/ThemeProvider/ThemeProvider";

const NavBar = () => {
  const { darkTheme, setDarkTheme } = useTheme();

  const onThemeTogglerClick = () => {
    setDarkTheme((preTheme) => !preTheme);
  };
  const themeIcon = darkTheme ? "fa fa-sun" : "fa fa-moon";
  const navBarClass = darkTheme
    ? "desktop-navigation-bar dark-mode"
    : "desktop-navigation-bar";

  return (
    <>
      <div className={navBarClass}>
        <Link to="/">
          <img
            className="company-logo"
            src={darkTheme ? logo_light : logo_dark}
            alt="logo"
          />
        </Link>
        <SearchBar
          searchWrapper="outline-search-input"
          iconWrapper="input-icon"
          icon="fas fa-search"
          placeholder="Search"
        />
        <ButtonIcon
          onClick={onThemeTogglerClick}
          icon={themeIcon}
          btnClassName="btn icon-btn-md"
        />
      </div>
    </>
  );
};

export default NavBar;
