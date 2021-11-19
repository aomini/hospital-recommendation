import axios from "axios";
import configs from "src/config/axios";

const instance = axios.create({ ...configs });

instance.interceptors.request.use(
  function (config) {
    config.headers = {
      Authorization: "Bearer " + localStorage.getItem("tok") 
    }
    return config
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response.data  
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
