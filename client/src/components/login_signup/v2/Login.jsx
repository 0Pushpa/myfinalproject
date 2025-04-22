import React, { useState } from "react";
import { MdOutlineMail } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import "../Login_Signup.css";
import PasswordWithToggle from "../../elements/PasswordWithToggle";
import { InputAdornment, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { LoginUserService } from "../../../services/AuthService";
import { authData } from "../../../redux/action/Index";
import { toast } from "react-toastify";

export default function Login({ openSignUp }) {
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Must be a valid email")
      .max(255)
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues: {
      email: null,
      password: null,
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userPassword = (event) => {
    setValue("password", event.target.value);
  };

  const send = async (payload) => {
    try {
      const res = await LoginUserService(payload);
      const status = res?.status || res?.data?.status;

      if (status === "success") {
        const user = res.user || res?.data?.user;
        const token = res.token || res?.data?.token;
        const refreshToken = res.refreshToken || res?.data?.refreshToken;

        localStorage.setItem("user-token", token);
        localStorage.setItem("refresh-token", refreshToken);
        dispatch(authData(user));
        toast.success("Login successful");
        navigate("/slate/groups");
      } else {
        const errorMsg = res?.message || res?.data?.message || "Login failed";
        toast.error(errorMsg);
        dispatch({ type: "LOGIN_ERROR", payload: errorMsg });
      }
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || "Something went wrong";
      toast.error(message);
      dispatch({ type: "LOGIN_ERROR", payload: message });
    }
  };

  return (
    <form className="sign-up-form" onSubmit={handleSubmit(send)}>
      <h2 className="title">Login</h2>
      <TextField
        fullWidth
        required
        style={{ maxWidth: "380px" }}
        id="email-input"
        label="Email"
        variant="outlined"
        autoFocus
        {...register("email")}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <MdOutlineMail />
            </InputAdornment>
          ),
        }}
        error={Boolean(errors.email)}
        helperText={errors.email && errors.email.message}
      />
      <PasswordWithToggle
        onType={userPassword}
        error={Boolean(errors.password)}
        helperText={errors.password && errors.password.message}
      />
      <input type="submit" value="Login" className="btn solid" />
      <p className="social-text">
        <Link style={{ color: "#0f9ce0" }} to="/forgot-password">
          Forgot Password?
        </Link>
      </p>
    </form>
  );
}
