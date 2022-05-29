import vue from 'vue';
import VueRouter from 'vue-router';
import firebase from 'firebase/app';
import Home from '../views/Home.vue';
import Blogs from '../views/Blogs.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import ForgotPassword from '../views/ForgotPassword.vue';
import Profile from '../views/Profile.vue';
import Admin from '../views/Admin.vue';
import CreatePost from '../views/CreatePost.vue';
import BlogPreview from '../views/BlogPreview.vue';
import ViewBlog from '../views/ViewBlog.vue';
import EditBlog from '../views/EditBlog.vue';
import 'firebase/auth';

vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Início',
      requiresAuth: false,
    },
  },
  {
    path: '/blogs',
    name: 'Blogs',
    component: Blogs,
    meta: {
      title: 'Blogs',
      requiresAuth: false,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: 'Logar',
      requiresAuth: false,
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      title: 'Registre-se',
      requiresAuth: false,
    },
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPassword,
    meta: {
      title: 'Esqueci a Senha',
      requiresAuth: false,
    },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      title: 'Perfil',
      requiresAuth: true,
    },
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: {
      title: 'Adicionar Administrador',
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
  {
    path: '/create-post',
    name: 'CreatePost',
    component: CreatePost,
    meta: {
      title: 'Criar um Post',
      requiresAuth: true,
      requiresAdmin: false,
    },
  },
  {
    path: '/post-preview',
    name: 'BlogPreview',
    component: BlogPreview,
    meta: {
      title: 'Pré-visualização do Artigo',
      requiresAuth: true,
      requiresAdmin: false,
    },
  },
  {
    path: '/view-blog/:blogid',
    name: 'ViewBlog',
    component: ViewBlog,
    meta: {
      title: 'Ver Artigo',
      requiresAuth: false,
    },
  },
  {
    path: '/edit-blog/:blogid',
    name: 'EditBlog',
    component: EditBlog,
    meta: {
      title: 'Editar Artigo',
      requiresAuth: true,
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

router.beforeEach(async (to, from, next) => {
  const user = firebase.auth().currentUser;
  let admin = null;

  if (user) {
    const token = await user.getIdTokenResult();
    admin = token.claims.admin;
  }

  if (to.matched.some((res) => res.meta.requiresAuth)) {
    if (user) {
      if (to.matched.some((res) => res.meta.requiresAdmin)) {
        if (admin) {
          return next();
        }

        // Retorna para inicial caso o usuário não possuir a role 'admin' necessária para acesso
        return next({ name: 'Home' });
      }

      return next();
    }

    // Retorna para inicial caso o usuário não possuir a role 'user' necessária para acesso
    return next({ name: 'Home' });
  }

  return next();
});
export default router;
