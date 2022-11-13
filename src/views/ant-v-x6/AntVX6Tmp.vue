<template>
    <div id="antv"></div>
    <button @click="add">外部 Add</button>
</template>

<script setup lang="ts">
import { Graph } from '@antv/x6'
import '@antv/x6-vue-shape'
import Count from './Count.vue'
import { onMounted } from 'vue'

let graph: Graph | null = null
onMounted(() => {
    graph = new Graph({
        container: document.getElementById("antv")!,
        width: 600,
        height: 400,
        grid: true,
    })


    // 方式1：注册 vue component
    Graph.registerVueComponent(
        "count",
        {
            template: `<Count />`,
            components: {
                Count,
            },
        },
        true
    )

    // 方式2：注册 vue component
    Graph.registerNode("my-count", {
        inherit: "vue-shape",
        x: 200,
        y: 150,
        width: 150,
        height: 100,
        component: {
            template: `<Count />`,
            components: {
                Count,
            },
        },
    })

    graph.addNode({
        id: "1",
        shape: "vue-shape",
        x: 200,
        y: 150,
        width: 150,
        height: 100,
        component: "count",
        data: {
            num: 0,
        },
    })
    graph.addNode({
        id: "2",
        shape: "my-count",
        x: 400,
        y: 150,
        width: 150,
        height: 100,
        data: {
            num: 0,
        },
    })
})

const add = () => {
    const nodes = graph?.getNodes()
    if (nodes!.length) {
        nodes!.forEach((node) => {
            // console.log('获取每个节点的 data中的数据 node', node)
            const { num } = node.getData();
            node.setData({
                num: num + 1,
            });
        });
    }
}


</script>

<style scoped>
#antv {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;

    margin-top: 60px;
}
</style>
