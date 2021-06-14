import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  currentUser: {},
  currentChannel: null,
  messagesScrollHeight: 0,
  scrollBottomCallback: null,
  isMessagesLoading: false
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
  },
  SET_SCROLL_BOTTOM_CALLBACK(state, callback) {
    state.scrollBottomCallback = callback;
  },
  SHOW_MESSAGE_LOADING(state) {
    state.isMessagesLoading = true;
  },
  HIDE_MESSAGE_LOADING(state) {
    state.isMessagesLoading = false;
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
  },
  setScrollBottomCallback({ commit }, callback) {
    commit("SET_SCROLL_BOTTOM_CALLBACK", callback);
  },
  showMessageLoading({ commit }) {
    commit("SHOW_MESSAGE_LOADING");
  },
  hideMessageLoading({ commit }) {
    commit("HIDE_MESSAGE_LOADING");
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
