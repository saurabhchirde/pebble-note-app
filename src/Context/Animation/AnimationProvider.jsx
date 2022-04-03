import { createContext, useContext, useState } from "react";

const animationContext = createContext(null);

const AnimationProvider = ({ children }) => {
  const [loader, setLoader] = useState(false);
  const [loginAnimate, setLoginAnimate] = useState(true);

  const showLoader = () => {
    setLoader((loader) => !loader);
  };

  return (
    <animationContext.Provider
      value={{ loader, setLoader, showLoader, loginAnimate, setLoginAnimate }}
    >
      {children}
    </animationContext.Provider>
  );
};

const useAnimation = () => useContext(animationContext);

export { AnimationProvider, useAnimation };
