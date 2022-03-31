import { createContext, useContext, useReducer } from "react";

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
      console.log(action.payload);
      return {
        ...auth,
        login: true,
        token: action.payload.encodedToken,
        user: {
          firstName: action.payload.foundUser.firstName,
          lastName: action.payload.foundUser.lastName,
          email: action.payload.foundUser.email,
          dp:
            action.payload.foundUser.firstName.slice(0, 1) +
            action.payload.foundUser.lastName.slice(0, 1),
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
  localStorage.setItem("authState", JSON.stringify(auth));
  return (
    <authContext.Provider value={{ auth, authDispatch }}>
      {children}
    </authContext.Provider>
  );
};

const useAuth = () => useContext(authContext);

export { AuthProvider, useAuth };
