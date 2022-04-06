import { createContext, useContext, useReducer, useState } from "react";

const initialAuthState = {
  login: false,
  token: "",
  user: {
    firstName: "",
    lastName: "",
    email: "",
    dp: "",
  },
};

const authReducer = (auth, action) => {
  switch (action.type) {
    case "login":
      return {
        ...auth,
        login: true,
        token: action.payload.encodedToken,
        user: {
          firstName: action.payload.foundUser.firstName,
          lastName: action.payload.foundUser.lastName,
          email: action.payload.foundUser.email,
          dp:
            action.payload.foundUser.firstName[0] +
            action.payload.foundUser.lastName[0],
        },
      };

    case "logout":
      return initialAuthState;

    default:
      return auth;
  }
};

const authContext = createContext(initialAuthState);

const AuthProvider = ({ children }) => {
  const [auth, authDispatch] = useReducer(
    authReducer,
    JSON.parse(localStorage.getItem("authState")) ?? initialAuthState
  );
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });

  localStorage.setItem("authState", JSON.stringify(auth));
  return (
    <authContext.Provider
      value={{ auth, authDispatch, loginInput, setLoginInput }}
    >
      {children}
    </authContext.Provider>
  );
};

const useAuth = () => useContext(authContext);

export { AuthProvider, useAuth };
