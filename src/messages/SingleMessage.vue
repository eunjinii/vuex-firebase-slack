<template>
  <div>
    <div class="mt-3">
      <div v-for="(message, index) in messages" :key="index">
        <div class="media message-wrap">
          <img
            :src="message.user.avatar"
            height="50"
            :alt="message.user.id"
            class="align-self-start mr-3"
          />
          <div class="media-body">
            <h6 class="mt-0">
              <a href="#">{{ message.user.name }}</a> -
              {{ message.timestamp | fromNow }}
            </h6>
            <p :class="{ 'self-message': selfMessage(message.user) }">
              {{ message.content }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { mapGetters } from "vuex";

export default {
  name: "SingleMessage",
  props: ["messages"],
  computed: {
    ...mapGetters(["currentUser"])
  },
  methods: {
    selfMessage(user) {
      return user.id === this.currentUser.uid;
    }
  },
  filters: {
    fromNow(value) {
      return moment(value).fromNow();
    }
  }
};
</script>

<style lang="scss" scoped>
.mt-3 {
  padding-bottom: 80px;

  .message-wrap {
    display: flex;

    .media-body {
      margin-left: 12px;

      .self-message {
        border-left: 5px solid red;
        padding: 0 5px;
      }
    }
  }
}
</style>
