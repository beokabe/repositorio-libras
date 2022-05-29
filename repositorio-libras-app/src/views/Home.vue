<template>
  <div class="home">
    <VerbeteConteudo v-if="!user" :post="welcomeScreen" />

    <VerbeteConteudo :post="post" v-for="(post, index) in verbetesFeed" :key="index" />

    <div class="verbete-card-wrap">
      <div class="container">
        <h3>Ver Os Verbetes Mais Recentes</h3>

        <div class="verbete-cards">
          <VerbeteCard
            :post="post"
            v-for="(post, index) in verbetesCards"
            :key="index"
          />
        </div>
      </div>
    </div>

    <div v-if="!user" class="updates">
      <div class="container">
        <h2>Never miss a post. Register for your free account today!</h2>

        <router-link class="router-button" :to="{ name: 'Registrar' }">
          Registrar para RepositorioLibras <arrowIcon class="arrow arrow-light" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import VerbeteConteudo from '../components/VerbeteConteudo.vue';
import VerbeteCard from '../components/VerbeteCard.vue';
import arrowIcon from '../assets/icons/arrow-right-light.svg';

export default {
  name: 'Home',
  components: {
    VerbeteConteudo,
    VerbeteCard,
    arrowIcon,
  },
  data() {
    return {
      welcomeScreen: {
        title: 'Welcome!',
        verbeteConteudo:
          'Weekly blog articles all things programming including HTML, CSS, JS and More. Register today to never miss a post',
        welcomeScreen: true,
        photo: 'coding',
      },
    };
  },
  computed: {
    verbetesFeed() {
      return this.$store.getters.verbetesFeed;
    },
    verbetesCards() {
      return this.$store.getters.verbetesCards;
    },
    user() {
      return this.$store.state.user;
    },
  },
};
</script>

<style lang="scss" scoped>
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

    .router-button {
      display: flex;
      font-size: 14px;
      text-decoration: none;

      @media (min-width: 800px) {
        margin-left: auto;
      }
    }

    h2 {
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
  }
}
</style>
