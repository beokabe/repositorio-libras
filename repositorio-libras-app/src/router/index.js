import vue from 'vue';
import VueRouter from 'vue-router';
import home from '../views/home.vue';
import blogs from '../views/blogs.vue';
import login from '../views/login.vue';
import register from '../views/register.vue';
import forgotPassword from '../views/forgot-password.vue';
import profile from '../views/profile.vue';
import admin from '../views/admin.vue';

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
  {
    path: '/login',
    name: 'login',
    component: login,
    meta: {
      title: 'Logar',
    },
  },
  {
    path: '/register',
    name: 'register',
    component: register,
    meta: {
      title: 'Registre-se',
    },
  },
  {
    path: '/forgot-password',
    name: 'forgotPassword',
    component: forgotPassword,
    meta: {
      title: 'Esqueci a Senha',
    },
  },
  {
    path: '/profile',
    name: 'profile',
    component: profile,
    meta: {
      title: 'Perfil',
    },
  },
  {
    path: '/admin',
    name: 'admin',
    component: admin,
    meta: {
      title: 'Adicionar Administrador',
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
