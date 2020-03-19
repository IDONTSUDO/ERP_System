import React, { Component } from "react";
import { Graph } from "react-d3-graph";

export default class CompanyTabel extends Component {
  render() {
    const data = {
      nodes: [{ id: "Harry" }, { id: "Sally" }, { id: "Alice" }],
      links: [
        { source: "Harry", target: "Sally" },
        { source: "Harry", target: "Alice" }
      ]
    };

    const myConfig = {
      nodeHighlightBehavior: true,
      node: {
        color: "lightgreen",
        size: 200,
        highlightStrokeColor: "blue"
      },
      link: {
        highlightColor: "lightblue"
      }
    };

    // graph event callbacks
    const onClickGraph = function() {};

    const onClickNode = function(nodeId) {};

    const onDoubleClickNode = function(nodeId) {};

    const onRightClickNode = function(event, nodeId) {};

    const onMouseOverNode = function(nodeId) {};

    const onMouseOutNode = function(nodeId) {};

    const onClickLink = function(source, target) {};

    const onRightClickLink = function(event, source, target) {};

    const onMouseOverLink = function(source, target) {};

    const onMouseOutLink = function(source, target) {};

    const onNodePositionChange = function(nodeId, x, y) {};
    return (
      <div>
        <Graph
          id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
          data={data}
          config={myConfig}
          onClickNode={onClickNode}
          onDoubleClickNode={onDoubleClickNode}
          onRightClickNode={onRightClickNode}
          onClickGraph={onClickGraph}
          onClickLink={onClickLink}
          onRightClickLink={onRightClickLink}
          onMouseOverNode={onMouseOverNode}
          onMouseOutNode={onMouseOutNode}
          onMouseOverLink={onMouseOverLink}
          onMouseOutLink={onMouseOutLink}
          onNodePositionChange={onNodePositionChange}
        />
        ;
      </div>
    );
  }
}
