import React, { Component } from "react";
import { isAuthenticated } from "../Api/Auth";
import { TodayWorkHTTP, MytodoComandItsDay } from "../Api/Http";
import { Link } from "react-router-dom";
import { Button, Card, Badge, Spin, Icon, Popover,Skeleton } from "antd";
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
      open: true
    };
  }
  componentDidMount() {
    const user = isAuthenticated().direct._id;
    this.setState({ userID: user });
    this.init(user);
  }

  init = user => {
    let TodoArray = [];
    TodayWorkHTTP(user)
      .then(data => {
        console.log("SOLO ",data)
        if (data.error) {
          this.setState({ redirectToSignin: true });
        } else {
          for (let i = 0; data.todos.length > i; i++) {
            TodoArray.push(data.todos[i]);
          }
          let userId = user + "IAMWORKED";
          MytodoComandItsDay(userId).then(data => {
            if (data.error) {
            } else {
              console.log(data)
              for (let i = 0; data.length > i; i++) {
                TodoArray.push(data[i]);
              }
              this.setState({ todos: TodoArray,open:false });
              // console.log(data)
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
    // console.log(todos)
    return (
      <div
        style={{ display: "block", marginBottom: "34px" }}
        className="container"
      >
        <div className="row">
        {todos.map((todo, i) => (
              <>
                {console.log(todo.JobArray.length)}
              </>
            ))}
          <Skeleton paragraph={{ rows: 20 }} active loading={this.state.open}>
          </Skeleton>
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
//         <Link
//           to={
//             todo.status === "system"
//               ? `/spec/job/${todo._id}`
//               : `/job/${todo._id}`
//           }
//         >
//           <div
//             style={{
//               color: "rgb(0, 0, 0)",
//               fontWeight: "bolder",
//               fontSize: "20px"
//             }}
//           >
//             {this.renderImortance(todo.importance)}
//           </div>
//           <div style={{ color: "rgb(0, 0, 0)" }}>
//             {todo.time}
//           </div>
//           <h5
//             style={{
//               color: "rgb(0, 0, 0)",
//               wordBreak: "break-word"
//             }}
//           >
//             {todo.title}
//           </h5>
//           <div style={{ color: "rgb(0, 0, 0)" }}>
//             {todo.date}
//           </div>
//           {todo.status === "system" ? (
//             <>
//               <Popover
//                 Popover
//                 content={<>{this.renderPopoverSolo(todo)}</>}
//                 title="Задача"
//               >
//                 <TeamOutlined
//                   style={{
//                     fontSize: "32px",
//                     color: "rgb(0, 0, 0)",
//                     marfin: "5px"
//                   }}
//                 />
//               </Popover>
//             </>
//           ) : null}
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