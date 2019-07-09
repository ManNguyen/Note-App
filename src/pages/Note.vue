<template>
    <div class="content">
    <div class="md-layout">
      <div class="md-layout-item">
        <md-card>
          <md-card-content>
                 <Editor :docID="this.$route.params.note_id"></Editor>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import Editor from "../components/Editor/Editor.vue";

export default {
  components:{
    Editor
  },
  created() {
    console.log("created");
    console.log(this.$route.params.note_id);
  },
  methods:{
      test:function(){
       
      }
  }
}
</script>

<style>

</style>
