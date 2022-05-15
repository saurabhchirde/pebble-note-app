import SearchBar from "../SearchBar/SearchBar";
import logoIcon from "../../../Data/Images/Logo/logo-icon.svg";
import ButtonIcon from "../Button/ButtonIcon";
import { useTheme } from "../../../Context";

const MobileNavBar = () => {
  const { darkTheme, setDarkTheme } = useTheme();

  const onThemeTogglerClick = () => {
    setDarkTheme((preTheme) => !preTheme);
  };
  const themeIcon = darkTheme ? "fa fa-sun" : "fa fa-moon";
  const navBarClass = darkTheme
    ? "mobile-navigation-bar dark-mode"
    : "mobile-navigation-bar";

  return (
    <nav className={navBarClass}>
      <a href="/">
        <img className="logo" src={logoIcon} alt="logo" />
      </a>
      <SearchBar
        searchWrapper="outline-search-input"
        iconWrapper="input-icon"
        icon="fas fa-search"
        placeholder="Search"
      />
      {/* <div className="nav-bar-btns">
        <ButtonIcon
          onClick={onThemeTogglerClick}
          icon={themeIcon}
          btnClassName="btn icon-btn-md"
        />
      </div> */}
    </nav>
  );
};

export default MobileNavBar;
