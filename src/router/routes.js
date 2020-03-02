export default [

  {
    path: '/',
    name: 'home',
    redirect: '/login',
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
    path: '/about',
    name: 'About',
  }
]