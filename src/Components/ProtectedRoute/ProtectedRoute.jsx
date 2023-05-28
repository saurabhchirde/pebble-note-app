import { Navigate } from "react-router-dom";
import { useAuth } from "Context";

export const ProtectedRoute = ({ children }) => {
  const { auth } = useAuth();
  return <>{auth.token ? children : <Navigate to="/" />}</>;
};
