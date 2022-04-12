/* eslint-disable import/no-named-as-default-member */
import Vue from 'vue';
import vue2Editor from 'vue2-editor';
// eslint-disable-next-line import/no-named-as-default
import store from './store';
import app from './app.vue';
import router from './router';

Vue.use(vue2Editor);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(app),
}).$mount('#app');
