<template>
  <header>
    <nav class="container" @click="disableProfileMenu">
      <div class="branding">
        <router-link class="header" :to="{ name: 'Home' }"
          >RepositorioLibras</router-link
        >
      </div>
      <div class="nav-links">
        <ul v-show="!mobile">
          <li title="Início">
            <router-link class="link" :to="{ name: 'Home' }"
              ><home-icon class="svg-icon"
            /></router-link>
          </li>
          <li title="Ver Todos os Verbetes" v-if="user">
            <router-link class="link" :to="{ name: 'Verbetes' }"
              ><archives-icon class="svg-icon"
            /></router-link>
          </li>
          <li title="Adicionar um Verbete" v-if="user">
            <router-link class="link" :to="{ name: 'CriarVerbete' }"
              ><add-icon class="svg-icon" />
            </router-link>
          </li>
          <li title="Entrar">
            <router-link v-if="!user" class="link" :to="{ name: 'Login' }"
              ><login-icon class="svg-icon"
            /></router-link>
          </li>
        </ul>

        <div
          v-show="user"
          @click="toggleProfileMenu"
          class="profile"
          ref="profileMenu"
        >
          <span>{{ this.$store.state.profileInitials }}</span>
          <div v-show="profileMenu" class="profile-menu">
            <div class="info">
              <div class="right">
                <p>
                  {{ this.$store.state.profileFirstName }}
                  {{ this.$store.state.profileLastName }}
                </p>
                <p>
                  {{ this.$store.state.profileUsername }}
                </p>
                <p>
                  {{ this.$store.state.profileEmail }}
                </p>
              </div>
            </div>
            <div class="options">
              <div class="option">
                <router-link class="option" :to="{ name: 'Perfil' }">
                  <user-icon class="icon" />
                  <p>Perfil</p>
                </router-link>
              </div>

              <div v-if="isAdmin" class="option">
                <router-link
                  class="option"
                  :to="{ name: 'PerfilAdministrador' }"
                >
                  <admin-icon class="icon" />
                  <p>Admin</p>
                </router-link>
              </div>

              <div @click="signOut" class="option">
                <router-link class="option" :to="{ name: 'Login' }">
                  <sign-out-icon class="icon" />
                  <p>Sign Out</p>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <menuIcon @click="toggleMobileNav" class="menu-icon" v-show="mobile" />

    <transition name="mobile-nav">
      <ul class="mobile-nav" v-show="mobileNav">
        <router-link class="link" :to="{ name: 'Home' }">Início</router-link>
        <router-link class="link" :to="{ name: 'Verbetes' }"
          >Verbetes</router-link
        >
        <router-link class="link" :to="{ name: 'CriarVerbete' }"
          >Adicionar um Verbete</router-link
        >
      </ul>
    </transition>
  </header>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';
import menuIcon from '../assets/icons/bars-regular.svg';
import userIcon from '../assets/icons/user-alt-light.svg';
import adminIcon from '../assets/icons/user-crown-light.svg';
import signOutIcon from '../assets/icons/sign-out-alt-regular.svg';
import addIcon from '../assets/icons/add-svgrepo-com.svg';
import archivesIcon from '../assets/icons/archives-copy-svgrepo-com.svg';
import homeIcon from '../assets/icons/home-svgrepo-com.svg';
import loginIcon from '../assets/icons/login-svgrepo-com.svg';

export default {
  name: 'Navigation',
  components: {
    menuIcon,
    userIcon,
    adminIcon,
    signOutIcon,
    addIcon,
    archivesIcon,
    homeIcon,
    loginIcon,
  },
  data() {
    return {
      profileMenu: null,
      mobile: null,
      mobileNav: null,
      windowWidth: null,
    };
  },
  created() {
    window.addEventListener('resize', this.checkScreen);
    this.checkScreen();
  },
  methods: {
    checkScreen() {
      this.windowWidth = window.innerWidth;

      if (this.windowWidth <= 750) {
        this.mobile = true;
        return;
      }

      this.mobile = false;
      this.mobileNav = false;
    },

    toggleMobileNav() {
      this.mobileNav = !this.mobileNav;
    },

    toggleProfileMenu(e) {
      // Ação só é executada quando o target for apenas o elemento pai do menu
      if (e.target === this.$refs.profileMenu) {
        this.profileMenu = !this.profileMenu;
      }
    },

    signOut() {
      firebase.auth().signOut();
      window.location.reload();
    },

    disableProfileMenu(e) {
      if (e.target !== this.$refs.profileMenu) {
        this.profileMenu = false;
      }
    },
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    isAdmin() {
      return this.$store.state.profileAdmin;
    },
  },
};
</script>

<style lang="scss" scoped>
header {
  background-color: #fff;
  padding: 0 25px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 99;

  .link {
    font-weight: 500;
    padding: 0 8px;
    transition: 0.3s color ease;

    &:hover {
      color: #1eb8b8;
    }
  }

  nav {
    display: flex;
    padding: 25px 0;

    .branding {
      display: flex;
      align-items: center;

      .header {
        font-weight: 600;
        font-size: 24px;
        color: #000;
        text-decoration: none;
      }
    }

    .nav-links {
      position: relative;
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: flex-end;

      ul {
        margin-right: 32px;

        li {
          margin-right: 5px;
        }

        li:last-child {
          margin-right: 0;
        }

        .link {
          margin-right: 32px;
        }

        .link:last-child {
          margin-right: 0;
        }
      }

      .profile {
        position: relative;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        color: #000;
        font-weight: 600;
        background-color: #1de9b6;
        margin-right: 50px;

        span {
          pointer-events: none;
        }

        .profile-menu {
          position: absolute;
          top: 60px;
          right: 0;
          width: 300px;
          background-color: #fafafa;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);

          .info {
            display: flex;
            align-items: center;
            padding: 15px;
            border-bottom: 1px solid #fff;

            .right {
              flex: 1;
              margin-left: 24px;

              p:nth-child(1) {
                font-size: 14px;
              }

              p:nth-child(2),
              p:nth-child(3) {
                font-size: 12px;
              }
            }
          }

          .options {
            padding: 20px 15px;

            .option {
              text-decoration: none;
              color: #303030;
              display: flex;
              align-items: center;
              margin-bottom: 20px;

              .icon {
                width: 18px;
                height: auto;
              }

              p {
                font-size: 14px;
                margin-left: 12px;
              }

              &:last-child {
                margin-bottom: 0px;
              }
            }
          }
        }
      }
    }

    .mobile-user-menu {
      margin-right: 40px;
    }
  }

  .menu-icon {
    cursor: pointer;
    position: absolute;
    top: 32px;
    right: 25px;
    height: 25px;
    width: auto;
  }

  .mobile-nav {
    padding: 20px;
    width: 70%;
    max-width: 250px;
    display: flex;
    flex-direction: column;
    position: fixed;
    height: 100%;
    background-color: #303030;
    top: 0;
    left: 0;
    .link {
      padding: 15px 0;
      color: #fff;
    }
  }

  .mobile-nav-enter-active,
  .mobile-nav-leave-active {
    transition: all 1s ease;
  }

  .mobile-nav-enter {
    transform: translateX(-250px);
  }

  .mobile-nav-enter-to {
    transform: translateX(0);
  }

  .mobile-nav-leave-to {
    transform: translateX(-250px);
  }

  ul {
    margin-top: auto;

    li {
      display: inline;
      align-items: center;

      .svg-icon {
        width: 40px;
        height: auto;
        color: #fff;
      }
    }
  }
}
</style>
