import React, { Component } from "react";
import { Button } from "antd";
import { ItegrationContrAgent, integrationList } from "../Api/Http";
import { isAuthenticated } from "../Api/Auth";
import Moment from "react-moment";

export default class ControlAgents extends Component {
  constructor() {
    super();
    this.state = {
      user: undefined,
      listIntegration: []
    };
  }
  componentDidMount() {
    let name = isAuthenticated().direct.name;
    let userId = isAuthenticated().direct._id;

    let userBy = {
      name,
      userId
    };
    this.setState({ user: userBy });
    integrationList().then(data => {
      // console.log(data)
      this.setState({ listIntegration: data });
    });
  }
  forceUpdate() {}
  integrationHelper = () => {
    let { user } = this.state;

    ItegrationContrAgent(user).then(data => {
      console.log(data);
    });
  };
  render() {
    return (
      <div>
        <div className="control_agent_main">
          <div>
            <Button onClick={() =>this.integrationHelper()}>
              {" "}
              Синхронизация с 1-С
            </Button>
           
              <div className="row phone_cotrolAgents">
                {this.state.listIntegration.map((itg, i) => (
                  <div className="col-md-4">
                    {/* <div>{itg.userBy}</div> */}

                    <Moment fromNow>{itg.date}</Moment>
                  </div>
                ))}
              </div>
            </div>
        </div>
      </div>
    );
  }
}
