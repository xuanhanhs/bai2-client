import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ERROR, URL_SERVER } from 'src/constants';
import { LocalStorage } from 'src/utils';
import { toast } from 'react-toastify';
import { PATH_SIGN_IN } from 'src/constants';

export const axiosClient = axios.create({
  baseURL: URL_SERVER,
});

axiosClient.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    const user = LocalStorage.getItem('user');
    if (config.headers && user) {
      config.headers.Authorization = 'Basic ' + user.authdata;
    }
    return config;
  },

  function (error) {
    return Promise.reject(error);
  },
);

axiosClient.interceptors.response.use(
  function (response: AxiosResponse) {
    return response.data;
  },

  function (error) {
    if (
      error?.response?.data?.statusCode === 401 &&
      error?.response?.data?.message === ERROR.UNAUTHORIZED
    ) {
      LocalStorage.clear();
      window.location.href = PATH_SIGN_IN;
    }
    if (ERROR[error?.response?.data?.message]) {
      toast.error(ERROR[error.response.data.message]);
    } else {
      toast.error('Có lỗi xảy ra, vui lòng thử lại');
    }
    return Promise.reject(error);
  },
);
