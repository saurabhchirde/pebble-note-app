import { Link, useLocation } from "react-router-dom";
import logo_light from "../../../Data/Images/Logo/logo-light.svg";
import logo_dark from "../../../Data/Images/Logo/logo-dark.svg";
import SearchBar from "../SearchBar/SearchBar";
import ButtonIcon from "../Button/ButtonIcon";
import "./NavBar.css";
import { useTheme } from "../../../Context/ThemeProvider/ThemeProvider";
import { useFilter } from "../../../Context";

const NavBar = () => {
  const { darkTheme, setDarkTheme } = useTheme();
  const { filterDispatch, searchInput, setSearchInput } = useFilter();
  const location = useLocation();
  const showSearch = location.pathname.includes("home") ? true : false;

  const onSearchSubmitHandler = (e) => {
    e.preventDefault();
    filterDispatch({ type: "bySearch", payload: searchInput });
  };

  const onThemeTogglerClick = () => {
    setDarkTheme((preTheme) => !preTheme);
  };

  const onSearchInputHandler = (e) => {
    setSearchInput(e.target.value);
  };

  const themeIcon = darkTheme ? "fa fa-sun" : "fa fa-moon";
  const navBarClass = darkTheme
    ? "desktop-navigation-bar dark-mode"
    : "desktop-navigation-bar";

  return (
    <div className={navBarClass}>
      <Link to="/">
        <img
          className="company-logo"
          src={darkTheme ? logo_light : logo_dark}
          alt="logo"
        />
      </Link>
      {showSearch && (
        <SearchBar
          searchWrapper="outline-search-input"
          micIcon="hide"
          searchIcon="fas fa-search"
          placeholder="Search"
          onChange={onSearchInputHandler}
          onSubmit={onSearchSubmitHandler}
          value={searchInput}
        />
      )}
      {/* <ButtonIcon
        onClick={onThemeTogglerClick}
        icon={themeIcon}
        btnClassName="btn icon-btn-md"
      /> */}
    </div>
  );
};

export default NavBar;
