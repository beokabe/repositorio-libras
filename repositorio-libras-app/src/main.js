import vue from "vue";
import app from "./app.vue";
import router from "./router";
import store from "./store";
import vue2Editor from "vue2-editor";

vue.use(vue2Editor);

vue.config.productionTip = false;

new vue({
  router,
  store,
  render: (h) => h(app),
}).$mount("#app");
