import React, { Component } from "react";
import {
  Graph,
  NodeMapper,
  GroupMapper,
  Layout,
  EdgeMapper
} from "g6-for-react";

const data = {
  nodes: [
    {
      id: "node1",
      x: 100,
      y: 200,
      label: "节点1"
    },
    {
      id: "node2",
      x: 300,
      y: 200,
      label: "节点2"
    },
    {
      id: "node3",
      x: 400,
      y: 200,
      label: "节点2"
    }
  ],
  edges: [
    {
      target: "node2",
      source: "node1"
    },
    {
      target: "node3",
      source: "node2"
    },
  ]
};

export default class componentName extends Component {
  h = () => {};
  render() {
    const layoutCreator = col => nodes => {
      const hgap = 76;
      const vgap = 50;

      nodes.forEach(function(node, index) {
        if (parseInt(index / col) % 2 === 0) {
          node.x = (col - (index % col)) * hgap;
        } else {
          node.x = (index % col) * hgap + hgap;
        }
        node.y = parseInt(index / col) * vgap + vgap / 2;
      });
    };

    return (
      <div>
        {" "}
        <Graph
          fitView="cc"
          height={window.innerHeight}
          data={data}
          onGetG6Instance={graph => (this.graph = graph)}
        >
          <NodeMapper label={node => node.id} />
          <GroupMapper label={group => group.id} />
          <EdgeMapper style={() => ({ endArrow: true })} />
        </Graph>{" "}
      </div>
    );
  }
}
