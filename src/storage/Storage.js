import AsyncStorage from "@react-native-async-storage/async-storage";

export const clear = () => {
  AsyncStorage.clear();
};

export const getData = async (id) => {
  try {
    const value = await AsyncStorage.getItem("@App:" + id);
    if (value !== null) {
      console.log("found: " + id + "=" + value);
      return value;
    } else {
      console.log("Not found: " + id);
      return "";
    }
  } catch (error) {
    console.log("Failure retrieving " + id + " error: " + error);
  }
};

export const saveData = async (id, value) => {
  try {
    await AsyncStorage.setItem("@App:" + id, JSON.stringify(value));
    console.log("saved");
  } catch (error) {
    console.log("Failure saving: " + error);
  }
};

export default { getData, saveData };
