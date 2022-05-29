<template>
  <div class="post-view" v-if="currentVerbete">
    <div class="container quillWrapper">
      <h2>{{ this.currentVerbete[0].verbeteNome }}</h2>
      <h4>
        Criado em:
        {{
          new Date(this.currentVerbete[0].verbeteDate).toLocaleString('pt-br', {
            dateStyle: 'long',
          })
        }}
      </h4>
      <img :src="this.currentVerbete[0].blogCoverPhoto" alt="" />
      <div
        class="post-content ql-editor"
        v-html="this.currentVerbete[0].verbeteDefinicao"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VerVerbete',
  data() {
    return {
      currentVerbete: null,
    };
  },
  async mounted() {
    this.currentVerbete = await this.$store.state.verbetes.filter(
      (verbete) => verbete.verbeteId === this.$route.params.verbeteid
    );
  },
};
</script>

<style lang="scss">
.post-view {
  h4 {
    font-weight: 400;
    font-size: 14px;
    margin-bottom: 24px;
  }
}
</style>
