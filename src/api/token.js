import { USER_KEY } from "../storage/StorageKey";
import { getData } from "../storage/Storage";

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

export default getToken;
