<template>
  <div class="reset-password">
    <!-- v-on cria um listener dentro da tag que aguarda alguma ação do método do escopo -->
    <ModalAlert
      v-if="modalActive"
      :modalMessage="modalMessage"
      v-on:close-modal="closeModal"
    />

    <LoadingAnimation v-if="loading" />

    <div class="form-wrap">
      <form class="reset">
        <p class="login-register">
          Voltar para

          <router-link class="router-link" :to="{ name: 'Login' }"
            >Login</router-link
          >
        </p>

        <h2>Trocar a senha</h2>

        <p>Esqueceu a senha? Digite o seu e-mail para resetá-la</p>

        <div class="inputs">
          <div class="input">
            <input type="text" placeholder="Email" v-model="email" />
            <email-icon class="icon" />
          </div>
        </div>

        <button @click.prevent="resetPassword">Enviar</button>

        <div class="angle"></div>
      </form>

      <div class="background"></div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';
import emailIcon from '../assets/icons/envelope-regular.svg';
import ModalAlert from '../components/ModalAlert.vue';
import LoadingAnimation from '../components/LoadingAnimation.vue';

export default {
  name: 'ForgotPassword',
  components: {
    emailIcon,
    ModalAlert,
    LoadingAnimation,
  },
  data() {
    return {
      email: null,
      modalActive: false,
      modalMessage: '',
      loading: null,
    };
  },
  methods: {
    resetPassword() {
      this.loading = true;
      firebase
        .auth()
        .sendPasswordResetEmail(this.email)
        .then(() => {
          this.modalMessage = 'O e-mail enviado com sucesso!';
          this.loading = false;
          this.modalActive = true;
        }).catch((err) => {
          this.modalMessage = err.message;
          this.loading = false;
          this.modalActive = true;
        });
    },
    closeModal() {
      this.modalActive = !this.modalActive;
      this.email = '';
    },
  },
};
</script>

<style lang="scss" scoped>
.reset-password {
  position: relative;
  .form-wrap {
    .reset {
      h2 {
        margin-bottom: 8px;
      }
      p {
        text-align: center;
        margin-bottom: 32px;
      }
    }
  }
}
</style>
