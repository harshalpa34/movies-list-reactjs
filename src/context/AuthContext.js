import { createContext, useContext, useState } from "react";
import { logoutUser } from "../lib/api";

const AuthContext = createContext({
  isAuthenticated: false,
  user: undefined,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(undefined);

  const login = (data) => {
    setUser({ email: data.email, name: data.name });
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(undefined);
    logoutUser();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
