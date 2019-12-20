<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item note-view">
        <md-card>
          <md-card-content>
            <Editor :docID="noteID" :key="noteID"></Editor>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import Editor from "../components/Editor/Editor.vue";
import { EventBus } from "../event-bus.js";
export default {
  data() {
    return {
      noteID: 3
    };
  },
  components: {
    Editor
  },
  created() {
    console.log("created");
    this.noteID = this.$route.params.note_id;
    EventBus.$on("route-updated", routeArg => {
      this.noteID = this.$route.params.note_id;
    });
  },
  methods: {
    test: function() {}
  }
};
</script>

<style>
.note-view {
  display: contents;
}
</style>
