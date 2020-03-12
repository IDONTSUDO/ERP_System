import React, { Component } from "react";

import {
  Calendar,
  Badge,
  Popover,
  Switch,
  Modal,
  Button,
  notification,
  Icon,
  message
} from "antd";
import { isAuthenticated } from "../Api/Auth";
import { UserTodoYear, NewTodo, list } from "../Api/Http";
import DefaultProfile from "../Assets/default.png";
import ReactQuill from "react-quill";
import { Link } from "react-router-dom";
import {
  TeamOutlined,
  UserOutlined,
  PhoneOutlined,
  WhatsAppOutlined,
  CoffeeOutlined
} from "@ant-design/icons";
import moment from "moment";
import Localisation from "../helper/LocalisationCalendar.json";

let today = moment(Date.now());

export default class CalendarJob extends Component {
  constructor() {
    super();
    this.state = {
      todosCalendar: [],
      SelectDatedTodo: [],
      editorBorder: "",
      switchCalendarEditor: false,
      visibleNewTodo: false,
      SelectDay: "",
      title: "",
      importance: undefined,
      description: undefined,
      diff: [],
      time: undefined,
      mounth: undefined,
      year: undefined
    };
    this.handleActionEditor = this.handleActionEditor.bind(this);
  }
  componentDidMount() {
    const user = isAuthenticated().direct._id;
    let startDate = Date.now();

    let mounthTodo = moment(startDate)
      .locale("ru")
      .format("MM");
    let year = moment(startDate)
      .locale("ru")
      .format("YY");
    let dataFetch = {
      mounthTodo,
      year,
      user
    };
    UserTodoYear(dataFetch).then(data => {
      this.setState({ todosCalendar: data });
    });
  }
  forceUpdate() {}
  showModal = () => {
    this.setState({
      visibleNewTodo: true
    });
  };

