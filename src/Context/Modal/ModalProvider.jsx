import { createContext, useContext, useState } from "react";

const modalContext = createContext(null);

const ModalProvider = ({ children }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showSignupAlert, setShowSignupAlert] = useState(false);
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  return (
    <modalContext.Provider
      value={{
        showLogin,
        setShowLogin,
        showSignup,
        setShowSignup,
        showSignupAlert,
        setShowSignupAlert,
        error,
        setError,
        showError,
        setShowError,
        alertText,
        setAlertText,
        showAlert,
        setShowAlert,
      }}
    >
      {children}
    </modalContext.Provider>
  );
};

const useModal = () => useContext(modalContext);

export { ModalProvider, useModal };
