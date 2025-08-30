import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://192.168.10.8:8080/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const localData = await AsyncStorage.getItem("appData");
      const appData = JSON.parse(localData);

      if (appData) {
        config.headers.Authorization = `Bearer ${appData?.token}`;
      }
    } catch (error) {
      console.log("storage token issue", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