  handleActionEditor = name => event => {
    this.setState({ error: "" });
    this.setState({ [name]: event });
  };
  hideModal = () => {
    let input = document.getElementById("select_id");
    let ql_elem = document.querySelector(".ql-editor").children;
    input.innerHTML = "";
    input.innerText = "";
    input.value = "";
    for (let elem of ql_elem) {
      elem.remove();
    }
    this.setState({
      visibleNewTodo: false,
      diff: undefined,
      year: undefined,
      mounth: undefined,
      time: undefined,
      title: undefined,
      importance: undefined,
      description: undefined
    });
  };
  handleAction = name => event => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };

  getListData = value => {};
  renderPopoverSolo = todo => {
    return (
      <>
        <img
          className="img-icon"
          src={`${process.env.REACT_APP_API_URL}/user/photo/${todo.posted_by}?`}
          onError={i => (i.target.src = `${DefaultProfile}`)}
        />
        <div>{todo.title}</div>
        <div dangerouslySetInnerHTML={{ __html: todo.description }} />
      </>
    );
  };
  dateCellRender = value => {
    const listData = this.state.todosCalendar;

    let days = moment().diff(value, "days");

    let itemQuality = 0;
    let jobArray = 0;
    let SoloTodo = 0;
    let systemTodo = 0;
    let timeInteration;
    let time = moment(value)
      .locale("ru")
      .format("LL");
    listData.map((item, i) =>
      time === item.time
        ? (itemQuality++,
          item.JobArray.length != 0 ? jobArray++ : SoloTodo++,
          item.status === "system" ? systemTodo++ : null)
        : null
    );
    return (
      <ul className="events">
        {systemTodo === 0 ? null : (
          <>
            <PhoneOutlined />
          </>
        )}
        {jobArray === 0 ? null : (
          <>
            <TeamOutlined />
          </>
        )}
        {SoloTodo === 0 ? null : (
          <>
            <UserOutlined />
          </>
        )}
        {itemQuality === 0 ? null : (
          <>
            <Badge
              status={
                days >= 1
                  ? "red"
                  : days >= 1
                  ? "yellow"
                  : days > -6
                  ? "yellow"
                  : days <= -6
                  ? "green"
                  : null
              }
              text={itemQuality}
            />
          </>
        )}
      </ul>
    );
  };
  getMonthData(value) {}
  onSelectDate = dateSelect => {
    let todoDate = moment(dateSelect)
      .locale("ru")
      .format("LL");
    let time = moment(dateSelect)
      .locale("ru")
      .format("LL");
    let mounth = moment(dateSelect)
      .locale("ru")
      .format("MM");
    let year = moment(dateSelect)
      .locale("ru")
      .format("YY");

    let diff = [];
    diff.push(moment(dateSelect).toDate());
    this.setState({
      SelectDay: todoDate,
      diff: diff,
      year: year,
      mounth: mounth,
      time: time
    });
    if (this.state.switchCalendarEditor) {
      this.showModal();
    } else {
      const listData = this.state.todosCalendar;
      let time = moment(dateSelect).format("L");

      let SelectDatedTodo = [];
      listData.map((todo, i) =>
        time === moment(todo.diff[0]).format("L")
          ? SelectDatedTodo.push(todo)
          : null
      );
      this.setState({ SelectDatedTodo: SelectDatedTodo });
    }
  };
  monthCellRender = value => {
    const num = this.getMonthData(this.state.todosCalendar);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };
  NewTodo = () => {
    let {
      diff,
      year,
      mounth,
      time,
      title,
      importance,
      description
    } = this.state;
    // todo
    let msg;
    if (title === undefined) {
      msg = "Заголовок обязателен";
      return this.openNotificationValidationError(msg);
    }
    if (importance === undefined) {
      msg = "Вы не выставили важность дела";
      return this.openNotificationValidationError(msg);
    }
    if (description === undefined) {
      msg = "Описание является обязательным параметром";
      return this.openNotificationValidationError(msg);
    }
    let tags = [isAuthenticated().direct._id];
    let user = {
      _id: isAuthenticated().direct._id
    };
    let posted_by = isAuthenticated().direct._id;
    let name_posted = isAuthenticated().direct.name;
    let comand = false;
    let names_workers_list = [isAuthenticated().direct.name];
    let todo = {
      posted_by,
      name_posted,
      comand,
      names_workers_list,
      diff,
      year,
      mounth,
      time,
      title,
      importance,
      description,
      tags
    };
    NewTodo(todo, user).then(data => {
      let { todosCalendar } = this.state;
      todosCalendar.push(data);
      this.setState({
        diff: undefined,
        year: undefined,
        mounth: undefined,
        time: undefined,
        title: undefined,
        importance: undefined,
        description: undefined,
        tags: []
      });
      this.hideModal();
      message.success("Новое дело создано!");
    });
  };
  renderPopoverSystem = todo => {
    return (
      <>
        <div>Имя:{todo.agentByTodo[0].name}</div>
        <div>Телефон:{todo.agentByTodo[0].phone}</div>
        <div>Полное имя:{todo.agentByTodo[0].full_name}</div>
      </>
    );
  };
  switchCalendarEditor = switchCalendarEditor => {
    this.setState({ switchCalendarEditor: switchCalendarEditor });
    if (switchCalendarEditor === true) {
      this.setState({ editorBorder: "calendar-edit" });
    } else {
      this.setState({ editorBorder: "0px" });
    }
  };
  openNotificationValidationError(msg) {
    notification.open({
      message: `${msg}`,
      icon: <Icon type="frown" style={{ color: "#108ee9" }} />
    });
  }
  render() {
    return (
      <div className={this.state.editorBorder}>
        <div className>
          {this.state.SelectDatedTodo.map((todo, i) => (
            <>
              <Link
                to={
                  todo.status === "system"
                    ? `/spec/job/${todo._id}`
                    : `/job/${todo._id}`
                }
              >
                {todo.status === "system" ? (
                  <>
                    <Popover
                      Popover
                      content={<>{this.renderPopoverSystem(todo)}</>}
                      title="Задача"
                    >
                      <WhatsAppOutlined
                        style={{
                          fontSize: "30px",
                          color: "rgb(103, 58, 183)",
                          marfin: "5px"
                        }}
                      />
                    </Popover>
                  </>
                ) : (
                  <>
                    <Popover
                      Popover
                      content={<>{this.renderPopoverSolo(todo)}</>}
                      title="Задача"
                    >
                      <UserOutlined
                        style={{
                          fontSize: "30px",
                          color: "rgb(3, 169, 244)",
                          marfin: "5px"
                        }}
                      />
                    </Popover>
                  </>
                )}
              </Link>
            </>
          ))}
        </div>
        <hr/>
        <div className="leftpos">
          <Switch defaultChecked={false} onChange={this.switchCalendarEditor} />
        </div>
        <Calendar
          dateCellRender={this.dateCellRender}
          monthCellRender={this.monthCellRender}
          onSelect={this.onSelectDate}
          style={{ width: "90%" }}
          locale={Localisation}
        />
        <Modal
          title="Новая задача"
          visible={this.state.visibleNewTodo}
          onOk={this.NewTodo}
          onCancel={this.hideModal}
          okText="Создать"
          cancelText="Отменить"
        >
          <p>Выбранная дата: {this.state.SelectDay}</p>
          <input
            id="select_id"
            value={this.state.title}
            onChange={this.handleAction("title")}
            type="text"
            class="form-control"
          />
          <div class="form-group">
            <label for="exampleFormControlSelect1">Приоретет задачи</label>
            <select
              onChange={this.handleAction("importance")}
              class="form-control"
            >
              <option>Выберите приоретет</option>
              <option>Очень важное</option>
              <option>Средней важности</option>
              <option>Не очень важное</option>
            </select>
          </div>
          <ReactQuill onChange={this.handleActionEditor("description")} />
        </Modal>
      </div>
    );
  }
}
