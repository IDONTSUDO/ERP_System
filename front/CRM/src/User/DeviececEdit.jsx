import React, { Component } from "react";
import { Button, Icon } from "antd";
import { MyDevice, DeleteDevice } from "../Api/Http.js";
import { isAuthenticated } from "../Api/Auth";
import { subscribeUser } from "../Push/subscription";
import Moment from "react-moment";
import Error from "../Error/Error.jsx";
import { platform } from "platform";
export default class DeviececEdit extends Component {
  constructor() {
    super();
    this.state = {
      error: false,
      device: []
    };
  }
  componentDidMount() {
    let userBy = isAuthenticated().direct._id;
    MyDevice(userBy).then(data => {
      if (data.error) {
        this.setState({ error: true });
      } else {
        this.setState({ device: data });
      }
    });
  }
  newDevice = () => {
    subscribeUser();
    setTimeout(() => this.forceUpdate(), 1000);
  };
  deleteSubcribe = SubscribId => {
    console.log(SubscribId);
    DeleteDevice(SubscribId).then(data => {
      if (data.err) {
        console.log(data);
        this.setState({ error: "Что то" });
      } else {
        this.forceUpdate();
      }
    });
  };
  forceUpdate() {
    let userBy = isAuthenticated().direct._id;
    MyDevice(userBy).then(data => {
      if (data.error) {
        this.setState({ error: true });
      } else {
        this.setState({ device: data });
      }
    });
  }
  render() {
    let { device, error } = this.state;
    return (
      <div className="postisitonRelativeSmeni">
        <div className="container">
          {error ? (
            <Error />
          ) : (
            <div className="row">
              <div className="mt-5 mb-5">
                <div style={{ padding: "5px" }}>
                  {device.map((dev, i) => (
                    <div className="strokeEditDevice">
                      <div style={{ padding: "5px" }}>
                        <div>{dev.UserAgent}</div>
                        <Button
                          shape="round"
                          onClick={SubscribId =>
                            this.deleteSubcribe(dev._id, SubscribId)
                          }
                        >
                          Отписаться
                        </Button>
                        <Moment
                          format="YYYY/MM/DD"
                          style={{ padding: "3px" }}
                          locale="ru"
                        >
                          {dev.dateCreated}
                        </Moment>
                      </div>
                    </div>
                  ))}
                  <div style={{ padding: "15px" }}>
                    <Button onClick={this.newDevice}>Новый девайс</Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
