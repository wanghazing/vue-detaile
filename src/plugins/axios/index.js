import axios from "axios";
import { HttpError } from "./errors";

const instance = axios.create({
  timeout: 60 * 1000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  responseType: "json",
});

instance.interceptors.request.use(requestInterceptor);

function requestInterceptor(config) {
  const method = config.method;
  const extendArgs = {
    _local: "zh_CN",
  };
  if (["get", "put", "delete"].indexOf(method) === -1) {
    config.params = Object.assign(config.params || {}, extendArgs);
  } else {
    config.data = Object.assign(config.data || {}, extendArgs);
  }
  return config;
}
axios.interceptors.response.use(
  (response) => {
    // return response;
    if (response.status === 200) {
      if (response.data.code === "00000000") {
        return response.data;
      } else {
        // throw new BuessinessError({
        //   message: response.data.message,
        //   uri: response.config.url,
        // });
      }
    } else {
      console.log("http错误");
      // throw new HttpError({
      //   message: response.message,
      //   httpCode: response.status,
      // });
    }
  },
  (error) => {
    Promise.reject(
      new HttpError({
        httpCode: error.response.status,
      })
    );
  }
);
export default {
  install(app) {
    app.config.globalProperties.$http = axios;
  },
};
