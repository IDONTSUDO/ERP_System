import React, { Component } from "react";
import { getAgentBranch } from "../Api/Http";
import { Skeleton } from "antd";
import WorkBranch from "../Components/agent/WorkBranch.jsx";
export default class AgentBranch extends Component {
  constructor() {
    super();
    this.state = {
      branch: [],
      loading: true
    };
  }
  componentDidMount() {
    let agentId = this.props.match.params.agentId;
    getAgentBranch(agentId).then(branch => {
      this.setState({ branch, loading: false });
    });
  }
  render() {
    return (
      <div className="human_pos">
        <Skeleton paragraph={{ rows: 26 }} active loading={this.state.loading}>
          {this.state.branch.map((office, i) => (
            <WorkBranch office={office} />
          ))}
        </Skeleton>
      </div>
    );
  }
}
