import Alert from "@mui/material/lab/Alert";
import React, { useState } from "react";
import { FaFacebookF, FaGoogle, FaInstagram } from "react-icons/fa";
import { store } from "react-notifications-component";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { authData } from "../../../redux/action/Index";
import { LoginUserService } from "../../../services/AuthService";
import { Link } from "react-router-dom";
// import * as React from 'react';
// import Box from "@mui/material/Box";
// import { TextField } from "@mui/material";
const Login = () => {
  const [getUserEmail, setGetUserEmail] = useState("");
  const [getUserPassword, setGetUserPassword] = useState("");
  const [error, setError] = useState(false);
  // const [errorMessage, setErrorMessage] = useState("");

  const closeAlert = () => {
    setError(false);
  };

  const dispatch = useDispatch();
  const history = useNavigate();
  const userEmail = (event) => {
    setGetUserEmail(event.target.value);
  };
  const userPassword = (event) => {
    setGetUserPassword(event.target.value);
  };
  async function send(e) {
    e.preventDefault();
    const payload = {
      email: getUserEmail,
      password: getUserPassword,
    };

    // const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const res = await LoginUserService(payload);
    if (res && res.data?.status === "success") {
      localStorage.setItem("user-token", res.data.token);
      dispatch(authData(res.data.user));
      history("/slate");
      store.addNotification({
        title: "Success",
        message: "Logged In Successfully",
        type: "success",
        insert: "bottom",
        container: "bottom-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: true,
        },
      });
    } else {
      console.log("error occured", res);
      if (res.data.status === "unauthorized") {
        store.addNotification({
          title: "Notice",
          message: res.data.message,
          type: "info",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 6000,
            onScreen: true,
          },
        });
      } else {
        store.addNotification({
          title: "Error Occurred",
          message: res.data.message,
          type: "danger",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 6000,
            onScreen: true,
          },
        });
      }

      // setErrorMessage(res.message);
      console.log(res);
      dispatch({
        type: "LOGIN_ERROR",
        payload: res.message,
      });
    }
  }
  return (
    <div className="form-container sign-in-container">
      <form onSubmit={send} className="login__form">
        {error && (
          <Alert severity="error" onClose={closeAlert}>
            Invalid credentials provided
          </Alert>
        )}
        <h1>Login</h1>
        <div className="social-container">
          <a href="https://www.facebook.com" className="social">
            <FaFacebookF />
          </a>
          <a href="https://www.instagram.com" className="social">
            <FaInstagram />
          </a>
          <a href="https://www.google.com" className="social">
            <FaGoogle />
          </a>
        </div>
        <span>or use your account</span>
        <input
          type="email"
          placeholder="Email"
          value={getUserEmail}
          onChange={userEmail}
        />
        <input
          type="password"
          placeholder="Password"
          value={getUserPassword}
          onChange={userPassword}
        />

        <span className="forgot_password_text_login">
          <Link to="/forgot-password">Forgot your password?</Link>
        </span>
        <button className="signin">LogIn</button>
      </form>
    </div>
  );
};

export default Login;