export const joinAddress = addressObj => {
  return `${addressObj.street}, ${addressObj.ward}, ${addressObj.province}, ${addressObj.city}`;
};
