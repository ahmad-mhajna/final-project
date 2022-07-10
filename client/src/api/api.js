import axios from "axios";
const baseURL =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:5000/";
const apiInstance = axios.create({
  baseURL: `${baseURL}/foods`,
});
const apiInstance2 = axios.create({
  baseURL: `${baseURL}/user`,
});
export { apiInstance, apiInstance2 };
