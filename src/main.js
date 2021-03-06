// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
// node modules 에서 가져오는 경우에는 path를 지정해주지 않아도 된다. 
import firebase from "firebase/app";
import auth from "firebase/auth";
import "firebase/storage";
import "firebase/analytics";

/* eslint-disable no-new */

Vue.config.productionTip = false;

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBp6hFdmDXuEXfl7HadcHtEQVlaXhDf9NE",
  authDomain: "vuex-firebase-slack.firebaseapp.com",
  projectId: "vuex-firebase-slack",
  storageBucket: "vuex-firebase-slack.appspot.com",
  messagingSenderId: "77159275189",
  appId: "1:77159275189:web:5511db19b84534137d3cfc",
  measurementId: "G-SQCJ147MBQ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// make firebase available in windows object
// so we dont need to import firebase on each components
window.firebase = firebase;

const unsubscribe = firebase.auth().onAuthStateChanged(user => {
  store.dispatch("setUser", user);

  new Vue({
    el: "#app",
    router,
    store,
    components: { App },
    template: "<App/>"
  });

  unsubscribe();
});
