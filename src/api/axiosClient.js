import axios from "axios";
import queryString from "query-string";
import { store } from "../config/configureStore";

const getToken = () => {
  let storeData = store.getState();
  if (
    storeData &&
    storeData.userInfo &&
    storeData.userInfo.data &&
    storeData.userInfo.data.token
  ) {
    return storeData.userInfo.data.token;
  } else {
    return null;
  }
};

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => {
    return queryString.stringify(params)
  },
});

axiosClient.interceptors.request.use(async (config) => {
  let token = await getToken();
  config.headers = {
    Authorization: token,
  };
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response;
    }
    return response;
  },
  (error) => {
    // Handle errors
    throw error;
  }
);
export default axiosClient;
