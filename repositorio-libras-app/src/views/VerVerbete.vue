<template>
  <div class="verbete-view" v-if="currentVerbete">
    <div class="container">
      <h1>{{ this.currentVerbete[0].verbeteNome }}</h1>
      <h4>
        Criado em:
        {{
          new Date(this.currentVerbete[0].verbeteDate).toLocaleString('pt-br', {
            dateStyle: 'long',
          })
        }}
      </h4>

      <iframe width="560" height="315" :src="this.currentVerbete[0].verbeteLinkVideo"
              title="YouTube video player" frameborder="0" allow="accelerometer; autoplay;
              clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen></iframe>

      <div class="rl-verbete-definicao">
        {{this.currentVerbete[0].verbeteDefinicao}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VerVerbete',
  data() {
    return {
      currentVerbete: null,
      verbetes: null
    };
  },
  async mounted() {
    this.verbetes = this.$store.state.verbetes;

    this.currentVerbete = this.$store.state.verbetes.filter(
      (verbete) => verbete.verbeteId === this.$route.params.verbeteId
    );
  },
};
</script>

<style lang="scss">
.verbete-view {
  h1 {
    margin-bottom: 5px;
    font-size: 40px;
  }
  h4 {
    font-weight: 400;
    font-size: 16px;
    margin-bottom: 24px;
  }

  .rl-verbete-definicao {
    margin-top: 30px;
    font-size: 30px;
  }
}
</style>
