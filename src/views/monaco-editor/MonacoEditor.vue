<template>
    <div class="container">
        <monacoEditor v-model="value" :language="language" width="800px" height="500px" @editor-mounted="editorMounted">
        </monacoEditor>
    </div>
</template>

<script lang="ts" setup>
import * as monaco from 'monaco-editor'
import { ref, watch } from 'vue'
import monacoEditor from './MonacoEditorTmp.vue'

const value = ref('let a = 234')

watch(value,(newValue)=>{
    console.log(`value is ${newValue}`)
})

const language = ref('javascript')
const editorMounted = (editor: monaco.editor.IStandaloneCodeEditor) => {
    console.log('editor实例加载完成', editor)
}
</script>
