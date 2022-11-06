<template>
    <div id="myDiagramDiv"
        style="border: 1px solid black; width: 100%; height: 500px; position: relative; -webkit-tap-highlight-color: rgba(255, 255, 255, 0); cursor: auto;">
        <canvas tabindex="0" width="1130" height="622"
            style="position: absolute; top: 0px; left: 0px; z-index: 2; user-select: none; width: 904px; height: 498px; cursor: auto;">This
            text is displayed if your browser does not support the Canvas HTML element.</canvas>
        <div style="position: absolute; overflow: auto; width: 904px; height: 498px; z-index: 1;">
            <div style="position: absolute; width: 1px; height: 1px;"></div>
        </div>
    </div>
    <button id="SaveButton" @click="save()" :disabled="SaveFlag">Save</button>
    <button @click="load()">Load</button>
    <button @click="layout()">Do Layout</button>
    <br>
    <textarea id="mySavedModel" style="width:100%;height:300px">
        {{ mySavedModelValue }}
    </textarea>
</template>

<script setup lang="ts">
import go, { Diagram } from 'gojs'
import { onMounted, ref } from 'vue';
var $ = go.GraphObject.make;  // for conciseness in defining templates

var mySavedModelValue = ref("{\"class\":\"go.GraphLinksModel\",\"nodeDataArray\":[{\"key\":1,\"text\":\"Loading Screen\",\"category\":\"Loading\"},{\"key\":2,\"text\":\"Beginning\"},{\"key\":3,\"text\":\"Segment 1\"},{\"key\":4,\"text\":\"Segment 2\"},{\"key\":5,\"text\":\"Segment 3\"},{\"key\":6,\"text\":\"End Screen\",\"category\":\"End\"},{\"key\":-2,\"category\":\"Recycle\"}],\"linkDataArray\":[{\"from\":1,\"to\":2},{\"from\":2,\"to\":3},{\"from\":2,\"to\":5},{\"from\":3,\"to\":4},{\"from\":4,\"to\":6}]}")


