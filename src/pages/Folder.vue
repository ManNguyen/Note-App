<template>
  <div class="content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-33 md-xsmall-size-50 md-size-20"
        :key="thumbnail.id"
        v-for="thumbnail in thumbnailList"
      >
        <note-card :noteInfo="thumbnail"></note-card>
      </div>
    </div>
  </div>
</template>

<script>
import noteCard from "../components/Cards/NoteCard";
import { idbMixin } from "../components/IndexDB/IndexDBmixin";
export default {
  components: { noteCard },
  mixins: [idbMixin],
  created() {
    this.db().getAll().then(
      noteList=>{

       console.log(noteList);
        this.thumbnailList = noteList.map((item)=>{
          return {
            id:item.id,
            title:item.title,
            date:item.date
          }
        }
        );
 
      }
    );
  },
  data: function() {
    return {
      thumbnailList: [
        {
          id: 1,
          title: "testTitle",
          date: "2019-1-1"
        },
        {
          id: 2,
          title: "testTitle",
          date: "2019-1-1"
        },
        {
          id: 3,
          title: "testTitle",
          date: "2019-1-1"
        },
        {
          id: 4,
          title: "testTitle",
          date: "2019-1-1"
        },
        {
          id: 5,
          title: "testTitle",
          date: "2019-1-1"
        }
      ]
    };
  }
};
</script>

<style>
</style>
