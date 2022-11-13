<template>
    <div id="container"></div>
</template>

<script setup lang="ts">
import { Graph } from '@antv/x6';
import { onMounted } from 'vue';

//X6 支持 JSON 格式数据，该对象中需要有节点 nodes 和边 edges 字段，分别用数组表示：
const data = {
    // 节点
    nodes: [
        {
            id: 'node1', // String，可选，节点的唯一标识
            // shape: 'rect', // 使用 rect 渲染--默认图形
            x: 40,       // Number，必选，节点位置的 x 值
            y: 40,       // Number，必选，节点位置的 y 值
            width: 80,   // Number，可选，节点大小的 width 值
            height: 40,  // Number，可选，节点大小的 height 值
            // label: 'hello', // String，节点标签
            attrs: {
                body: {
                    fill: '#2ECC71',
                    stroke: '#000',
                    strokeDasharray: '10,2',
                },
                label: {
                    text: 'Hello',
                    fill: '#333',
                    fontSize: 13,
                }
            }
        },
        {
            id: 'node2', // String，节点的唯一标识
            // shape: 'ellipse', // 使用 ellipse 渲染
            x: 160,      // Number，必选，节点位置的 x 值
            y: 180,      // Number，必选，节点位置的 y 值
            width: 80,   // Number，可选，节点大小的 width 值
            height: 40,  // Number，可选，节点大小的 height 值
            label: 'world', // String，节点标签
            attrs: {
                body: {
                    fill: '#F39C12',
                    stroke: '#000',
                    rx: 16,
                    ry: 16,
                },
                label: {
                    text: 'World',
                    fill: '#333',
                    fontSize: 18,
                    fontWeight: 'bold',
                    fontVariant: 'small-caps',
                },
            },
        },
    ],
    // 边
    edges: [
        {
            source: 'node1', // String，必须，起始节点 id
            target: 'node2', // String，必须，目标节点 id
            // shape: 'double-edge',//连线
            attrs: {//连线定制连线
                line: {
                    stroke: 'orange',
                },
            },
        },
    ],
};

onMounted(() => {
    //首先，我们需要创建一个 Graph 对象，并为其指定一个页面上的绘图容器，通常也会指定画布的大小。
    const graph = new Graph({
        container: document.getElementById('container')!,
        width: 800,
        height: 600,
        background: {
            color: '#fffbe6', // 设置画布背景颜色
        },
        grid: {
            size: 10,      // 网格大小 10px
            visible: true, // 渲染网格背景
        },
    });
    //渲染
    graph.fromJSON(data)
    //创建画布后，可以调用 graph.zoom(factor: number) 和 graph.translate(tx: number, ty: number) 来缩放和平移画布。
    // graph.zoom(-0.5)
    // graph.translate(80, 40)
})


</script>

<style scoped>

</style>
