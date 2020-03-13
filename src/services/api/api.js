import axios from 'axios';
import store from '../../store';
const token = localStorage.getItem('user-token');

if (token) {
  axios.defaults.headers.common['Authorization'] = token;
}

(function () {
  axios.interceptors.response.use(undefined, function (err) {
    return new Promise(function (resolve, reject) {
      if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
        // if you ever get an unauthorized, logout the user
        store.dispatch('AUTH_LOGOUT');
        // you can also redirect to /login if needed !
      }
      throw err;
    });
  });
})();

export default {
  get: (url, params) => axios.get(url, params),
  post: (url, params, config) => axios.post(url, params, config),
  delete: (url) => axios.delete(url),
  put: (url, params) => axios.put(url, params),
  patch: (url, params) => axios.put(url, params),
}
