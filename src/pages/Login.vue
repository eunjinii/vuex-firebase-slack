<template>
  <div>
    <div class="jumpotron bg-primary text-white text-center">
      <h2 class="lead display-3">#SLACK</h2>
      <p>Realtime communication at its best!</p>
    </div>
    <div class="container-fluid">
      <div class="row mt-5 ">
        <div class="col text-center">
          <button class="btn btn-outline-danger btn-lg">
            Login with Google
          </button>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col text-center">
          <button class="btn btn-outline-info btn-lg">
            Login with Twitter
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login"
};
</script>

<style scoped>
.btn,
.jumbotron {
  border-radius: 0px;
}
</style>
