<template>
  <div class="home">
    <blog-post :post="welcomeScreen" />

    <blog-post
      :post="post"
      v-for="(post, index) in sampleBlogPost"
      :key="index"
    />

    <div class="blog-card-wrap">
      <div class="container">
        <h3>View More Recent Blogs</h3>

        <div class="blog-cards">
          <blog-card
            :post="post"
            v-for="(post, index) in sampleBlogCards"
            :key="index"
          />
        </div>
      </div>
    </div>

    <div class="updates">
      <div class="container">
        <h2>Never miss a post. Register for your free account today!</h2>
        <router-link class="router-button" to="#">
          Register for RepositorioLibras <arrowIcon class="arrow arrow-light" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import blogPost from '../components/blog-post.vue';
import blogCard from '../components/blog-card.vue';
import arrowIcon from '../assets/Icons/arrow-right-light.svg';

export default {
  name: 'home',
  components: {
    blogPost,
    blogCard,
    arrowIcon,
  },
  data() {
    return {
      welcomeScreen: {
        title: 'Welcome!',
        blogPost:
          'Weekly blog articles all things programming including HTML, CSS, JS and More. Register today to never miss a post',
        welcomeScreen: true,
        photo: 'coding',
      },
      sampleBlogPost: [
        {
          title: 'This is a Filter Title!',
          blogHtml: 'This is a filter blog post title!',
          blogCoverPhoto: 'designed-for-everyone',
        },
        {
          title: 'This is a filter Title!',
          blogHtml: 'This is a filter blog post title!',
          blogCoverPhoto: 'beautiful-stories',
        },
      ],
    };
  },
  computed: {
    sampleBlogCards() {
      return this.$store.state.sampleBlogCards;
    },
  },
};
</script>

<style lang="scss" scoped>

.blog-card-wrap {
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

      @media(min-width: 800px) {
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

      @media(min-width: 800px) {
        font-align: initial;
        font-size: 40px;
      }
    }
  }
}
</style>
