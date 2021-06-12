<template>
  <div>
    <SingleMessage />
    <MessageForm />
  </div>
</template>

<script>
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
      messagesRef: firebase.database().ref("messages")
    };
  }
};
</script>
