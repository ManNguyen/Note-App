<template >
  <div>
    <div id="editorjs"></div>
    <button
      type="button"
      @click="save();"
      class="md-button md-dense md-round md-success md-theme-default"
      style="float:right;"
    >
      <div class="md-ripple">
        <div class="md-button-content">
          <md-icon>save</md-icon>
        </div>
      </div>
    </button>
  </div>
</template>

<script>
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
// import List from "@editorjs/list";

export default {
  name: "Editor",
  props: {
    docID: String
  },
  data: function() {
    console.log("data");
    return {
      noteObj: new EditorJS({
        holderId: "editorjs",
        autofocus: true,
        tools: {
          header: Header
          // list: List
        },
        data: JSON.parse(localStorage.getItem(this.docID))
      })
    };
  },
  created() {
    console.log("created");
    console.log(this.docID);
  },
  methods: {
    save() {
      let id = this.docID;
      var saveObj = this.noteObj.save().then(savedData => {
        localStorage.setItem(id, JSON.stringify(savedData, null, 4));
      });
    },
    load() {
      var savedData = JSON.parse(localStorage.getItem(this.docID));

      this.noteObj.render(savedData);
    }
  }
};
</script>

<style>
#editorjs {
  background: #fefefe;
  color: #696969;
  border: 1px black;
}
.codex-editor {
  width: 80%;
}
.ce-block__content {
  position: relative;
  max-width: 650px;
  margin: 0 50px 0 30px;
}
</style>
