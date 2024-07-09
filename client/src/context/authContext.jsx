import { createContext, useEffect, useState } from "react";
import { server } from "../main.jsx";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user") || null)
  );

  const login = async (inputs) => {
    const res = await axios.post(`${server}/auth/login`, inputs, {
      withCredentials: true,
    });
    localStorage.setItem("token", res.data.token)

    const remainingMilliseconds = 60 * 60 * 1000;
        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        );
        localStorage.setItem("expiryDate", expiryDate.toISOString());
        
    setCurrentUser(res.data.other);
  };

  const logout = async (e) => {
    e.preventDefault()
    try {

      await axios.get(`${server}/auth/logout`, {
        withCredentials: true,
      });
      setCurrentUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
