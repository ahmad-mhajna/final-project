import axios from "axios";
const baseURL =
  process.env.NODE_ENV === "production" ? "api" : "http://localhost:5000/api";
const apiInstance = axios.create({
  baseURL: `${baseURL}`,
});

export { apiInstance };
