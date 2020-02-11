import React, { Component } from "react";

import {Link} from 'react-router-dom'
import { Button,Card,Badge,Spin } from 'antd'
import Moment from "react-moment";
import Error from "../Error/Error.jsx"

import { GetAgentMountAndYear } from "../Api/Http";
import { isAuthenticated } from "../Api/Auth";
class AgentTask extends Component {
  constructor() {
    super();
    this.state = {
      todos:[],
      userID:String,
      open:true
    };
  }
  componentDidMount() {
  

    const agentId = this.props.match.params.agentId;
    const Year = this.props.match.params.year
    const Mounth = this.props.match.params.month
    const userId = isAuthenticated().direct._id;


    GetAgentMountAndYear(agentId, Year, Mounth).then(data => {
      this.setState({todos:data,open:false,userID:userId})
      
    });
  }
  render() {
 
      const {todos,userID,open} = this.state
        
      return (
        <div className="postisitonRelativeSmeni">
        <div>
          <ul>
            <div className="container">
              <div className="row">
              {open ? (
              <Spin size="large" />
            ) : (
              <>
              {todos.map((tod, i) => (
                <>
                  {tod.comand === true ? (
                    <>
                      {tod.importance === "Очень важное" ? (
                        <>
                          <div className="card-job-modile-style  todo-phone-red">
                            <Card className="todo-red" key={i}>
                            <Badge count={tod.JobArray.length}></Badge>
                              <Link to={`/agent/task/${tod._id}`}>
                                <div  className="todo-red-text">
                                  {tod.title}
                                </div>
                              
                              </Link>
                              {tod.JobArray.map((todoOne, i) => (
                            <>
                            {todoOne.user === userID + "IAMWORKED" ? (
                              <>
                               <div style={{ color: "#ffffff" }}>
                               {todoOne.date}
                              </div>
                              </>
                            ) : (
                              <></>
                            )}
                            </>
                          ))}
                              {tod.status === "в работе"  ? (
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
                                                 <div className="card-job-modile-style  todo-phone-yellow">
                            <Card className="todo-yellow" key={i}>
                            <Badge  style={{ backgroundColor: '#ffff00', color: '#000000', boxShadow: '0 0 0 1px #000000 inset' }} count={tod.JobArray.length}></Badge>
                              <Link to={`/agent/task/${tod._id}`}>
                                <div className="todo-yellow-text">
                                  {tod.title}
                                  </div>
                              </Link>
                              {tod.JobArray.map((todoOne, i) => (
                            <>
                            {todoOne.user === userID  + "IAMWORKED"? (
                              <>
                                <div>
                               {todoOne.date}
                              </div>
                              </>
                            ) : (
                              <></>
                            )}
                            </>
                          ))}
                              {tod.status === "в работе" ? (
                                <div >
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
  
                      <>
                        {tod.importance === "Не очень важное" ? (
                          <>
                            {tod.JobArray.map((todoOne, i) => (
                              <>
                                 <div className="card-job-modile-style  todo-phone-green">
                            <Card className="todo-green" key={i}>
                            <Badge style={{ backgroundColor: '#15b11a', color: '#000000', boxShadow: '0 0 0 1px #000000 inset' }} count={tod.JobArray.length}></Badge>
                              <Link to={`/agent/task/${tod._id}`}>
                                <div className="todo-green-text" >
                                  {tod.title}
                                </div>
                              </Link>
                              {tod.JobArray.map((todoOne, i) => (
                            <>
                            {todoOne.user === userID + "IAMWORKED" ? (
                              <>
                                <div   >
                               {todoOne.date}
                              </div>
                              </>
                            ) : (
                              <></>
                            )}
                            </>
                          ))}
                              {tod.status === "в работе" ? (
                                <div>
                                  {tod.status}
                                </div>
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
                      <div className="card-job-modile-style  todo-phone-red">
                        <Card className="todo-red" key={i}>
                          <Link to={`/agent/task/${tod._id}`}>
                            <div  className="todo-red-text">{tod.title}</div>
                          </Link>
                          {tod.status === "в работе" ? (
                            <div style={{ color: "#ffffff" }}>
                              {tod.status}
                            </div>
                          ) : (
                            ""
                          )}
                            <div  style={{ color: "#ffffff" }}>
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
                      <div className="card-job-modile-style  todo-phone-yellow">
                        <Card className="todo-yellow" key={i}>
                          <Link to={`/agent/task/${tod._id}`}>
                            <div className="todo-yellow-text">{tod.title}</div>
                          </Link>
                          {tod.status === "в работе" ? (
                            <div>
                              {tod.status}
                            </div>
                          ) : (
                            ""
                          )}
                            <div>
                            {tod.time}
                              </div>
                          
                        </Card>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                  {tod.importance === "Не очень важное" &&
                  tod.comand === false ? (
                    <>
                      <div className="card-job-modile-style  todo-phone-green">
                        <Card className="todo-green">
                          <Link to={`/agent/task/${tod._id}`}>
                            <div className="todo-green-text">{tod.title}</div>
                          </Link>
                          {tod.status === "в работе" ? (
                            <div >
                              {tod.status}
                            </div>
                          ) : (
                            ""
                          )}
                          <div >{tod.time}</div>
                        </Card>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </>
              ))}
             
              </>
            )}
                
              </div>
            </div>
          </ul>
        </div>
      </div>
    )
  }
}

export default AgentTask;
