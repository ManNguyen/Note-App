<template>
    <div class="content">
    <div class="md-layout">
      <div class="md-layout-item">
        <md-card>
          <md-card-content>
                 <Editor></Editor>
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
  }
}
</script>

<style>

</style>
