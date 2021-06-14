<template>
  <div>
    <SingleMessage :messages="messages" @callback="scrollCallback" />
    <MessageForm @callback="scrollCallback" />
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import SingleMessage from "./SingleMessage";
import MessageForm from "./MessageForm";
import database from "firebase/database";

export default {
  name: "Messages",
  components: {
    SingleMessage,
    MessageForm
  },
  props: {
    // scrollCallback: Function
  },
  data() {
    return {
      messagesRef: firebase.database().ref("messages"),
      messages: [],
      channel: ""
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
    addListeners() {
      this.messagesRef
        .child(this.currentChannel.id)
        .on("child_added", snapshot => {
          this.messages.push(snapshot.val());
        });
    },
    detatchListeners() {
      if (this.channel !== null) {
        this.messagesRef.child(this.channel.id).off();
      }
    },
    scrollCallback() {
      this.$emit("scrollCallback");
    }
  },
  mounted() {
    // this.$refs.messagesContainer.scrollTo({
    //   top: this.messagesScrollHeight,
    //   behavior: "smooth"
    // });
  },
  beforeDestroy() {
    this.detatchListeners();
  }
};
</script>
