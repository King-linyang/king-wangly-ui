<template>
    <div>
        <el-button @click="add()">内部Add: {{ num }} </el-button>
    </div>
</template>
  
<script setup lang="ts">
import { inject, onMounted, ref } from 'vue'
import { ElButton } from 'element-plus'

//父类传入的数据
const dataPar = inject('getNode', Function, true)!

let num = ref(0)

onMounted(() => {
    dataPar().on("change:data", ({ current }: { current: any }) => {
        num.value = current.num;
    })
})

const add = () => {
    num.value = num.value + 1
}

</script>

<style lang="less">
.hello {
    height: auto;
    width: auto;
    border: 1px solid red;
}
</style>