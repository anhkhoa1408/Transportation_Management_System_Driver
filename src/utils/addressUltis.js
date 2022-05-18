export const joinAddress = (addressObj, detail = 'FULL') => {
  if (!addressObj) return 'Chưa xác định';
  let address;
  switch (detail) {
    case 'FIRST':
      address = `${addressObj.street}, ${addressObj.ward}`;
      break;
    case 'LAST':
      address = `${addressObj.province}, ${addressObj.city}`;
      break;
    default:
      address = `${addressObj.street}, ${addressObj.ward}, ${addressObj.province}, ${addressObj.city}`;
  }
  address = address.trim();
  while (address.indexOf(',') === 0) {
    address = address.slice(1).trim();
  }
  while (
    address.length > 0 &&
    address.lastIndexOf(',') === address.length - 1
  ) {
    address = address.slice(0, address.length - 1).trim();
  }
  return address === '' ? 'Chưa xác định' : address;
};

export function getDistanceFromCordinateInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}
