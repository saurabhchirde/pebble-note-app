import { Link, useLocation } from "react-router-dom";
import logo_light from "Data/Images/Logo/logo-light.svg";
import logo_dark from "Data/Images/Logo/logo-dark.svg";
import SearchBar from "../SearchBar/SearchBar";
import "./NavBar.css";
import { useTheme } from "Context/ThemeProvider/ThemeProvider";
import { useFilter } from "Context";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";

const NavBar = () => {
  const { theme } = useTheme();
  const { filterDispatch, searchInput, setSearchInput } = useFilter();
  const location = useLocation();
  const showSearch = location.pathname.includes("home") ? true : false;

  const onSearchSubmitHandler = (e) => {
    e.preventDefault();
    filterDispatch({ type: "bySearch", payload: searchInput });
  };

  const onSearchInputHandler = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="desktop-navigation-bar">
      <Link to="/">
        <img
          className="company-logo"
          src={theme === "dark" ? logo_light : logo_dark}
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
      <ThemeToggle />
    </div>
  );
};

export default NavBar;
