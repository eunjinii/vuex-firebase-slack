import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  currentUser: {},
  isOpenAddChannelModal: false,
  currentChannel: null
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
  },
  SET_CURRENT_CHANNEL(state, channel) {
    state.currentChannel = channel;
  }
};

const actions = {
  setUser({ commit }, user) {
    commit("SET_USER", user);
  },
  setCurrentChannel({ commit }, channel) {
    commit("SET_CURRENT_CHANNEL", channel);
  }
};

const getters = {
  currentUser: state => state.currentUser,
  currentChannel: state => state.currentChannel
};

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});

export default store;
