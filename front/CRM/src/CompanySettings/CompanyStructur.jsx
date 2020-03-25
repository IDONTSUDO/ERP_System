import React, { Component } from "react";
import {

  Input,
  Icon,
  notification,

} from "antd";
import { Graph,Marker  } from "react-d3-graph";
const onClickGraph = function() {
  console.log(`Mouse over node`);
};

const onClickNode = function(nodeId) {
  console.log(`Mouse over node ${nodeId}`);
};

const onDoubleClickNode = function(nodeId) {
  console.log(`Mouse over node ${nodeId}`);
};

const onRightClickNode = function(event, nodeId) {
  console.log(`Mouse over node ${nodeId}`);
};

const onMouseOverNode = function(nodeId) {
  console.log(`Mouse over node ${nodeId}`);
};

const onMouseOutNode = function(nodeId) {
  console.log(`Mouse over node ${nodeId}`);
};

const onClickLink = function(source, target) {
  console.log(`Clicked link between ${source} and ${target}`);
};

const onRightClickLink = function(event, source, target) {
  console.log(`Right clicked link between ${source} and ${target}`);
};

const onMouseOverLink = function(source, target) {
  console.log(`Mouse over in link between ${source} and ${target}`);
};

const onMouseOutLink = function(source, target) {
  console.log(`Mouse over in link between ${source} and ${target}`);
};

const onNodePositionChange = function(nodeId, x, y) {
  console.log(
    `Node ${nodeId} is moved to new position. New position is x= ${x} y= ${y}`
  );
};

const myConfig = {
  nodeHighlightBehavior: true,
  width: window.innerWidth,
  height: window.innerHeight,
  node: {
    color: "lightgreen",
    size: 120,
    highlightStrokeColor: "blue"
  },
  d3:{
    alphaTarget: 0.05,
    gravity: -250,
    linkLength: 120,
    linkStrength: 2,
    disableLinkForce: false
  },
  link: {
    color: "#d3d3d3",
    fontColor: "black",
    fontSize: 8,
    fontWeight: "normal",
    highlightColor: "blue",
    highlightFontSize: 8,
    highlightFontWeight: "normal",
    labelProperty: "label",
    mouseCursor: "pointer",
    opacity: 1,
    renderLabel: false,
    semanticStrokeWidth: false,
    strokeWidth: 4,
    markerHeight: 6,
    markerWidth: 6
  }
};

export default class StructurTabel extends Component {
  constructor() {
    super();
    this.state = {
      structures: {
        nodes: [
          {
            id: "Harry",
            name: "Melanie",
            gender: "female",
            hasCar: true,
            hasBike: false
          },
          {
            id: "СВАРОГ",
            name: "qweqew",
            gender: "female",
            label: "wqeqweqewqew",
            hasCar: true,
            hasBike: false
          }
        ],
        links: [
          { source: "Harry", target: "СВАРОГ" },
        ]
      },
      newElement: ""
    };

  }
  componentDidMount() {
   
  }

  onClickNode = nodeId => {};
  onNewNode = nodeId => {
    let { newElement } = this.state;
    let err
    let data = this.state.structures;
    
    let resultValid = 0
    for(let i of data.nodes){
     
      if(i.id === newElement){
        resultValid++
      }
    }
    if(resultValid === 0){
      data.nodes.push({ id: `${newElement}` });
      data.links.push({ source: `${newElement}`, target: `${nodeId}` });
      this.setState({ structures: data });
    }else{
      err = "Уже есть такой граф"
      this.validatorErr(err)
    }
  };
  handelAnyChange = name => event => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };
  deleteNode = nodeId => {
    let err 
    let data = this.state.structures;
    let qaulityVertices = -1
    for (let name of data.links) {

      if(name.target === nodeId) {
        qaulityVertices++
      }
      if(name.source === nodeId) {
        qaulityVertices++
      }
    }
    if(qaulityVertices != 0){
      err = "Количество вершин больше чем 1"
      this.validatorErr(err)
    }else{
      let filtersNodes = data.nodes.filter(el => el.id !== nodeId);
      let filtersLink = data.links.filter(el => el.source !== nodeId);
      data.nodes = filtersNodes;
      data.links = filtersLink;
      this.setState({ structures: data });
    }
  };
  validatorErr(err){
    notification.open({
      message: `${err}`,
      icon: <Icon type="frown" style={{ color: "#108ee9" }} />
    });
  }
  render() {
    const data = this.state.structures;

    return (
      <div>
        <Input onChange={this.handelAnyChange("newElement")} />
        <Graph
          style={{ height: "100vh" }}
          id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
          data={data}
          config={myConfig}
          onClickNode={this.onNewNode}
          onDoubleClickNode={this.deleteNode}
          // onClickGraph={onClickGraph}
          // onClickLink={onClickLink}
          // onRightClickLink={onRightClickLink}
          // onMouseOverNode={onMouseOverNode}
          // onMouseOutNode={onMouseOutNode}
          // onMouseOverLink={onMouseOverLink}
          // onMouseOutLink={onMouseOutLink}
          // onNodePositionChange={onNodePositionChange}
        />
        ;
      </div>
    );
  }
}
