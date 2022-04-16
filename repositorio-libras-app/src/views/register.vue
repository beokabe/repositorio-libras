<template>
  <div class="form-wrap">
    <form class="login">
      <p class="login-register">
        Já possui uma conta?

        <router-link class="router-link" :to="{ name: 'login' }"
          >Logar</router-link
        >
      </p>

      <h2>Criar uma conta em RepositorioLibras</h2>

      <div class="inputs">
        <div class="input">
          <input type="text" placeholder="Primeiro Nome" v-model="firstName" />
          <user-icon class="icon" />
        </div>

        <div class="input">
          <input type="text" placeholder="Sobrenome" v-model="lastName" />
          <user-icon class="icon" />
        </div>

        <div class="input">
          <input
            type="text"
            placeholder="Escolha o nome do usuário"
            v-model="username"
          />
          <user-icon class="icon" />
        </div>

        <div class="input">
          <input type="text" placeholder="Email" v-model="email" />
          <email-icon class="icon" />
        </div>

        <div class="input">
          <input type="text" placeholder="Password" v-model="password" />
          <password-icon class="icon" />
        </div>

        <div v-show="error" class="error">{{ this.errorMsg }}</div>
      </div>

      <button @click.prevent="register">Cadastrar-se</button>

      <div class="angle"></div>
    </form>
    <div class="background"></div>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import db from '../firebase/firebaseInit';
import emailIcon from '../assets/Icons/envelope-regular.svg';
import passwordIcon from '../assets/Icons/lock-alt-solid.svg';
import userIcon from '../assets/Icons/user-alt-light.svg';

export default {
  name: 'Register',
  components: {
    emailIcon,
    passwordIcon,
    userIcon,
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      error: '',
      errorMsg: '',
    };
  },
  methods: {
    async register() {
      if (
        this.email !== '' &&
        this.password !== '' &&
        this.firstName !== '' &&
        this.lastName !== '' &&
        this.username !== ''
      ) {
        this.error = false;
        this.errorMsg = '';
        const firebaseAuth = await firebase.auth();
        const createUser = await firebaseAuth.createUserWithEmailAndPassword(
          this.email,
          this.password,
        );
        const result = await createUser;
        const dataBase = db.collection('users').doc(result.user.uid);
        await dataBase.set({
          firstName: this.firstName,
          lastName: this.lastName,
          username: this.username,
          email: this.email,
        });

        this.$router.push({ name: 'home' });

        return;
      }

      this.error = true;
      this.errorMsg = 'Por favor, preencha todos os campos de cadastro!';
    },
  },
};
</script>

<style lang="scss" scoped>
.register {
  h2 {
    max-width: 350px;
  }
}
</style>