var SaveFlag = ref(false)
var myDiagram: go.Diagram = new Diagram()
onMounted(() => {
    //画板
    myDiagram =
        $(go.Diagram, "myDiagramDiv",
            {
                allowCopy: false,
                layout:
                    $(go.LayeredDigraphLayout,
                        {
                            setsPortSpots: false,  // Links already know their fromSpot and toSpot
                            columnSpacing: 5,
                            isInitial: false,
                            isOngoing: false
                        }),
                validCycle: go.Diagram.CycleNotDirected,
                "undoManager.isEnabled": true
            });
    // when the document is modified, add a "*" to the title and enable the "Save" button
    myDiagram.addDiagramListener("Modified", function (e) {
        var button = document.getElementById("SaveButton") as unknown as NodeListOf<HTMLSelectElement>
        if (button) {
            SaveFlag.value = !myDiagram.isModified       //画板更新
        }
        var idx = document.title.indexOf("*");
        if (myDiagram.isModified) {
            if (idx < 0) document.title += "*";
        } else {
            if (idx >= 0) document.title = document.title.substr(0, idx);
        }
    });
    var graygrad = $(go.Brush, "Linear",
        { 0: "white", 0.1: "whitesmoke", 0.9: "whitesmoke", 1: "lightgray" });
    myDiagram.nodeTemplate =  // the default node template
        $(go.Node, "Spot",
            { selectionAdorned: false, textEditable: true, locationObjectName: "BODY" },
            new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
            // the main body consists of a Rectangle surrounding the text
            $(go.Panel, "Auto",
                { name: "BODY" },
                $(go.Shape, "Rectangle",
                    { fill: graygrad, stroke: "gray", minSize: new go.Size(120, 21) },
                    new go.Binding("fill", "isSelected", function (s) { return s ? "dodgerblue" : graygrad; }).ofObject()),
                $(go.TextBlock,
                    {
                        stroke: "black", font: "12px sans-serif", editable: true,
                        margin: new go.Margin(3, 3 + 11, 3, 3 + 4), alignment: go.Spot.Left
                    },
                    new go.Binding("text").makeTwoWay())
            ),
            // output port
            $(go.Panel, "Auto",
                { alignment: go.Spot.Right, portId: "from", fromLinkable: true, cursor: "pointer", click: addNodeAndLink },
                $(go.Shape, "Circle",
                    { width: 22, height: 22, fill: "white", stroke: "dodgerblue", strokeWidth: 3 }),
                $(go.Shape, "PlusLine",
                    { width: 11, height: 11, fill: null, stroke: "dodgerblue", strokeWidth: 3 })
            ),
            // input port
            $(go.Panel, "Auto",
                { alignment: go.Spot.Left, portId: "to", toLinkable: true },
                $(go.Shape, "Circle",
                    { width: 8, height: 8, fill: "white", stroke: "gray" }),
                $(go.Shape, "Circle",
                    { width: 4, height: 4, fill: "dodgerblue", stroke: null })
            )
        );

    myDiagram.nodeTemplate.contextMenu =
        $("ContextMenu",
            $("ContextMenuButton",
                $(go.TextBlock, "Rename"),
                { click: function (e, obj) { e.diagram.commandHandler.editTextBlock(); } },
                new go.Binding("visible", "", function (o) { return o.diagram && o.diagram.commandHandler.canEditTextBlock(); }).ofObject()),
            // add one for Editing...
            $("ContextMenuButton",
                $(go.TextBlock, "Delete"),
                { click: function (e, obj) { e.diagram.commandHandler.deleteSelection(); } },
                new go.Binding("visible", "", function (o) { return o.diagram && o.diagram.commandHandler.canDeleteSelection(); }).ofObject())
        );
    myDiagram.nodeTemplateMap.add("Loading",
        $(go.Node, "Spot",
            { selectionAdorned: false, textEditable: true, locationObjectName: "BODY" },
            new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
            // the main body consists of a Rectangle surrounding the text
            $(go.Panel, "Auto",
                { name: "BODY" },
                $(go.Shape, "Rectangle",
                    { fill: graygrad, stroke: "gray", minSize: new go.Size(120, 21) },
                    new go.Binding("fill", "isSelected", function (s) { return s ? "dodgerblue" : graygrad; }).ofObject()),
                $(go.TextBlock,
                    {
                        stroke: "black", font: "12px sans-serif", editable: true,
                        margin: new go.Margin(3, 3 + 11, 3, 3 + 4), alignment: go.Spot.Left
                    },
                    new go.Binding("text", "text"))
            ),
            // output port
            $(go.Panel, "Auto",
                { alignment: go.Spot.Right, portId: "from", fromLinkable: true, click: addNodeAndLink },
                $(go.Shape, "Circle",
                    { width: 22, height: 22, fill: "white", stroke: "dodgerblue", strokeWidth: 3 }),
                $(go.Shape, "PlusLine",
                    { width: 11, height: 11, fill: null, stroke: "dodgerblue", strokeWidth: 3 })
            )
        ));
    myDiagram.nodeTemplateMap.add("End",
        $(go.Node, "Spot",
            { selectionAdorned: false, textEditable: true, locationObjectName: "BODY" },
            new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
            // the main body consists of a Rectangle surrounding the text
            $(go.Panel, "Auto",
                { name: "BODY" },
                $(go.Shape, "Rectangle",
                    { fill: graygrad, stroke: "gray", minSize: new go.Size(120, 21) },
                    new go.Binding("fill", "isSelected", function (s) { return s ? "dodgerblue" : graygrad; }).ofObject()),
                $(go.TextBlock,
                    {
                        stroke: "black", font: "12px sans-serif", editable: true,
                        margin: new go.Margin(3, 3 + 11, 3, 3 + 4), alignment: go.Spot.Left
                    },
                    new go.Binding("text", "text"))
            ),
            // input port
            $(go.Panel, "Auto",
                { alignment: go.Spot.Left, portId: "to", toLinkable: true },
                $(go.Shape, "Circle",
                    { width: 8, height: 8, fill: "white", stroke: "gray" }),
                $(go.Shape, "Circle",
                    { width: 4, height: 4, fill: "dodgerblue", stroke: null })
            )
        ));


    // dropping a node on this special node will cause the selection to be deleted;
    // linking or relinking to this special node will cause the link to be deleted
    myDiagram.nodeTemplateMap.add("Recycle",
        $(go.Node, "Auto",
            {
                portId: "to", toLinkable: true, deletable: false,
                layerName: "Background", locationSpot: go.Spot.Center
            },
            new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
            { dragComputation: function (node: any, pt: go.Point, gridpt: any) { return pt; } },
            { mouseDrop: function (e, obj) { myDiagram.commandHandler.deleteSelection(); } },
            $(go.Shape,
                { fill: "lightgray", stroke: "gray" }),
            $(go.TextBlock, "Drop Here\nTo Delete",
                { margin: 5, textAlign: "center" })
        ));




    // this is a click event handler that adds a node and a link to the diagram,
    // connecting with the node on which the click occurred
    function addNodeAndLink(e: any, obj: { part: any; }) {
        var fromNode = obj.part;
        var diagram = fromNode.diagram;
        diagram.startTransaction("Add State");
        // get the node data for which the user clicked the button
        var fromData = fromNode.data;
        // create a new "State" data object, positioned off to the right of the fromNode
        var p = fromNode.location.copy();
        p.x += diagram.toolManager.draggingTool.gridSnapCellSize.width;
        var toData = {
            text: "new",
            loc: go.Point.stringify(p)
        };
        // add the new node data to the model
        var model = diagram.model;
        model.addNodeData(toData);
        // create a link data from the old node data to the new node data
        var linkdata = {
            from: model.getKeyForNodeData(fromData),
            to: model.getKeyForNodeData(toData)
        };
        // and add the link data to the model
        model.addLinkData(linkdata);
        // select the new Node
        var newnode = diagram.findNodeForData(toData);
        diagram.select(newnode);
        // snap the new node to a valid location
        newnode.location = diagram.toolManager.draggingTool.computeMove(newnode, p);
        // then account for any overlap
        shiftNodesToEmptySpaces();
        diagram.commitTransaction("Add State");
    }

    // Highlight ports when they are targets for linking or relinking.
    var OldTarget: any = null;  // remember the last highlit port
    function highlight(port: { scale: number; }) {
        if (OldTarget !== port) {
            lowlight();  // remove highlight from any old port
            OldTarget = port;
            port.scale = 1.3;  // highlight by enlarging
        }
    }
    function lowlight() {  // remove any highlight
        if (OldTarget) {
            OldTarget.scale = 1.0;
            OldTarget = null;
        }
    }

    // Connecting a link with the Recycle node removes the link
    myDiagram.addDiagramListener("LinkDrawn", function (e) {
        var link = e.subject;
        if (link.toNode.category === "Recycle") myDiagram.remove(link);
        lowlight();
    });

    myDiagram.addDiagramListener("LinkRelinked", function (e) {
        var link = e.subject;
        if (link.toNode.category === "Recycle") myDiagram.remove(link);
        lowlight();
    });

    myDiagram.linkTemplate =
        $(go.Link,
            { selectionAdorned: false, fromPortId: "from", toPortId: "to", relinkableTo: true },
            $(go.Shape,
                { stroke: "gray", strokeWidth: 2 },
                {
                    mouseEnter: function (e: any, obj: any) { obj.strokeWidth = 5; obj.stroke = "dodgerblue"; },
                    mouseLeave: function (e: any, obj: any) { obj.strokeWidth = 2; obj.stroke = "gray"; }
                })
        );


    function commonLinkingToolInit(tool: any) {
        // the temporary link drawn during a link drawing operation (LinkingTool) is thick and blue
        tool.temporaryLink =
            $(go.Link, { layerName: "Tool" },
                $(go.Shape, { stroke: "dodgerblue", strokeWidth: 5 }));
        // change the standard proposed ports feedback from blue rectangles to transparent circles
        tool.temporaryFromPort.figure = "Circle";
        tool.temporaryFromPort.stroke = null;
        tool.temporaryFromPort.strokeWidth = 0;
        tool.temporaryToPort.figure = "Circle";
        tool.temporaryToPort.stroke = null;
        tool.temporaryToPort.strokeWidth = 0;
        // provide customized visual feedback as ports are targeted or not
        tool.portTargeted = function (realnode: any, realport: any, tempnode: any, tempport: any, toend: any) {
            if (realport === null) {  // no valid port nearby
                lowlight();
            } else if (toend) {
                highlight(realport);
            }
        };
    }


    var ltool = myDiagram.toolManager.linkingTool;
    commonLinkingToolInit(ltool);
    // do not allow links to be drawn starting at the "to" port
    ltool.direction = go.LinkingTool.ForwardsOnly;
    var rtool = myDiagram.toolManager.relinkingTool;
    commonLinkingToolInit(rtool);


    // change the standard relink handle to be a shape that takes the shape of the link
    rtool.toHandleArchetype =
        $(go.Shape,
            { isPanelMain: true, fill: null, stroke: "dodgerblue", strokeWidth: 5 });

    // use a special DraggingTool to cause the dragging of a Link to start relinking it
    myDiagram.toolManager.draggingTool = new (DragLinkingTool(window) as any)

    // detect when dropped onto an occupied cell
    myDiagram.addDiagramListener("SelectionMoved", shiftNodesToEmptySpaces);


    function shiftNodesToEmptySpaces() {
        myDiagram.selection.each(function (node) {
            if (!(node instanceof go.Node)) return;
            // look for Parts overlapping the node
            while (true) {
                var exist = myDiagram.findObjectsIn(node.actualBounds,
                    // only consider Parts
                    function (obj) { return obj.part; },
                    // ignore Links and the dropped node itself
                    function (part) { return part instanceof go.Node && part !== node; },
                    // check for any overlap, not complete containment
                    true).first();
                if (exist === null) break;
                // try shifting down beyond the existing node to see if there's empty space
                node.position = new go.Point(node.actualBounds.x, exist.actualBounds.bottom + 10);
            }
        });
    }
    // prevent nodes from being dragged to the left of where the layout placed them
    myDiagram.addDiagramListener("LayoutCompleted", function (e) {
        myDiagram.nodes.each(function (node) {
            if (node.category === "Recycle") return;
            node.minLocation = new go.Point(node.location.x, -Infinity);
        });
    });
    load();  // load initial diagram from the mySavedModel textarea
})

