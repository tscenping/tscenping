import axios from "axios";

const baseUrl = `${process.env.REACT_APP_PUBLIC_ENDPOINT}`;

const instance = axios.create({
  baseURL: baseUrl,
});

instance.interceptors.request.use(
  function setConfig(parameter) {
    const config = parameter;
    config.headers["Content-Type"] = "application/json";
    config.withCredentials = true;
    return config;
  },
  function getError(error) {
    return Promise.reject(error);
  }
);

// instance.interceptors.response.use(
//   function handleResponse(response) {
//     return response;
//   },
//   function handleError(error) {
//     if (error.response && error.response.status === 401) {
//       localStorage.removeItem("42ence-token");
//       window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );

export { instance };
