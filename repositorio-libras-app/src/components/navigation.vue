<template>
  <header>
      <nav class="container">
          <div class="branding">
              <router-link class="header" :to="{name: 'home' }">RepositorioLibras<router-link>
            </div>
            <div class="branding">
              <ul>
                <router-links class="link" to="#">Início</router-links>
                <router-links class="link" to="#">Blogs</router-links>
                <router-links class="link" to="#">Craete Post</router-links>
                <router-links class="link" to="#">Login/Register</router-links>
              </ul>
            </div>
      </nav>
      <menuIcon></menuIcon>
      <transition name="mobile-nav"></transition>
      <ul>
          <router-links class="link" to="#">Início</router-links>
          <router-links class="link" to="#">Blogs</router-links>
          <router-links class="link" to="#">Craete Post</router-links>
          <router-links class="link" to="#">Login/Register</router-links>
      </ul>
  </header>
</template>

<script>
import menuIcon from ".../assets/Icons/bars-regular.svg";

export default {
  name: "navigation",
  components: {
    menuIcon,
  },
};
</script>

<style lang="scss" scoped></style>