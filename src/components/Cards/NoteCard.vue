<template>
  <a class="notecard" v-on:click="click()">
    <md-card>
      <md-card-content>
        <div class="header">
          <h4 class="title"><md-icon>note</md-icon> {{noteInfo.title}}</h4>
          <p class="category date">{{noteInfo.date}}</p>
        </div>
        <div></div>
      </md-card-content>
      <md-card-actions>

      </md-card-actions>
    </md-card>
  </a>
</template>

<script>
export default {
  name: "note-card",
  props: { noteInfo: Object },
  methods: {
    click() {
      console.log("test");
      console.log(this.noteInfo.id);
    }
  }
};
</script>

<style>
.notecard {
  cursor: pointer;
}
.notecard .header > .title,
.date {
  display: inline-block;
}
.notecard .header > .date {
  float: right;
}
</style>
