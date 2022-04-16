import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase/app';
import 'firebase/auth';
import db from '../firebase/firebaseInit';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sampleBlogCards: [
      {
        blogTitle: '#Card 1 This is a Filter Title!',
        blogCoverPhoto: 'stock-1',
        blogDate: 'May 1, 2021',
      },
      {
        blogTitle: '#Card 2 This is a Filter Title!',
        blogCoverPhoto: 'stock-2',
        blogDate: 'May 1, 2021',
      },
      {
        blogTitle: '#Card 3 This is a Filter Title!',
        blogCoverPhoto: 'stock-3',
        blogDate: 'May 1, 2021',
      },
      {
        blogTitle: '#Card 4 This is a Filter Title!',
        blogCoverPhoto: 'stock-4',
        blogDate: 'May 1, 2021',
      },
    ],
    editPost: null,
    user: null,
    profileEmail: null,
    profileFirstName: null,
    profileLastName: null,
    profileUsername: null,
    profileId: null,
    profileInitials: null,
  },
  mutations: {
    toggleEditPost(state, payload) {
      state.editPost = payload;
    },

    updateUser(state, payload) {
      state.user = payload;
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

    changeFirstName(state, payload) {
      state.profileFirstName = payload;
    },

    changeLastName(state, payload) {
      state.profileLastName = payload;
    },

    changeUsername(state, payload) {
      state.profileUsername = payload;
    },
  },
  actions: {
    // commit ocorre toda vez que executa uma "mutation"
    async getCurrentUser({ commit }) {
      const dataBase = await db
        .collection('users')
        .doc(firebase.auth().currentUser.uid);

      const currentUser = await dataBase.get();

      commit('setProfileInfo', currentUser);
      commit('setProfileInitials');
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
  },
  modules: {},
});
