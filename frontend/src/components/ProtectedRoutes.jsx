import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {

  // access token from AuthContext
  const { token } = useContext(AuthContext);

  // if token doesn't exist, return to login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  // else return the children component
  else {
    return children;
  }
};

export default ProtectedRoutes;
