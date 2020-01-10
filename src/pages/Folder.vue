<template>
  <div class="content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-33 md-xsmall-size-50 md-size-20"
        :key="thumbnail.id"
        v-for="thumbnail in thumbnailList"
      >
        <note-card :noteInfo="thumbnail" @onDelete="deleteCard"></note-card>
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
    this.getCards();
  },
  methods: {
     deleteCard(card) {
      this.db().deleteNote(card.id).then(()=>this.getCards());
    },
    getCards() {
      this.db()
        .getAllNotes()
        .then(noteList => {
          console.log(noteList);
          this.thumbnailList = noteList
            .map(item => ({
              id: item.id,
              title: item.title,
              date: item.date
            }))
            .sort((a, b) => b.date - a.date);
        });
    }
  },
  data: function() {
    return {
      thumbnailList: []
    };
  }
};
</script>

<style>
</style>
