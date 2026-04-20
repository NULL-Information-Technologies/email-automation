import axios from "axios";
import { proxy } from "../api/apiConfig/proxy";
import dayjs from "dayjs";

const axiosConfig = axios.create({
  baseURL: proxy,
  withCredentials: true,
    headers: {
    "Content-Type": "application/json",
  },
});

axiosConfig.interceptors.request.use(async (req) => {
  const authToken = localStorage.getItem("accessToken") || "";

  if (authToken) {
    req.headers["Authorization"] = `Bearer ${authToken}`;

    if (req.data instanceof FormData) {
      req.headers["Content-Type"] = "multipart/form-data";
    }
  
    const tokenPayload = atob(authToken.split(".")[1]);
    const { exp } = JSON.parse(tokenPayload);
    const isExpired = dayjs().isAfter(dayjs.unix(exp));
        if (isExpired) {
      try {
        const response = await axios.post(
          `${proxy}/auth/refresh`,
          {},
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
            withCredentials: true,
          }
        );
        const newToken = response.data.accessToken
        if (newToken) {
          localStorage.setItem("accessToken", newToken);
          req.headers.Authorization = `Bearer ${newToken}`;
        }
      } catch (error) {
        console.error("Token refresh failed:", error);
      }
    }}
  return req;
});

axiosConfig.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("AXIOS ERROR START ------------------");

    console.error("Message:", error.message);

    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Status Text:", error.response.statusText);
      console.error("Response Data:", error.response.data);
      console.error("Headers:", error.response.headers);
    }

    if (error.request) {
      console.error("Request:", error.request);
    }

    console.error("Config:", error.config);

    console.error("AXIOS ERROR END ------------------");

    if (error.response && error.response.status === 401) {
      localStorage.removeItem("accessToken");
      location.href = "/auth/login";
    }

    return Promise.reject(error);
  },
);

export default axiosConfig;
