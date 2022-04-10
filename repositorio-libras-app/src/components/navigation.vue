<template>
  <header>
      <nav class="container">
          <div class="branding">
              <router-link class="header" :to="{name: 'home' }">RepositorioLibras</router-link>
            </div>
            <div class="branding">
              <ul>
                <router-link class="link" to="#">Início</router-link>
                <router-link class="link" to="#">Blogs</router-link>
                <router-link class="link" to="#">Craete Post</router-link>
                <router-link class="link" to="#">Login/Register</router-link>
              </ul>
            </div>
      </nav>
      <menuIcon></menuIcon>
      <transition name="mobile-nav"></transition>
      <ul>
          <router-link class="link" to="#">Início</router-link>
          <router-link class="link" to="#">Blogs</router-link>
          <router-link class="link" to="#">Craete Post</router-link>
          <router-link class="link" to="#">Login/Register</router-link>
      </ul>
  </header>
</template>

<script>

import menuIcon from '../assets/Icons/bars-regular.svg';

export default {
  name: "navigation",
  components: {
    menuIcon,
  },
};
</script>

<style lang="scss" scoped></style>