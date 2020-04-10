import React, { Component } from "react";
import { GetAgentAtHuman, NewHuman } from "../Api/Http.js";
import Human from "../Components/agent/Human.jsx";
import {
  Skeleton,
  Pagination,
  Button,
  Affix,
  Modal,
  Input,
  Checkbox,
  notification,
  message
} from "antd";
import { EditOutlined, FrownOutlined } from "@ant-design/icons";
const CheckboxGroup = Checkbox.Group;
const { TextArea } = Input;
const plainOptions = ["Viber", "WhatsAp", "Почта", "Telegram", "Звонки"];

export default class AgentHuman extends Component {
  constructor() {
    super();
    this.state = {
      human: [],
      AgentBy: "",
      bio: "",
      checkedList: [],
      features_job: "",
      mail_at_peopel: "",
      phoneAt_peopel: "",
      position: "",
      loading: true,
      page: 1,
      visible: false,
      visibelPagination: false
    };
  }

  componentDidMount() {

    let agentId = this.props.match.params.agentId 
    let body = {
      agentId: agentId
    };

    GetAgentAtHuman(body).then(data => {
      if (data.length === 24) {
        this.setState({
          human: data,
          loading: false,
          AgentBy: agentId,
          visibelPagination: true
        });
      } else {
        this.setState({ human: data, loading: false, AgentBy: agentId });
      }
    });
  }

  onChange = page => {
    this.setState({
      current: page
    });
  };
  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    // NewHuman
    let err;
    let {
      AgentBy,
      bio,
      checkedList,
      features_job,
      mail_at_peopel,
      phoneAt_peopel,
      position
    } = this.state;

    if (bio.length === 0) {
      err = "Вы не ввели ФИО";
      return this.validatorErr(err);
    } else {
      let agent = {
        bio,
        checkedList,
        features_job,
        mail_at_peopel,
        phoneAt_peopel,
        position
      };
      NewHuman(agent, AgentBy).then(data => {
        // let data
        let { human } = this.state;
        human.push(data);

        this.setState({
          visible: false,
          human,
          bio: "",
          checkedList: [],
          features_job: "",
          mail_at_peopel: "",
          phoneAt_peopel: "",
          position: ""
        });
      });
    }
  };

  handleCancel = e => {
    this.setState({
      visible: false,
      bio: "",
      checkedList: [],
      features_job: "",
      mail_at_peopel: "",
      phoneAt_peopel: "",
      position: ""
    });
  };
  handelAnyChange = name => event => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };
  onChangeChecked = checkedList => {
    this.setState({ checkedList });
  };
  validatorErr(err) {
    notification.open({
      message: `${err}`,
      icon: <FrownOutlined style={{ color: "#108ee9" }} />
    });
  }
  render() {
    let left = window.innerWidth;

    return (
      <div className="human_pos">
        <Skeleton paragraph={{ rows: 26 }} active loading={this.state.loading}>
          <Affix
            style={{ position: "absolute", top: 10, left: left - 200 }}
            offsetTop={30}
          >
            <Button onClick={this.showModal} type="primary">
              Добавить
            </Button>
          </Affix>
          {this.state.human.map((hum, i) => (
            <>
              <Human human={hum} />
            </>
          ))}

          {this.state.visibelPagination ? (
            <>
              <Pagination
                current={this.state.current}
                onChange={this.onChange}
                total={50}
              />
            </>
          ) : null}
        </Skeleton>
        <Modal
          okText="Добавить"
          cancelText="Отменить"
          title="Добавление работника"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <div style={{ margin: "1px" }}>
            <Input
              onChange={this.handelAnyChange("position")}
              value={this.state.position}
              placeholder="Должность:"
            />
          </div>
          <div style={{ margin: "1px" }}>
            <Input
              onChange={this.handelAnyChange("phoneAt_peopel")}
              value={this.state.phoneAt_peopel}
              placeholder="Телефон:"
            />
          </div>
          <div style={{ margin: "1px" }}>
            <Input
              onChange={this.handelAnyChange("mail_at_peopel")}
              value={this.state.mail_at_peopel}
              placeholder="Email:"
            />
          </div>
          <div style={{ margin: "1px" }}>
            <TextArea
              onChange={this.handelAnyChange("features_job")}
              value={this.state.features_job}
              placeholder="Условия работы:"
            />
          </div>
          <div style={{ margin: "1px" }}>
            <Input
              value={this.state.bio}
              onChange={this.handelAnyChange("bio")}
              placeholder="ФИО:"
            />
          </div>
          <div style={{ margin: "1px" }}>
            <CheckboxGroup
              options={plainOptions}
              value={this.state.checkedList}
              onChange={this.onChangeChecked}
              disabled={this.state.TwoEditBool}
            />
          </div>
        </Modal>
      </div>
    );
  }
}
