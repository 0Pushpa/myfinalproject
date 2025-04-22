import React, { useState } from "react";
import { FaFacebookF, FaGoogle, FaInstagram } from "react-icons/fa";
import { RegisterUserService } from "../../../services/AuthService";
import { store } from "react-notifications-component";

const Login = ({ openSignUp }) => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const notify = (title, message, type) => {
    store.addNotification({
      title,
      message,
      type,
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 5000,
        onScreen: true,
      },
    });
  };

  const getDataForRegisteration = (e) => {
    switch (e.target.name) {
      case "name":
        setName(e.target.value);
        break;
      case "phone":
        setPhoneNumber(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      case "confirm-password":
        setConfirmPassword(e.target.value);
        break;
      default:
        console.log("Error");
    }
  };

  const registerData = async (e) => {
    e.preventDefault();
    const payload = {
      name,
      phoneNumber,
      email,
      password,
      confirmPassword,
    };

    const clearForm = () => {
      setName("");
      setEmail("");
      setPhoneNumber("");
      setPassword("");
      setConfirmPassword("");
    };

    const res = await RegisterUserService(payload);
    console.log(res);
    if (res && res.data && res.data.status === "success") {
      localStorage.setItem("user-details", res.data);
      clearForm();
      openSignUp();
      notify(
        "Registered Successfully",
        "Please check your email to verify your account",
        "info"
      );
    } else {
      notify("Error", res.message ? res.message : "Unexpected error", "danger");
    }
  };
  return (
    <div className="form-container sign-up-container">
      <form onSubmit={registerData}>
        <h3>Create Account</h3>
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
        <span style={{ marginBottom: "9px" }}>
          {" "}
          or use your email for registration
        </span>
        <input
          type="text"
          placeholder="Full Name*"
          name="name"
          value={name}
          onChange={getDataForRegisteration}
        />
        <input
          type="text"
          placeholder="Contact Number*"
          name="phone"
          value={phoneNumber}
          onChange={getDataForRegisteration}
        />
        <input
          type="email"
          placeholder="Email*"
          name="email"
          value={email}
          onChange={getDataForRegisteration}
        />
        <input
          type="password"
          placeholder="Password*"
          name="password"
          value={password}
          onChange={getDataForRegisteration}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          name="confirm-password"
          value={confirmPassword}
          onChange={getDataForRegisteration}
        />
        <button className="signin">Sign Up</button>
      </form>
    </div>
  );
};

export default Login;