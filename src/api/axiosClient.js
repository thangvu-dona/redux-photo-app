import axios from "axios";
import queryString from "query-string";
import firebase from 'firebase/compat/app'
// import 'firebase/compat/auth'

const getFirebaseToken = async () => {
  const currentUser = firebase.auth().currentUser
  if (currentUser) return await currentUser.getIdToken()

  // not logged in
  const hasRememberedAccount = localStorage.getItem('firebaseui::rememberedAccounts')
  if (!hasRememberedAccount) return null

  // logged in but current user is not fetched - wait 10s
  return new Promise((resolve, reject) => {
    const waitTimer = setTimeout(() => {
      reject(null)
      console.log('Reject timeout');
    }, 10000)

    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        reject(null) // Fail
      }

      console.log('Logged in user: ', user.displayName)

      const token = await user.getIdToken()
      console.log('[AXIOS] Logged in user token: ', token)
      resolve(token)

      unregisterAuthObserver()
      clearTimeout(waitTimer)
    })
  })
}

const axiosClient = axios.create({
  // baseURL: process.env.REACT_APP_API_URL,
  baseURL: 'https://json-server-demo-nigy.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: params => queryString.stringify(params)
});

// Thêm một bộ đón chặn request
axiosClient.interceptors.request.use(async function (config) {
  // Làm gì đó trước khi request dược gửi đi
  // handle token here
  // const currentUser = firebase.auth().currentUser
  // if (currentUser) {
  //   // getIdtoken() method will be auto-fetch token if it expired
  //   const token = await currentUser.getIdToken();
  //   config.headers.Authorization = `Bearer ${token}`
  // }

  const token = getFirebaseToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

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