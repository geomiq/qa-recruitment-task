import axios from "axios";

const Api = axios.create({
  baseURL: `http://localhost:8000`,
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true
});

export const ENDPOINTS = {
  CSRF: "api/csrf-cookie",
  LOGIN: "api/login",
  REGISTER: "api/register",
  USER: "api/user",
  LOGOUT: "api/logout"
}

export default Api;
