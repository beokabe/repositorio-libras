/* eslint-disable max-len */ /* eslint-disable max-len */
<template>
  <div class="form-wrap">
    <form class="login">
      <p class="login-register">
        Não tem uma conta?

        <router-link class="router-link" :to="{ name: 'Registrar' }"
          >Registrar</router-link
        >
      </p>

      <h2>Logar no Repositório de Libras</h2>

      <div class="inputs">
        <div class="input">
          <input type="email" placeholder="Email" v-model="email" />
          <email-icon class="icon" />
        </div>

        <div class="input">
          <input type="password" placeholder="Senha" v-model="password" />
          <password-icon class="icon" />
        </div>

        <div v-show="error" class="error">{{ this.errorMsg }}</div>
      </div>
      <router-link class="forgot-password" :to="{ name: 'ForgotPassword' }"
        >Esqueci a senha</router-link
      >
      <button @click.prevent="signIn">Entrar</button>
    </form>
    <background class="background"></background>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';
import emailIcon from '../assets/icons/envelope-regular.svg';
import passwordIcon from '../assets/icons/lock-alt-solid.svg';
import background from '../assets/repositorioLibras/tela-login-repositorio-libras.svg';

export default {
  name: 'Login',
  components: {
    emailIcon,
    passwordIcon,
    background,
  },
  data() {
    return {
      email: null,
      password: null,
      error: null,
      errorMsg: '',
    };
  },
  methods: {
    signIn() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.push({ name: 'Home' });
          this.error = false;
          this.errorMsg = '';
        })
        .catch((err) => {
          this.error = true;
          this.errorMsg = err.message;
        });
    },
  },
};
</script>

<style lang="scss">
.form-wrap {
  overflow: hidden;
  display: flex;
  height: 100vh;
  justify-content: center;
  align-self: center;
  margin: 0 auto;
  width: 90%;

  @media (min-width: 900px) {
    width: 100%;
  }

  .login-register {
    margin-bottom: 32px;
    .router-link {
      color: #000;
    }
  }

  form {
    padding: 0 10px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;

    @media (min-width: 900px) {
      padding: 0 50px;
    }

    h2 {
      text-align: center;
      font-size: 32px;
      color: #303030;
      margin-bottom: 40px;
      @media (min-width: 900px) {
        font-size: 40px;
      }
    }

    .inputs {
      width: 100%;
      max-width: 350px;

      .input {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 8px;

        input {
          width: 100%;
          border: none;
          background-color: #f2f7f6;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          padding: 4px 4px 4px 30px;
          height: 50px;

          &:focus {
            outline: none;
          }
        }

        .icon {
          width: 12px;
          position: absolute;
          left: 6px;
        }
      }
    }

    .forgot-password {
      text-decoration: none;
      color: #000;
      cursor: pointer;
      font-size: 14px;
      margin: 16px 0 32px;
      border-bottom: 1px solid transparent;
      transition: 0.5s ease all;

      &:hover {
        border-color: #303030;
      }
    }

    .angle {
      display: none;
      position: absolute;
      background-color: #fafafa;
      transform: rotateZ(3deg);
      width: 60px;
      right: -30px;
      height: 101%;

      @media (min-width: 900px) {
        display: initial;
      }
    }
  }

  .background {
    margin-top: 20px;
    display: none;
    flex: 2;
    background-size: cover;
    width: 50%;
    height: 80%;
    margin: auto;

    @media (min-width: 900px) {
      display: initial;
    }
  }

  .cls-1 {
    fill: #e6e4f4;
  }
  .cls-2 {
    fill: #f5c8c8;
  }
  .cls-3 {
    fill: #f2d070;
  }
  .cls-11,
  .cls-24,
  .cls-30,
  .cls-4,
  .cls-5,
  .cls-6,
  .cls-7 {
    fill: none;
    stroke-miterlimit: 10;
  }
  .cls-4 {
    stroke: #c1beed;
  }
  .cls-4,
  .cls-5,
  .cls-6,
  .cls-7 {
    stroke-width: 5px;
  }
  .cls-5 {
    stroke: #edddb0;
  }
  .cls-6 {
    stroke: #eda9a9;
  }
  .cls-7 {
    stroke: #88e2b7;
  }
  .cls-8 {
    fill: #121a35;
  }
  .cls-9 {
    fill: #3a2f26;
  }
  .cls-10 {
    fill: #191817;
  }
  .cls-11 {
    stroke: #261f18;
  }
  .cls-11,
  .cls-24,
  .cls-30 {
    stroke-width: 2px;
  }
  .cls-12 {
    fill: #7f340e;
  }
  .cls-13 {
    fill: #4cbb89;
  }
  .cls-14 {
    fill: #2b84f4;
  }
  .cls-15 {
    fill: #46a3fd;
  }
  .cls-16 {
    fill: #131338;
  }
  .cls-17 {
    fill: #e0bd9b;
  }
  .cls-18 {
    fill: #1c1713;
  }
  .cls-19 {
    fill: #472bb0;
  }
  .cls-20 {
    fill: #4e33b5;
  }
  .cls-21 {
    fill: #4357e5;
  }
  .cls-22 {
    fill: #4b60ed;
  }
  .cls-23 {
    fill: #633411;
  }
  .cls-24 {
    stroke: #b77844;
  }
  .cls-25 {
    fill: #298436;
  }
  .cls-26 {
    fill: #d37f5e;
  }
  .cls-27 {
    fill: #594129;
  }
  .cls-28 {
    fill: #23201e;
  }
  .cls-29 {
    fill: #6b5134;
  }
  .cls-30 {
    stroke: #3a230c;
  }
  .cls-31 {
    fill: #3a230c;
  }
  .cls-32 {
    fill: #7f320b;
  }
  .cls-33 {
    fill: #1c1918;
  }
  .cls-34 {
    fill: #8c1e0c;
  }
  .cls-35 {
    fill: #21212d;
  }
  .cls-36 {
    fill: #b3b3b3;
  }
  .cls-37 {
    fill: #cbcbcb;
  }
  .cls-38 {
    fill: #b21d24;
  }
  .cls-39 {
    fill: #5f6270;
  }
  .cls-40 {
    fill: #747884;
  }
  .cls-41 {
    fill: #c4494f;
  }
}
</style>
