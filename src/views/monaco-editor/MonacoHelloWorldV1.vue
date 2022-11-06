<template>
    <div id="container" style="height: 900px"></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import * as monaco from 'monaco-editor'


onMounted(() => {
    // The Monaco Editor can be easily created, given an
    // empty container and an options literal.
    // Two members of the literal are "value" and "language".
    // The editor takes the full size of its container.

    var editor = monaco.editor.create(document.getElementById('container')!, {
        value: "// First line\nfunction hello() {\n\talert('Hello world!');\n}\n// Last line",
        language: 'javascript',
        lineNumbers: 'on',
        roundedSelection: false,
        scrollBeyondLastLine: false,
        readOnly: false,
        theme: 'vs-dark'
    });
    // setTimeout(function () {
    //     editor.updateOptions({
    //         lineNumbers: 'on'
    //     });
    // }, 2000);

})

</script>

<style scoped>

</style>
