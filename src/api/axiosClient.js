import axios from "axios";
import queryString from "query-string";
import { store } from "../config/configureStore";
import { USER_KEY } from "../storage/StorageKey";
import { getData, saveData } from "../storage/Storage";

const getToken = async () => {
  // let storeData = store.getState();
  // if (
  //   storeData &&
  //   storeData.userInfo &&
  //   storeData.userInfo.data &&
  //   storeData.userInfo.data.token
  // ) {
  //   return storeData.userInfo.data.token;
  // } else {
  //   return null;
  // }
  let userData = await getData(USER_KEY);
  if (userData === "") return "";
  else return JSON.parse(userData).jwt;
};

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => {
    return queryString.stringify(params);
  },
});

axiosClient.interceptors.request.use(async (config) => {
  let token = await getToken();
  if (token !== "")
    config.headers = {
      Authorization: "Bearer " + token,
    };
  return config;
});

axiosClient.interceptors.request.use((request) => {
  console.log("Starting Request", JSON.stringify(request, null, 2));
  return request;
});

// axiosClient.interceptors.response.use((response) => {
//   console.log("Response:", JSON.stringify(response, null, 2));
//   return response;
// });

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
