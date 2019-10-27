import React, { Component } from "react";
import { AllAgentHistory } from "../Api/Http.js";
import {  Rate, Card } from "antd";
import Moment from "react-moment";
import dateFormat from "dateformat";
class AgentHistory extends Component {
  constructor() {
    super();
    this.state = {
      agentHistoryRes: []
    };
  }
  init(agentId) {
    AllAgentHistory(agentId).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        console.log(data);
        this.setState({
          agentHistoryRes: data
        });
      }
    });
  }
  componentDidMount() {
    const agentId = this.props.match.params.agentId;
    this.init(agentId);
  }

  render() {
    const { agentHistoryRes } = this.state;
    const toUpperCaseFilter = d => {
      return dateFormat(d, "fullDate");
    };

    return (
      <div className="postisitonRelativeSmeni">
        <div>
          {agentHistoryRes.map((agentHistoryOne, i) => (
            <>
              <div>
                <Card  className="deal-purpur">
                  <div style={{ color: "#FEFEFE" }}>{agentHistoryOne.name}</div>
                  <div style={{ color: "#FEFEFE" }}>{agentHistoryOne.item}</div>
                  <Moment
                    filter={toUpperCaseFilter}
                    style={{ color: "#FEFEFE" }}
                  >
                    {agentHistoryOne.Date}
                  </Moment>
                  <div style={{ padding: "10px" }}>
                    <Rate disabled defaultValue={agentHistoryOne.rate} />
                  </div>
                </Card>
              </div>
            </>
          ))}
        </div>
      </div>
    );
  }
}

export default AgentHistory;
