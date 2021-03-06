<template>
  <div class="profile">
    <ModalAlert
      v-if="modalActive"
      :modalMessage="modalMessage"
      v-on:close-modal="closeModal"
    />
    <div class="container">
      <h2>Configurações da Conta</h2>

      <div class="profile-info">
        <div class="initials">{{ $store.state.profileInitials }}</div>
        <div v-if="isAdmin" class="admin-badge">
          <adminIcon class="icon" />
          <span>admin</span>
        </div>

        <div class="input">
          <label for="firstName">Primeiro Name:</label>
          <input type="text" id="firstName" v-model="firstName" />
        </div>

        <div class="input">
          <label for="lastName">Sobrenome:</label>
          <input type="text" id="lastName" v-model="lastName" />
        </div>

        <div class="input">
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="username" />
        </div>

        <div class="input">
          <label for="email">Email:</label>
          <input disabled type="text" id="email" v-model="email" />
        </div>

        <div class="input">
          <label for="text">Instituição Acadêmica</label>
          <input type="text" id="institution"
                 placeholder="Ex.: Universidade Federal do Mato Grosso do Sul"
                 v-model="institution" />
        </div>

        <div class="rl-perfil-education">
          <label>Gradução Acadêmica</label>
          <div>
            <select v-model="education" id="academic"
                    :disabled="!institution || institution.length <= 30">
              <option :value="educationFiltroVazio">Prefiro não informar</option>
              <option v-for="(nivel, index) in PERFIL_FORMACOES_ACADEMICAS"
                      :key="index" :value="nivel">
                {{nivel.value}}</option>
            </select>
          </div>
        </div>

        <button @click="updateProfile">Salvar</button>
      </div>
    </div>
  </div>
</template>

<script>
import ModalAlert from '../components/ModalAlert.vue';
import adminIcon from '../assets/icons/user-crown-light.svg';

export default {
  name: 'Perfil',
  components: {
    ModalAlert,
    adminIcon,
  },
  data() {
    return {
      modalMessage: 'O perfil foi atualizado!',
      modalActive: null,
      educationFiltroVazio: {
        key: '',
        value: ''
      },
    };
  },
  methods: {
    updateProfile() {
      this.$store.dispatch('updateUserSettings');
      this.modalActive = !this.modalActive;
    },

    closeModal() {
      this.modalActive = !this.modalActive;
    },
  },
  computed: {
    firstName: {
      get() {
        return this.$store.state.profileFirstName;
      },
      set(payload) {
        this.$store.commit('changeFirstName', payload);
      },
    },

    lastName: {
      get() {
        return this.$store.state.profileLastName;
      },
      set(payload) {
        this.$store.commit('changeLastName', payload);
      },
    },

    username: {
      get() {
        return this.$store.state.profileUsername;
      },
      set(payload) {
        this.$store.commit('changeUsername', payload);
      },
    },

    institution: {
      get() {
        return this.$store.state.profileInstitution;
      },
      set(payload) {
        this.$store.commit('changeInstitution', payload);
      },
    },

    education: {
      get() {
        return this.$store.state.profileEducation;
      },
      set(payload) {
        this.$store.commit('changeEducation', payload);
      },
    },

    email() {
      return this.$store.state.profileEmail;
    },

    isAdmin() {
      return this.$store.state.profileAdmin;
    },

    PERFIL_FORMACOES_ACADEMICAS() {
      return this.$store.state.PERFIL_FORMACOES_ACADEMICAS;
    },
  },
};
</script>

<style lang="scss" scoped>
.profile {
  .container {
    max-width: 1000px;
    padding: 60px 25px;

    h2 {
      text-align: center;
      margin-bottom: 16px;
      font-weight: 300;
      font-size: 32px;
    }

    .profile-info {
      border-radius: 8px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
      padding: 32px;
      background-color: #f1f1f1;
      display: flex;
      flex-direction: column;
      max-width: 600px;
      margin: 32px auto;

      .initials {
        position: initial;
        width: 80px;
        height: 80px;
        font-size: 32px;
        background-color: #303030;
        color: #fff;
        display: flex;
        align-self: center;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
      }

      .admin-badge {
        display: flex;
        align-self: center;
        color: #fff;
        font-size: 14px;
        padding: 8px 24px;
        border-radius: 8px;
        background-color: #00987a;
        margin: 16px 0;
        text-align: center;
        text-transform: capitalize;

        .icon {
          width: 14px;
          height: auto;
          margin-right: 8px;
        }

        span {
          background-color: #00987a;
        }
      }

      .input {
        margin: 16px 0;
        label {
          font-size: 14px;
          display: block;
          padding-bottom: 6px;
        }

        input {
          width: 100%;
          border: none;
          background-color: #f2f7f6;
          padding: 8px;
          height: 50px;

          @media (min-width: 900px) {
          }

          &:focus {
            outline: none;
          }
        }
      }

      button {
        align-self: end;
        font-weight: 400;
      }
    }

    .rl-perfil-education {
      font-size: 14px;

      > div {
        margin-top: 10px;

        select {
          height: 30px;
        }
      }
    }
  }
}
</style>
