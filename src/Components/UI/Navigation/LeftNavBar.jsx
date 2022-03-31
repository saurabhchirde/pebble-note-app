import { Link, useLocation } from "react-router-dom";
import "./LeftNavBar.css";
import ideaIcon from "../../../Data/Images/Icons/idea.svg";
import labelIcon from "../../../Data/Images/Icons/label.svg";
import archiveIcon from "../../../Data/Images/Icons/archive.svg";
import trashIcon from "../../../Data/Images/Icons/trash.svg";
import userIcon from "../../../Data/Images/Icons/user.svg";
import { useTheme } from "../../../Context";

const LeftNavBar = () => {
  const { darkTheme } = useTheme();
  const location = useLocation();

  const activeHome = location.pathname === "/home" ? "activeNav" : "";
  const activeLabel = location.pathname === "/label" ? "activeNav" : "";
  const activeArchive = location.pathname === "/archive" ? "activeNav" : "";
  const activeTrash = location.pathname === "/trash" ? "activeNav" : "";
  const activeProfile = location.pathname === "/profile" ? "activeNav" : "";

  const navBarClass = darkTheme
    ? "left-nav-div bg-dark"
    : "left-nav-div bg-white";

  return (
    <div className={navBarClass}>
      <ul>
        <Link to="/home">
          <li className={activeHome}>
            <img src={ideaIcon} alt="idea-icon" className="nav-icons" />
            <h2> Home</h2>
          </li>
        </Link>
        <Link to="/label">
          <li className={activeLabel}>
            <img src={labelIcon} alt="label-icon" className="nav-icons" />
            <h2> Label</h2>
          </li>
        </Link>
        <Link to="/archive">
          <li className={activeArchive}>
            <img src={archiveIcon} alt="archive-icon" className="nav-icons" />
            <h2> Archive</h2>
          </li>
        </Link>
        <Link to="/trash">
          <li className={activeTrash}>
            <img src={trashIcon} alt="trash-icon" className="nav-icons" />
            <h2> Trash</h2>
          </li>
        </Link>
        <Link to="/profile">
          <li className={activeProfile}>
            <img src={userIcon} alt="user-icon" className="nav-icons" />
            <h2> Profile</h2>
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default LeftNavBar;
