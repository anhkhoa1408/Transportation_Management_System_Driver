import axiosClient from './axiosClient';
import { MAIN_URL } from './config';

class ShipmentAPI {
  currentShipment = () => {
    const url = MAIN_URL.concat('/current-shipments');
    return axiosClient.get(url);
  };
  finishedShipment = (pageIndex = 0) => {
    const url = MAIN_URL.concat('/finished-shipments?pageIndex=' + pageIndex);
    return axiosClient.get(url);
  };
  shipmentDetail = id => {
    const url = MAIN_URL.concat(`/shipments/${id}`);
    return axiosClient.get(url);
  };
}
const shipmentApi = new ShipmentAPI();
export default shipmentApi;
