import { apiEndpoint } from "../constant/endpoint";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Corrected import
import { refreshTokenService } from "./AuthService";

const refreshToken = localStorage.getItem("refresh-token");
const token = localStorage.getItem("user-token");

const secureApi = axios.create();

// Axios Request Interceptor
secureApi.interceptors.request.use(
  async (config) => {
    if (token) {
      const decodedToken = jwtDecode(token); // Corrected usage of jwtDecode
      if (decodedToken.exp * 1000 < Date.now()) {
        try {
          const res = await refreshTokenService({
            token: refreshToken,
            userId: decodedToken.id,
          });
          if (res?.data?.token) {
            localStorage.setItem("user-token", res.data.token);
            config.headers.Authorization = `Bearer ${res.data.token}`;
          }
        } catch (error) {
          console.error("Failed to refresh token:", error);
          // Handle token refresh failure (e.g., redirect to login)
          throw error;
        }
      } else {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default class HttpService {
  url = apiEndpoint;

  // POST Request
  // postData = async (item, added_url, tokenId = "user-token") => {
  //   const token = localStorage.getItem(tokenId);
  //   const requestOptions = this.requestOptions(token);

  //   try {
  //     const response = await secureApi.post(
  //       `${this.url}/${added_url}`,
  //       item,
  //       requestOptions
  //     );
  //     return this.handleResponse(response);
  //   } catch (e) {
  //     return this.handleError(e);
  //   }
  // };

  postData = async (item, added_url, tokenId = "user-token") => {
    const token = localStorage.getItem(tokenId);
  
    // ✅ Detect if it's FormData
    const isFormData = item instanceof FormData;
  
    // 🧠 Only set Content-Type if it's not FormData
    const headers = {
      Authorization: `Bearer ${token}`,
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
    };
  
    try {
      const response = await secureApi.post(
        `${this.url}/${added_url}`,
        item,
        { headers }
      );
      return this.handleResponse(response);
    } catch (e) {
      return this.handleError(e);
    }
  };
  

  // PATCH Request
  patchData = async (item, added_url, tokenId = "user-token") => {
    const token = localStorage.getItem(tokenId);
    const requestOptions = this.requestOptions(token);

    try {
      const response = await secureApi.patch(
        `${this.url}/${added_url}`,
        item,
        requestOptions
      );
      return this.handleResponse(response);
    } catch (e) {
      return this.handleError(e);
    }
  };

  // DELETE Request
  deleteData = async (added_url, tokenId = "user-token") => {
    const token = localStorage.getItem(tokenId);
    const requestOptions = this.requestOptions(token);

    try {
      const response = await secureApi.delete(`${this.url}/${added_url}`, requestOptions);
      return this.handleResponse(response);
    } catch (e) {
      return this.handleError(e);
    }
  };

  // GET Request
  getData = async (added_url, tokenId = "user-token") => {
    const token = localStorage.getItem(tokenId);
    const requestOptions = this.requestOptions(token);

    try {
      const response = await secureApi.get(`${this.url}/${added_url}`, requestOptions);
      return this.handleResponse(response);
    } catch (e) {
      return this.handleError(e);
    }
  };

  // Download Data
  downloadData = async (added_url, tokenId = "user-token") => {
    const token = localStorage.getItem(tokenId);
    const url = `${apiEndpoint}/${added_url}`;
    try {
      // Open the URL in a new tab with the token as a query parameter
      window.open(`${url}?token=${token}`, "_blank");
    } catch (e) {
      console.error("Failed to download data:", e);
      return false;
    }
  };

  // GET Request with Query Parameters
  getDataWithParams = async (added_url, params, tokenId = "user-token") => {
    const token = localStorage.getItem(tokenId);
    const requestOptions = this.requestOptions(token);

    try {
      const response = await secureApi.get(`${this.url}/${added_url}`, {
        ...requestOptions,
        params,
      });
      return this.handleResponse(response);
    } catch (e) {
      return this.handleError(e);
    }
  };

  // Helper Method to Handle Responses
  handleResponse = (response) => {
    if (response?.status === 200) {
      return response.data;
    } else {
      return { status: response.status, message: response.data?.message || "Unknown error" };
    }
  };

  // Helper Method to Handle Errors
  // handleError = (error) => {
  //   console.error("API Error:", error.response?.data || error.message);
  //   return { status: error.response?.status || 400, message: error.message };
  // };
  handleError = (error) => {
    const errorMessage =
      error.response?.data?.message || "Unknown error occurred";
  
    return {
      status: error.response?.status || 400,
      message: errorMessage,
      details: error.response?.data?.details || [],
    };
  };
  

  // Generate Request Options
  requestOptions = (token) => {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
  };
}