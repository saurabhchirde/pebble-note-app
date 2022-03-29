import { createContext, useContext, useState } from "react";

const modalContext = createContext(null);

const ModalProvider = ({ children }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  return (
    <modalContext.Provider
      value={{
        showLogin,
        setShowLogin,
        showSignup,
        setShowSignup,
      }}
    >
      {children}
    </modalContext.Provider>
  );
};

const useModal = () => useContext(modalContext);

export { ModalProvider, useModal };
