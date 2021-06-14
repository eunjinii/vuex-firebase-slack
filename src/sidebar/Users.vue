<template>
  <div>
    <div class="text-light">
      <h4>Users</h4>
      <ul class="nav flex-column">
        <li v-for="user in users" :key="user.uid">
          <span>
            <img
              class="img rounded-circle"
              height="20"
              :src="user.avatar"
              :alt="user.uid"
            />
            <span
              :class="{
                'text-primary': isOnline(user),
                'text-danger': !isOnline(user)
              }"
              >{{ user.name }}</span
            >
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import database from "firebase/database";
import { mapGetters } from "vuex";

export default {
  name: "Users",
  data() {
    return {
      users: [],
      usersRef: firebase.database().ref("users"),
      connectedRef: firebase.database().ref(".info/connected"),
      presenceRef: firebase.database().ref("presence")
    };
  },
  computed: {
    ...mapGetters(["currentUser"])
  },
  methods: {
    addListeners() {
      this.usersRef.on("child_added", snapshot => {
        if (this.currentUser.uid !== snapshot.key) {
          let user = snapshot.val();
          user["uid"] = snapshot.key;
          user["status"] = "offline";
          this.users.push(user);
        }
      });
      this.presenceRef.on("child_added", snapshot => {
        if (this.currentUser.uid !== snapshot.key) {
          this.addStatusToUser(snapshot.key);
        }
      });
      this.presenceRef.on("child_removed", snapshot => {
        if (this.currentUser.uid !== snapshot.key) {
          this.addStatusToUser(snapshot.key, false);
        }
      });
      this.connectedRef.on("value", snapshot => {
        if (snapshot.val() === true) {
          let ref = this.presenceRef.child(this.currentUser.uid);
          ref.set(true);
          ref.onDisconnect().remove();
        }
      });
    },
    addStatusToUser(userId, connected = true) {
      let index = this.users.findIndex(user => user.uid === userId);
      if (index !== -1) {
        this.users[index].status = connected ? "online" : "offline";
      }
    },
    isOnline(user) {
      return user.status === "online";
    },
    detachListeners() {
      this.usersRef.off();
      this.presenceRef.off();
      this.connectedRef.off();
    }
  },
  mounted() {
    this.addListeners();
  },
  beforeDestroy() {
    this.detachListeners();
  }
};
</script>
