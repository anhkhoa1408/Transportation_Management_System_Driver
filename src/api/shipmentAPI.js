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
  packageDetail = id => {
    const url = MAIN_URL.concat(`/packages/${id}`);
    return axiosClient.get(url);
  };
  updatePackageImage = (id, uploadList, deleteList) => {
    const url = MAIN_URL.concat(`/packages/images/${id}`);

    let formData = new FormData();

    uploadList.forEach(image => {
      formData.append(
        `files`,
        {
          name: image.fileName,
          uri: image.uri,
          type: image.type,
        },
        image.fileName,
      );
    });
    formData.append('data', `{"_delete": ${JSON.stringify(deleteList)}}`);
    formData.append('ref', 'package');
    formData.append('refId', id);
    formData.append('field', 'images');

    return axiosClient.post(url, formData);
  };
  assistanceInfo = () => {
    const url = MAIN_URL.concat(`/assistance/status`);
    return axiosClient.get(url);
  };
  customerInfo = id => {
    const url = MAIN_URL.concat(`/customer/${id}`);
    return axiosClient.get(url);
  };
}
const shipmentApi = new ShipmentAPI();
export default shipmentApi;
