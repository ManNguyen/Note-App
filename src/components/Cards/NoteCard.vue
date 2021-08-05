<template>
  <md-card>
    <div class="notecard">
      <md-card-content>
        <div class="header">
          <h4 class="title">
            <md-icon>note</md-icon>
            {{ noteInfo.title }}
          </h4>

          <div>
            <p class="category date">{{ timeFilter() }}</p>
          </div>
        </div>
      </md-card-content>
      <md-card-actions>
        <div id="cardButtonDiv">
          <button type="button" class="md-button md-small" v-on:click="launch">
            <div class="md-ripple">
              <md-icon>launch</md-icon>
            </div>
          </button>
          <button
            type="button"
            class="md-button md-small"
            v-on:click="deleteNote"
          >
            <div class="md-ripple">
              <md-icon>delete</md-icon>
            </div>
          </button>
        </div>
      </md-card-actions>
    </div>
  </md-card>
</template>

<script>
import moment from "moment";
export default {
  name: "note-card",
  props: { noteInfo: Object },
  methods: {
    launch() {
      this.$router.push("/note/" + this.noteInfo.id);
    },
    deleteNote() {
      this.$emit("onDelete", this.noteInfo);
    },
    timeFilter() {
      return moment(this.noteInfo.date).format("MMMM Do YYYY, h:mm");
    },
  },
};
</script>

<style>
.notecard:after {
  background-image: radial-gradient(circle, #fff 10%, transparent 10.01%);
  background-repeat: no-repeat;
  background-position: 50%;
  transform: scale(10, 10);
  opacity: 1;
}

.ripple:active:after {
  transform: scale(0, 0);
  opacity: 0.3;
  transition: 0s;
}

.notecard .header > .title,
.date {
  display: inline-block;
}
.notecard .header > .date {
  float: right;
}
#cardButtonDiv .md-button.md-small > .md-ripple {
  padding: 5px;
}
</style>
