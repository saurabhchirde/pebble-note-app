import { createContext, useContext, useState } from "react";

const animationContext = createContext(null);

const AnimationProvider = ({ children }) => {
  const [loader, setLoader] = useState(true);
  const [loginAnimate, setLoginAnimate] = useState(true);

  return (
    <animationContext.Provider
      value={{ loader, setLoader, loginAnimate, setLoginAnimate }}
    >
      {children}
    </animationContext.Provider>
  );
};

const useAnimation = () => useContext(animationContext);

export { AnimationProvider, useAnimation };
