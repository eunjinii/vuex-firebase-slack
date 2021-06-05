<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-4 sidebar">
          <Sidebar />
        </div>

        <div class="col-me-8 content">
          <Messages />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "../sidebar/Sidebar";
import Messages from "../messages/Messages";

export default {
  name: "Chat",
  components: {
    Sidebar,
    Messages
  }
};
</script>

<style scoped>
.sidebar {
  padding-top: 2em;
  display: block;
  float: left;
  position: fixed;
  width: 33.5%;
  height: 100%;
  background: #000;
  overflow: scroll;
}

.content {
  margin-left: 34%;
  display: block;
  float: left;
  width: 66%;
}
</style>
