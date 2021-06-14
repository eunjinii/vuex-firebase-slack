<template>
  <div>
    <h2 class="text-light">#SLACK#</h2>
    <hr style="border: 1px solid #ccc;" />

    <span
      ><img
        class="rounded-circle mr-2"
        height="30"
        :src="currentUser.photoURL"
      />
      <span class="text-light">{{ currentUser.displayName }}</span>
    </span>

    <hr style="border: 1px solid #ccc;" />

    <button @click="logout" class="btn btn-outline-light">Logout</button>

    <hr style="border: 1px solid #ccc;" />
    <Channels />
    <hr style="border: 1px solid #ccc;" />
    <Users />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Channels from "./Channels";
import Users from "./Users";
import auth from "firebase/auth";
import database from "firebase/database";

export default {
  name: "Sidebar",
  data() {
    return {
      presenceRef: firebase.database().ref("presence")
    };
  },
  components: {
    Channels,
    Users
  },
  computed: {
    ...mapGetters(["currentUser"])
  },
  methods: {
    logout() {
      this.presenceRef.child(this.currentUser.uid).remove();
      firebase.auth().signOut();
      this.$store.dispatch("setUser", null);
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped></style>
