import React, { Component } from "react";
import Error from "../Error/Error.jsx";
import { Button, Card, Spin, Badge, Popover, Avatar } from "antd";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../Api/Auth";
import { AssignedTodoUserBy } from "../Api/Http.js";
import {
  TeamOutlined,
  UserOutlined,
  PhoneOutlined,
  WhatsAppOutlined,
  CoffeeOutlined
} from "@ant-design/icons";
import moment from "moment";
class TodoAssignUserBy extends Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      open: true,
      error: false
    };
  }
  componentDidMount() {
    const userBy = this.props.match.params.userBy;
    let userId = isAuthenticated().direct._id;

    let payload = {
      userId,
      userBy
    };
    this.init(payload);
  }
  init = async payload => {
    AssignedTodoUserBy(payload).then(data => {
      if (data.error) {
        this.setState({ error: true });
      } else {
        this.setState({ todos: data, open: false });
      }
    });
  };
  renderPopoverSolo = todo => {
    return (
      <>
        <div>{todo.title}</div>
        <div dangerouslySetInnerHTML={{ __html: todo.description }} />
        <hr />
        <div>
          <span style={{ marginRight: "15px" }}></span>
          <Link to={`/user/${todo.posted_by}`}>
            <Avatar
              src={`${process.env.REACT_APP_API_URL}/user/photo/${todo.posted_by}?`}
            />
          </Link>
        </div>
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
    const { todos, userID, open } = this.state;
    return (
      <div className="postisitonRelativeSmeni">
        <div>
          <ul>
            <div className="">
              {open ? (
                <Spin size="large" />
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
                                          {/* <PhoneOutlined /> UserOutlined,PhoneOutlined <UserOutlined /> <WhatsAppOutlined /> */}
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
                                                      comTodo.status ===
                                                      "system"
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
                                                      style={{
                                                        color: "#ffffff"
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
                                                      comTodo.status ===
                                                      "system"
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
            </div>
          </ul>
        </div>
      </div>
    );
  }
}

export default TodoAssignUserBy;
