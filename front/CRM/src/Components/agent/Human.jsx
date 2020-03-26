import React, { Component } from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Popover,
  Modal,
  notification,
  message
} from "antd";
import {
  ChangeHuman,
  DeleteHuman,
  NewNewsFeatursPosition
} from "../../Api/Http";
import { isAuthenticated } from "../../Api/Auth";
// body, humanId
import { EditOutlined, DeleteOutlined, FrownOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const CheckboxGroup = Checkbox.Group;

const plainOptions = ["Viber", "WhatsAp", "Почта", "Telegram", "Звонки"];

export default class Human extends Component {
  constructor(props) {
    super();
    this.state = {
      editHuman: "editHumDefault",
      editBool: false,
      checkedList: props.human.checkedList,
      _id: props.human._id,
      TwoEditBool: true,
      position: props.human.position,
      mail_at_peopel: props.human.mail_at_peopel,
      bio: props.human.bio,
      phoneAt_peopel: props.human.phoneAt_peopel,
      features_job: props.human.features_job,
      visibleData: "block",
      visible: false,
      comment: "",
      role: ""
    };
  }
  componentDidMount() {
    let role = isAuthenticated().direct.role;
    this.setState({ role });
  }
  editorRigim = () => {
    let st = this.state.editHuman;
    if (st === "editHuman") {
      this.setState({
        editHuman: "editHumDefault",
        editBool: false,
        TwoEditBool: true
      });
    } else {
      this.setState({
        editHuman: "editHuman",
        editBool: true,
        TwoEditBool: false
      });
    }
  };
  onChangeChecked = checkedList => {
    this.setState({ checkedList });
  };
  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    let { comment } = this.state;
    let err;
    if (comment.length === 0) {
      err = "Введите коментарий";
      this.validatorErr(err);
    } else {
      let news = {
        eventNews: "Пометили на удаление",
        link: window.location.pathname,
        description: comment,
        posted_by: isAuthenticated().direct._id,
        deletItem: this.props.human
      };
      NewNewsFeatursPosition(news).then(data => {
        this.setState({
          visible: false,
          comment: ""
        });
        message.success("Помечен на удаление");
      });
    }
  };

  handleCancel = e => {
    this.setState({
      visible: false
    });
  };

  saveAgent = () => {
    let { human } = this.props;
    let {
      position,
      phoneAt_peopel,
      mail_at_peopel,
      features_job,
      bio,
      checkedList
    } = this.state;
    let agent = {
      position,
      phoneAt_peopel,
      mail_at_peopel,
      features_job,
      bio,
      checkedList
    };
    ChangeHuman(agent, human._id).then(data => {
      // TODO обработка ошибок
      let {
        bio,
        checkedList,
        features_job,
        mail_at_peopel,
        phoneAt_peopel,
        position
      } = data;
      this.setState({
        bio,
        checkedList,
        features_job,
        mail_at_peopel,
        phoneAt_peopel,
        position,
        editHuman: "none",
        editBool: false,
        TwoEditBool: true
      });
    });
  };
  handelAnyChange = name => event => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };
  deleteHuman = () => {
    let { _id } = this.state;
    DeleteHuman(_id).then(data => {
      console.log(data);
      this.setState({ visibleData: "none" });
      message.success("Удален");
    });
  };

  validatorErr(err) {
    notification.open({
      message: `${err}`,
      icon: <FrownOutlined style={{ color: "#108ee9" }} />
    });
  }
  render() {
    return (
      <>
        <Card style={{ display: this.state.visibleData }}>
          <EditOutlined
            className={this.state.editHuman}
            onClick={this.editorRigim}
          />
          <Popover
            Popover
            content={
              <>
                {["Директор", "Управляющий"].includes() === this.state.role ? (
                  <Button onClick={this.showModal}>Пометить на удаление</Button>
                ) : (
                  <Button onClick={this.deleteHuman}>Удалить</Button>
                )}
              </>
            }
          >
            <DeleteOutlined style={{ marginLeft: "100%", color: "red" }} />
          </Popover>
          <div>
            <b>Должность:</b> {this.state.position}
            {this.state.editBool ? (
              <Input
                onChange={this.handelAnyChange("position")}
                placeholder="Должность:"
              />
            ) : null}
          </div>
          <div>
            <b>Телефон:</b> {this.state.phoneAt_peopel}
            {this.state.editBool ? (
              <Input
                onChange={this.handelAnyChange("phoneAt_peopel")}
                placeholder="Телефон:"
              />
            ) : null}
          </div>
          <div>
            <b>Email:</b>
            {this.state.mail_at_peopel}
            {this.state.editBool ? (
              <Input
                onChange={this.handelAnyChange("mail_at_peopel")}
                placeholder="Email:"
              />
            ) : null}
          </div>
          <div>
            <b>Особенности работы:</b>
            {this.state.features_job}
            {this.state.editBool ? (
              <TextArea
                onChange={this.handelAnyChange("features_job")}
                placeholder="Условия работы:"
              />
            ) : null}
          </div>
          <div>
            <b>ФИО:</b>
            {this.state.bio}
            {this.state.editBool ? (
              <Input
                onChange={this.handelAnyChange("bio")}
                placeholder="ФИО:"
              />
            ) : null}
          </div>
          <div>
            <CheckboxGroup
              options={plainOptions}
              disabled={this.state.TwoEditBool}
              value={this.state.checkedList}
              onChange={this.onChangeChecked}
            />
          </div>
          <div>
            {this.state.editBool ? (
              <Button onClick={this.saveAgent}>Изменить</Button>
            ) : null}
          </div>
        </Card>
        <hr style={{ display: this.state.visibleData }} />
        <Modal
          title="Коментарий на удаление"
          visible={this.state.visible}
          okText="Удалить"
          cancelText="Отменить"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <>
            {" "}
            <TextArea
              onChange={this.handelAnyChange("comment")}
              value={this.state.comment}
              placeholder="Глаголом жги сердца людей..."
            />
          </>
        </Modal>
      </>
    );
  }
}

