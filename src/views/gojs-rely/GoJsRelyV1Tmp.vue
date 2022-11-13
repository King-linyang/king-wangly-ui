<template>
    <!-- 图形的容器 div 需要明确指定大小，否则无法显示，本例子中我们还给该 DIV 添加了一个背景颜色，可以很方便的查看其大小。 -->
    <div id="myDiagramDiv">
    </div>
</template>

<script setup lang="ts">

import go, { Diagram, Model } from 'gojs';
import { onMounted } from 'vue';

var $ = go.GraphObject.make;
var diagram: go.Diagram = new Diagram
var myModel: go.Model = new Model


onMounted(() => {
    var $ = go.GraphObject.make;

    diagram =
        $(go.Diagram, "myDiagramDiv",
            {
                "undoManager.isEnabled": true // enable Ctrl-Z to undo and Ctrl-Y to redo
            });
    //节点描述信息
    // the node template describes how each Node should be constructed
    diagram.nodeTemplate =
        $(go.Node, "Auto",  // the Shape will go around the TextBlock
            { locationSpot: go.Spot.Center },
            new go.Binding("location", "loc", go.Point.parse),// convert string into a Point value ---节点初始位置-这样写可以直接使用字符串表示位置
            { selectionAdorned: false },  // no blue selection handle!

            $(go.Shape, "RoundedRectangle",// Shape.fill is bound to Node.data.color
                new go.Binding("fill", "color"),//节点填充颜色
                new go.Binding("stroke", "stroke", (v) => { return v ? "pink" : "red" }),//节点线框颜色--可以通过一个布尔值和函数控制
                new go.Binding("strokeWidth", "strokeWidth"),//节点边框宽度
                // bind Shape.fill to Node.isSelected converted to a color
                new go.Binding("fill", "isSelected", (sel) => {//选中加颜色
                    return sel ? "dodgerblue" : "lightgray";
                }).ofObject()  // no name means bind to the whole Part
            ),
            $(go.TextBlock, { margin: 8 }, // Specify a margin to add some room around the text--给文字旁边添加一点空间
                new go.Binding("text", "key"),//文字绑定属性和值
                new go.Binding("stroke", "fontColor"),//文职颜色
                new go.Binding("background", "background"),//文职背景颜色
                new go.Binding("font", "fontStyle"),//字体样式
            ));// TextBlock.text is bound to Node.data.key


    //连接
    diagram.linkTemplate =
        $(go.Link,
            {
                // routing: go.Link.Orthogonal,  // may be either Orthogonal or AvoidsNodes
                // curve: go.Link.JumpOver,//节点连线交互会凸起跳过
                toShortLength: 8 // shortens path to avoid interfering with arrowhead
            },
            $(go.Shape,
                { fromArrow: "Chevron", fill: "red" },// the "from" end arrowhead--连线起始点样式
                new go.Binding("stroke", "color"),  // shape.stroke = data.color
                new go.Binding("strokeWidth", "thick")),  // shape.strokeWidth = data.thick
            $(go.Shape,
                { toArrow: "StretchedDiamond", fill: "red" },//连线末端样式-- the "to" end arrowhead
                new go.Binding("stroke", "color"),  // shape.stroke = data.color--连接线颜色
                new go.Binding("strokeWidth", "thick"))  // shape.strokeWidth = data.thick-连接线宽度
        );


    //节点数据
    var nodeDataArray = [ // a JavaScript Array of JavaScript objects, one per node;
        // the "color" property is added specifically for this app
        //key is name
        { key: "Alpha", color: "red", loc: "0 0", stroke: false, strokeWidth: 5, fontColor: "red", background: "lightblue", fontStyle: "bold 14pt serif" },
        { key: "Beta", color: "orange", loc: "100 0", stroke: true },
        { key: "Gamma", color: "lightgreen", loc: "0 100", background: "lightblue" },
        { key: "Delta", color: "red", loc: "100 100", strokeWidth: 5 }
    ]
    //描述连接信息
    // a JavaScript Array of JavaScript objects, one per link
    //thick  连接线宽
    var linkDataArray = [
        { from: "Alpha", to: "Beta", color: "blue", thick: 4 },
        { from: "Alpha", to: "Gamma", color: "blue", thick: 2 },
        { from: "Gamma", to: "Delta", color: "blue", thick: 2 },
        { from: "Delta", to: "Alpha", color: "pink", thick: 2 }
    ]
    // the Model holds only the essential information describing the diagram
    diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);

    // enable Ctrl-Z to undo and Ctrl-Y to redo
    diagram.undoManager.isEnabled = true;


    //控制闪烁
    const flash = () => {
        // all model changes should happen in a transaction
        diagram.model.commit((m) => {
            var dataM = m.nodeDataArray
            //节点红色闪烁
            dataM.forEach((item) => {
                if (item.color === 'red') {
                    m.set(item, "stroke", !item.stroke);
                }
            })
            // var data = m.nodeDataArray[0];  // get the first node data
            // m.set(data, "stroke", !data.stroke);
        }, "flash");
    }
    const loop = () => {
        setTimeout(() => { flash(); loop(); }, 500);
    }
    loop();
    //控制闪烁
})



</script>

<style scoped>
#myDiagramDiv {
    width: 100%;
    height: 500px;
    background-color: #DAE4E4;
}
</style>
