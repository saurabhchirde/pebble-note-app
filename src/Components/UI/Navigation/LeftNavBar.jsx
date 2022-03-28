import { Link } from "react-router-dom";
import "./LeftNavBar.css";

const LeftNavBar = () => {
  return (
    <div className="left-nav-div">
      <ul>
        <Link to="/home">
          <li>
            <i className="far fa-lightbulb"></i>
            <h2> Home</h2>
          </li>
        </Link>
        <Link to="/label">
          <li>
            <i className="fas fa-tag"></i>
            <h2> Label</h2>
          </li>
        </Link>
        <Link to="/archive">
          <li>
            <i className="far fa-file-archive"></i>
            <h2> Archive</h2>
          </li>
        </Link>
        <Link to="/trash">
          <li>
            <i className="far fa-trash-alt"></i>
            <h2> Trash</h2>
          </li>
        </Link>
        <Link to="/profile">
          <li>
            <i className="fas fa-user"></i>
            <h2> Profile</h2>
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default LeftNavBar;
