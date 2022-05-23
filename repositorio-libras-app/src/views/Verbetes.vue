<template>
  <div class="blog-card-wrap">
    <div class="blog-cards container">
      <div class="toggle-edit">
        <span>Modo Edição</span>
        <input type="checkbox" v-model="editPost" />
      </div>
      <VerbeteCard
        :post="post"
        v-for="(post, index) in verbetes"
        :key="index"
      />
    </div>
  </div>
</template>

<script>
import VerbeteCard from '../components/VerbeteCard.vue';

export default {
  name: 'Verbetes',
  components: {
    VerbeteCard,
  },
  computed: {
    verbetes() {
      return this.$store.state.verbetes;
    },
    editPost: {
      // Retorna o estado atual do valor de editPost
      get() {
        return this.$store.state.editPost;
      },
      set(payload) {
        // Atualiza o valor armazenado state toggleEditPost
        this.$store.commit('toggleEditPost', payload);
      },
    },
  },
  // Quando o usuário sair da view blogs, o valor da state toggleEditPost mudará para 'false'
  beforeyDestroy() {
    this.$store.commit('toggleEditPost', false);
  },
};
</script>

<style lang="scss" scoped>
.blog-cards {
  position: relative;

  .toggle-edit {
    display: flex;
    align-items: center;
    position: absolute;
    top: -70px;
    right: 0;

    span {
      margin-right: 16px;
    }

    input[type='checkbox'] {
      position: relative;
      border: none;
      -webkit-appearance: none;
      background: #fff;
      outline: none;
      width: 80px;
      height: 30px;
      border-radius: 20px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    input[type='checkbox']:before {
      content: '';
      position: absolute;
      width: 30px;
      height: 30px;
      border-radius: 20px;
      top: 0;
      left: 0;
      background: #303030;
      transform: scale(1.1);
      transition: 750ms ease all;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    input:checked[type='checkbox']:before {
      background: #fff;
      left: 52px;
    }
  }
}
</style>
