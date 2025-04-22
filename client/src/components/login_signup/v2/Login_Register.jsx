import React, { useState } from "react";
// import { AiFillLock } from "react-icons/ai";
// import { FaFacebookF, FaGoogle, FaInstagram } from "react-icons/fa";
// import { MdOutlineMail } from "react-icons/md";
// import { RiUserFill } from "react-icons/ri";
// import { store } from "react-notifications-component";
// import { RegisterUserService } from "../../../services/AuthService";
import "../Login_Signup.css";
import Register from "./img/2.png";
import Log from "./img/ffirst.svg";
import "./style.scss";
import Registration from "./Register";
import Login from "./Login";
import VideoP from "./VideoP";
import Page from "../../page";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginRegister({ openSignUp }) {
  const [islogin, setIsLogin] = React.useState(true);

  function LoginToSignup() {
    setIsLogin(!islogin);
  }
  return (
    <Page title={islogin ? "Login | Slate" : "Register | Slate"}>
      <div className="signup-wrapper">
        <div className={!islogin ? "containers" : "containers sign-up-mode"}>
          <div class="forms-container">
            <div class="signin-signup">
              <Registration toggler={LoginToSignup} />

              <Login />
            </div>
          </div>

          <div class="panels-container">
            <div class="panel left-panel">
              <div class="content">
                <h3>Connect With Us</h3>
                <p>
                  Chat, call, and share video simply from one place that helps
                  you stay close to all the people in your life.
                </p>
                <button
                  class="btn transparent"
                  id="sign-in-btn"
                  onClick={LoginToSignup}
                >
                  Login
                </button>
              </div>
              <img src={Log} className="image" alt="" />
            </div>
            <div class="panel right-panel">
              <div class="content">
                <h3>New here ?</h3>
                <p>
                  Make amazing things happen together at home, work, and school.
                </p>
                <button
                  class="btn transparent"
                  id="sign-up-btn"
                  onClick={LoginToSignup}
                >
                  Sign up
                </button>
              </div>
              <div className="video-wrapper image">
                <div id="video_class">
                  <VideoP />
                </div>
                <img src={Register} className="image" alt="" />{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />

    </Page>
  );
}
