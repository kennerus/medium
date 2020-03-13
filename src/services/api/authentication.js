import api from './api';
import axios from 'axios';
import store from '../../store';

// т.к. тут запросы идут не к реальному серверу, а эмуляции и я не могу получить текущего авторизованного пользователя
// решил при регистрации/авторизации записывать его мейл в стор, чтобы можно было получить данные при перезагрузке страницы

const successCallback = (response, resolve) => {
  const {accessToken} = response.data;
  store.dispatch('AUTH_SUCCESS', accessToken);
  localStorage.setItem('user-token', accessToken); // store the token in localstorage
  axios.defaults.headers.common['Authorization'] = accessToken;
  resolve(response);
};

const catchCallback = (error, reject) => {
  store.dispatch('AUTH_LOGOUT', '');
  localStorage.removeItem('user-token');// if the request fails, remove any possible user token if possible
  localStorage.removeItem('user-email');
  reject(error);
};

export default {
  /**
   * User authorization
   *
   * @param {Object} loginData
   * @param {String} loginData.email
   * @param {String} loginData.password
   * @return {Object} - token
   */
  login: loginData => new Promise((resolve, reject) => {
    localStorage.setItem('user-email', loginData.email);

    api.post('/api/login', loginData)
      .then(response => successCallback(response, resolve))
      .catch(error => catchCallback(error, reject));
  }),

  /**
   * User registration
   *
   * @param {Object} user
   * @param {String} user.email
   * @param {String} user.password - min 6 symbols
   * @param {String} user.role - user's role writer/reader
   * @return {Object} - token
   */
  register: user => new Promise((resolve, reject) => {
    localStorage.setItem('user-email', user.email);

    api.post('/api/register', user)
      .then(response => successCallback(response, resolve))
      .catch(error => catchCallback(error, reject));
  }),
}