import React, { Component } from "react";
import None from "../Components/None.jsx";
import PopoverSoloTodo from "../Components/Popover/PopoverSoloTodo.jsx";
import PopoverSystem from "../Components/Popover/PopoverSystem.jsx";
import PopoverJobArray from "../Components/Popover/PopoverJobArray.jsx";

import {
  Calendar,
  Badge,
  Popover,
  Switch,
  Modal,
  Button,
  notification,
  Icon,
  message,
  Avatar,
  Input,
  Select,
  Checkbox,
  Drawer,
  Tabs,
  Skeleton,
  List
} from "antd";
import { isAuthenticated } from "../Api/Auth";
import {
  UserTodoYear,
  NewTodo,
  list,
  MyTodoGetComandWorked,
  NewAssignTodoToday,
  readMyTodo,
  TodoChangeComandList,
  NewNewsToComment,
  UpdateDaysTodoComplete
} from "../Api/Http";
import { everyday, IsEveryDaySub } from "../helper/everyday.js";
import DefaultProfile from "../Assets/default.png";
import ReactQuill from "react-quill";
import { Link } from "react-router-dom";
import {
  TeamOutlined,
  UserOutlined,
  PhoneOutlined,
  WhatsAppOutlined,
  CoffeeOutlined,
  SearchOutlined,
  MailOutlined,
  FrownOutlined
} from "@ant-design/icons";
import moment from "moment";
import Localisation from "../helper/LocalisationCalendar.json";

let today = moment(Date.now());

