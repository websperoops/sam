import axios from "axios";

import { getToken } from "../services";

const BASE_URL = process.env.REACT_APP_API;

const getHeaders = () => {
  return {
    "Authorization": `Bearer ${getToken()}`,
  };
};

axios.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response && error.response.data) {
      return Promise.reject(error.response.data);
  }
  return Promise.reject(error.message);
});

const apiRequest = (method, url, data) => {
  return axios({
    headers: getHeaders(),
    method,
    url: `${BASE_URL}/api/${url}`,
    data,
  });
};

export default apiRequest;
