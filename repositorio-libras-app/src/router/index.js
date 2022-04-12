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
    meta: {
      title: 'Início',
    },
  },
  {
    path: '/blogs',
    name: 'blogs',
    component: blogs,
    meta: {
      title: 'Blogs',
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | RepositorioLibras`;
  next();
});

export default router;
