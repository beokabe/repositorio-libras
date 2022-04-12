import vue from 'vue';
import VueRouter from 'vue-router';
import home from '../views/home.vue';
import blogs from '../views/blogs.vue';

vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: home,
  },
  {
    path: '/blogs',
    name: 'blogs',
    component: blogs,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
