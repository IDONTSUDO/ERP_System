import React, { Component } from "react";
import Error from "../Error/Error.jsx";
import { Button, Card, Spin, Badge } from "antd";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../Api/Auth";
import { AssignedTodoUserBy } from "../Api/Http.js";
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
      console.log(data);
      if (data.error) {
        this.setState({ error: true });
      } else {
        this.setState({ todos: data, open: false });
      }
    });
  };
  returnSort = async () => {
    this.setState({ open: true });
    let userId = isAuthenticated().direct._id;
    this.init(userId);
  };
  yellowSort = () => {
    const { todos } = this.state;
    var YellowSortArray = [];
    for (let i = 0; todos.length > i; i++) {
      if (todos[i].importance === "Средней важности") {
        console.log(todos[i].importance);
        YellowSortArray.push(todos[i]);
      }
    }
    this.setState({ todos: YellowSortArray });
  };
  greenSort = () => {
    const { todos } = this.state;
    var GreenSortArray = [];
    for (let i = 0; todos.length > i; i++) {
      if (todos[i].importance === "Не очень важное") {
        GreenSortArray.push(todos[i]);
      }
    }
    this.setState({ todos: GreenSortArray });
  };
  redSort = () => {
    const { todos } = this.state;
    var RedSortArray = [];
    for (let i = 0; todos.length > i; i++) {
      if (todos[i].importance === "Очень важное") {
        RedSortArray.push(todos[i]);
      }
    }
    this.setState({ todos: RedSortArray });
  };
  render() {
    
    const { todos, userID, open } = this.state;
    return (
      <div className="postisitonRelativeSmeni">
        <div>
          <ul>
            <div className="container_button_job">
              <Button
                onClick={this.returnSort}
                className="square-return"
              ></Button>
              <Button
                onClick={this.yellowSort}
                className="square-yellow"
              ></Button>
              <Button
                onClick={this.greenSort}
                className="square-green"
              ></Button>
              <Button onClick={this.redSort} className="square-red"></Button>
              </div>
              <div className="container">

              
              <div className="">
                {open ? (
                  <Spin size="large" />
                ) : (
                  <>
                    
                      <div className="row">
                        {todos.map((tod, i) => (
                          <>
                            {tod.comand === true ? (
                              <>
                                {tod.importance === "Очень важное" ? (
                                  <>
                                    <div className="card-job-modile-style todo-phone-red">
                                      <Card className="todo-red" key={i}>
                                        <Badge
                                          count={tod.JobArray.length}
                                        ></Badge>
                                        <Link to={`/job/${tod._id}`}>
                                          <div className="todo-red-text">
                                            {tod.title}
                                          </div>
                                        </Link>
                                        {tod.JobArray.map((todoOne, i) => (
                                          <>
                                            {todoOne.user ===
                                            userID + "IAMWORKED" ? (
                                              <>
                                                <div
                                                  style={{ color: "#ffffff" }}
                                                >
                                                  {todoOne.date}
                                                </div>
                                              </>
                                            ) : (
                                              <></>
                                            )}
                                          </>
                                        ))}
                                        {tod.status === "в работе" ? (
                                          <div style={{ color: "#ffffff" }}>
                                            {tod.status}
                                          </div>
                                        ) : (
                                          ""
                                        )}
                                      </Card>
                                    </div>
                                  </>
                                ) : (
                                  ""
                                )}
                                {tod.importance === "Средней важности" ? (
                                  <>
                                    <div className="card-job-modile-style todo-phone-yellow">
                                      <Card className="todo-yellow" key={i}>
                                        <Badge
                                          style={{
                                            backgroundColor: "#ffff00",
                                            color: "#000000",
                                            boxShadow: "0 0 0 1px #000000 inset"
                                          }}
                                          count={tod.JobArray.length}
                                        ></Badge>
                                        <Link to={`/job/${tod._id}`}>
                                          <div className="todo-yellow-text">
                                            {tod.title}
                                          </div>
                                        </Link>
                                        {tod.JobArray.map((todoOne, i) => (
                                          <>
                                            {todoOne.user ===
                                            userID + "IAMWORKED" ? (
                                              <>
                                                <div>{todoOne.date}</div>
                                              </>
                                            ) : (
                                              <></>
                                            )}
                                          </>
                                        ))}
                                        {tod.status === "в работе" ? (
                                          <div>{tod.status}</div>
                                        ) : (
                                          ""
                                        )}
                                      </Card>
                                    </div>
                                  </>
                                ) : (
                                  ""
                                )}

                                <>
                                  {tod.importance === "Не очень важное" ? (
                                    <>
                                      {tod.JobArray.map((todoOne, i) => (
                                        <>
                                          <div className="card-job-modile-style todo-phone-green">
                                            <Card
                                              className="todo-green"
                                              key={i}
                                            >
                                              <Badge
                                                style={{
                                                  backgroundColor: "#15b11a",
                                                  color: "#000000",
                                                  boxShadow:
                                                    "0 0 0 1px #000000 inset"
                                                }}
                                                count={tod.JobArray.length}
                                              ></Badge>
                                              <Link to={`/job/${tod._id}`}>
                                                <div className="todo-green-text">
                                                  {tod.title}
                                                </div>
                                              </Link>
                                              {tod.JobArray.map(
                                                (todoOne, i) => (
                                                  <>
                                                    {todoOne.user ===
                                                    userID + "IAMWORKED" ? (
                                                      <>
                                                        <div>
                                                          {todoOne.date}
                                                        </div>
                                                      </>
                                                    ) : (
                                                      <></>
                                                    )}
                                                  </>
                                                )
                                              )}
                                              {tod.status === "в работе" ? (
                                                <div>{tod.status}</div>
                                              ) : (
                                                ""
                                              )}
                                            </Card>
                                          </div>
                                        </>
                                      ))}
                                    </>
                                  ) : (
                                    ""
                                  )}
                                </>
                              </>
                            ) : (
                              ""
                            )}

                            {tod.importance === "Очень важное" &&
                            tod.comand === false ? (
                              <>
                                <div className="card-job-modile-style todo-phone-red">
                                  <Card className="todo-red" key={i}>
                                    <Link to={`/job/${tod._id}`}>
                                      <div className="todo-red-text">
                                        {tod.title}
                                      </div>
                                    </Link>
                                    {tod.status === "в работе" ? (
                                      <div style={{ color: "#ffffff" }}>
                                        {tod.status}
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                    <div style={{ color: "#ffffff" }}>
                                      {tod.time}
                                    </div>
                                  </Card>
                                </div>
                              </>
                            ) : (
                              ""
                            )}
                            {tod.importance === "Средней важности" &&
                            tod.comand == false ? (
                              <>
                                <div className="card-job-modile-style todo-phone-yellow">
                                  <Card className="todo-yellow" key={i}>
                                    <Link to={`/job/${tod._id}`}>
                                      <div className="todo-yellow-text">
                                        {tod.title}
                                      </div>
                                    </Link>
                                    {tod.status === "в работе" ? (
                                      <div>{tod.status}</div>
                                    ) : (
                                      ""
                                    )}
                                    <div>{tod.time}</div>
                                  </Card>
                                </div>
                              </>
                            ) : (
                              ""
                            )}
                            {tod.importance === "Не очень важное" &&
                            tod.comand === false ? (
                              <>
                                <div className="card-job-modile-style todo-phone-green">
                                  <Card className="todo-green">
                                    <Link to={`/job/${tod._id}`}>
                                      <div className="todo-green-text">
                                        {tod.title}
                                      </div>
                                    </Link>
                                    {tod.status === "в работе" ? (
                                      <div>{tod.status}</div>
                                    ) : (
                                      ""
                                    )}
                                    <div>{tod.time}</div>
                                  </Card>
                                </div>
                              </>
                            ) : (
                              ""
                            )}
                          </>
                        ))}

                    </div>
                  </>
                )}
                </div>
              </div>
          
          </ul>
        </div>
      </div>
    );
  }
}

export default TodoAssignUserBy;
