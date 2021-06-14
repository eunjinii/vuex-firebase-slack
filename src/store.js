import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  currentUser: {},
  currentChannel: null,
  messagesScrollHeight: 0
};

const mutations = {
  SET_USER(state, user) {
    state.currentUser = user;
  },
  SET_CURRENT_CHANNEL(state, channel) {
    state.currentChannel = channel;
  },
  SET_MESSAGES_SCROLL_HEIGHT(state, height) {
    state.messagesScrollHeight = height;
  }
};

const actions = {
  setUser({ commit }, user) {
    commit("SET_USER", user);
  },
  setCurrentChannel({ commit }, channel) {
    commit("SET_CURRENT_CHANNEL", channel);
  },
  setMessagesScrollHeight({ commit }, height) {
    commit("SET_MESSAGES_SCROLL_HEIGHT", height);
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
