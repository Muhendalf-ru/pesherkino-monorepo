import axios from "axios";

const API_URL = "http://localhost:3003";

const http = axios.create({
  baseURL: API_URL,
});

export const setAuthToken = (token?: string) => {
  if (token) {
    http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete http.defaults.headers.common["Authorization"];
  }
};

export default http;
