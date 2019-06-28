<template >
  <div id="editorjs"></div>
</template>

<script>
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
// import List from "@editorjs/list";
new EditorJS({
  holderId: "editorjs",
  autofocus: true,
  tools: {
    header: Header
    // list: List
  }
});

export default {
  name: "Editor",
  props: {
    msg: String
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    console.log("this");
    new EditorJS({
      holderId: "editorjs",
      autofocus: true,
      tools: {
        header: Header
        // list: List
      }
    });
  },
  methods: {
    hello() {
      console.log("hello world");
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
