import React, { Component } from "react";
import { isAuthenticated } from "../Api/Auth";
import { TodayWorkHTTP, MytodoComandItsDay } from "../Api/Http";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  Badge,
  Spin,
  Icon,
  Popover,
  Skeleton,
  Avatar
} from "antd";
import Moment from "react-moment";
import Error from "../Error/Error.jsx";
import {
  TeamOutlined,
  UserOutlined,
  PhoneOutlined,
  WhatsAppOutlined,
  CoffeeOutlined
} from "@ant-design/icons";
import "moment/locale/ru";
import DefaultProfile from "../Assets/default.png";

export default class TodayWork extends Component {
  constructor() {
    super();
    this.state = {
      userID: "",
      todos: [],
      comand: [],
      open: true,
      user: ""
    };
  }
  componentDidMount() {
    const user = isAuthenticated().direct._id;
    this.setState({ userID: user });
    this.init(user);
  }

  init = user => {
    TodayWorkHTTP(user)
      .then(data => {
        if (data.error) {
          this.setState({ redirectToSignin: true });
        } else {
          this.setState({ todos: data.todos });
          let userId = user + "IAMWORKED";
          MytodoComandItsDay(userId).then(data => {
            if (data.error) {
            } else {
              this.setState({ comand: data, open: false, user: userId });
            }
          });
        }
      })
      .catch(data => {
        console.log(data);
      });
  };
  renderPopoverComand = todo => {
    return todo.JobArray.map((tod, i) => (
      <>
        <img src={tod.user} alt="" />
        <div dangerouslySetInnerHTML={{ __html: tod.action }} />
        <div>{tod.date}</div>
      </>
    ));
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
  renderPopoverTeam = todo => {
    return (
      <>
        {todo.JobArray.map((job, i) => (
          <>
            {job.user.length === 33 ? (
              <Link to={`/user/${job.user.slice(0, -9)}`}>
                <Avatar
                  src={`${
                    process.env.REACT_APP_API_URL
                  }/user/photo/${job.user.slice(0, -9)}?`}
                  shape="square"
                />
              </Link>
            ) : (
              <Link to={`/user/${job.user}`}>
                <Avatar
                  src={`${process.env.REACT_APP_API_URL}/user/photo/${job.user}?`}
                  shape="square"
                />
              </Link>
            )}
            <div
              dangerouslySetInnerHTML={{
                __html: job.action
              }}
            ></div>
            <div>{job.date}</div>
            <hr />
          </>
        ))}
        <div>
          <span style={{ marginRight: "15px" }}></span>
          <Avatar
            src={`${process.env.REACT_APP_API_URL}/user/photo/${todo.posted_by}?`}
          />
        </div>
      </>
    );
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
    const { todos, userID, comand, open, user } = this.state;
    return (
      <div
        style={{ display: "block", marginBottom: "34px" }}
        className="container"
      >
        <div className="row">
          {todos.map((todo, i) => (
            <>
              <div className="card-job-modile-style  todo-phone-yellow">
                <Card className="todo-yellow">
                  <Link
                    to={
                      todo.status === "system"
                        ? `/spec/job/${todo._id}`
                        : `/job/${todo._id}`
                    }
                  >
                    <div
                      style={{
                        color: "rgb(0, 0, 0)",
                        fontWeight: "bolder",
                        fontSize: "20px"
                      }}
                    >
                      {this.renderImortance(todo.importance)}
                    </div>
                    <div style={{ color: "rgb(0, 0, 0)" }}>{todo.time}</div>
                    <h5
                      style={{
                        color: "rgb(0, 0, 0)",
                        wordBreak: "break-word"
                      }}
                    >
                      {todo.title}
                    </h5>
                    <div style={{ color: "rgb(0, 0, 0)" }}>{todo.date}</div>
                    {todo.status === "system" ? (
                      <>
                        <Popover
                          Popover
                          content={<>{this.renderPopoverSystem(todo)}</>}
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
                          content={<>{this.renderPopoverSolo(todo)}</>}
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
          ))}
          {comand.map((todo, i) => (
            <>
              <div className="card-job-modile-style  todo-phone-yellow">
                <Card className="todo-yellow">
                  <Link
                    to={
                      todo.status === "system"
                        ? `/spec/job/${todo._id}`
                        : `/job/${todo._id}`
                    }
                  >
                    <>
                      <div
                        style={{
                          color: "rgb(0, 0, 0)",
                          fontWeight: "bolder",
                          fontSize: "20px"
                        }}
                      >
                        {this.renderImortance(todo.importance)}
                      </div>

                      {todo.JobArray.map((tod, i) =>
                        tod.user === user ? <>{tod.date}</> : null
                      )}
                      <h5
                        style={{
                          color: "rgb(0, 0, 0)"
                          // wordBreak: "break-word"
                        }}
                      >
                        {todo.title}
                      </h5>
                    </>
                    <Popover
                      Popover
                      content={<>{this.renderPopoverTeam(todo)}</>}
                      title="Задача"
                    >
                      <TeamOutlined
                        style={{
                          fontSize: "32px",
                          color: "rgb(0, 0, 0)",
                          marfin: "5px"
                        }}
                      />
                    </Popover>
                  </Link>
                </Card>
              </div>
            </>
          ))}
          <Skeleton
            paragraph={{ rows: 20 }}
            active
            loading={this.state.open}
          ></Skeleton>
        </div>
      </div>
    );
  }
}
// {todo.JobArray.length === 0 ? (
//   <>
//   {console.log(todo)}
//     <div className="card-job-modile-style  todo-phone-yellow">
//       <Card className="todo-yellow">
// <Link
//   to={
//     todo.status === "system"
//       ? `/spec/job/${todo._id}`
//       : `/job/${todo._id}`
//   }
// >
// <div
//   style={{
//     color: "rgb(0, 0, 0)",
//     fontWeight: "bolder",
//     fontSize: "20px"
//   }}
// >
//   {this.renderImortance(todo.importance)}
// </div>
// <div style={{ color: "rgb(0, 0, 0)" }}>
//   {todo.time}
// </div>
// <h5
//   style={{
//     color: "rgb(0, 0, 0)",
//     wordBreak: "break-word"
//   }}
// >
//   {todo.title}
// </h5>
// <div style={{ color: "rgb(0, 0, 0)" }}>
//   {todo.date}
// </div>
// {todo.status === "system" ? (
//   <>
//     <Popover
//       Popover
//       content={<>{this.renderPopoverSolo(todo)}</>}
//       title="Задача"
//     >
//       <TeamOutlined
//         style={{
//           fontSize: "32px",
//           color: "rgb(0, 0, 0)",
//           marfin: "5px"
//         }}
//       />
//     </Popover>
//   </>
// ) : null}
//         </Link>
//       </Card>
//     </div>
//   </>
// ) : (
//   <>
//     {todo.JobArray.map((tod, i) => (
//       <>
//         <div className="card-job-modile-style  todo-phone-yellow">
//           <Card className="todo-yellow">
//             <Link
//               to={
//                 tod.status === "system"
//                   ? `/spec/job/${todo._id}`
//                   : `/job/${todo._id}`
//               }
//             >
//               <div
//                 style={{
//                   color: "rgb(0, 0, 0)",
//                   fontWeight: "bolder",
//                   fontSize: "20px"
//                 }}
//               >
//                 {this.renderImortance(todo.importance)}
//               </div>
//               <h5
//                 style={{
//                   color: "rgb(0, 0, 0)",
//                   wordBreak: "break-word"
//                 }}
//               >
//                 {todo.title}
//               </h5>
//               <div style={{ color: "rgb(0, 0, 0)" }}>
//                 {todo.date}
//               </div>
//               {todo.status === "system" ? (
//                 <>
//                   <Popover
//                     Popover
//                     content={
//                       <>{this.renderPopoverComand(todo)}</>
//                     }
//                     title="Задача"
//                   >
//                     <TeamOutlined
//                       style={{
//                         fontSize: "32px",
//                         color: "rgb(0, 0, 0)",
//                         marfin: "5px"
//                       }}
//                     />
//                   </Popover>
//                 </>
//               ) : null}
//             </Link>
//           </Card>
//         </div>
//       </>
//     ))}
//   </>
// )}
