import React, { Component } from "react";
import {GetAgentAtHuman} from "../Api/Http.js"

export default class AgentHuman extends Component {
  constructor() {
    super();
    this.state = {
      human:[]
    };
  }
  componentDidMount() {
    let agentId = this.props.match.params.agentId
    let body = {
      agentId:agentId
    }
    GetAgentAtHuman(body).then(data =>{
      this.setState({human:data})
    })
  }
  render() {
  return <div className="todo-main">{this.state.human.map((peopel,i) =>(
    <>
    <div>{peopel.bio}</div>
    </>
  ))}</div>;
  }
}
