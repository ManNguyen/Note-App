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
import { idbMixin } from "../IndexDB/IndexDBmixin";

export default {
  name: "Editor",
  mixins: [idbMixin],
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
    this.db()
      .getNote(this.docID)
      .then(note => {
        console.log(note);
        this.note = note;
        this.editor = new EditorJS({
          holderId: "editorjs",
          autofocus: true,
          tools: {
            header: Header
            // list: List
          },
          data: note.bodyBlock
        });
      });
  },
  destroyed() {
    this.save();
  },
  methods: {
    save() {
      let id = this.docID;
      var saveObj = this.editor.save().then(savedData => {

        //This to get the object out of obsever
        var parsedobj = JSON.parse(JSON.stringify(this.note));
        parsedobj.bodyBlock = savedData;

        var newTitle = parsedobj.title; 

        var titleBlocks =  savedData.blocks.filter(block => block.type == "header").sort((a,b)=> a.data.level-b.data.level );
        //Title should be updated to the first header block,
        console.log(titleBlocks);
        if(titleBlocks.length > 0){
          newTitle = titleBlocks[0].data.text;
        }
       
        parsedobj.title = newTitle;
        parsedobj.date = Date.now();
        console.log(parsedobj);
        
        this.db().updateNote(parsedobj);
      });
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
  width: 100%;
}
.ce-block__content {
  position: relative;
  max-width: unset;
  margin: 0 50px 0 30px;
}
</style>
