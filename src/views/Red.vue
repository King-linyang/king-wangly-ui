<template>

    <el-row>
        <el-col :span="12">
            <div class="text">
                <v-ace-editor v-model:value="dataForm.textareashow" @init="initFail" lang="json"
                    :theme="aceConfig.theme" :options="aceConfig.options" :readonly="aceConfig.readOnly"
                    style="height:100%; width: 100%;" class="ace-editor" />
            </div>
        </el-col>
        <el-col :span="12">
            <!--编辑器盒子-->
            <div class="king-box text1">
                <!--编辑器左边侧边栏-->
                <div class="king-left-side">
                    <!--左边侧边每一行元素-->
                    <div class="king-left-side-cell">1</div>
                    <div class="king-left-side-cell">2</div>
                </div>
                <!--右侧可编辑模块-->
                <div class="king-right-edit" contenteditable="true">asdf</div>
            </div>
        </el-col>
    </el-row>

</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
//=================================================富文本编辑器
import { VAceEditor } from 'vue3-ace-editor';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-chrome';
import 'ace-builds/src-noconflict/ext-language_tools';
//=================================================富文本编辑器

//ace编辑器配置
const aceConfig = reactive({
    lang: 'json', //解析json
    theme: 'chrome', //主题
    readOnly: false, //是否只读
    options: {
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true,
        tabSize: 2,
        showPrintMargin: false,
        fontSize: 13
    }
})

//form--数据
const dataForm = reactive({
    Example: {
        abc: '123',
        def: '345',
        ghi: {
            abc: '123',
            def: '345',
        },
        jkl: [
            {
                abc: '123',
                def: '345',
            }, {
                abc: '123',
                def: '345',
            }
        ]
    },
    textareashow: ''
})
//init
const initFail = () => {
    dataForm.textareashow = JSON.stringify(dataForm.Example, null, 2)
}


</script>

<style scoped lang="less">
.text,
.king-box {
    float: left;
    height: 500px;
    width: 500px;
    background-color: skyblue;
}

.king-left-side {
    float: left;
    width: 10%;
    height: 100%;
    background-color: #ebebeb;
}

.king-left-side-cell {
    // position: absolute;
    top: 152px;
    width: 100%;
    height: 19px;
}

.king-right-edit {
    float: left;
    height: 100%;
    font-size: 14px;
    width: calc(100% - 10%);
    background-color: #fff;
}

.text1 {
    margin-right: 40px;
}
</style>
