import React, { Component } from "react"; 

class AgentTask extends Component {
    constructor() {
        super()
        this.state = {

        }
    }
    componentDidCatch(){
        let agentId = this.props.match.params.agentId
    }
  render() {
    return (
     <div>
       
     </div>
    );
  }
}

export default AgentTask;

