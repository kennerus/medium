import store from '../store';
import {ifAuthenticated, ifNotAuthenticated, roleGuard, firstEnter} from './helpers';

const layout = store.getters.isAuthenticated ? 'LayoutLogined' : 'LayoutAuthentication';

export default [
  {
    path: '/',
    component: () => import(`../views/Layout/${layout}`),
    beforeEnter: firstEnter,
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
        meta: {
          roles: ['writer'],
        },
        component: () => import('../views/Posts/PostCreate'),
        beforeEnter: roleGuard
      },
      {
        path: '/posts/edit/:id',
        name: 'postEdit',
        meta: {
          roles: ['writer'],
        },
        component: () => import('../views/Posts/PostEdit'),
        beforeEnter: roleGuard
      },
      {
        path: '/posts/:id',
        name: 'post',
        meta: {
          roles: ['writer'],
        },
        component: () => import('../views/Posts/Post'),
        beforeEnter:roleGuard
      },
    ]
  }
]