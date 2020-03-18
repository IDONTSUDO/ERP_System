import React, { Component } from "react";
import { isAuthenticated } from "../Api/Auth";
import { readMyTodo, MyTodoGetComandWorked } from "../Api/Http";
import { Link } from "react-router-dom";
import { Button, Card, Badge, Icon, Popover, Tabs, Spin, Skeleton } from "antd";
import {
  TeamOutlined,
  UserOutlined,
  PhoneOutlined,
  WhatsAppOutlined,
  CoffeeOutlined
} from "@ant-design/icons";

import CalendarJob from "./CalendarJob";
import TodayWork from "./TodayWork";
import moment from "moment";
import DefaultProfile from "../Assets/default.png";
import todoSort from "../helper/CommonHelper";
const { TabPane } = Tabs;

export default class MyWork extends Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      redirectToSignin: "",
      user: "",
      comand: [],
      userID: "",
      open: true,
      todo_midle: "",
      greenTodoDisplay: "block",
      redTodoDisplay: "block",
      yellowTodoDisplay: "block"
    };
  }
  componentDidMount() {
    const userId = this.props.match.params.userId;
    this.setState({ user: userId });
    this.init(userId);
    let todo = isAuthenticated().direct.todo_middle;
    this.setState({ todo_midle: todo });
  }

  init = async userId => {
    let TodoArray = [];

    readMyTodo(userId).then(Datas => {
      if (Datas.error) {
        this.setState({ redirectToSignin: true });
      } else {
        Object.keys(Datas);
        console.log("readMyTodo" ,Datas)
        for (let i = 0; Datas.todos.length > i; i++) {
          TodoArray.push(Datas.todos[i]);
        }

        let userfindString;

        userfindString = userId + "IAMWORKED";

        this.setState({ userID: userfindString });
        MyTodoGetComandWorked(userfindString).then(data => {
          if (data.error) {
            console.log(data.error);
          } else {
            console.log("MyTodoGetComandWorked" ,data)
            for (let i = 0; data.result.length > i; i++) {
              TodoArray.push(data.result[i]);
            } 
            console.log(TodoArray)

            this.setState({ todos: TodoArray });
            this.setState({ open: false });
          }
        });
      }
    });
  };
  returnSort = async () => {
    this.setState({ open: true });
    let userId = isAuthenticated().direct._id;
    this.init(userId);
  };
  yellowSort = yellowTodoDisplay => {
    if (yellowTodoDisplay === "block") {
      this.setState({ yellowTodoDisplay: "none" });
    } else {
      this.setState({ yellowTodoDisplay: "block" });
    }
  };
  greenSort = greenTodoDisplay => {
    if (greenTodoDisplay === "block") {
      this.setState({ greenTodoDisplay: "none" });
    } else {
      this.setState({ greenTodoDisplay: "block" });
    }
  };
  redSort = redTodoDisplay => {
    if (redTodoDisplay === "block") {
      this.setState({ redTodoDisplay: "none" });
    } else {
      this.setState({ redTodoDisplay: "block" });
    }
  };
  agentPop = agent => {
    return agent.map((ag, i) => (
      <>
        {ag.name}
        {ag.full_name}
        {ag.phone}
      </>
    ));
  };
  renderPopoverComand = todo => {
    return todo.JobArray.map((tod, i) => (
      <>
        <div dangerouslySetInnerHTML={{ __html: tod.action }} />
        <div>{tod.date}</div>
      </>
    ));
  };
  renderPopoverSystem = todo => {
    return (
      <>
        <h5>
          <b>Имя:</b>
          {todo.agentByTodo[0].name}
        </h5>
        <h5>
          <b>Телефон:</b>
          {todo.agentByTodo[0].phone}
        </h5>
        <h5>
          <b>Полное имя:</b>
          {todo.agentByTodo[0].full_name}
        </h5>
      </>
    );
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
  renderImortance = importance => {
    return (
      <>
        {importance === "Не очень важное" ? (
          <>
            <CoffeeOutlined />
          </>
        ) : importance === "Средней важности" ? (
          <>
            <CoffeeOutlined />
            <CoffeeOutlined />
          </>
        ) : importance === "Очень важное" ? (
          <>
            <CoffeeOutlined />
            <CoffeeOutlined />
            <CoffeeOutlined />
          </>
        ) : null}
      </>
    );
  };
  render() {
    const { todos, userID, comand, open } = this.state;
    let todo = isAuthenticated().direct.todo_middle;
    let Today = moment().format("L");
    let todayMoment = moment()
      .locale("ru")
      .format("YY");
    return (
      <div style={{ overflowY: "scroll" }} className="job-main-content">
        <Tabs defaultActiveKey="2">
          <TabPane tab="Все дела" key="1">
            {open === true ? (
              <>
                <Skeleton
                  paragraph={{ rows: 15 }}
                  active
                  loading={true}
                ></Skeleton>
              </>
            ) : (
              <>
                <ui>
                  <div className="container_button_job">
                    <Button
                      onClick={() =>
                        this.yellowSort(this.state.yellowTodoDisplay)
                      }
                      className="square-yellow"
                    ></Button>
                    <Button
                      onClick={() =>
                        this.greenSort(this.state.greenTodoDisplay)
                      }
                      className="square-green"
                    ></Button>
                    <Button
                      onClick={() => this.redSort(this.state.redTodoDisplay)}
                      className="square-red"
                    ></Button>
                  </div>
                </ui>
                <div
                  style={{ display: "block", marginBottom: "34px" }}
                  className="container"
                >
                  <div className="row">
                    {/* {console.log(todos)} */}
                    {todos.map((comTodo, i) => (
                      <>
                        {comTodo.JobArray.length === 0 ? (
                          <>
                            {moment().diff(moment(comTodo.diff[0]), "days") <=
                            0 ? (
                              <>
                                {moment().diff(
                                  moment(comTodo.diff[0]),
                                  "days"
                                ) <= -6 ? (
                                  <>
                                    <div
                                      style={{
                                        display: this.state.greenTodoDisplay
                                      }}
                                      className="card-job-modile-style  todo-phone-green"
                                    >
                                      <Card className="todo-green">
                                        <Link
                                          to={
                                            comTodo.status === "system"
                                              ? `/spec/job/${comTodo._id}`
                                              : `/job/${comTodo._id}`
                                          }
                                        >
                                          <div
                                            style={{
                                              color: "#ffffff",
                                              fontWeight: "bolder",
                                              fontSize: "20px"
                                            }}
                                          >
                                            {this.renderImortance(
                                              comTodo.importance
                                            )}
                                          </div>
                                          <h5
                                            style={{
                                              color: "#ffffff",
                                              wordBreak: "break-word"
                                            }}
                                          >
                                            {comTodo.title}
                                          </h5>
                                          <div style={{ color: "#ffffff" }}>
                                            {comTodo.time}
                                          </div>
                                          {comTodo.status === "system" ? (
                                            <>
                                              <Popover
                                                Popover
                                                content={
                                                  <>
                                                    {this.renderPopoverSystem(
                                                      comTodo
                                                    )}
                                                  </>
                                                }
                                                title="Title"
                                              >
                                                <WhatsAppOutlined
                                                  style={{
                                                    fontSize: "32px",
                                                    color: "#ffffff",
                                                    marfin: "5px"
                                                  }}
                                                />
                                              </Popover>
                                            </>
                                          ) : (
                                            <>
                                              <Popover
                                                Popover
                                                content={
                                                  <>
                                                    {this.renderPopoverSolo(
                                                      comTodo
                                                    )}
                                                  </>
                                                }
                                                title="Задача"
                                              >
                                                <UserOutlined
                                                  style={{
                                                    fontSize: "32px",
                                                    color: "#ffffff",
                                                    marfin: "5px"
                                                  }}
                                                />
                                              </Popover>
                                            </>
                                          )}
                                        </Link>
                                      </Card>
                                    </div>
                                  </>
                                ) : moment().diff(
                                    moment(comTodo.diff[i]),
                                    "days"
                                  ) > -6 ? (
                                  <>
                                    {" "}
                                    <div
                                      style={{
                                        display: this.state.yellowTodoDisplay
                                      }}
                                      className="card-job-modile-style  todo-phone-yellow"
                                    >
                                      <Card className="todo-yellow">
                                        <Link
                                          to={
                                            comTodo.status === "system"
                                              ? `/spec/job/${comTodo._id}`
                                              : `/job/${comTodo._id}`
                                          }
                                        >
                                          <div
                                            style={{
                                              color: "rgb(0, 0, 0)",
                                              fontWeight: "bolder",
                                              fontSize: "20px"
                                            }}
                                          >
                                            {this.renderImortance(
                                              comTodo.importance
                                            )}
                                          </div>
                                          <h5
                                            style={{
                                              color: "rgb(0, 0, 0)",
                                              wordBreak: "break-word"
                                            }}
                                          >
                                            {comTodo.title}
                                          </h5>
                                          <div
                                            style={{ color: "rgb(0, 0, 0)" }}
                                          >
                                            {comTodo.time}
                                          </div>
                                          {comTodo.status === "system" ? (
                                            <>
                                              <Popover
                                                Popover
                                                content={
                                                  <>
                                                    {/* {this.renderPopoverSystem(
                                                      comTodo
                                                    )} */}
                                                  </>
                                                }
                                                title="Задача"
                                              >
                                                <WhatsAppOutlined
                                                  style={{
                                                    fontSize: "32px",
                                                    color: "rgb(0, 0, 0)",
                                                    marfin: "5px"
                                                  }}
                                                />
                                              </Popover>
                                            </>
                                          ) : (
                                            <>
                                              <Popover
                                                Popover
                                                content={
                                                  <>
                                                    {this.renderPopoverSolo(
                                                      comTodo
                                                    )}
                                                  </>
                                                }
                                                title="Задача"
                                              >
                                                <UserOutlined
                                                  style={{
                                                    fontSize: "32px",
                                                    color: "rgb(0, 0, 0)",
                                                    marfin: "5px"
                                                  }}
                                                />
                                              </Popover>
                                            </>
                                          )}
                                        </Link>
                                      </Card>
                                    </div>
                                  </>
                                ) : null}
                              </>
                            ) : (
                              <>
                                <div
                                  style={{ display: this.state.redTodoDisplay }}
                                  className="card-job-modile-style  todo-phone-red"
                                >
                                  <Card className="todo-red">
                                    <Link
                                      to={
                                        comTodo.status === "system"
                                          ? `/spec/job/${comTodo._id}`
                                          : `/job/${comTodo._id}`
                                      }
                                    >
                                      <div
                                        style={{
                                          color: "#ffffff",
                                          fontWeight: "bolder",
                                          fontSize: "20px"
                                        }}
                                      >
                                        {this.renderImortance(
                                          comTodo.importance
                                        )}
                                      </div>
                                      <h5
                                        style={{
                                          color: "#ffffff",
                                          wordBreak: "break-word"
                                        }}
                                      >
                                        {comTodo.title}
                                      </h5>
                                      <div style={{ color: "#ffffff" }}>
                                        {comTodo.time}
                                      </div>
                                      {comTodo.status === "system" ? (
                                        <>
                                          <Popover
                                            Popover
                                            content={
                                              <>
                                                {this.renderPopoverSystem(
                                                  comTodo
                                                )}
                                              </>
                                            }
                                            title="Задача"
                                          >
                                            <WhatsAppOutlined
                                              style={{
                                                fontSize: "32px",
                                                color: "#ffffff",
                                                marfin: "5px"
                                              }}
                                            />
                                          </Popover>
                                        </>
                                      ) : (
                                        <>
                                          <Popover
                                            Popover
                                            content={
                                              <>
                                                {this.renderPopoverSolo(
                                                  comTodo
                                                )}
                                              </>
                                            }
                                            title="Задача"
                                          >
                                            <UserOutlined
                                              style={{
                                                fontSize: "32px",
                                                color: "#ffffff",
                                                marfin: "5px"
                                              }}
                                            />
                                          </Popover>
                                        </>
                                      )}
                                    </Link>
                                  </Card>
                                </div>
                              </>
                            )}
                          </>
                        ) : (
                          <>
                            {comTodo.JobArray.map((tod, i) => (
                              <>
                                {tod.user === userID ? (
                                  <>
                                    {moment().diff(
                                      moment(comTodo.diff[i]),
                                      "days"
                                    ) <= 0 ? (
                                      <>
                                        {moment().diff(
                                          moment(comTodo.diff[i]),
                                          "days"
                                        ) <= -9 ? (
                                          <>
                                            <div
                                              style={{
                                                display: this.state
                                                  .greenTodoDisplay
                                              }}
                                              className="card-job-modile-style  todo-phone-green"
                                            >
                                              <Card className="todo-green">
                                                <Link
                                                  to={
                                                    comTodo.status === "system"
                                                      ? `/spec/job/${comTodo._id}`
                                                      : `/job/${comTodo._id}`
                                                  }
                                                >
                                                  <div
                                                    style={{
                                                      color: "#ffffff",
                                                      fontWeight: "bolder",
                                                      fontSize: "20px"
                                                    }}
                                                  >
                                                    {this.renderImortance(
                                                      comTodo.importance
                                                    )}
                                                  </div>
                                                  <h5
                                                    style={{
                                                      color: "#ffffff",
                                                      wordBreak: "break-word"
                                                    }}
                                                  >
                                                    {comTodo.title}
                                                  </h5>
                                                  <div
                                                    style={{ color: "#ffffff" }}
                                                  >
                                                    {tod.date}
                                                  </div>
                                                  {comTodo.comand ? (
                                                    <>
                                                      <Popover
                                                        Popover
                                                        content={
                                                          <>
                                                            {this.renderPopoverComand(
                                                              comTodo
                                                            )}
                                                          </>
                                                        }
                                                        title="Задача"
                                                      >
                                                        <TeamOutlined
                                                          style={{
                                                            fontSize: "32px",
                                                            color: "#ffffff",
                                                            marfin: "5px"
                                                          }}
                                                        />
                                                      </Popover>
                                                    </>
                                                  ) : null}
                                                </Link>
                                              </Card>
                                            </div>
                                          </>
                                        ) : moment().diff(
                                            moment(comTodo.diff[i]),
                                            "days"
                                          ) >= -3 ? (
                                          <>
                                            {" "}
                                            <div
                                              style={{
                                                display: this.state
                                                  .yellowTodoDisplay
                                              }}
                                              className="card-job-modile-style  todo-phone-yellow"
                                            >
                                              <Card className="todo-yellow">
                                                <Link
                                                  to={
                                                    comTodo.status === "system"
                                                      ? `/spec/job/${comTodo._id}`
                                                      : `/job/${comTodo._id}`
                                                  }
                                                >
                                                  <div
                                                    style={{
                                                      color: "rgb(0, 0, 0)",
                                                      fontWeight: "bolder",
                                                      fontSize: "20px"
                                                    }}
                                                  >
                                                    {this.renderImortance(
                                                      comTodo.importance
                                                    )}
                                                  </div>
                                                  <h5
                                                    style={{
                                                      color: "rgb(0, 0, 0)",
                                                      wordBreak: "break-word"
                                                    }}
                                                  >
                                                    {comTodo.title}
                                                  </h5>
                                                  <div
                                                    style={{
                                                      color: "rgb(0, 0, 0)"
                                                    }}
                                                  >
                                                    {tod.date}
                                                  </div>
                                                  {comTodo.comand ? (
                                                    <>
                                                      <Popover
                                                        Popover
                                                        content={
                                                          <>
                                                            {this.renderPopoverComand(
                                                              comTodo
                                                            )}
                                                          </>
                                                        }
                                                        title="Title"
                                                      >
                                                        <TeamOutlined
                                                          style={{
                                                            fontSize: "32px",
                                                            color:
                                                              "rgb(0, 0, 0)",
                                                            marfin: "5px"
                                                          }}
                                                        />
                                                      </Popover>
                                                    </>
                                                  ) : null}
                                                </Link>
                                              </Card>
                                            </div>
                                          </>
                                        ) : null}
                                      </>
                                    ) : (
                                      <>
                                        <div
                                          style={{
                                            display: this.state.redTodoDisplay
                                          }}
                                          className="card-job-modile-style  todo-phone-red"
                                        >
                                          <Card className="todo-red">
                                            <Link
                                              to={
                                                comTodo.status === "system"
                                                  ? `/spec/job/${comTodo._id}`
                                                  : `/job/${comTodo._id}`
                                              }
                                            >
                                              <div
                                                style={{
                                                  color: "#ffffff",
                                                  fontWeight: "bolder",
                                                  fontSize: "20px"
                                                }}
                                              >
                                                {this.renderImortance(
                                                  comTodo.importance
                                                )}
                                              </div>
                                              <h5
                                                style={{
                                                  color: "#ffffff",
                                                  wordBreak: "break-word"
                                                }}
                                              >
                                                {comTodo.title}
                                              </h5>
                                              <div style={{ color: "#ffffff" }}>
                                                {tod.date}
                                              </div>
                                              {comTodo.comand ? (
                                                <>
                                                  <Popover
                                                    Popover
                                                    content={
                                                      <>
                                                        {this.renderPopoverComand(
                                                          comTodo
                                                        )}
                                                      </>
                                                    }
                                                    title="Title"
                                                  >
                                                    <TeamOutlined
                                                      style={{
                                                        fontSize: "32px",
                                                        color: "#ffffff",
                                                        marfin: "5px"
                                                      }}
                                                    />
                                                  </Popover>
                                                </>
                                              ) : null}
                                              <div className="todo-red-text">
                                                {tod._id}
                                              </div>
                                            </Link>
                                          </Card>
                                        </div>
                                      </>
                                    )}
                                  </>
                                ) : (
                                  <></>
                                )}
                              </>
                            ))}
                          </>
                        )}
                      </>
                    ))}
                  </div>
                </div>
              </>
            )}
          </TabPane>
          <TabPane tab="Календарь" key="2">
            <div
              style={{ width: "90%", display: "block" }}
              className="container"
            >
              <CalendarJob />
            </div>
          </TabPane>
          <TabPane tab="На сегодня" key="3">
            <TodayWork />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
// {moment(Today).isBefore(comTodo.diff[i]) ? (
//   <>
//     {moment().diff(
//       moment(comTodo.diff[i]),
//       "days"
//     ) <= -9 ? (
//       <div>div</div>
//     ) : moment().diff(
//         moment(comTodo.diff[i]),
//         "days"
//       ) >= -1 ? (
//       <div>div</div>
//     ) : null}
//     {/* {moment().diff(moment(comTodo.diff[i])) <= -4 ?(<div>div</div>):(null)} */}
//     {/* {moment().diff(moment(comTodo.diff[i])) <= -2 ?(<>div</>):(null)} */}
//   </>
// ) : (
//   <></>
// )}
