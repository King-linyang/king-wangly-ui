<script setup lang="ts">
import { onMounted } from 'vue'
import { Repl } from '@vue/repl'
import '@vue/repl/style.css'
//------------------------------------------------------------
import { EditorState } from "@codemirror/state"
import { EditorView, keymap } from "@codemirror/view"
import { defaultKeymap } from "@codemirror/commands"
let myView = new EditorView({
    doc: "hello",
    extensions: [keymap.of(defaultKeymap)],
    parent: document.body
})
//------------------------------------------------------------
</script>
<template>

    <div id="editor"></div>
    <!-- <Repl /> -->
</template>
<style scoped lang="less">
// .editor {
//     height: 100px;
//     width: 1000px;
//     background-color: skyblue;
// }
</style>