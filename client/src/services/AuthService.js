import { apiEndpoint } from "../constant/endpoint";
import HttpService from "./HttpService";
import axios from "axios";
// import { apiEndpoint } from "constant/endpoint";

export const RegisterUserService = async (credentials) => {
  const http = new HttpService();
  return await http.postData(credentials, "users/register");
};
export const LoginUserService = async (credentials) => {
  const http = new HttpService();
  return await http.postData(credentials, "users/login");
};
export const VerifyUserService = async (credentials) => {
  const http = new HttpService();
  return await http.postData(credentials, "users/verify");
};
export const VerifyTokenService = async (credentials) => {
  const http = new HttpService();
  return await http.postData(credentials, "users/verify-token");
};

export const ForgotPasswordService = async (credentials) => {
  const http = new HttpService();
  return await http.postData(credentials, "users/forgot-password");
};

export const ResetPasswordService = async (credentials) => {
  const http = new HttpService();
  return await http.postData(credentials, "users/reset-password");
};

export const LogOutUserService = async () => {
  const http = new HttpService();
  const tokenId = "user-token";
  return await http.getData("logout", tokenId);
};

export const refreshTokenService = async (credentials) => {
  try {
    const res = await axios.post(apiEndpoint + "/users/refresh", credentials);
    if (res.status === 200) {
      console.log("changed");
      localStorage.setItem("user-token", res?.data?.token);
    }
  } catch (e) {
    console.log(e);
  }
};
