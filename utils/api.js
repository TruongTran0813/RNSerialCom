import axios from 'axios';
import {userStore} from '../stores';
import {API_URL} from '../constant';

const refreshTokenUrl = '/refreshtoken';
const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async request => {
    let originalRequest = request;

    if (request.authorization !== false && request.url !== refreshTokenUrl) {
      const token = userStore.getState().accessToken;
      if (token) {
        request.headers.Authorization = token;
      }
    }

    return request;
  },
  error => {
    console.log('err: ', error);
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  async response => {
    return response.data;
  },
  error => {
    return Promise.reject(error.response);
  },
);

export default api;
