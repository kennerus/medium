import api from './api';
import axios from 'axios';
import store from '../../store';

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
    api.post('/api/register', user)
      .then(response => successCallback(response, resolve))
      .catch(error => catchCallback(error, reject));
  }),
}