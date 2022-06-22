<template>
  <div class="home">
    <div class="rl-faixa-boas-vindas">
      <h1>Repositório de Libras</h1>
      <p>Conteúdos Exclusivos em um único lugar</p>
    </div>

    <div class="rl-welcome-screen">
      <div class="rl-welcome-screen__conteudo">
        <h1 v-if="!user">
          Seja bem-vindo! Novo por aqui?
          Confira um breve tutorial sobre como utilizar a nossa plataforma!
        </h1>

        <h1 v-if="user">Seja bem-vindo novamente,
          {{usuario.firstName}}.</h1>

        <img
            :src="
            require(`../assets/verbetesCoverPhotos/${postApresentacao.photo}.png`)
          "
            alt=""
        />

        <p v-if="!user" >Quer se tornar um membro do Repositório de Libras? Registre-se clicando
          <router-link class="link" :to="{ name: 'Registrar' }"
          >aqui.</router-link
          >

        <p v-if="user">Você já é um membro.
        Agora pode realizar leituras no repositório, aproveite!</p>
      </div>
    </div>

    <div id="verbetesMaisCurtidos" class="rl-verbete-card-wrap">
      <h2>Verbetes Mais Curtidos</h2>

      <div class="container">
        <VerbeteConteudo
            :verbete="verbete"
            v-for="(verbete, index) in verbetesFeed"
            :key="index"
        />
      </div>
    </div>

    <div v-if="!user" class="updates">
      <div class="container">
        <h2>Participe da nossa comunidade. Registre-se de graça!</h2>

        <router-link class="router-button cl-bg-green" :to="{ name: 'Registrar' }">
          Registrar para RepositorioLibras
          <arrowIcon class="arrow arrow-light"/>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import VerbeteConteudo from '../components/VerbeteConteudo.vue';
import arrowIcon from '../assets/icons/arrow-right-light.svg';

export default {
  name: 'Home',
  components: {
    VerbeteConteudo,
    arrowIcon,
  },
  data() {
    return {
      postApresentacao: {
        titulo: '',

        photo: 'stock-4',
      },
    };
  },
  computed: {
    verbetesFeed() {
      return this.$store.getters.verbetesFeed;
    },
    user() {
      return this.$store.state.user;
    },
    usuario() {
      return this.$store.state.usuario;
    },
  },
  watch: {
    userComputed() {
      this.userComputed = this.user;
    }
  }
};
</script>

<style lang="scss" scoped>
.rl-faixa-boas-vindas {
  box-sizing: border-box;
  font-size: 20px;
  font-family: 'Quicksand', sans-serif;
  text-align: center;
  padding: 30px;
  line-height: 50px;
  color: #fff;
  background-color: #004d40;
}

.rl-welcome-screen {
  padding: 0;
  box-sizing: border-box;
  font-family: 'Quicksand', sans-serif;
  margin: 30px 60px;
  text-align: center;
  line-height: 60px;

  &__conteudo {
    background-color: #fff;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

    p {
      font-size: 18px;
    }
  }

  @media (min-width: 700px) {
    h1 {
      font-size: 20px;
    }
  }

  @media (min-width: 500px) {
    h1 {
      font-size: 18px;
    }
  }

}

.rl-verbete-card-wrap {
  h2 {
    text-align: center;
  }

  .container {
    display: flex;
    flex-wrap: wrap;
  }

  .container > div {
    margin: 20px 50px;
  }
}

.verbete-card-wrap {
  h3 {
    font-weight: 300;
    font-size: 28px;
    margin-bottom: 32px;
  }
}

.updates {
  .container {
    padding: 100px 25px;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (min-width: 800px) {
      padding: 125px 25px;
      flex-direction: row;
    }

    h1 {
      font-weight: 300;
      font-size: 32px;
      max-width: 425px;
      width: 100%;
      text-align: center;
      text-transform: uppercase;

      @media (min-width: 800px) {
        font-align: initial;
        font-size: 40px;
      }
    }

    .router-button {
      display: flex;
      font-size: 14px;
      text-decoration: none;

      @media (min-width: 800px) {
        margin-left: auto;
      }
    }
  }
}
</style>
