import { Link, useLocation, useNavigate } from "react-router-dom";
import "./LeftNavBar.css";
import noteIcon from "Data/Images/Logo/logo-icon.svg";
import { archiveIcon, labelIcon, trashIcon, userIcon } from "Data/Images/Icons";
import { useAuth } from "Context";
import ButtonIcon from "../Button/ButtonIcon";
import { AlertToast } from "../../Alerts/AlertToast";

const LeftNavBar = () => {
  const { pathname } = useLocation();
  const { auth, authDispatch } = useAuth();
  const { user } = auth;
  const navigate = useNavigate();

  const logOutClickHandler = () => {
    authDispatch({ type: "logout" });
    AlertToast("info", "Logout Successfully");
    navigate("/");
  };

  const activeHome = pathname === "/home" ? "activeNav" : "";
  const activeLabel = pathname === "/label" ? "activeNav" : "";
  const activeArchive = pathname === "/archive" ? "activeNav" : "";
  const activeTrash = pathname === "/trash" ? "activeNav" : "";
  const activeProfile = pathname === "/profile" ? "activeNav" : "";

  return (
    <div className="left-nav-div">
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
