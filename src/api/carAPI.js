import axiosClient from './axiosClient';
import { MAIN_URL } from './config';

class CarAPI {
  create = data => {
    const url = MAIN_URL.concat('/car-brokens');
    return axiosClient.post(url, data);
  };
}
const carAPI = new CarAPI();
export default carAPI;
