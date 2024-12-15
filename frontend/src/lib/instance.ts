import axios from "axios";

// export const baseURL = "https://xw2kr4m2-3000.inc1.devtunnels.ms";
export const baseURL = "http://192.168.1.127:3000";
export const api = axios.create({
  //   baseURL: "https://2fjd62r4-3000.inc1.devtunnels.ms/api", pranil
  // baseURL: "http://192.168.34.49:3000", //vector
  baseURL: baseURL,
  // baseURL: "http://100.64.70.63:3000",
  // baseURL: "http://192.168.34.236:3000",
});

api.interceptors.request.use(function (config) {
  let token = localStorage.getItem("token");
  if (token) config.headers["Authorization"] = "Bearer " + token;
  return config;
});
