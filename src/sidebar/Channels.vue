<template>
  <div>
    <button
      type="button"
      data-bs-toggle="modal"
      data-bs-target="#channelModal"
      class="btn btn-outline-primary"
      @click="openModal"
    >
      Add Channel
    </button>

    <!-- Modal -->
    <div id="channelModal" class="modal fade">
      <div class="modal-dialog modal-dialog-centerd">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title text-dark">Modal title</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div class="modal-body">
            <form>
              <div class="form-group">
                <input
                  type="text"
                  id="new_channel"
                  name="new_channel"
                  placeholder="Channel name"
                  class="form-control"
                />
              </div>
            </form>
          </div>

          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              type="button"
              class="btn btn-primary"
              data-bs-dismiss="modal"
            >
              Add Channel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "Channels",
  data() {
    return {
      new_channel: "",
      errors: []
    };
  },
  computed: {},
  methods: {}
};
</script>

<style>
.modal-backdrop {
  z-index: -1;
}
</style>
