import axios from 'axios';
import queryString from 'query-string';
import getToken from './token';

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  paramsSerializer: params => {
    return queryString.stringify(params);
  },
});

axiosClient.interceptors.request.use(request => {
  console.log('Starting Request', JSON.stringify(request, null, 2));
  return request;
});

// axiosClient.interceptors.response.use(response => {
//   console.log('Response:', JSON.stringify(response, null, 2));
//   return response;
// });

axiosClient.interceptors.request.use(async config => {
  let token = await getToken();
  if (token !== '')
    config.headers = {
      ...config.headers,
      Authorization: 'Bearer ' + token,
      Accept: '*/*',
      'Access-Control-Allow-Origin': '*',
    };
  return config;
});

axiosClient.interceptors.response.use(
  response => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  error => {
    throw error;
  },
);
export default axiosClient;
