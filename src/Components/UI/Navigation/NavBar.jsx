import { Link } from "react-router-dom";
import logo from "../../../Data/Images/Logo/logo.svg";
import logoIcon from "../../../Data/Images/Logo/logo-icon.svg";
import SearchBar from "../SearchBar/SearchBar";
import "./NavBar.css";

const NavBar = () => {
  return (
    <>
      <div className="desktop-navigation-bar">
        <Link to="/">
          <img className="company-logo" src={logo} alt="logo" />
        </Link>
        <Link to="/">
          <img className="logo-icon" src={logoIcon} alt="logo" />
        </Link>
        <SearchBar
          searchWrapper="outline-search-input"
          iconWrapper="input-icon"
          icon="fas fa-search"
          placeholder="Search"
        />
      </div>
    </>
  );
};

export default NavBar;
