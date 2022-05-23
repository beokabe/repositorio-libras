import vue from 'vue';
import VueRouter from 'vue-router';
import firebase from 'firebase/app';
import Home from '../views/Home.vue';
import Verbetes from '../views/Verbetes.vue';
import Login from '../views/Login.vue';
import Registrar from '../views/Registrar.vue';
import ForgotPassword from '../views/ForgotPassword.vue';
import Perfil from '../views/Perfil.vue';
import PerfilAdministrador from '../views/PerfilAdministrador.vue';
import CriarVerbete from '../views/CriarVerbete.vue';
import VerbetePreview from '../views/VerbetePreview.vue';
import VerVerbete from '../views/VerVerbete.vue';
import EditarVerbete from '../views/EditarVerbete.vue';
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
    path: '/verbetes',
    name: 'Verbetes',
    component: Verbetes,
    meta: {
      title: 'Verbetes',
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
    path: '/registrar',
    name: 'Registrar',
    component: Registrar,
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
    path: '/perfil',
    name: 'Perfil',
    component: Perfil,
    meta: {
      title: 'Perfil',
      requiresAuth: true,
    },
  },
  {
    path: '/perfil-administrador',
    name: 'PerfilAdministrador',
    component: PerfilAdministrador,
    meta: {
      title: 'Adicionar Administrador',
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
  {
    path: '/criar-verbete',
    name: 'CriarVerbete',
    component: CriarVerbete,
    meta: {
      title: 'Criar um Post',
      requiresAuth: true,
      requiresAdmin: false,
    },
  },
  {
    path: '/verbete-preview',
    name: 'VerbetePreview',
    component: VerbetePreview,
    meta: {
      title: 'Pré-visualização do Artigo',
      requiresAuth: true,
      requiresAdmin: false,
    },
  },
  {
    path: '/ver-verbete/:verbeteid',
    name: 'VerVerbete',
    component: VerVerbete,
    meta: {
      title: 'Ver Artigo',
      requiresAuth: false,
    },
  },
  {
    path: '/editar-verbete/:verbeteid',
    name: 'EditarVerbete',
    component: EditarVerbete,
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
