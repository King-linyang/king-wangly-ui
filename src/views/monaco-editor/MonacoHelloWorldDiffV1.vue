<template>
    <div id="container" style="height: 900px"></div>
</template>

<script setup lang="ts">
import * as monaco from 'monaco-editor'
import { onMounted } from 'vue';


onMounted(() => {
    var originalModel = monaco.editor.createModel('heLLo world!', 'text/plain');
    var modifiedModel = monaco.editor.createModel('hello orlando!', 'text/plain');

    var diffEditor = monaco.editor.createDiffEditor(document.getElementById('container')!);
    diffEditor.setModel({
        original: originalModel,
        modified: modifiedModel
    });
})


</script>

<style scoped lang="scss">

</style>
