import AnimateNotePencil from "../../Components/Animation/AnimateNotePencil";
import ButtonSimple from "../../Components/UI/Button/ButtonSimple";
import "./LandingPage.css";
import logo from "../../Data/Images/Logo/logo.svg";

const LandingPage = () => {
  return (
    <div className="landing">
      <div className="landing-header">
        <img src={logo} alt="logo" className="landing-logo" />
        <div className="landing-login-section">
          <ButtonSimple btnClassName="btn primary-btn-lg" label="Join Now" />
        </div>
      </div>
      <div className="landing-body">
        <AnimateNotePencil />
        <div className="landing-body-text">
          <h2 className="landing-body-header">Keep your productivity alive</h2>
          <p className="landing-body-header-text">
            One stop solution to note your daily tasks and manage your workflow
            in a productive way.
          </p>
          <div className="landing-body-features">
            <h3>Features</h3>
            <ul className="list-basic list-style-circle">
              <li>Share notes</li>
              <li>Change Background Color</li>
              <li>Add Labels</li>
              <li>Filtering and Sorting</li>
            </ul>
          </div>
          <div className="landing-nav-btn">
            <p>alerady have an account?</p>
            <ButtonSimple
              btnClassName="btn primary-text-btn-lg"
              label="Login"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
