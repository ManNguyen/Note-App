<template>
  <div>
    <div id="editorjs"></div>
    <button
      type="button"
      @click="save()"
      class="md-button md-dense md-round md-success md-theme-default"
      style="float:right;"
    >
      <div class="md-ripple">
        <div class="md-button-content">
          <md-icon>save</md-icon>
        </div>
      </div>
    </button>

    <button
      v-if="isDevMode"
      type="button"
      @click="getNoteJson()"
      class="md-button md-dense md-round md-warning md-theme-default"
      style="float:right;"
    >
      <div class="md-ripple">
        <div class="md-button-content">
          <md-icon>open_in_browser</md-icon>Open As JSON
        </div>
      </div>
    </button>
    <modal style="z-index: 100;" v-show="showModal" v-on:close="closeModal">
      <template v-slot:header>
        <h3>{{ note.title }}</h3>
        <button
          type="button"
          class="btn-close"
          @click="closeModal"
          aria-label="Close modal"
        >
          x
        </button>
      </template>
      <template v-slot:body>
        <pre v-highlightjs="jsonData"><code class="javascript"></code></pre>
      </template>
      <template v-slot:footer>
        <div></div>
      </template>
    </modal>
  </div>
</template>

<script>
import Constants from "../../constants";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import SimpleImage from "@editorjs/simple-image";
import { idbMixin } from "../IndexDB/IndexDBmixin";
import Modal from "../Modals/Modal";

export default {
  name: "Editor",
  components: {
    Modal,
  },
  mixins: [idbMixin],
  props: {
    docID: String,
  },
  data: function() {
    return {
      editor: Object,
      note: Object,
      isDevMode: false,
      showModal: false,
      jsonData: "...",
    };
  },
  //called when page accessed
  created() {
    this.db()
      .getNote(this.docID)
      .then((note) => {
        console.log(note);
        this.note = note;
        this.editor = new EditorJS({
          holderId: "editorjs",
          autofocus: true,
          tools: {
            header: Header,
            image:SimpleImage
          },
          data: note.bodyBlock,
        });
      });

    this.db()
      .getSetting(Constants.SETTINGS.DEVMODE)
      .then((st) => {
        this.isDevMode = st.setting;
      });
  },
  destroyed() {
    this.save();
  },
  methods: {
    closeModal() {
      this.showModal = false;
    },

    save() {
      let id = this.docID;
      var saveObj = this.editor.save().then((savedData) => {
        //This to get the object out of obsever
        var parsedobj = JSON.parse(JSON.stringify(this.note));
        parsedobj.bodyBlock = savedData;

        var newTitle = parsedobj.title;

        var titleBlocks = savedData.blocks
          .filter((block) => block.type == "header")
          .sort((a, b) => a.data.level - b.data.level);
        //Title should be updated to the first header block,
        console.log(titleBlocks);
        if (titleBlocks.length > 0) {
          newTitle = titleBlocks[0].data.text;
        } else {
          newTitle = "📝 #" + id;
        }

        parsedobj.title = newTitle;
        parsedobj.date = Date.now();
        console.log(parsedobj);

        this.db().updateNote(parsedobj);
      });
    },
    getNoteJson() {
      var saveObj = this.editor.save().then((savedData) => {
        this.showModal = true;
        this.jsonData = JSON.stringify(savedData);
      });
    },
  },
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
