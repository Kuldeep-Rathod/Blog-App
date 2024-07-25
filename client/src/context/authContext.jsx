import { createContext, useEffect, useState } from "react";
import { server } from "../main.jsx";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user") || null)
  );

  const login = async (inputs) => {
    try {
      const res = await axios.post(`${server}/auth/login`, inputs, {
        withCredentials: true,
      });
      

      setCurrentUser(res.data);

      // Show success message
      Swal.fire({
        title: "Login Successful",
        text: "Welcome back!",
        icon: "success",
        showConfirmButton: false,
        showCancelButton: false,
        timer: 1500,
      });

      return true;
      
    } catch (error) {
      console.error("Login failed:", error);

      // Show error message
      Swal.fire({
        title: "Login Failed",
        text: "Please check your credentials and try again.",
        icon: "error",
        confirmButtonColor: "#008080",
      });

      return false;
    }
  };

  const logout = async (e) => {
    e.preventDefault();
    try {
      // Show SweetAlert confirmation dialog
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#008080",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, logout!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          // If confirmed, proceed with logout
          await axios.get(`${server}/auth/logout`, {
            withCredentials: true,
          });

          // Show success message
          Swal.fire({
            title: "Logged out!",
            text: "You have been logged out successfully.",
            icon: "success",
            showConfirmButton: false,
            showCancelButton: false,
            timer: 1500,
          });

          // Update the user state
          setCurrentUser(null);
        } else {
          // If not confirmed, show a cancellation message (optional)
          Swal.fire({
            title: "Cancelled",
            text: "You are still logged in.",
            icon: "info",
            showConfirmButton: false,
            showCancelButton: false,
            timer: 1500,
          });
        }
      });
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
