import AsyncStorage from "@react-native-async-storage/async-storage";

export const removeData = async () => {
  try {
    await AsyncStorage.removeItem("@tt_token");
  } catch (e) {
    // saving error
  }
};
