import React, { Component } from "react";

import { Calendar, Badge, Popover, Switch, Modal, Button } from "antd";
import { isAuthenticated } from "../Api/Auth";
import { UserTodoYear } from "../Api/Http";
import DefaultProfile from "../Assets/default.png";
import ReactQuill from "react-quill";
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
      title: ""
    };
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

  hideModal = () => {
    this.setState({
      visibleNewTodo: false
    });
  };
  handleAction = name => event => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };

  getListData = value => {
    let listData;
    switch (value.date()) {
      case 8:
        listData = [
          { type: "warning", content: "This is warning event." },
          { type: "success", content: "This is usual event." }
        ];
        break;
      case 10:
        listData = [
          { type: "warning", content: "This is warning event." },
          { type: "success", content: "This is usual event." },
          { type: "error", content: "This is error event." }
        ];
        break;
      case 15:
        listData = [
          { type: "warning", content: "This is warning event" },
          { type: "success", content: "This is very long usual event。。...." },
          { type: "error", content: "This is error event 1." },
          { type: "error", content: "This is error event 2." },
          { type: "error", content: "This is error event 3." },
          { type: "error", content: "This is error event 4." }
        ];
        break;
      default:
    }
    return listData || [];
  };
  renderPopoverSolo = todo => {
    return (
      <>
        {" "}
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
    let time = moment(value)
      .locale("ru")
      .format("LL");

    const listData = this.state.todosCalendar;

    let days = moment(today).diff(value, "days");

    let itemQuality = 0;
    let timeInteration;

    listData.map((item, i) => (time === item.time ? itemQuality++ : null));

    return (
      <ul className="events">
        {itemQuality === 0 ? null : (
          <>
            <Badge status="error" text={itemQuality} />
          </>
        )}
      </ul>
    );
  };
  getMonthData(value) {
    if (value.month() === 8) {
      return 1394;
    }
  }
  onSelectDate = dateSelect => {
    let todoDate = moment(dateSelect)
      .locale("ru")
      .format("LL");

    this.setState({ SelectDay: todoDate });
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
    const num = this.getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
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
  render() {
    return (
      <div className={this.state.editorBorder}>
        <div className>
          {this.state.SelectDatedTodo.map((todo, i) => (
            <>
              {todo.status === "system" ? (
                <>
                  <Popover
                    Popover
                    content={<>{this.renderPopoverSystem(todo)}</>}
                    title="Задача"
                  >
                    <WhatsAppOutlined
                      style={{
                        fontSize: "50px",
                        color: "#1a1717",
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
                        fontSize: "50px",
                        color: "#1a1717",
                        marfin: "5px"
                      }}
                    />
                  </Popover>
                </>
              )}
            </>
          ))}
          <hr />
          <hr />
        </div>
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
          title="Новое задача"
          visible={this.state.visibleNewTodo}
          onOk={this.hideModal}
          onCancel={this.hideModal}
          okText="Создать"
          cancelText="Отменить"
        >
          <p>Выбранная дата: {this.state.SelectDay}</p>

          <input
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
          <ReactQuill
          // onChange={this.handleActionEditor("description")}
          />
        </Modal>
      </div>
    );
  }
}
