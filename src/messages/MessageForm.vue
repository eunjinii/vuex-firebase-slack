<template>
  <div>
    <div class="messageform">
      <form @submit.prevent="sendMessage">
        <div class="input-group mb-3">
          <input
            name="message"
            id="message"
            placeholder="Write something"
            type="text"
            class="form-control mt-3"
            autofocus
            v-model.trim="message"
          />
          <div class="input-group-append">
            <button
              class="btn btn-primary mt-3"
              type="button"
              @click.prevent="sendMessage"
            >
              &nbsp; Send &nbsp;
            </button>
          </div>
          <div class="input-group-append">
            <button class="btn btn-warning mt-3" type="button">Upload</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import database from "firebase/database";

export default {
  name: "MessageForm",
  data() {
    return {
      message: "",
      errors: []
    };
  },
  computed: {
    ...mapGetters(["currentChannel", "currentUser"])
  },
  methods: {
    ...mapActions(["showLoading", "hideLoading"]),
    sendMessage() {
      let newMessage = {
        content: this.message,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        user: {
          name: this.currentUser.displayName,
          avatar: this.currentUser.photoURL,
          id: this.currentUser.uid
        }
      };

      if (this.currentChannel !== null) {
        if (this.message.length > 0) {
          this.showLoading();
          this.$parent.messagesRef
            .child(this.currentChannel.id)
            .push()
            .set(newMessage)
            .then(() => {
              this.hideLoading();
              this.$nextTick(() => this.$emit("scrollToEnd"));
            })
            .catch(() => {
              this.errors.push(error.message);
            });
          this.message = "";
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.messageform {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 67%;
  z-index: 100;
  color: white;
  text-align: center;
  margin-bottom: -16px;
  margin-left: 33.5%;

  input,
  button {
    height: 50px;
  }

  input:focus {
    outline: none;
  }
}
</style>
