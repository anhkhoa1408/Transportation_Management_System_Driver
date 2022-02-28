import axiosClient from './axiosClient';
import { MAIN_URL } from './config';

class PasswordchangeApi {
  changepassword = data => {
    const url = MAIN_URL.concat(`/auth/password/update`);
    return axiosClient.post(url, data);
  };
}
const passwordchangeapi = new PasswordchangeApi();
export default passwordchangeapi;
