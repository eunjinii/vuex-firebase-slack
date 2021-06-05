<template>
  <div>
    <button type="button" class="btn btn-outline-primary" @click="openModal">
      Add Channel
    </button>

    <div class="mt-4">
      <button
        v-for="(channel, index) in channels"
        :key="index"
        class="list-group-item list-group-item-action"
        :class="{ active: setActiveChannel(channel) }"
        @click="changeChannel(channel)"
      >
        {{ channel.name }}
      </button>
    </div>

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
            >
              <!-- <span aria-hidden="true">&times;</span> -->
            </button>
          </div>

          <div class="modal-body">
            <form>
              <div class="form-group">
                <input
                  v-model="new_channel"
                  type="text"
                  id="new_channel"
                  name="new_channel"
                  placeholder="Channel name"
                  class="form-control"
                />
                <ul class="list-group" v-if="hasErrors">
                  <li
                    class="list-group-item text-danger"
                    v-for="(error, index) in errors"
                    :key="index"
                  >
                    {{ error }}
                  </li>
                </ul>
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
              @click="addChannel"
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
import database from "firebase/database";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Channels",
  data() {
    return {
      new_channel: "",
      errors: [],
      channelsRef: firebase.database().ref("channels"),
      channels: [],
      channel: null
    };
  },
  computed: {
    ...mapGetters(["currentChannel"]),
    hasErrors() {
      return this.errors.length > 0;
    }
  },
  methods: {
    ...mapActions(["setCurrentChannel"]),
    openModal() {
      const channelModal = new bootstrap.Modal(
        document.getElementById("channelModal")
      );
      channelModal.show();
    },
    closeModal() {
      // FIXME: 닫기 로직 완성
    },
    addChannel() {
      this.errors = [];
      // get key to the newly creating channel
      let key = this.channelsRef.push().key;

      // minimun info needed to create a new channel
      let newChannel = { id: key, name: this.new_channel };

      this.channelsRef
        .child(key)
        .update(newChannel)
        .then(() => {
          this.new_channel = "";
          this.closeModal();
        })
        .catch(e => {
          this.errors.push(e.message);
        });
    },
    setActiveChannel(channel) {
      return channel.id === this.currentChannel.id;
    },
    changeChannel(channel) {
      this.setCurrentChannel(channel);
    },
    addListeners() {
      this.channelsRef.on("child_added", snapshot => {
        // firebase listens for changes
        this.channels.push(snapshot.val());

        //set current channel
        if (this.channels.length > 0) {
          this.channel = this.channels[0];
          this.setCurrentChannel(this.channel);
        }
      });
    },
    detachListeners() {
      this.channelsRef.off();
    }
  },
  mounted() {
    this.addListeners();
  },
  beforeDestroy() {
    this.detachListeners();
  }
};
</script>

<style lang="scss" scoped>
.list-group {
  margin: 12px 0;
}
</style>

<style>
.modal-backdrop {
  z-index: -1;
}
</style>
