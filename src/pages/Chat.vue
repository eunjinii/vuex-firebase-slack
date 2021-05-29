<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-4 sidebar">
          <h2 class="text-light">#SLACK#</h2>
          <hr style="border: 1px solid #ccc;">
          <button @click="logout" class="btn btn-outline-light">Logout</button>
        </div>

        <div class="col-me-8 content">
          content
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Chat",
  methods:{
    logout() {
      firebase.auth().signOut()
      this.$store.dispatch('setUser', null)
      this.$router.push('/login')
    }
  }
};
</script>

<style scoped>
.sidebar{
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
  width: 66%
  
}
</style>