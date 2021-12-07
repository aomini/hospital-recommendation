import axios from "axios";
import configs from "src/config/axios";

const instance = axios.create({ ...configs });

instance.interceptors.request.use(
  (config) => {
    config.headers = {
      Authorization: `Bearer ${localStorage.getItem("tok")}`,
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
