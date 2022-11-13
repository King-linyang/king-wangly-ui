<template>
    <div id="antv"></div>
</template>

<script setup lang="ts">

import { Cell, Graph, Path } from '@antv/x6';
import '@antv/x6-vue-shape';
import { onMounted } from 'vue';
import NodeTmp from './NodeTmp.vue';

let graph: Graph | null = null

interface NodeStatus {
    id: string
    status: 'default' | 'success' | 'failed' | 'running'
    label?: string
}

onMounted(() => {
    graph = new Graph({
        container: document.getElementById("antv")!,
        width: 600,
        height: 400,
        grid: true,
        panning: {
            enabled: true,
            eventTypes: ['leftMouseDown', 'mouseWheel'],
        },
        mousewheel: {
            enabled: true,
            modifiers: 'ctrl',
            factor: 1.1,
            maxScale: 1.5,
            minScale: 0.5,
        },
        highlighting: {
            magnetAdsorbed: {
                name: 'stroke',
                args: {
                    attrs: {
                        fill: '#fff',
                        stroke: '#31d0c6',
                        strokeWidth: 4,
                    },
                },
            },
        },
        connecting: {
            snap: true,
            allowBlank: false,
            allowLoop: false,
            highlight: true,
            connector: 'algo-connector',
            connectionPoint: 'anchor',
            anchor: 'center',
            validateMagnet({ magnet }) {
                return magnet.getAttribute('port-group') !== 'top'
            },
            createEdge() {
                return graph!.createEdge({
                    shape: 'dag-edge',
                    attrs: {
                        line: {
                            strokeDasharray: '5 5',
                        },
                    },
                    zIndex: -1,
                })
            },
        },
        selecting: {
            enabled: true,
            multiple: true,
            rubberEdge: true,
            rubberNode: true,
            modifiers: 'shift',
            rubberband: true,
        },
    })

    //边的连接取消
    graph.on('edge:connected', ({ edge }) => {
        edge.attr({
            line: {
                strokeDasharray: '',
            },
        })
    })

    //数据改变
    graph.on('node:change:data', ({ node }) => {
        const edges = graph!.getIncomingEdges(node)
        const { status } = node.getData() as NodeStatus
        edges?.forEach((edge) => {
            if (status === 'running') {
                edge.attr('line/strokeDasharray', 5)
                edge.attr('line/style/animation', 'running-line 30s infinite linear')
            } else {
                edge.attr('line/strokeDasharray', '')
                edge.attr('line/style/animation', '')
            }
        })
    })

    // 初始化节点/边
    const init = (data: Cell.Metadata[]) => {
        const cells: Cell[] = []
        data.forEach((item) => {
            // console.log('item', item)
            if (item.shape === 'dag-node') {
                cells.push(graph!.createNode(item))
            } else {
                cells.push(graph!.createEdge(item))
            }
        })
        graph!.resetCells(cells)
    }

    // 显示节点状态
    const showNodeStatus = async (statusList: NodeStatus[][]) => {
        const status = statusList.shift()
        status?.forEach((item) => {
            const { id, status } = item
            const node = graph!.getCellById(id)
            const data = node.getData() as NodeStatus
            node.setData({
                ...data,
                status: status,
            })
        })
        setTimeout(() => {
            showNodeStatus(statusList)
        }, 3000)
    }




    // 方式2：注册 vue component 
    Graph.registerNode("dag-node", {
        inherit: "vue-shape",
        x: 200,
        y: 150,
        width: 180,
        height: 36,
        component: {
            template: `<NodeTmp />`,
            components: {
                NodeTmp,
            },
        },
        ports: {
            groups: {
                top: {
                    position: 'top',
                    attrs: {
                        circle: {
                            r: 4,
                            magnet: true,
                            stroke: '#C2C8D5',
                            strokeWidth: 1,
                            fill: '#fff',
                        },
                    },
                },
                bottom: {
                    position: 'bottom',
                    attrs: {
                        circle: {
                            r: 4,
                            magnet: true,
                            stroke: '#C2C8D5',
                            strokeWidth: 1,
                            fill: '#fff',
                        },
                    },
                },
            },
        },
    })

    Graph.registerEdge(
        'dag-edge',
        {
            inherit: 'edge',
            attrs: {
                line: {
                    stroke: '#C2C8D5',
                    strokeWidth: 1,
                    targetMarker: null,
                },
            },
        },
        true,
    )

    Graph.registerConnector(
        'algo-connector',
        (s, e) => {
            const offset = 4
            const deltaY = Math.abs(e.y - s.y)
            const control = Math.floor((deltaY / 3) * 2)

            const v1 = { x: s.x, y: s.y + offset + control }
            const v2 = { x: e.x, y: e.y - offset - control }

            return Path.normalize(
                `M ${s.x} ${s.y}
       L ${s.x} ${s.y + offset}
       C ${v1.x} ${v1.y} ${v2.x} ${v2.y} ${e.x} ${e.y - offset}
       L ${e.x} ${e.y}
      `,
            )
        },
        true,
    )

    //节点状态列表
    const nodeStatusList: NodeStatus[][] = [
        [
            {
                "id": "1",
                "status": "running"
            },
            {
                "id": "2",
                "status": "default"
            },
            {
                "id": "3",
                "status": "default"
            },
            {
                "id": "4",
                "status": "default"
            }
        ],
        [
            {
                "id": "1",
                "status": "success"
            },
            {
                "id": "2",
                "status": "running"
            },
            {
                "id": "3",
                "status": "default"
            },
            {
                "id": "4",
                "status": "default"
            }
        ],
        [
            {
                "id": "1",
                "status": "success"
            },
            {
                "id": "2",
                "status": "success"
            },
            {
                "id": "3",
                "status": "running"
            },
            {
                "id": "4",
                "status": "running"
            }
        ],
        [
            {
                "id": "1",
                "status": "success"
            },
            {
                "id": "2",
                "status": "success"
            },
            {
                "id": "3",
                "status": "success"
            },
            {
                "id": "4",
                "status": "failed"
            }
        ]
    ]

    //初始化

    init(JSON.parse('[{\"id\":\"1\",\"shape\":\"dag-node\",\"x\":290,\"y\":110,\"data\":{\"label\":\"读数据\",\"status\":\"success\"},\"ports\":[{\"id\":\"1-1\",\"group\":\"bottom\"}]},{\"id\":\"2\",\"shape\":\"dag-node\",\"x\":290,\"y\":225,\"data\":{\"label\":\"逻辑回归\",\"status\":\"success\"},\"ports\":[{\"id\":\"2-1\",\"group\":\"top\"},{\"id\":\"2-2\",\"group\":\"bottom\"},{\"id\":\"2-3\",\"group\":\"bottom\"}]},{\"id\":\"3\",\"shape\":\"dag-node\",\"x\":170,\"y\":350,\"data\":{\"label\":\"模型预测\",\"status\":\"success\"},\"ports\":[{\"id\":\"3-1\",\"group\":\"top\"},{\"id\":\"3-2\",\"group\":\"bottom\"}]},{\"id\":\"4\",\"shape\":\"dag-node\",\"x\":450,\"y\":350,\"data\":{\"label\":\"读取参数\",\"status\":\"success\"},\"ports\":[{\"id\":\"4-1\",\"group\":\"top\"},{\"id\":\"4-2\",\"group\":\"bottom\"}]},{\"id\":\"5\",\"shape\":\"dag-edge\",\"source\":{\"cell\":\"1\",\"port\":\"1-1\"},\"target\":{\"cell\":\"2\",\"port\":\"2-1\"},\"zIndex\":0},{\"id\":\"6\",\"shape\":\"dag-edge\",\"source\":{\"cell\":\"2\",\"port\":\"2-2\"},\"target\":{\"cell\":\"3\",\"port\":\"3-1\"},\"zIndex\":0},{\"id\":\"7\",\"shape\":\"dag-edge\",\"source\":{\"cell\":\"2\",\"port\":\"2-3\"},\"target\":{\"cell\":\"4\",\"port\":\"4-1\"},\"zIndex\":0}]'))
    showNodeStatus(nodeStatusList)
    graph!.centerContent()
    // fetch('[{\"id\":\"1\",\"shape\":\"dag-node\",\"x\":290,\"y\":110,\"data\":{\"label\":\"读数据\",\"status\":\"success\"},\"ports\":[{\"id\":\"1-1\",\"group\":\"bottom\"}]}]')
    //     .then((response) => response.json())
    //     .then((data) => {
    //         console.log('data', data)
    //         init(data)
    //         showNodeStatus(nodeStatusList)
    //         graph!.centerContent()
    //     })

})
</script>

<style scoped>

</style>
