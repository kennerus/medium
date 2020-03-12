import store from '../store';

const ifNotAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated === false) {
    next();
  } else {
    next('/');
  }
};

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next();
  } else {
    next('/login');
  }
};

const layout = store.getters.isAuthenticated ? 'LayoutLogined' : 'LayoutAuthentication';

export default [
  {
    path: '/',
    component: () => import(`../views/Layout/${layout}`),
    children: [
      {
        path: '/',
        name: 'posts',
        component: () => import('../views/Posts/Posts'),
      }
    ]
  },
  {
    path: '/',
    component: () => import('../views/Layout/LayoutAuthentication'),
    beforeEnter: ifNotAuthenticated,
    children: [
      {
        path: '/login',
        name: 'login',
        component: () => import('../views/Authentication/Login'),
      },
      {
        path: '/sign-up',
        name: 'signUp',
        component: () => import('../views/Authentication/SignUp'),
      },
    ]
  },
  {
    path: '/',
    component: () => import('../views/Layout/LayoutLogined'),
    beforeEnter: ifAuthenticated,
    children: [
      {
        path: '/posts/create',
        name: 'postCreate',
        // component: () => import(''),
      },
      {
        path: '/posts/edit/:id',
        name: 'postEdit',
        // component: () => import(''),
      },
      {
        path: '/posts/:id',
        name: 'post',
        // component: () => import(''),
      },
    ]
  }
]