const save = () => {
    mySavedModelValue.value = myDiagram.model.toJson();
    myDiagram.isModified = false;
}
const load = () => {
    myDiagram.model = go.Model.fromJson(mySavedModelValue.value);
    // if any nodes don't have a real location, explicitly do a layout
    if (myDiagram.nodes.any(function (n) { return !n.location.isReal(); })) layout();
}

// Define a custom tool that changes a drag operation on a Link to a relinking operation,
// but that operates like a normal DraggingTool otherwise.
const DragLinkingTool = (params: any) => {
    go.DraggingTool.call(params)
    params.isGridSnapEnabled = true
    params.isGridSnapRealtime = false
    params.gridSnapCellSize = new go.Size(182, 1)
    params.gridSnapOrigin = new go.Point(5.5, 0)
    return go.DraggingTool
}
const layout = () => {
    myDiagram.layoutDiagram(true);
}
go.Diagram.inherit(DragLinkingTool, go.DraggingTool);
// Handle dragging a link specially -- by starting the RelinkingTool on that Link
DragLinkingTool.prototype.doActivate = function () {
    var diagram = this.diagram;
    if (diagram === null) return;
    this.standardMouseSelect();
    var main = this.currentPart;  // this is set by the standardMouseSelect
    if (main instanceof go.Link) { // maybe start relinking instead of dragging
        var relinkingtool = diagram.toolManager.relinkingTool;
        // tell the RelinkingTool to work on this Link, not what is under the mouse
        relinkingtool.originalLink = main;
        // start the RelinkingTool
        diagram.currentTool = relinkingtool;
        // can activate it right now, because it already has the originalLink to reconnect
        relinkingtool.doActivate();
        relinkingtool.doMouseMove();
    } else {
        go.DraggingTool.prototype.doActivate.call(this);
    }
};

</script>

<style scoped>
#myDiagramDiv {
    background-color: #F8F8F8;
    border: 1px solid #aaa;
}
</style>
