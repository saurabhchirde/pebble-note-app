import { Link } from "react-router-dom";
import logo from "../../../Data/Images/Logo/logo.svg";
import ButtonSimple from "../Button/ButtonSimple";
import SearchBar from "../SearchBar/SearchBar";
import "./NavBar.css";

const NavBar = () => {
  return (
    <>
      <div className="desktop-navigation-bar">
        <Link to="/">
          <img className="company-logo" src={logo} alt="logo" />
        </Link>
        <SearchBar
          searchWrapper="outline-search-input"
          iconWrapper="input-icon"
          icon="fas fa-search"
          placeholder="Search"
        />
        <div className="nav-bar-btns">
          <ButtonSimple label="Login" btnClassName="btn primary-btn-md" />
        </div>
      </div>
    </>
  );
};

export default NavBar;
