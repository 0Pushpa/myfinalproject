import React, { useState } from "react";
import "../login_signup/Login_Signup.css";

import Login from "./login/Login";
import Signup from "./register/Signup";

export function Login_Signup() {
  const [addClass, setAddClass] = useState(false);

  const openSignUp = () => {
    setAddClass(addClass === "right-panel-active" ? "" : "right-panel-active");
  };

  return (
    <div id="sign-login-wrapper">
      <div className={"container " + addClass} id="container">
        <Signup openSignUp={openSignUp} />
        <Login />
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button className="ghost" id="signIn" onClick={openSignUp}>
                Login
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button className="ghost" onClick={openSignUp} id="signUp">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login_Signup;
