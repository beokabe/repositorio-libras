<template>
  <div class="verbete-view">
    <div class="container" v-if="currentVerbete">
      <h1>{{ this.currentVerbete[0].verbeteNome }}</h1>
      <h4>
        Criado em:
        {{
          new Date(this.currentVerbete[0].verbeteDate).toLocaleString('pt-br', {
            dateStyle: 'long',
          })
        }}
      </h4>

      <iframe width="720" height="400" :src="this.currentVerbete[0].verbeteLinkVideo"
              title="Assista o vídeo pelo YouTube Player"
              frameborder="1" allow="accelerometer; autoplay;
              clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen></iframe>

      <div class="rl-verbete-definicao">
        {{this.currentVerbete[0].verbeteDefinicao}}
      </div>

      <div class="rl-autor-card">
        <span class="rl-autor-card__profile-initials">{{ this.autorProfileInitials }}</span>
        <span><strong>Criado por: </strong>{{this.currentVerbete[0].profileFullName}}</span>
      </div>
    </div>

    <div class="container" v-if="!currentVerbete">
      <div class="rl-verbete-definicao">
        <p>Verbete não foi encontrado.</p>
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
      verbetes: null,
      autorProfileInitials: null,
    };
  },
  async mounted() {
    this.verbetes = this.$store.state.verbetes;

    this.currentVerbete = this.$store.state.verbetes.filter(
      (verbete) => verbete.verbeteId === this.$route.params.verbeteId
    );

    const profileInitials = this.currentVerbete[0].profileFullName.split(' ');
    this.autorProfileInitials = profileInitials[0].match(/(\b\S)?/g).join('') + profileInitials[profileInitials.length - 1].match(/(\b\S)?/g).join('');
  },
};
</script>

<style lang="scss">
.verbete-view {
  padding: 100px 0;
  width: 100%;

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

  iframe {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  .rl-autor-card {
    margin-top: 70px;

    &__profile-initials {
      position: relative;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 70px;
      height: 60px;
      border-radius: 50%;
      color: #000;
      font-weight: 600;
      background-color: #1de9b6;
      margin-right: 10px;
      font-size: 30px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);

      span {
        pointer-events: none;
        font-size: 18px;
      }
    }
  }
}
</style>
