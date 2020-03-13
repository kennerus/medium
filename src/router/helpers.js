import store from '../store';
import api from '../services/api';
import {ToastProgrammatic as toast} from 'buefy';

const {getUser} = api.users;

const getUserHandler = (response, next) => {
  store.dispatch('SET_USER', response.data[0]);
  next();
};

const getUserErrorHandler = error => {
  const {data: message} = error.response;
  toast.open({type: 'is-danger', message});
};

export const firstEnter = (to, from, next) => {
  const {userEmail, user} = store.getters;

  if (userEmail && user.email === '') {
    getUser(userEmail)
      .then(response => getUserHandler(response, next))
      .catch(getUserErrorHandler);
  } else {
    next();
  }
};

export const ifNotAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated === false) {
    next();
  } else {
    next('/');
  }
};

export const ifAuthenticated = (to, from, next) => {
  const {isAuthenticated} = store.getters;

  if (isAuthenticated) {
    firstEnter(to, from, next);
  } else {
    next('/login');
  }
};

export const roleGuard = (to, from, next) => {
  if (to.meta.roles.includes(store.getters.user.role)) {
    next();
  } else {
    toast.open({message: 'Нет доступа.', type: 'is-danger'});
    next(from.path);
  }
};