const { TabPane } = Tabs;
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
      year: undefined,
      agentFind: false,
      visibelCalendar: "block",
      visibelTwoCalendar: "none",
      TodoPostedList: [],
      SystemTodo: []
    };
    this.handleActionEditor = this.handleActionEditor.bind(this);
  }
  componentDidMount() {
    const user = isAuthenticated().direct._id;
    let startDate = Date.now();
    readMyTodo(user).then(data => {
      let TodoArray = [];
      let DifferDate;

      TodoArray = data.todos;

      // this.setState({ todosCalendar: data });
      let userfindString;
      userfindString = user + "IAMWORKED";

      this.setState({ userID: userfindString });
      MyTodoGetComandWorked(userfindString).then(data => {
        if (data.error) {
          console.log(data.error);
        } else {
          for (let int = 0; data.result.length > int; int++) {
            data.result[int].JobArray.map((job, i) =>
              job.user === userfindString
                ? ((data.result[int].time = moment(data.result[int].diff[i])
                    .locale("ru")
                    .format("LL")),
                  "days")
                : null
            );
            TodoArray.push(data.result[int]);
          }
          this.setState({ todosCalendar: TodoArray });
          let postedTodoList = [];
          let userAr = [];
          TodoArray.map((todo, i) =>
            todo.name_posted != undefined ? userAr.push(todo.name_posted) : null
          );
          var result = {};

          userAr.forEach(function(a) {
            if (result[a] != undefined) ++result[a];
            else result[a] = 1;
          });

          Object.keys(result).map(obj =>
            postedTodoList.push({ quality: result[obj], name: obj })
          );
          this.setState({ TodoPostedList: postedTodoList });
          let TodoAgents = [];
          TodoArray.map((todo, i) =>
            todo.status === "system" ? TodoAgents.push(todo) : null
          );
          this.setState({ SystemTodo: TodoAgents });
        }
      });
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

  clickComplateTodo = todo => {
    let ID = todo._id;
    let posted_by = todo.posted_by;
    let description = todo.title;
    let postedBy = todo.posted_by;
    let status = "Выполнено";
    let expireAt = new Date();
    let payload = {
      status,
      expireAt
    };
    TodoChangeComandList(ID, payload).then(data => {
      if (data.error) {
      } else {
        this.forceUpdate();
        let link = todo._id;
        let posted_by = isAuthenticated().direct._id;
        let name_posted = isAuthenticated().direct.name;
        let worker_by = { user: todo.posted_by };
        if (postedBy === posted_by) {
          return null;
        } else {
          let eventNews = status;
          let payload = {
            worker_by,
            eventNews,
            link,
            name_posted,
            posted_by,
            description
          };
          NewNewsToComment(payload);
        }
        let sub = IsEveryDaySub()._id;
        UpdateDaysTodoComplete(sub);
      }
    });
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
          item.JobArray.length != 0
            ? jobArray++
            : item.status === "system"
            ? systemTodo++
            : SoloTodo++)
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
  onClose = () => {
    this.setState({
      agentFind: false
    });
  };
  switchAgentFind = agentFind => {
    this.setState({ agentFind: agentFind });
    if (agentFind) {
      this.setState({ visibelTwoCalendar: "block", visibelCalendar: "none" });
    } else {
      this.setState({ visibelTwoCalendar: "none", visibelCalendar: "block" });
    }
  };
  onSelectDate = dateSelect => {
    let UserWorked = isAuthenticated().direct._id + "IAMWORKED";
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

      let data = listData.map(todo =>
        todo.JobArray.length === 0
          ? time === moment(todo.diff[0]).format("L")
            ? SelectDatedTodo.push(todo)
            : null
          : todo.JobArray.map((job, i) =>
              job.user === UserWorked
                ? time === moment(todo.diff[i]).format("L")
                  ? SelectDatedTodo.push(todo)
                  : null
                : null
            )
      );

      this.setState({ SelectDatedTodo: SelectDatedTodo });
    }
  };
  monthCellRender = value => {
    let UserWorked = isAuthenticated().direct._id + "IAMWORKED";
    const todos = this.state.todosCalendar;
    let mounth = moment(value)
      .locale("ru")
      .format("MM");
    let mounthTodo = 0;

    todos.map((todo, i) =>
      todo.JobArray.length === 0
        ? mounth ===
          moment(todo.diff[0])
            .locale("ru")
            .format("MM")
          ? mounthTodo++
          : null
        : todo.JobArray.map((tod, i) =>
            tod.user === UserWorked
              ? mounth ===
                moment(todo.diff[i])
                  .locale("ru")
                  .format("MM")
                ? mounthTodo++
                : null
              : null
          )
    );

    return mounthTodo != 0 ? (
      <div className="notes-month">
        <section>Всего: {mounthTodo}</section>
        <span></span>
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
      let sub = IsEveryDaySub()._id;
      NewAssignTodoToday(sub);
    });
  };

  helperSearchTodoByAgeregate = name => {
    let { todosCalendar } = this.state;
    let results = todosCalendar.filter(el => el.name_posted === name);
    this.setState({ SelectDatedTodo: results });
  };
  helperAgentAgregateClick = todo => {
    let { SystemTodo } = this.state;

    let results = SystemTodo.filter(
      el => el.agentByTodo[0]._id === todo.agentByTodo[0]._id
    );
    this.setState({ SelectDatedTodo: results });
  };
  helperTodoByAgregateAgents = () => {};

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
    let noTodo = {
      emptyText: (
        <div>
          Вам никто не назначил дел{" "}
          <FrownOutlined style={{ fontSize: "32px", marginRight: "5px" }} />
        </div>
      )
    };
    let noSystemTodo = {
      emptyText: (
        <div>
          Нету дел по агентам{" "}
          <FrownOutlined style={{ fontSize: "32px", marginRight: "5px" }} />
        </div>
      )
    };
    return (
      <div className={this.state.editorBorder}>
        <div className>
          {this.state.SelectDatedTodo.map((todo, i) => (
            <>
              {todo.status === "system" ? (
                <>
                  <PopoverSystem todo={todo}>
                    <WhatsAppOutlined
                      style={{
                        fontSize: "30px",
                        color: "rgb(103, 58, 183)",
                        marfin: "5px"
                      }}
                    />
                  </PopoverSystem>
                </>
              ) : (
                <>
                  {todo.JobArray.length === 0 ? (
                    <>
                      <PopoverSoloTodo
                        icon={true}
                        todo={todo}
                      ></PopoverSoloTodo>
                    </>
                  ) : (
                    <>
                      <PopoverJobArray
                        icon={true}
                        todo={todo}
                      ></PopoverJobArray>
                    </>
                  )}
                </>
              )}
            </>
          ))}
        </div>
        <hr />
        <div className="leftpos">
          <Switch defaultChecked={false} onChange={this.switchCalendarEditor} />

          <Switch
            defaultChecked={false}
            style={{ backgroundColor: "#001529bf" }}
            onChange={this.switchAgentFind}
          />
        </div>
        <Calendar
          dateCellRender={this.dateCellRender}
          monthCellRender={this.monthCellRender}
          onSelect={this.onSelectDate}
          style={{ width: "90%", display: this.state.visibelCalendar }}
          locale={Localisation}
        />

        <Tabs
          style={{ display: this.state.visibelTwoCalendar }}
          defaultActiveKey="2"
        >
          <TabPane tab="Поиск по агенту" key="1">
            <List
              size="small"
              bordered
              locale={noSystemTodo}
              dataSource={this.state.SystemTodo}
              renderItem={item => (
                <List.Item>
                  <Popover
                    Popover
                    content={<>{this.renderPopoverAgent(item)}</>}
                    title="Агент"
                  >
                    <h5
                      style={{ cursor: "pointer" }}
                      onClick={todo =>
                        this.helperAgentAgregateClick(item, todo)
                      }
                    >
                      {item.title}
                    </h5>
                  </Popover>
                </List.Item>
              )}
            />
          </TabPane>
          <TabPane tab="Поиск по назначенному делу" key="2">
            <List
              size="small"
              bordered
              locale={noTodo}
              dataSource={this.state.TodoPostedList}
              renderItem={item => (
                <List.Item>
                  <h5
                    style={{ cursor: "pointer" }}
                    onClick={name =>
                      this.helperSearchTodoByAgeregate(item.name, name)
                    }
                  >
                    {item.name}
                  </h5>
                  <h5 style={{ color: "#1890ff" }}>{item.quality}</h5>
                </List.Item>
              )}
            />
          </TabPane>
        </Tabs>
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
