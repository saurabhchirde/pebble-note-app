import { Link, useLocation } from "react-router-dom";
import "./LeftNavBar.css";

const LeftNavBar = () => {
  const location = useLocation();

  const activeHome = location.pathname === "/home" ? "activeNav" : "";
  const activeLabel = location.pathname === "/label" ? "activeNav" : "";
  const activeArchive = location.pathname === "/archive" ? "activeNav" : "";
  const activeTrash = location.pathname === "/trash" ? "activeNav" : "";
  const activeProfile = location.pathname === "/profile" ? "activeNav" : "";

  return (
    <div className="left-nav-div">
      <ul>
        <Link to="/home">
          <li className={activeHome}>
            <i className="far fa-lightbulb"></i>
            <h2> Home</h2>
          </li>
        </Link>
        <Link to="/label">
          <li className={activeLabel}>
            <i className="fas fa-tag"></i>
            <h2> Label</h2>
          </li>
        </Link>
        <Link to="/archive">
          <li className={activeArchive}>
            <i className="far fa-file-archive"></i>
            <h2> Archive</h2>
          </li>
        </Link>
        <Link to="/trash">
          <li className={activeTrash}>
            <i className="far fa-trash-alt"></i>
            <h2> Trash</h2>
          </li>
        </Link>
        <Link to="/profile">
          <li className={activeProfile}>
            <i className="fas fa-user"></i>
            <h2> Profile</h2>
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default LeftNavBar;
