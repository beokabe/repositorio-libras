<template>
  <div class="app-wrapper">
    <div class="app" v-if="this.$store.state.postLoaded">
      <Navigation v-if="!navigationDisabled" />
      <router-view />
      <FooterVue />
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';
import Navigation from './components/Navigation.vue';
import FooterVue from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    Navigation,
    FooterVue,
  },
  data() {
    return {
      navigationDisabled: null,
    };
  },
  created() {
    // Por default os métodos precisam ser inicializados por aqui
    firebase.auth().onAuthStateChanged(async (user) => {
      this.$store.commit('updateUser', user);

      if (user) {
        this.$store.dispatch('getCurrentUser', user);
      }
    });

    this.checkRoute();
    this.$store.dispatch('getVerbetes');
    this.$store.dispatch('getCategoriasVerbetes');
    this.$store.dispatch('getUsuario');
  },
  mounted() {},
  methods: {
    checkRoute() {
      const route = this.$route;

      if (
        route.name === 'Login' ||
        route.name === 'Registrar' ||
        route.name === 'ForgotPassword'
      ) {
        this.navigationDisabled = true;
        return;
      }

      this.navigationDisabled = false;
    },
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  watch: {
    // Para funcionar dinamicamente é necessário "vigiar" o objeto $route
    $route() {
      this.checkRoute();
    },
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Quicksand', sans-serif;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #fafafa;
}

.container {
  max-width: 1440px;
  margin: 0 auto;
}

.link {
  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase;
  color: black;
}

.link-light {
  color: #fff;
}

.arrow {
  margin-left: 8px;
  width: 12px;
  path {
    fill: #000;
  }
}

.arrow-light {
  path: {
    fill: #fff;
  }
}

button,
.router-button {
  transition: 500ms ease all;
  cursor: pointer;
  margin-top: 24px;
  padding: 12px 24px;
  background-color: #004d40;
  color: #fff;
  border-radius: 5px;
  border: none;
  text-transform: uppercase;
  &:focus {
    outline: none;
  }
  &:hover {
    filter: opacity(0.7);
  }
}

.button-ghost {
  color: #000;
  padding: 0;
  border-radius: 0;
  margin-top: 50px;
  font-size: 15px;
  font-weight: 500;
  background-color: transparent;
  @media (min-width: 700px) {
    margin-top: 0;
    margin-left: auto;
  }
  i {
    margin-left: 8px;
  }
}

.button-light {
  background-color: transparent;
  border: 2px solid #fff;
  color: #fff;
}

.button-inactive {
  pointer-events: none !important;
  cursor: none !important;
  background-color: rgba(128, 128, 128, 0.5) !important;
}

.error {
  text-align: center;
  font-size: 12px;
  color: red;
}

.rl-verbete-card-wrap {
  position: relative;

  @media (min-width: 500px) {
    padding: 60px 16px;
  }

  .verbete-cards {
    display: grid;
    gap: 32px;
    grid-template-columns: 1fr;

    @media (min-width: 500px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 900px) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media (min-width: 1200px) {
      grid-template-columns: repeat(4, 1fr);
    }
  }
}
</style>
