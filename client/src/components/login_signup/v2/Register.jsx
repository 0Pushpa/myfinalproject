import React from "react";
import { MdOutlineMail } from "react-icons/md";
import { RiUserFill, RiPhoneFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { RegisterUserService } from "../../../services/AuthService";
import "../Login_Signup.css";
import "./style.scss";
import PasswordWithToggle from "../../elements/PasswordWithToggle";
import { InputAdornment, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { toast } from "react-toastify";

export default function Registration(props) {
  const RegisterSchema = Yup.object().shape({
    email: Yup.string()
      .email("Must be a valid email")
      .max(255)
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password is too short - should be 8 chars minimum."),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
    phoneNumber: Yup.string()
      .min(10, "Phone Number must be at least 10 characters")
      .max(10, "Phone Number must be at most 10 characters")
      .matches(/[0-9]/, "Phone number is not valid"),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues: {
      name: null,
      phoneNumber: null,
      email: null,
      password: null,
      confirmPassword: null,
    },
  });

  const getDataForRegistration = (e) => {
    switch (e.target.name) {
      case "password":
        setValue("password", e.target.value);
        break;
      case "confirm-password":
        setValue("confirmPassword", e.target.value);
        break;
      default:
        console.log("Error");
    }
  };

  const registerData = async (payload) => {
    const res = await RegisterUserService(payload);
    console.log(res,"ressssssssssssss")
    console.log(res?.status,"----another ressss----")
    if (res && res?.status === "success") {
      localStorage.setItem("user-details", JSON.stringify(res));
      props.toggler();
      toast.success("Registered Successfully");
    } else {
      toast.error(res?.message || "Registration Failed");
    }
  };

  return (
    <form className="sign-in-form" onSubmit={handleSubmit(registerData)}>
      <h2 className="title">Create your account</h2>
      <TextField
        fullWidth
        required
        style={{ maxWidth: "380px", marginTop: "10px" }}
        label="Name"
        variant="outlined"
        {...register("name")}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <RiUserFill />
            </InputAdornment>
          ),
        }}
        error={Boolean(errors.name)}
        helperText={errors.name && errors.name.message}
      />
      <TextField
        fullWidth
        style={{ marginTop: "20px", maxWidth: "380px" }}
        label="Phone Number"
        variant="outlined"
        {...register("phoneNumber")}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <RiPhoneFill />
            </InputAdornment>
          ),
        }}
        error={Boolean(errors.phoneNumber)}
        helperText={errors.phoneNumber && errors.phoneNumber.message}
      />
      <TextField
        fullWidth
        required
        style={{ marginTop: "20px", maxWidth: "380px" }}
        label="Email"
        variant="outlined"
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
        name="password"
        onType={getDataForRegistration}
        error={Boolean(errors.password)}
        helperText={errors.password && errors.password.message}
      />
      <PasswordWithToggle
        name="confirm-password"
        onType={getDataForRegistration}
        placeholder="Confirm Password"
        error={Boolean(errors.confirmPassword)}
        helperText={errors.confirmPassword && errors.confirmPassword.message}
      />

      <input type="submit" className="btn" value="Sign up" />
      <p className="social-text" onClick={() => props.toggler()}>
        Already have an account?{" "}
        <span
          style={{ color: "#0f9ce0", cursor: "pointer" }}
          onClick={() => props.toggler()}
        >
          Sign In
        </span>
      </p>
    </form>
  );
}
