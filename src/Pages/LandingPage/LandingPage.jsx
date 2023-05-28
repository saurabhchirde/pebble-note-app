import note_taking from "Data/Images/Animation/note_taking.svg";
import ButtonSimple from "Components/UI/Button/ButtonSimple";
import "./LandingPage.css";
import logoLight from "Data/Images/Logo/logo-light.svg";
import logoDark from "Data/Images/Logo/logo-dark.svg";
import { useAuth, useModal, useTheme } from "Context";
import { Footer } from "Components/UI/Footer/Footer";
import { Link } from "react-router-dom";
import { ThemeToggle } from "Components/UI/ThemeToggle/ThemeToggle";

const LandingPage = () => {
  const { theme } = useTheme();
  const { setShowLogin, setShowSignup } = useModal();
  const { auth } = useAuth();

  const joinNowClickHandler = () => {
    setShowLogin(false);
    setShowSignup(true);
  };

  const signinClickHandler = () => {
    setShowLogin(true);
    setShowSignup(false);
  };

  return (
    <div className="landing">
      <div>
        <div className="landing-header">
          <img
            src={theme === "dark" ? logoLight : logoDark}
            alt="logo"
            className="landing-logo"
          />
          <div className="landing-join-section">
            <ThemeToggle />
            {!auth.login && (
              <ButtonSimple
                onClick={joinNowClickHandler}
                btnClassName="btn primary-btn-lg"
                label="Join Now"
              />
            )}
            {auth.login && (
              <Link to="/home">
                <ButtonSimple
                  btnClassName="btn primary-btn-lg"
                  label="Take Note"
                />
              </Link>
            )}
          </div>
        </div>
        <div className="landing-body">
          <img
            src={note_taking}
            alt="illustration"
            className="landing-illustration"
          />
          <div className="landing-body-text">
            <h2 className="landing-body-header">
              Keep your productivity alive
            </h2>
            <p className="landing-body-header-text">
              One stop solution to note your daily tasks and manage your
              workflow in a productive way.
            </p>
            <div className="landing-body-features">
              <h3>Features</h3>
              <ul className="list-basic list-style-circle">
                <li>Priority Option</li>
                <li>Change Background Color</li>
                <li>Add Labels</li>
                <li>Filter and Sorting</li>
              </ul>
            </div>
            <div className="landing-nav-btn">
              {!auth.login && (
                <>
                  <p>alerady have an account?</p>
                  <ButtonSimple
                    onClick={signinClickHandler}
                    btnClassName="btn primary-text-btn-lg"
                    label="Login"
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export { LandingPage };
