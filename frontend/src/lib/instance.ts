import axios from "axios";

export const baseURL = "https://xw2kr4m2-3000.inc1.devtunnels.ms";
export const api = axios.create({
  //   baseURL: "https://2fjd62r4-3000.inc1.devtunnels.ms/api", pranil
  baseURL: baseURL, //vector
});

api.interceptors.request.use(function (config) {
  let token = localStorage.getItem("token");
  if (token) config.headers["Authorization"] = "Bearer " + token;
  return config;
});
