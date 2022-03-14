import axiosClient from './axiosClient';
import { MAIN_URL } from './config';

class FurloughsApi {
  create = data => {
    const url = MAIN_URL.concat('/furloughs');
    return axiosClient.post(url, data);
  };
}
const furloughApi = new FurloughsApi();
export default furloughApi;
