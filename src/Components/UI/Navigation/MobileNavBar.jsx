import SearchBar from "../SearchBar/SearchBar";
import logoIcon from "../../../Data/Images/Logo/logo-icon.svg";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";

const MobileNavBar = () => {
  return (
    <nav className="mobile-navigation-bar">
      <a href="/">
        <img className="logo" src={logoIcon} alt="logo" />
      </a>
      <SearchBar
        searchWrapper="outline-search-input"
        iconWrapper="input-icon"
        icon="fas fa-search"
        placeholder="Search"
      />
      <ThemeToggle />
    </nav>
  );
};

export default MobileNavBar;
