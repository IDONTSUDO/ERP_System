import React, { Component } from "react";
import { GetAgentAtHuman } from "../Api/Http.js";
import { Card } from "antd";
import { EditOutlined } from "@ant-design/icons";
export default class AgentHuman extends Component {
  constructor() {
    super();
    this.state = {
      human: []
    };
  }
  componentDidMount() {
    let agentId = this.props.match.params.agentId;
    let body = {
      agentId: agentId
    };
    GetAgentAtHuman(body).then(data => {
      this.setState({ human: data });
    });
  }

  render() {
    return <></>;
  }
}
