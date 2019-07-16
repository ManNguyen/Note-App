<template>
  <md-card>
    <div class="notecard" v-on:click="click()">
      <md-card-content>
        <div class="header">
          <h4 class="title">
            <md-icon>note</md-icon>
            {{noteInfo.title}}
          </h4>
          <p class="category date">{{timeFilter()}}</p>
        </div>
        <div></div>
      </md-card-content>
      <md-card-actions></md-card-actions>
    </div>
  </md-card>
</template>

<script>
import moment from 'moment';
export default {
  name: "note-card",
  props: { noteInfo: Object },
  methods: {
    click() {
      this.$router.push("/note/" + this.noteInfo.id);
    },
    timeFilter(){
      return moment(this.noteInfo.date).format('MMMM Do YYYY, h:mm');
    }
  }
};
</script>

<style>
.notecard {
  cursor: pointer;

  overflow: auto;
}
.notecard:hover {
  background-color: #e0e0ef;
  transition: background-color 200ms linear;
}

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
</style>
