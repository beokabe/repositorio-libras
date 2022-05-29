/* eslint-disable import/no-named-as-default-member */
import Vue from 'vue';
import vue2Editor from 'vue2-editor';
// eslint-disable-next-line import/no-named-as-default
import firebase from 'firebase/app';
import store from './store';
import 'firebase/auth';
import App from './App.vue';
import router from './router';

Vue.use(vue2Editor);

Vue.config.productionTip = false;

let app;

// Inicializa a aplicação depois que o firebase estiver carregado
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount('#app');
  }
});
