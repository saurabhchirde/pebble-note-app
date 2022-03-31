import AnimateNotePencil from "../../Components/Animation/AnimateNotePencil";
import ButtonSimple from "../../Components/UI/Button/ButtonSimple";
import "./LandingPage.css";
import logoLight from "../../Data/Images/Logo/logo-light.svg";
import logoDark from "../../Data/Images/Logo/logo-dark.svg";
import { useModal, useTheme } from "../../Context";
import ButtonIcon from "../../Components/UI/Button/ButtonIcon";

const LandingPage = () => {
  const { darkTheme, setDarkTheme } = useTheme();
  const { setShowLogin, setShowSignup } = useModal();

  const joinNowClickHandler = () => {
    setShowLogin(false);
    setShowSignup(true);
  };

  const signinClickHandler = () => {
    setShowLogin(true);
    setShowSignup(false);
  };

  const onThemeTogglerClick = () => {
    setDarkTheme((preTheme) => !preTheme);
  };
  const themeIcon = darkTheme ? "fa fa-sun" : "fa fa-moon";
  const navBarClass = darkTheme
    ? "desktop-navigation-bar dark-mode"
    : "desktop-navigation-bar";

  return (
    <div className="landing">
      <div className="landing-header">
        <img
          src={darkTheme ? logoLight : logoDark}
          alt="logo"
          className="landing-logo"
        />
        <div className="landing-join-section">
          <ButtonSimple
            onClick={joinNowClickHandler}
            btnClassName="btn primary-btn-lg"
            label="Join Now"
          />
          <ButtonIcon
            onClick={onThemeTogglerClick}
            icon={themeIcon}
            btnClassName="btn icon-btn-lg"
          />
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
              onClick={signinClickHandler}
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
