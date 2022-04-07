import axiosClient from './axiosClient';
import { MAIN_URL } from './config';

class ShipmentAPI {
  currentShipment = origin => {
    const url = MAIN_URL.concat(
      `/current-shipments?latitude=${origin?.latitude}&longitude=${origin?.longitude}`,
    );
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
  acceptOrder = id => {
    const url = MAIN_URL.concat(`/shipments/accept/${id}`);
    return axiosClient.put(url);
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
  payment = (data, receipt) => {
    const url = MAIN_URL.concat(`/payments/`);

    let formData = new FormData();

    if (receipt)
      formData.append(
        `files.receipt`,
        {
          name: receipt.fileName,
          uri: receipt.uri,
          type: receipt.type,
        },
        receipt.fileName,
      );

    formData.append('data', data);

    return axiosClient.post(url, formData);
  };
  addShipmentItem = data => {
    const url = MAIN_URL.concat('/shipment-items');
    return axiosClient.post(url, data);
  };
}
const shipmentApi = new ShipmentAPI();
export default shipmentApi;
