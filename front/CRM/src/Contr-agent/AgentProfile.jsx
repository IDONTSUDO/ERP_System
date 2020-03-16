import React, { Component } from "react";
import ReactTags from "react-tag-autocomplete";
import {
  GetAgentProfile,
  list,
  AddManageForAgent,
  PricedAtManage
} from "../Api/Http";
import {
  Button,
  Descriptions,
  Icon,
  notification,
  Tabs,
  Tag,
  Select,
  Switch
} from "antd";
import ChartAgent from "../Components/ChartAgent";
import { isAuthenticated } from "../Api/Auth";
import { Link } from "react-router-dom";
const { TabPane } = Tabs;

const { Option, OptGroup } = Select;

export default class AgentProfile extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      tags: [],
      user: "",
      company: "",
      name: "",
      full_name: "",
      phone: "",
      INN: "",
      general_director: "",
      OGRN: "",
      email: "",
      worker: [],
      any: "",
      legal_address: "",
      actual_address: "",
      payment_account: "",
      redirectTo: false,
      TagsStart: []
    };
  }

  componentDidMount() {
    const agentId = this.props.match.params.agentId;
    let TagsArray = [];
    GetAgentProfile(agentId).then(data => {
      if (data.error) {
        this.setState({ redirectToProfile: true });
      } else {
        this.setState({
          id: data._id,
          name: data.name,
          email: data.email,
          company: data.company,
          full_name: data.full_name,
          phone: data.phone,
          INN: data.INN,
          general_director: data.general_director,
          OGRN: data.OGRN,
          any: data.any,
          legal_address: data.legal_address,
          actual_address: data.actual_address,
          payment_account: data.payment_account
        });

        if (data.tags === "none") {
          this.setState({ tags: undefined });
        } else {
          console.log(data.tags);
          data.tags.map(tag => {
            TagsArray.push(tag.name);
          });

          this.setState({ tags: TagsArray, TagsStart: TagsArray });
        }
      }
    });
    list().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        let workerList = [];
        for (let us of data) {
          let ItsWorkerAtValid = [
            "Директор",
            "Управляющий",
            "Менеджер"
          ].includes(us.role);
          if (ItsWorkerAtValid) {
            workerList.push(us);
          }
        }
        this.setState({ worker: workerList });
      }
    });
  }
  handleDelete(i) {
    const tags = this.state.tags.slice(0);
    tags.splice(i, 1);
    this.setState({ tags });
  }

  handleAddition(tag) {
    const tags = [].concat(this.state.tags, tag);
    this.setState({ tags });
  }
  handleChange = date => {
    this.setState({
      startDate: date
    });
  };
  handleAction = name => event => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };
  clickSubmit = event => {
    event.preventDefault();
    this.setState({ loading: true });
    let msg;
    const { tags, id, worker, TagsStart } = this.state;
    if (tags.length > 1) {
      msg = "Нельзя назначить больше одного менеджера агенту";
      return this.openNotificationValid(msg);
    } else {
      let UserExit = [];
      let FinalySortUser = [];
      const token = isAuthenticated().token;
      let userArray = [];
      if (tags[0] === TagsStart[0]) {
        msg = "Этот менеджер уже был назначен";
        return this.openNotificationValid(msg);
      } else {
        for (let i = 0; tags.length > i; i++) {
          for (let user of worker) {
            if (user.name === tags[i]) {
              userArray.push({ name: user.name, _id: user._id });
            }
          }
        }
        for (let i = 0; TagsStart.length > i; i++) {
          for (let user of worker) {
            if (user.name === TagsStart[i]) {
              UserExit.push({ name: user.name, _id: user._id });
            }
          }
        }
      }
      let body = {
        UserExit,
        userArray
      };
      AddManageForAgent(body, id).then(data => {
        if (data.error) {
          this.openNotificationError();
        } else {
          this.openNotificationNewUserList();
          this.forceUpdate();
        }
      });
    }
  };

  forceUpdate() {
    const agentId = this.props.match.params.agentId;
    GetAgentProfile(agentId).then(data => {
      if (data.error) {
        this.setState({ redirectToProfile: true });
      } else {
        let TagsArray = [];
        this.setState({
          id: data._id,
          name: data.name,
          email: data.email,
          company: data.company,
          full_name: data.full_name,
          phone: data.phone,
          INN: data.INN,
          general_director: data.general_director,
          OGRN: data.OGRN,
          any: data.any,
          legal_address: data.legal_address,
          actual_address: data.actual_address,
          payment_account: data.payment_account,
          result: []
        });
        if (data.tags === "none") {
          this.setState({ tags: undefined });
        } else {
          data.tags.map(tag => {
            TagsArray.push(tag.name);
          });

          this.setState({ tags: TagsArray });
        }
      }
    });
  }

  openNotificationError() {
    notification.open({
      message: "Ой что то пошло не так, мне жаль",
      icon: <Icon type="frown" style={{ color: "#108ee9" }} />
    });
  }
  openNotificationValid(msg) {
    notification.open({
      message: `${msg}`,
      icon: <Icon type="frown" style={{ color: "#108ee9" }} />
    });
  }
  openNotificationNewUserList() {
    notification.open({
      message: "Назначено",
      icon: <Icon type="smile" style={{ color: "#108ee9" }} />
    });
  }
  ChangeSelect = inputData => {
    this.setState({ tags: inputData });
  };
  render() {
    const {
      email,
      OGRN,
      general_director,
      INN,
      phone,
      full_name,
      name,
      company,
      worker,
      any,
      legal_address,
      actual_address,
      payment_account,
      tags,
      id
    } = this.state;
    return (
      <div>
        <div className="postisitonRelativeSmeni">
          <div className="">
            <Tabs type="card">
              <TabPane tab="Общая информация" key="1">
                <Descriptions
                  title="Корпаративная  информация"
                  layout="vertical"
                >
                  <Descriptions.Item label="Имя компании">
                    {name === "none" ? (
                      <Tag color="geekblue">{name.toUpperCase()}</Tag>
                    ) : (
                      <div>{name}</div>
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item label="Телефон">
                    {phone === "none" ? (
                      <Tag color="geekblue">{phone.toUpperCase()}</Tag>
                    ) : (
                      <div>{phone}</div>
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item label="Компания">
                    {company === "none" ? (
                      <Tag color="geekblue">{company.toUpperCase()}</Tag>
                    ) : (
                      <div>{company}</div>
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item label="Адрес" span={2}>
                    {legal_address === "none" ? (
                      <Tag color="geekblue">{legal_address.toUpperCase()}</Tag>
                    ) : (
                      <div>{legal_address}</div>
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item label="Генеральный директор">
                    {general_director === "none" ? (
                      <Tag color="geekblue">
                        {general_director.toUpperCase()}
                      </Tag>
                    ) : (
                      <div>{general_director}</div>
                    )}
                  </Descriptions.Item>
                </Descriptions>
                <div style={{ display: "flex" }}>
                  <Select
                    mode="multiple"
                    // maxTagTextLength={1}

                    style={{ width: "max-content" }}
                    placeholder="Выберете исполнителей"
                    onChange={this.ChangeSelect}
                    optionLabelProp="label"
                    value={tags}
                    defaultActiveFirstOption={false}
                    allowClear={true}
                  >
                    {worker.map((workerOne, i = 1) => (
                      <Option value={workerOne.name} label={workerOne.name}>
                        <span>{workerOne.name}</span>
                      </Option>
                    ))}
                  </Select>

                  <Button onClick={this.clickSubmit}>Назначить</Button>
                  <Button>
                    <Link to={`/agent/tasks/${id}`}>Дела по контр агенту</Link>
                  </Button>
                </div>
              </TabPane>
              <TabPane tab="Статистика" key="2">
                <ChartAgent agentId={id} />
              </TabPane>
              <TabPane tab="Офисы" key="3">
                Content of Tab Pane 3
              </TabPane>
              <TabPane tab="Люди" key="4">
                Content of Tab Pane 3
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    );
  }
}
