import { Link, useLocation, useNavigate } from "react-router-dom";
import "./LeftNavBar.css";
import noteIcon from "../../../Data/Images/Logo/logo-icon.svg";
import {
  archiveIcon,
  labelIcon,
  trashIcon,
  userIcon,
} from "../../../Data/Images/Icons";
import { useAuth, useModal, useTheme } from "../../../Context";
import ButtonIcon from "../Button/ButtonIcon";

const LeftNavBar = () => {
  const { darkTheme } = useTheme();
  const location = useLocation();
  const { auth, authDispatch } = useAuth();
  const { user } = auth;
  const { setError, setShowError } = useModal();
  const navigate = useNavigate();

  const logOutClickHandler = () => {
    authDispatch({ type: "logout" });
    setError("Logout Successfully");
    setShowError(true);
    navigate("/");
  };

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
            <img src={noteIcon} alt="idea-icon" className="nav-icons" />
            <h2> Notes</h2>
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
      <div className="user">
        <div>
          <div className="avatar text-avatar-xsm-round">{user.dp}</div>
          <h2>{`${user.firstName} ${user.lastName}`}</h2>
        </div>
        <ButtonIcon
          btnClassName="btn icon-btn-md"
          icon="fas fa-sign-out-alt"
          onClick={logOutClickHandler}
        />
      </div>
    </div>
  );
};

export default LeftNavBar;
