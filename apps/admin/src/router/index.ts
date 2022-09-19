import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home/index.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'index',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    redirect: '/home/user',
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    redirect: '/home/user',
    children: [
      {
        path: '/home/user',
        name: 'User',
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/Home/User.vue'),
        meta: { transition: 'fade' },
      },
      {
        path: '/home/authority',
        name: 'Authority',
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/Home/Authority.vue'),
        meta: { transition: 'fade' },
      },
    ],
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Login.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
