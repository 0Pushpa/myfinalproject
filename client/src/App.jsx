import React from "react";
import "./App.scss"; // Global CSS (replacing SCSS)
import RouteConfig from "./config/routeConfig"; // Route configuration
import { useDispatch } from "react-redux"; // Redux hook
import { logoutUser } from "./redux/action/Index"; // Logout action
import { jwtDecode } from "jwt-decode"; // JWT decoding
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./assets/sass/Slate.scss";
import "react-notifications-component/dist/theme.css";

function App() {
  const dispatch = useDispatch();

  // Logout function
  const logout = () => {
    dispatch(logoutUser());
    localStorage.clear();
    window.location.href = "/signup"; // Redirect to signup page
  };

  // Check token expiration on component mount
  React.useEffect(() => {
    const token = localStorage.getItem("user-token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 < new Date().getTime()) {
          logout(); // Trigger logout if token is expired
        }
      } catch (error) {
        console.error("Invalid token:", error);
        logout(); // Handle invalid tokens gracefully
      }
    }
  }, []);

  return (
    <div className="App">
      {/* Render routes */}
      <RouteConfig /> {/* Correctly rendering RouteConfig */}
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
}

export default App;
