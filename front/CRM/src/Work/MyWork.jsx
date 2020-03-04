import React, { Component } from "react";
import { isAuthenticated } from "../Api/Auth";
import { readMyTodo, MyTodoGetComandWorked } from "../Api/Http";
import { Link } from "react-router-dom";
import { Spin } from "antd";
import { Button, Card, Badge, Icon, Popover, Tabs } from "antd";
import { TeamOutlined } from "@ant-design/icons";
import CalendarJob from "./CalendarJob";
import TodayWork from "./TodayWork";
import moment from "moment";

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
      todo_midle: ""
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

    readMyTodo(userId).then(data => {
      if (data.error) {
        this.setState({ redirectToSignin: true });
      } else {
        Object.keys(data);

        for (let i = 0; data.todos.length > i; i++) {
          TodoArray.push(data.todos[i]);
        }

        let userfindString;

        userfindString = userId + "IAMWORKED";

        this.setState({ userID: userfindString });
        MyTodoGetComandWorked(userfindString).then(data => {
          if (data.error) {
            console.log(data.error);
          } else {
            for (let i = 0; data.result.length > i; i++) {
              TodoArray.push(data.result[i]);
            }
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
  agentPop = agent => {
    return agent.map((ag, i) => (
      <>
        {ag.name}
        {ag.full_name}
        {ag.phone}
      </>
    ));
  };

  renderToTodo(difference, todo) {
    // console.log(difference,difference >= 0 && difference <= -4)

    if (difference <= -10) {
      console.log(difference, "do 10");
      console.log(todo.diff);
      return <></>;
    }
    if (difference <= -3) {
      console.log(difference, "do 3");
      // console.log(difference)
      return <></>;
    }
    if (difference <= 0) {
      console.log(difference, "diference 0");
      // console.log(difference)
      return (
        <>
          <Card className="todo-yellow">
            {/* <Badge
              style={{
                backgroundColor: "#ffff00",
                color: "#000000",
                boxShadow: "0 0 0 1px #000000 inset"
              }}
              count={tod.JobArray.length}
            ></Badge> */}
            {/* <Link to={`/job/${tod._id}`}>
              <div className="todo-yellow-text">{tod.title}</div>
            </Link> */}
            {/* {tod.JobArray.map((todoOne, i) => (
              <>
                {todoOne.user === userID + "IAMWORKED" ? (
                  <>
                    <div>{todoOne.date}</div>
                  </>
                ) : (
                  <></>
                )}
              </>
            ))}
            {tod.status === "в работе" ? <div>{tod.status}</div> : ""} */}
          </Card>
        </>
      );
    }
    // if(difference >= 0 && difference <= -3 ){
    //   console.log("IF TRUE STAT TRUE")
    // }
    // switch(difference) {
    //   case(difference >= 0 && difference <= 4 ):{
    //     console.log("IF TRUE STAT TRUE")
    //   }
    // }
  }
  render() {
    const { todos, userID, comand, open } = this.state;
    let todo = isAuthenticated().direct.todo_middle;
    let Today = moment().format("L");
let todayMoment = moment()  .locale("ru")
.format("YY");
    return (
      <div className="postisitonRelativeSmeni">
        {todos.map((comTodo, i) => (
          <>
            {comTodo.JobArray.map((tod, i) => (
              <>
                {tod.user === userID ? (
                  <>
                    {moment().diff(moment(comTodo.diff[i]), "days") <= 0 ? (
                      <>
                        {moment().diff(moment(comTodo.diff[i]), "days") <=
                        -9 ? (
                          <div>div</div>
                        ) : moment().diff(moment(comTodo.diff[i]), "days") >=
                          -3 ? (
                          <> <div className="card-job-modile-style  todo-phone-yellow">
                            <Card className="todo-yellow">
                          <div style={{ color: "rgb(0, 0, 0)" }}>{tod.date === todayMoment ?(<></>):(<div></div>)}</div>
                            {comTodo.comand ? (
                                <>
                                  <Popover
                                    Popover
                                    content={<>wqqwe</>}
                                    title="Title"
                                  >
                                    <TeamOutlined
                                      style={{
                                        fontSize: "32px",
                                        color: "rgb(0, 0, 0)",
                                        marfin: "5px"
                                      }}
                                    />
                                  </Popover>
                                </>
                              ) : null}
                            </Card>
                            
                            </div></>
                        ) : null}
                      
                      
                      </>
                    ) : (
                      <>
                        <div className="card-job-modile-style  todo-phone-red">
                          <Card className="todo-red">
                            <Link to={`/job/${comTodo._id}`}>
                              <div style={{ color: "#ffffff" }}>{tod.date}</div>

                              {comTodo.comand ? (
                                <>
                                  <Popover
                                    Popover
                                    content={<>wqqwe</>}
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
                              <div className="todo-red-text">{tod._id}</div>
                            </Link>
                          </Card>
                        </div>
                      </>
                    )}
                    {moment(Today).isBefore(comTodo.diff[i]) ? (
                      <>
                        {moment().diff(moment(comTodo.diff[i]), "days") <=
                        -9 ? (
                          <div>div</div>
                        ) : moment().diff(moment(comTodo.diff[i]), "days") >=
                          -1 ? (
                          <div>div</div>
                        ) : null}

                        {/* {moment().diff(moment(comTodo.diff[i])) <= -4 ?(<div>div</div>):(null)} */}
                        {/* {moment().diff(moment(comTodo.diff[i])) <= -2 ?(<>div</>):(null)} */}
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <></>
                )}
              </>
            ))}
            {/* {comTodo.map.JobArray.map((tod, i) => (
              <>
                {tod.user === userID + "IAMWORKED" ? (
                  <>
                    <div>{tod.date}</div>
                  </>
                ) : (
                  <></>
                )}
              </>
            ))} */}
          </>
        ))}
      </div>
      //     <div className="postisitonRelativeSmeni">
      //        <Tabs  type="card">
      //          {/* onChange={callback} */}
      //   <TabPane tab="Дела на сегодня" key="1">
      //   <TodayWork/>
      //   </TabPane>
      //   <TabPane tab="Календарь дел" key="2">
      //   <CalendarJob/>
      //   </TabPane>
      //   <TabPane tab="Все дела" key="3">
      //   <div>
      //         <ul>
      //           <div className="container_button_job">
      //             <Button
      //               onClick={this.returnSort}
      //               className="square-return"
      //             ></Button>
      //             <Button
      //               onClick={this.yellowSort}
      //               className="square-yellow"
      //             ></Button>
      //             <Button
      //               onClick={this.greenSort}
      //               className="square-green"
      //             ></Button>
      //             <Button onClick={this.redSort} className="square-red"></Button>
      //           </div>

      //           <div className="container-job">
      //             <div className="row">
      //               {open ? (
      //                 <Spin size="large" />
      //               ) : (
      //                 <>
      //                   {todos.map((tod, i) => (
      //                     <>
      //                       {tod.cronId === undefined ? null : (
      //                         <>
      //                           <div className="tod-cron-phone">
      //                             <Card className="tod-cron">
      //                               <Link to={`/spec/job/${tod._id}`}>
      //                               <div className="todo-cron-text">
      //                                 {tod.title}
      //                               </div>
      //                               <div  style={{ color: "#ffffff" }}>{tod.time}</div>
      //                               <div  style={{ color: "#ffffff" }}>
      //                                 {tod.status}
      //                               </div>
      //                               <div>
      //                                 <Popover
      //                                   content={<><div>{tod.agent.full_name}</div></>}
      //                                   title={<>{tod.agent.company}</>}
      //                                   trigger="hover"
      //                                 >
      //                                   <Icon type="question" />
      //                                 </Popover>
      //                               </div>
      //                               <div>{tod.date}</div>
      //                             </Link>
      //                             </Card>
      //                           </div>
      //                         </>
      //                       )}
      //                       {tod.comand === true ? (
      //                         <>
      //                           {tod.importance === "Очень важное" ? (
      //                             <>
      //                               <div className="card-job-modile-style  todo-phone-red">
      //                                 <Card className="todo-red" key={i}>
      //                                   <Badge count={tod.JobArray.length}></Badge>
      //                                   <Link to={`/job/${tod._id}`}>
      //                                     <div className="todo-red-text">
      //                                       {tod.title}
      //                                     </div>
      //                                   </Link>
      //                                   {tod.JobArray.map((todoOne, i) => (
      //                                     <>
      //                                       {todoOne.user ===
      //                                       userID + "IAMWORKED" ? (
      //                                         <>
      //                                           <div style={{ color: "#ffffff" }}>
      //                                             {todoOne.date}
      //                                           </div>
      //                                         </>
      //                                       ) : (
      //                                         <></>
      //                                       )}
      //                                     </>
      //                                   ))}
      //                                   {tod.status === "в работе" ? (
      //                                     <div style={{ color: "#ffffff" }}>
      //                                       {tod.status}
      //                                     </div>
      //                                   ) : (
      //                                     ""
      //                                   )}
      //                                 </Card>
      //                               </div>
      //                             </>
      //                           ) : (
      //                             ""
      //                           )}
      //                           {tod.importance === "Средней важности" ? (
      //                             <>
      //                               <div className="card-job-modile-style  todo-phone-yellow">
      // <Card className="todo-yellow" key={i}>
      //   <Badge
      //     style={{
      //       backgroundColor: "#ffff00",
      //       color: "#000000",
      //       boxShadow: "0 0 0 1px #000000 inset"
      //     }}
      //     count={tod.JobArray.length}
      //   ></Badge>
      //   <Link to={`/job/${tod._id}`}>
      //     <div className="todo-yellow-text">
      //       {tod.title}
      //     </div>
      //   </Link>
      //   {tod.JobArray.map((todoOne, i) => (
      //     <>
      //       {todoOne.user ===
      //       userID + "IAMWORKED" ? (
      //         <>
      //           <div>{todoOne.date}</div>
      //         </>
      //       ) : (
      //         <></>
      //       )}
      //     </>
      //   ))}
      //   {tod.status === "в работе" ? (
      //     <div>{tod.status}</div>
      //   ) : (
      //     ""
      //   )}
      // </Card>
      //                               </div>
      //                             </>
      //                           ) : (
      //                             ""
      //                           )}

      //                           <>
      //                             {tod.importance === "Не очень важное" ? (
      //                               <>
      //                                 {tod.JobArray.map((todoOne, i) => (
      //                                   <>
      //                                     <div className="card-job-modile-style  todo-phone-green">
      //                                       <Card className="todo-green" key={i}>
      //                                         <Badge
      //                                           style={{
      //                                             backgroundColor: "#15b11a",
      //                                             color: "#000000",
      //                                             boxShadow:
      //                                               "0 0 0 1px #000000 inset"
      //                                           }}
      //                                           count={tod.JobArray.length}
      //                                         ></Badge>
      //                                         <Link to={`/job/${tod._id}`}>
      //                                           <div className="todo-green-text">
      //                                             {tod.title}
      //                                           </div>
      //                                         </Link>
      //                                         {tod.JobArray.map((todoOne, i) => (
      //                                           <>
      //                                             {todoOne.user ===
      //                                             userID + "IAMWORKED" ? (
      //                                               <>
      //                                                 <div>{todoOne.date}</div>
      //                                               </>
      //                                             ) : (
      //                                               <></>
      //                                             )}
      //                                           </>
      //                                         ))}
      //                                         {tod.status === "в работе" ? (
      //                                           <div>{tod.status}</div>
      //                                         ) : (
      //                                           ""
      //                                         )}
      //                                       </Card>
      //                                     </div>
      //                                   </>
      //                                 ))}
      //                               </>
      //                             ) : (
      //                               ""
      //                             )}
      //                           </>
      //                         </>
      //                       ) : (
      //                         ""
      //                       )}

      //                       {tod.importance === "Очень важное" &&
      //                       tod.comand === false ? (
      //                         <>
      //                           <div className="card-job-modile-style  todo-phone-red">
      //                             <Card className="todo-red" key={i}>
      //                               <Link to={`/job/${tod._id}`}>
      //                                 <div className="todo-red-text">
      //                                   {tod.title}
      //                                 </div>
      //                               </Link>
      //                               {tod.status === "в работе" ? (
      //                                 <div style={{ color: "#ffffff" }}>
      //                                   {tod.status}
      //                                 </div>
      //                               ) : (
      //                                 ""
      //                               )}
      //                               <div style={{ color: "#ffffff" }}>
      //                                 {tod.time}
      //                               </div>
      //                             </Card>
      //                           </div>
      //                         </>
      //                       ) : (
      //                         ""
      //                       )}
      //                       {tod.importance === "Средней важности" &&
      //                       tod.comand == false ? (
      //                         <>
      //                           <div className="card-job-modile-style  todo-phone-yellow">
      //                             <Card className="todo-yellow" key={i}>
      //                               <Link to={`/job/${tod._id}`}>
      //                                 <div className="todo-yellow-text">
      //                                   {tod.title}
      //                                 </div>
      //                               </Link>
      //                               {tod.status === "в работе" ? (
      //                                 <div>{tod.status}</div>
      //                               ) : (
      //                                 ""
      //                               )}
      //                               <div>{tod.time}</div>
      //                             </Card>
      //                           </div>
      //                         </>
      //                       ) : (
      //                         ""
      //                       )}
      //                       {tod.importance === "Не очень важное" &&
      //                       tod.comand === false ? (
      //                         <>
      //                           <div className="card-job-modile-style  todo-phone-green">
      //                             <Card className="todo-green">
      //                               <Link to={`/job/${tod._id}`}>
      //                                 <div className="todo-green-text">
      //                                   {tod.title}
      //                                 </div>
      //                               </Link>
      //                               {tod.status === "в работе" ? (
      //                                 <div>{tod.status}</div>
      //                               ) : (
      //                                 ""
      //                               )}
      //                               <div>{tod.time}</div>
      //                             </Card>
      //                           </div>
      //                         </>
      //                       ) : (
      //                         ""
      //                       )}
      //                     </>
      //                   ))}
      //                   {comand.map((tod, i) => (
      //                     <>
      //                       {tod.importance === "Очень важное" ? (
      //                         <>
      //                           <div className="card-job-modile-style  todo-phone-red">
      //                             <Card className="todo-comand-red" key={i}>
      //                               <Link to={`/job/${tod._id}`}>
      //                                 <h3 style={{ color: "#ffffff" }}>
      //                                   {tod.title}
      //                                 </h3>
      //                               </Link>
      //                               {tod.status === "в работе" ? (
      //                                 <div style={{ color: "#ffffff" }}>
      //                                   {tod.status}
      //                                 </div>
      //                               ) : (
      //                                 ""
      //                               )}
      //                               <div style={{ color: "#ffffff" }}>
      //                                 {tod.time}
      //                               </div>
      //                             </Card>
      //                           </div>
      //                         </>
      //                       ) : (
      //                         ""
      //                       )}
      //                       {tod.importance === "Средней важности" ? (
      //                         <>
      //                           <div className="card-job-modile-style  todo-phone-yellow">
      //                             <Card className="todo-comand-yellow" key={i}>
      //                               <Link to={`/job/${tod._id}`}>
      //                                 <h3 style={{ color: "#141412" }}>
      //                                   {tod.title}
      //                                 </h3>
      //                               </Link>
      //                               <div style={{ color: "#141412" }}>
      //                                 {tod.time}
      //                               </div>
      //                               {tod.status === "в работе" ? (
      //                                 <div className="todo-text-status-job">
      //                                   {tod.status}
      //                                 </div>
      //                               ) : (
      //                                 ""
      //                               )}
      //                             </Card>
      //                           </div>
      //                         </>
      //                       ) : (
      //                         ""
      //                       )}
      //                       {tod.importance === "Не очень важное" ? (
      //                         <>
      //                           <div className="card-job-modile-style  todo-phone-green">
      //                             <Card className="todo-comand-green">
      //                               <Link to={`/job/${tod._id}`}>
      //                                 <div className="todo-green-text">
      //                                   {tod.title}
      //                                 </div>
      //                               </Link>
      //                               {tod.status === "в работе" ? (
      //                                 <div style={{ color: "#ffffff" }}>
      //                                   {tod.status}
      //                                 </div>
      //                               ) : (
      //                                 ""
      //                               )}
      //                               <div style={{ color: "#ffffff" }}>
      //                                 {tod.time}
      //                               </div>
      //                             </Card>
      //                           </div>
      //                         </>
      //                       ) : (
      //                         ""
      //                       )}
      //                     </>
      //                   ))}
      //                 </>
      //               )}
      //             </div>
      //           </div>
      //         </ul>
      //       </div>
      //   </TabPane>
      // </Tabs>
      //     </div>
    );
  }
}
