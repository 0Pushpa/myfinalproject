import React from "react";
import "./InitialPop.css";
import LoginSignup from "../Login_Signup";
import LoginOrSignup from "./LoginOrSignup";
import Login from "../v2/Login";
import "../v2/style.scss";

export default function InitialPopUp() {
  return (
    <div>
      <div class="animation-area ">
        {" "}
        {/* <LoginSignup /> */}
        <Login />
        {/* <LoginOrSignup /> */}
        <ul class="box-area">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>
  );
}