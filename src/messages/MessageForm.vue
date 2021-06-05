<template>
  <div>
    <div class="messageform">
      <form>
        <div class="input-group mb-3">
          <input
            name="message"
            id="message"
            placeholder="Write something"
            type="text"
            class="form-control mt-3"
            autofocus
          />
          <div class="input-group-append">
            <button class="btn btn-primary mt-3" type="button">
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
export default {
  name: "MessageForm"
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
}
</style>
