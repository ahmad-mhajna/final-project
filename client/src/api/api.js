import axios from "axios";

const apiInstance = axios.create({
  baseURL: "http://localhost:3000/food",
});
const apiInstance2 = axios.create({
  baseURL: "https://6299bd076f8c03a978485945.mockapi.io/user",
});
export { apiInstance, apiInstance2 };
