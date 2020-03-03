export default [
  {
    path: '/',
    component: () => {
      const isLogined = true ? 'LayoutAuthentication' : 'LayoutLogined';
      return import(`../views/Layout/${isLogined}`);
    },
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
    children: [
      {
        path: '/login',
        name: 'login',
        component: () => import('../views/Authentication/Login'),
      },
      {
        path: '/sign-up',
        name: 'signUp',
        component: () => import('../views/Authentication/Login'),
      },
    ]
  },
  {
    path: '/',
    component: () => import('../views/Layout/LayoutLogined'),
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