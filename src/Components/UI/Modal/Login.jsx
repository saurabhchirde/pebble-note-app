import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../../Context";
import Button from "../Button/Button";
import InputTypeOne from "../Input/InputTypeOne";
import "./Login.css";

const Login = () => {
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });

  const { setShowLogin, setShowSignup } = useModal();
  const navigate = useNavigate();

  const onLoginSubmitHandler = (e) => {
    e.preventDefault();
    navigate("/home");
    setShowLogin(false);
  };

  const onModalInputHandler = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setLoginInput((preData) => {
      return {
        ...preData,
        [name]: value,
      };
    });
  };

  return (
    <>
      <div
        className="modal-backdrop"
        onClick={() => {
          setShowLogin(false);
        }}
      ></div>
      <div className="signin-modal">
        <h1>Welcome Back</h1>
        <p>Enter your credentials to access your account</p>
        <a
          onClick={() => {
            setShowLogin(false);
            setShowSignup(false);
          }}
        >
          <i className="fas fa-times"></i>
        </a>
        <form onSubmit={onLoginSubmitHandler}>
          <InputTypeOne
            type="email"
            name="email"
            // required="required"    commented for development
            autoComplete="email"
            placeholder="Enter your email *"
            iconWrapper="input-icon"
            icon="far fa-envelope"
            inputWrapper="outline-email-input"
            onChange={onModalInputHandler}
            value={loginInput.email}
          />
          <InputTypeOne
            type="password"
            name="password"
            // required="required"     commented for development
            autoComplete="current-password"
            placeholder="Enter your password *"
            iconWrapper="input-icon"
            icon="fas fa-key"
            inputWrapper="outline-password-input"
            onChange={onModalInputHandler}
            value={loginInput.password}
          />
          <Button
            btnWrapper="signin-btn"
            type="submit"
            label="Sign In"
            btnClassName="btn primary-btn-md"
            onClick={onLoginSubmitHandler}
          />
          <p>
            Forgot your password?
            <span>
              <a> Reset Password </a>
            </span>
          </p>
          <a
            className="create-account-btn"
            onClick={() => {
              setShowLogin(false);
              setShowSignup(true);
            }}
          >
            <h2>
              Create New Account <i className="fas fa-angle-right"></i>
            </h2>
          </a>
        </form>
      </div>
    </>
  );
};

export default Login;
