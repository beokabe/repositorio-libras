<template>
  <div class="verbete-view">
    <div class="container quillWrapper">
      <h2>{{ this.verbeteNome }}</h2>
      <img :src="verbeteImagem" alt="" />
      <div class="verbete-content ql-editor" v-html="verbeteDefinicao"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VerbetePreview',
  computed: {
    verbeteNome() {
      return this.$store.state.verbeteNome;
    },
    verbeteDefinicao() {
      return this.$store.state.verbeteDefinicao;
    },
    verbeteImagem() {
      return this.$store.state.verbeteImagemFileURL;
    },
  },
};
</script>

<style lang="scss">
.verbete-view {
  min-height: 100%;

  .container {
    max-width: 1000px;
    padding: 60px 25px;
  }

  .ql-editor {
    padding: 0;
  }

  h2 {
    margin-bottom: 16px;
    font-weight: 300;
    font-size: 32px;
  }

  img {
    width: 100%;
    margin-bottom: 32px;
  }
}
</style>
