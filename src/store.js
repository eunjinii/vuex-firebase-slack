import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  currentUser: {},
  isOpenAddChannelModal: false
};

const mutations = {
  SET_USER(state, user) {
    state.currentUser = user;
  },
  OPEN_ADD_CHANNEL_MODAL(state) {
    state.isOpenAddChannelModal = true;
  },
  CLOSE_ADD_CHANNEL_MODAL(state) {
    state.isOpenAddChannelModal = false;
  }
};

const actions = {
  setUser({ commit }, user) {
    commit("SET_USER", user);
  }
};

const getters = {
  currentUser: state => state.currentUser
};

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});

export default store;
