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
    blogHTML: 'Write your blog title here...',
    blogTitle: '',
    blogPhotoName: '',
    blogPhotoFileURL: null,
    blogPhotoPreview: null,
    editPost: null,
    user: null,
    profileAdmin: null,
    profileEmail: null,
    profileFirstName: null,
    profileLastName: null,
    profileUsername: null,
    profileId: null,
    profileInitials: null,
  },
  getters: {
    verbetesFeed(state) {
      return state.verbetes.slice(0, 2);
    },
    verbetesCards(state) {
      return state.verbetes.slice(2, 6);
    },
  },
  mutations: {
    newBlogPost(state, payload) {
      state.blogHTML = payload;
    },

    updateBlogTitle(state, payload) {
      state.blogTitle = payload;
    },

    fileNameChange(state, payload) {
      state.blogPhotoName = payload;
    },

    createFileURL(state, payload) {
      state.blogPhotoFileURL = payload;
    },

    openPhotoPreview(state) {
      state.blogPhotoPreview = !state.blogPhotoPreview;
    },

    toggleEditPost(state, payload) {
      state.editPost = payload;
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

    setBlogState(state, payload) {
      state.blogTitle = payload.blogTitle;
      state.blogHTML = payload.blogHTML;
      state.blogPhotoFileURL = payload.blogCoverPhoto;
      state.blogCoverPhotoName = payload.blogCoverPhotoName;
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

    filterBlogPost(state, payload) {
      state.verbetes = state.verbetes.filter(
        (post) => post.verbeteId !== payload
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

    async getPost({ state }) {
      // Get em todos os artigos publicados por data desc
      const dataBase = await db.collection('verbetes').orderBy('date', 'desc');
      const dbResults = await dataBase.get();

      // TODO 7 - sugestão: trocar essa verificação por um listener
      // Filtro que verifica se os posts não estão duplicados dentro da variavel do state verbetes
      dbResults.forEach((doc) => {
        if (!state.verbetes.some((post) => post.verbeteId === doc.id)) {
          const data = {
            verbeteId: doc.data().verbeteId,
            verbeteDefinicao: doc.data().blogHTML,
            verbeteImagem: doc.data().blogCoverPhoto,
            verbeteNome: doc.data().blogTitle,
            verbeteDate: doc.data().date,
            verbeteBackground: doc.data().blogCoverPhotoName,
            verbeteLinkVideo: doc.data().verbeteLinkVideo,
          };

          state.verbetes.push(data);
        }
      });

      console.log(state.verbetes);
      state.postLoaded = true;
    },

    async updatePost({ commit, dispatch }, payload) {
      commit('filterBlogPost', payload);
      await dispatch('getPost');
    },

    async deletePost({ commit }, payload) {
      const getPost = await db.collection('verbetes').doc(payload);
      await getPost.delete();

      // Remove o post deletado do front
      commit('filterBlogPost', payload);
    },
  },
  modules: {},
});
