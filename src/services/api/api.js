import axios from 'axios';
axios.defaults.headers = {'Content-Type': 'application/json'};
axios.defaults.withCredentials = true;
axios.defaults.maxContentLength = 0;

export default {
  get: (url, params) => axios.get(url, params),
  post: (url, params, config) => axios.post(url, params, config),
  delete: (url) => axios.delete(url),
  put: (url, params) => axios.put(url, params),
}
