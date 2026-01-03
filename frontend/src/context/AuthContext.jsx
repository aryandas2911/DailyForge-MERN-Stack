import { createContext, useEffect, useState } from "react";
import api from "../api/axios";

// create context component
export const AuthContext = createContext(null);

// provider component
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  // restore session on app load
  useEffect(() => {
    if (token) {
      // fetch logged-in user
      api
        .get("/auth/me")
        .then((res) => {
          setUser(res.data.user);
        })
        .catch(() => {
          // token invalid or expired
          logout();
        });
    }
  }, [token]);

  // logout function
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, setUser, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
