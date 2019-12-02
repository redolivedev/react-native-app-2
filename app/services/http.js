import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

//axios.defaults.baseURL = 'http://mojo-dojo-api.test/api/';
axios.defaults.baseURL = 'http://staging.myftp.org/mojo-dojo-api/public/api/';

axios.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

const http = {
  post(requestPath, requestData) {
    return axios.post(requestPath, requestData).catch(error => {
      // Handle returned errors here
      console.log(error);
    });
  },
  patch(requestPath, requestData) {
    return axios.patch(requestPath, requestData).catch(error => {
      // Handle returned errors here
      console.log(error);
    });
  },
  get(requestPath) {
    return axios.get(requestPath).catch(error => {
      // Handle returned errors here
      console.log(error);
    });
  },
};

export default http;
