<template>
  <div class="rl-verbete-wrapper">
    <div class="rl-verbete-wrapper__titulo">
    </div>
    <div class="verbete-content">
      <div class="verbete-photo">
        <img :src="verbete.verbeteImagem" alt="" />
      </div>
      <div class="verbete-content">
        <h2>{{ verbete.verbeteNome }}</h2>

        <h3 class="content-categoria-preview">{{verbete.verbeteCategoria}}</h3>
        <p class="content-subcategoria-preview"
            v-show="verbete.verbeteSubcategoria">{{verbete.verbeteSubcategoria}}</p>

        <p class="content-preview" :title="verbete.verbeteDefinicao">
          {{verbete.verbeteDefinicao}}</p>
        <router-link
          class="link"
          v-if="!user"
          :to="{ name: 'Registrar' }"
        >
          Login/Registrar<arrow class="arrow arrow-light" />
        </router-link>
        <router-link
          class="link"
          v-else
          :to="{
            name: 'VerVerbete',
            params: { verbeteId: this.verbete.verbeteId },
          }"
        >
          Ir para o conteúdo<arrow class="arrow" />
        </router-link>

        <p class="contador-curtidas">
          <strong>{{this.verbete.verbeteCurtidas}} curtiram</strong>
          </p>
      </div>
    </div>
  </div>
</template>

<script>
import arrow from '../assets/icons/arrow-right-light.svg';

export default {
  name: 'VerbeteConteudo',
  props: ['verbete'],
  components: {
    arrow,
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
};
</script>

<style lang="scss" scoped>
.rl-verbete-wrapper {
  background-color: #fff;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);

  @media (min-width: 700px) {
    min-height: 500px;
    max-height: 650px;
  }

  .verbete-content {
    justify-content: center;
    align-items: center;

    @media (min-width: 700px) {
      order: 1;
    }

    @media (min-width: 800px) {
      flex: 3;
    }

    div {
      max-width: 375px;

      @media (min-width: 700px) {
        padding: 10px 24px;
      }

      h2 {
        font-size: 32px;
        font-weight: 300;
        text-transform: uppercase;
        margin-bottom: 24px;
        @media (min-width: 700px) {
          font-size: 40px;
        }
      }

      p {
        font-size: 15px;
        font-weight: 300;
        line-height: 1.7;
      }

      .content-categoria-preview {
        margin: 15px 0;
      }

      .content-subcategoria-preview {
        margin-bottom: 15px;
      }

      .content-preview {
        font-size: 16px;
        max-height: 24px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .link {
        display: inline-flex;
        align-items: center;
        margin-top: 32px;
        padding-bottom: 4px;
        border-bottom: 1px solid transparent;
        transition: 0.5s ease-in all;
        &:hover {
          border-bottom-color: #303030;
        }
      }

      .link-light {
        &:hover {
          border-bottom-color: #ffff;
        }
      }

      .contador-curtidas {
        text-align: end;
        margin-top: 50px;
      }
    }
  }

  .verbete-photo {
    order: 1;
    flex: 3;

    @media (min-width: 700px) {
      order: 2;
    }

    @media (min-width: 800px) {
      flex: 4;
    }

    img {
      display: block;
      width: 100%;
      height: 200px;
      object-fit: cover;
    }
  }

  &:nth-child(even) {
    .verbete-content {
      order: 2;
    }
    .verbete-photo {
      order: 1;
    }
  }
}
</style>
