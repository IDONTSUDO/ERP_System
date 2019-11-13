import React, { Component } from "react";
import { AllAgentHistory } from "../Api/Http.js";
import { Rate, Card } from "antd";
import Moment from "react-moment";
import dateFormat from "dateformat";
import Error from "../Error/Error.jsx"

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
        <div className="container">
          <div className="row">
            {agentHistoryRes.map((agentHistoryOne, i) => (
              <>
                <div>
                  <Card className="deal-purpur">
                    <div style={{ color: "#FEFEFE" }}>
                      {agentHistoryOne.name}
                    </div>
                    <div style={{ color: "#FEFEFE" }}>
                      {agentHistoryOne.item}
                    </div>
                    <Moment
                      style={{ color: "#FEFEFE" }}
                      locale="ru"
                      format="D MMM YYYY"
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
      </div>
    );
  }
}

export default AgentHistory;
