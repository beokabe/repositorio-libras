<template>
  <div class="verbete-wrapper" :class="{ 'no-user': !user }">
    <div class="verbete-content">
      <div>
        <h2 v-if="post.welcomeScreen">{{ post.title }}</h2>
        <h2 v-else>{{ post.verbeteNome }}</h2>
        <p v-if="post.welcomeScreen">{{ post.verbeteConteudo }}</p>
        <p class="content-preview" v-else v-html="post.verbeteDefinicao"></p>
        <router-link class="link link-light" v-if="post.welcomeScreen" :to="{ name: 'Registrar' }">
          Login/Registrar<arrow class="arrow arrow-light" />
        </router-link>
        <router-link
          class="link"
          v-else
          :to="{ name: 'VerVerbete', params: {verbeteId: this.post.verbeteId} }"
        >
          View The Post<arrow class="arrow" />
        </router-link>
      </div>
    </div>
    <div class="verbete-photo">
      <img
        v-if="post.welcomeScreen"
        :src="require(`../assets/verbetesCoverPhotos/${post.photo}.jpg`)"
        alt=""
      />
      <img
        v-else
        :src="post.verbeteImagem"
        alt=""
      />
    </div>
  </div>
</template>

<script>
import arrow from '../assets/icons/arrow-right-light.svg';

export default {
  name: 'VerbeteConteudo',
  props: ['post'],
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
.verbete-wrapper {
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);

  @media (min-width: 700px) {
    min-height: 650px;
    max-height: 650px;
    flex-direction: row;
  }

  .verbete-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 4;
    order: 2;

    @media (min-width: 700px) {
      order: 1;
    }

    @media (min-width: 800px) {
      flex: 3;
    }

    div {
      max-width: 375px;
      padding: 72px 24px;

      @media (min-width: 700px) {
        padding: 0 24px;
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

      .content-preview {
        font-size: 13px;
        max-height: 24px;
        width: 250px;
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
    }
  }

  .verbete-photo {
    order: 1;
    flex: 3;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);

    @media (min-width: 700px) {
      order: 2;
    }

    @media (min-width: 800px) {
      flex: 4;
    }

    img {
      display: block;
      width: 100%;
      height: 100%;
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

.no-user:first-child {
  .verbete-content {
    background-color: #303030;
    color: #fff;
  }
}
</style>
