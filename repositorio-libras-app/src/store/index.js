import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase/app';
import 'firebase/auth';
import db from '../firebase/firebaseInit';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    verbetes: [],
    postLoaded: null,
    verbeteDefinicao: '',
    verbeteLinkVideo: '',
    verbeteCurtidas: null,
    verbeteNome: '',
    verbeteImagemNome: '',
    verbeteImagemFileURL: null,
    verbeteImagemPreview: null,
    editVerbete: null,
    user: null,
    profileAdmin: null,
    profileEmail: null,
    profileFirstName: null,
    profileLastName: null,
    profileUsername: null,
    profileId: null,
    profileInitials: null,
    verbeteVideoNome: '',
    verbeteVideoFileURL: null,
    verbeteVideoPreview: null,
    verbeteCategoria: '',
    verbeteSubcategoria: '',
    verbetesCategorias: [],
  },
  getters: {
    verbetesFeed(state) {
      if (state.verbetes.length < 9) {
        // eslint-disable-next-line max-len
        return state.verbetes.sort((a, b) => b.verbeteCurtidas - a.verbeteCurtidas).slice(0, state.verbetes.length - 1);
      }

      return state.verbetes.sort((a, b) => b.verbeteCurtidas - a.verbeteCurtidas).slice(0, 9);
    },

    verbetesCategorias(state) {
      return state.verbetesCategorias;
    }
  },
  mutations: {
    updateVerbeteDefinicao(state, payload) {
      state.verbeteDefinicao = payload;
    },

    updateVerbeteNome(state, payload) {
      state.verbeteNome = payload;
    },

    updateVerbeteVideo(state, payload) {
      state.verbeteLinkVideo = payload;
    },

    updateVerbeteCategoria(state, payload) {
      state.verbeteCategoria = payload;
    },

    updateVerbeteSubCategoria(state, payload) {
      state.verbeteSubcategoria = payload;
    },

    fileNameChange(state, payload) {
      state.verbeteImagemNome = payload;
    },

    createFileURL(state, payload) {
      state.verbeteImagemFileURL = payload;
    },

    openPhotoPreview(state) {
      state.verbeteImagemPreview = !state.verbeteImagemPreview;
    },

    toggleEditVerbete(state, payload) {
      state.editVerbete = payload;
    },

    updateUser(state, payload) {
      state.user = payload;
    },

    setProfileAdmin(state, payload) {
      state.profileAdmin = payload;
    },

    setProfileInfo(state, doc) {
      state.profileId = doc.id;
      state.profileEmail = doc.data().email;
      state.profileFirstName = doc.data().firstName;
      state.profileLastName = doc.data().lastName;
      state.profileUsername = doc.data().username;
    },

    setProfileInitials(state) {
      state.profileInitials =
        state.profileFirstName.match(/(\b\S)?/g).join('') +
        state.profileLastName.match(/(\b\S)?/g).join('');
    },

    setVerbeteState(state, payload) {
      state.verbeteNome = payload.verbeteNome;
      state.verbeteDefinicao = payload.verbeteDefinicao;
      state.verbeteImagem = payload.verbeteImagem;
      state.verbeteCategoria = payload.verbeteCategoria;
      state.verbeteSubcategoria = payload.verbeteSubcategoria;
      state.verbeteLinkVideo = payload.verbeteLinkVideo;
      state.verbeteImagemNome = payload.verbeteImagemNome;
    },

    changeFirstName(state, payload) {
      state.profileFirstName = payload;
    },

    changeLastName(state, payload) {
      state.profileLastName = payload;
    },

    changeUsername(state, payload) {
      state.profileUsername = payload;
    },

    filterVerbetes(state, payload) {
      state.verbetes = state.verbetes.filter(
        (verbete) => verbete.verbeteId !== payload
      );
    },
  },
  actions: {
    // commit ocorre toda vez que executa uma "mutation"
    async getCurrentUser({ commit }, user) {
      const dataBase = await db
        .collection('users')
        .doc(firebase.auth().currentUser.uid);

      const currentUser = await dataBase.get();

      // Atualiza os dados do usuário atual
      commit('setProfileInfo', currentUser);
      commit('setProfileInitials');

      const token = await user.getIdTokenResult();
      const admin = await token.claims.admin;

      // Atualiza as permissões do usuário atual
      commit('setProfileAdmin', admin);
    },

    async updateUserSettings({ commit, state }) {
      const dataBase = await db.collection('users').doc(state.profileId);
      await dataBase.update({
        firstName: state.profileFirstName,
        lastName: state.profileLastName,
        username: state.profileUsername,
      });

      commit('setProfileInitials');
    },

    async getVerbetes({ state }) {
      // Get em todos os verbetes publicados por data desc
      const dataBase = await db.collection('verbetes').orderBy('date', 'desc');
      const dbResults = await dataBase.get();

      // TODO 7 - sugestão: trocar essa verificação por um listener
      // Filtro que verifica se os verbetes não estão duplicados dentro da variavel do state
      dbResults.forEach((doc) => {
        if (!state.verbetes.some((verbete) => verbete.verbeteId === doc.id)) {
          const data = {
            verbeteId: doc.data().verbeteId,
            verbeteDefinicao: doc.data().verbeteDefinicao,
            verbeteImagem: doc.data().verbeteImagem,
            verbeteNome: doc.data().verbeteNome,
            verbeteDate: doc.data().date,
            verbeteBackground: doc.data().verbeteImagemNome,
            verbeteLinkVideo: doc.data().verbeteLinkVideo,
            verbeteCurtidas: doc.data().verbeteCurtidas,
            verbeteCategoria: doc.data().verbeteCategoria,
            verbeteSubcategoria: doc.data().verbeteSubcategoria,
          };

          state.verbetes.push(data);
        }
      });

      state.postLoaded = true;
    },

    async updateVerbete({ commit, dispatch }, payload) {
      commit('filterVerbetes', payload);
      await dispatch('getVerbetes');
    },

    async deleteVerbete({ commit }, payload) {
      const getVerbetes = await db.collection('verbetes').doc(payload);
      await getVerbetes.delete();

      // Remove o post deletado do front
      commit('filterVerbetes', payload);
    },

    async getCategoriasVerbetes({ state }) {
      const categorias = await db.collection('categorias').orderBy('categoriaNome', 'desc');
      const resultado = await categorias.get();

      resultado.forEach((categoria) => {
        // eslint-disable-next-line max-len
        if (!state.verbetesCategorias.some((cat) => cat.categoriaNome === categoria.categoriaNome)) {
          const data = {
            categoriaNome: categoria.data().categoriaNome,
            categoriaSubcategorias: categoria.data().categoriaSubcategorias,
          };

          state.verbetesCategorias.push(data);
        }
      });
    },
  },
  modules: {},
});
