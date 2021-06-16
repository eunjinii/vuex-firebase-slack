<template>
  <div ref="messageWrapper">
    <SingleMessage
      :messages="messages"
      @scrollToEnd="scrollToEnd"
      @setScrollHeightTest="setScrollHeightTest"
    />
    <MessageForm @scrollToEnd="scrollToEnd" />
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import SingleMessage from "./SingleMessage";
import MessageForm from "./MessageForm";
import database from "firebase/database";

export default {
  name: "Messages",
  components: {
    SingleMessage,
    MessageForm
  },
  data() {
    return {
      messagesRef: firebase.database().ref("messages"),
      messages: [],
      channel: "",
      scrollHeight: 0
    };
  },
  computed: {
    ...mapState(["messagesScrollHeight"]),
    ...mapGetters(["currentChannel"])
  },
  watch: {
    currentChannel: function() {
      // 현재 채널이 변경되면 그 채널의 메시지만을 가져옴.
      this.messages = [];
      this.addListeners();
      this.channel = this.currentChannel;
    }
  },
  methods: {
    ...mapActions(["setMessagesScrollHeight", "showLoading", "hideLoading"]),
    addListeners() {
      this.messagesRef
        .child(this.currentChannel.id)
        .on("child_added", snapshot => {
          this.messages.push(snapshot.val());
          this.hideLoading();
        });
    },
    detachListeners() {
      if (this.channel !== null) {
        this.messagesRef.child(this.channel.id).off();
      }
    },
    scrollToEnd() {
      window.scrollTo({ top: this.messagesScrollHeight });
    },
    setScrollHeightTest(scrollHeight) {
      this.$store.dispatch("setMessagesScrollHeight", scrollHeight);
    }
  },
  mounted() {
    console.log("messages: ", this.messagesScrollHeight);

    this.scrollHeight = this.$refs.messageWrapper.scrollHeight;
    this.$emit("scrollHeight", this.$refs.messageWrapper.scrollHeight);
    this.scrollToEnd();
  },
  beforeDestroy() {
    this.detachListeners();
  }
};
</script>
