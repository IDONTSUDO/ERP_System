import React, { Component } from "react";
import { MyAgentList, NewDealHistory } from "../Api/Http.js";
import { Button, notification, Icon, Select } from "antd";
import Error from "../Error/Error.jsx"

const { Option } = Select;

export default class NewDeal extends Component {
  constructor() {
    super();
    this.state = {
      user: "",
      agentList: [],
      tags: [],
      id: "",
      loading: false,
      item: "",
      error: "",
      name: ""
    };
  }
  componentDidMount() {
    const userId = this.props.match.params.userId;
    this.setState({ user: userId });
    let workerId = userId;
    MyAgentList(workerId).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ agentList: data });
      }
    });
  }

  handleAction = name => event => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };
  handleChange = value => {
    this.setState({ tags: value });
  };
  isValid = () => {
    const { tags, item, name } = this.state;
    if (name.length == 0) {
      this.setState({ error: "Название сделки обязательно" });
      return false;
    }
    if (tags.length == 0) {
      this.setState({
        error: "Контр агент и предмет сделки являются обязательным параметрами"
      });
      return false;
    }
    if (item.length == 0) {
      this.setState({ error: "Предмет сделки обязателен" });
    }
    if (tags.length >= 2) {
      this.setState({
        error: "Нельзя заключить сделку с несколькими контр-агентами"
      });
      return false;
    }
    return true;
  };
  clickSubmit = event => {
    event.preventDefault();
    if (this.isValid()) {
      this.setState({ loading: true });
      let { tags, item, name, user, agentList } = this.state;
      let agentByid;
      let userId = user;
      let status = "Начато";

      for (let index = 0; tags.length > index; index++) {
        for (let index1 = 0; agentList.length > index1; index1++) {
          if (agentList[index1].name == tags[index]) {
            agentByid = agentList[index1]._id;
          }
        }
      }
      console.log(agentByid);

      let payload = {
        status,
        name,
        agentByid,
        item,
        userId
      };

      NewDealHistory(payload).then(data => {
        if (data.error) {
          console.log(data.error);
        } else {
          this.openNotificationNewDeal();
        }
      });
    }
  };
  openNotificationErrorValidation() {
    const { error } = this.state;
    notification.open({
      message: `${error}`,
      icon: <Icon type="frown" style={{ color: "#108ee9" }} />
    });
    this.setState({ error: "" });
  }
  openNotificationNewDeal() {
    notification.open({
      message: "Новая сделка заключена",
      icon: <Icon type="smile" style={{ color: "#108ee9" }} />
    });
  }
  render() {
    let { agentList, item, name, loading, error } = this.state;

    return (
      <div>
        <div className="postisitonRelativeSmeni">
          <div className="container">
            <div className="row">
              <form>
                <div>
                  <label>Название</label>
                  <input
                    className="form-control"
                    onChange={this.handleAction("name")}
                    type="text"
                    value={name}
                  />
                  <label>Предмет сделки</label>
                  <input
                    className="form-control"
                    onChange={this.handleAction("item")}
                    type="text"
                    value={item}
                  />
                </div>

                <div style={{ padding: "10px" }}>
                  <Select
                    mode="multiple"
                    style={{ width: "100%" }}
                    placeholder="Выберете контр-агента"
                    onChange={this.handleChange}
                    optionLabelProp="label"
                    defaultActiveFirstOption={false}
                    allowClear={true}
                  >
                    {agentList.map((agnetOne, i = 1) => (
                      <Option value={agnetOne.name} label={agnetOne.name}>
                        <span role="img" aria-label="China">
                          {agnetOne.name}
                        </span>
                      </Option>
                    ))}
                  </Select>
                  <div style={{ padding: "10px" }}></div>
                  <Button
                    className="btn btn-raised btn-primary"
                    onClick={this.clickSubmit}
                  >
                    Новая сделка
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {error.length > 2 ? this.openNotificationErrorValidation() : ""}
      </div>
    );
  }
}
