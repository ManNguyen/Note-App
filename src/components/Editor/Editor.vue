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
import {idbMixin} from '../IndexDB/IndexDBmixin';

export default {
  name: "Editor",
  mixins:[idbMixin],
  props: {
    docID: String
  },
  data: function() {   
    return {
      editor: Object,
      note: Object
    };
  },
  created() {
    this.db().getNote(this.docID).then((note)=> {
        console.log(note);
        this.note = note;
        this.editor = new EditorJS({
        holderId: "editorjs",
        autofocus: true,
        tools: {
          header: Header
          // list: List
        },
        data: note.bodyBlock});
 
      });                                
  },
  methods: {
    save() {
      let id = this.docID;

      var saveObj = this.editor.save().then(savedData => {

      var parsedobj = JSON.parse(JSON.stringify(this.note));
      // delete parsedobj.id; 
     
      parsedobj.bodyBlock = savedData;
          console.log(parsedobj);
        //  this.db().update(id,savedData);

         this.db().updateNote(parsedobj);
      });
    },
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
  width: 100%;
}
.ce-block__content {
  position: relative;
  max-width: unset;
  margin: 0 50px 0 30px;
}
</style>
