import React, { Component } from "react";
import queryString from "query-string";
import { GetAgentMountAndYear } from "../Api/Http";
class AgentTask extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    console.log(this.props.match.params)

    const agentId = this.props.match.params.agentId;
    const Year = this.props.match.params.year
    const Mounth = this.props.match.params.month
   


    GetAgentMountAndYear(agentId, Year, Mounth).then(data => {
      console.log(data);
    });
  }
  render() {
    return <div></div>;
  }
}

export default AgentTask;
