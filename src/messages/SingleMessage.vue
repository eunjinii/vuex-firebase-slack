<template>
  <div>
    <div class="mt-3" ref="messageWrapper">
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
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "SingleMessage",
  props: {
    messages: Array
  },
  data() {
    return {
      scrollHeight: 0
    };
  },
  computed: {
    ...mapState(["messagesScrollHeight", "isLoading"]),
    ...mapGetters(["currentUser"])
  },
  methods: {
    ...mapActions(["setMessagesScrollHeight"]),
    selfMessage(user) {
      return user.id === this.currentUser.uid;
    }
  },
  filters: {
    fromNow(value) {
      return moment(value).fromNow();
    }
  },
  watch: {
    scrollHeight: function(newVal) {
      this.scrollHeight = newVal;
    }
  },
  computed: {
    messageHeight() {
      return this.$refs.messageWrapper.scrollHeight;
    }
  },
  mounted() {
    console.log(this.isLoading);

    // setTimeout(() => {
    // this.scrollHeight = this.$refs.messageWrapper.scrollHeight;
    this.$emit("scrollHeight", this.$refs.messageWrapper.scrollHeight);
    // FIXME: mounted 때는 0px이고 코드 수정해서 update 돼야만 12xx 나옴
    console.log("SingleMessage: ", this.messagesScrollHeight);

    // this.$emit("scrollToEnd");
    // }, 2000);
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
