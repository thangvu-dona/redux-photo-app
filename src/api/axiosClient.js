import axios from "axios";
import queryString from "query-string";

const axiosClient = axios.create({
  // baseURL: process.env.REACT_APP_API_URL,
  baseURL: 'https://json-server-demo-nigy.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: params => queryString.stringify(params)
});

// Thêm một bộ đón chặn request
axiosClient.interceptors.request.use(function (config) {
  // Làm gì đó trước khi request dược gửi đi
  return config;
}, function (error) {
  // Làm gì đó với lỗi request
  return Promise.reject(error);
});

// Thêm một bộ đón chặn response
axiosClient.interceptors.response.use(function (response) {
  // Bất kì mã trạng thái nào nằm trong tầm 2xx đều khiến hàm này được trigger
  // Làm gì đó với dữ liệu response
  if (response && response.data) {
    return response.data;
  }

  return response;
}, function (error) {
  // Bất kì mã trạng thái nào lọt ra ngoài tầm 2xx đều khiến hàm này được trigger\
  // Làm gì đó với lỗi response
  return Promise.reject(error);
});

export default axiosClient;