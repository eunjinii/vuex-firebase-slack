<template>
  <div>
    <div class="jumpotron bg-primary text-white text-center">
      <h2 class="lead display-3">#SLACK</h2>
      <p>Realtime communication at its best!</p>
    </div>

    <!-- show loading status -->
    <div class="alert alert-info" v-if="loading">Processing...</div>

    <!-- show errors -->
    <div class="alert alert-danger" v-if="hasErrors">
      <div v-for="error in errors">{{ errors }}</div>
    </div>

    <div class="container-fluid">
      <div class="row mt-5 ">
        <div class="col text-center">
          <button
            @click="loginWithGoogle"
            class="btn btn-outline-danger btn-lg"
          >
            Login with Google
          </button>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col text-center">
          <button class="btn btn-outline-info btn-lg">
            Login with Twitter
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import auth from "firebase/auth";

export default {
  name: "Login",
  data() {
    return {
      errors: [],
      loading: false
    };
  },
  computed: {
    hasErrors() {
      return this.errors.length > 0;
    }
  },
  methods: {
    loginWithGoogle() {
      this.loading = true;
      this.errors = [];
      firebase
        .auth()
        .signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(res => {
          this.$store.dispatch("setUser", res.user);
          this.$router.push("/");
        })
        .catch(e => {
          this.errors.push(e.message);
          this.loading = false;
        });
    }
  }
};
</script>

<style scoped>
.btn,
.jumbotron {
  border-radius: 0px;
}
</style>
