<template>
  <div>
    <SingleMessage />
    <MessageForm />
  </div>
</template>

<script>
import SingleMessage from "./SingleMessage";
import MessageForm from "./MessageForm";

export default {
  name: "Messages",
  components: {
    SingleMessage,
    MessageForm
  }
};
</script>
