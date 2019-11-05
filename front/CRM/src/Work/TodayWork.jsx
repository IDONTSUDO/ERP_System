import React, { Component } from 'react'
import {isAuthenticated} from "../Api/Auth"
import {TodayWorkHTTP,MytodoComandItsDay} from '../Api/Http'
import {Link} from 'react-router-dom'
import { Button,Card,Badge,Spin } from 'antd'
import Moment from "react-moment";
import 'moment/locale/ru';
export default class TodayWork extends Component {
    constructor(){
        super()
        this.state = {
            userID:"",
            todos:[],
            comand:[],
            open:false
        }
    }
    componentDidMount(){
        const user = this.props.match.params.userId
        this.setState({userID:user})
        this.init(user)

    }
    
    init = user =>{

        let TodoArray = [];
        const token = isAuthenticated().token  
        TodayWorkHTTP(user)
            .then(data =>{
                if(data.error){
                    this.setState({redirectToSignin: true})
                }else{             
                    for (let i = 0; data.todos.length > i; i++) {
                        TodoArray.push(data.todos[i]);
                    }
                    let userId =  user + "IAMWORKED"
                    MytodoComandItsDay(userId).then(data =>{
                        if(data.error){

                        }else{
                            for (let i = 0; data.length > i; i++) {
                                TodoArray.push(data[i]);
                            }
                            this.setState({todos: TodoArray})
                            // console.log(data)
                        }
                    })
                }
            }).catch(data =>{
                console.log(data)
            })
    }
    returnSort = () => {
        const {userId} = this.state
        const token = isAuthenticated().token  
        TodayWorkHTTP(userId)
            .then(data =>{
                if(data.error){
                    this.setState({redirectToSignin: true})
                }else{             
                    
                    Object.keys(data)
                    this.setState({todos: data.todos})
                }
            }).catch(data =>{
                console.log(data)
            })
    }
    yellowSort = ()=>{
      
        const {todos} = this.state
        var YellowSortArray = []
        for (let i = 0; todos.length > i; i++) { 
          if(todos[i].importance === "Средней важности"){
            console.log(todos[i].importance)
            YellowSortArray.push(todos[i])
          }

        }
        this.setState({todos:YellowSortArray})
      
    }
    greenSort = () => {

        const {todos} = this.state
        var GreenSortArray = []
        for (let i = 0; todos.length > i; i++) { 
          if(todos[i].importance === "Не очень важное"){
            GreenSortArray.push(todos[i])
          }

        }
        this.setState({todos:GreenSortArray})
    }
    redSort = () => {
        const {todos} = this.state
        var RedSortArray = []
        for (let i = 0; todos.length > i; i++) { 
          if(todos[i].importance === "Очень важное"){
            RedSortArray.push(todos[i])
          }

        }
        this.setState({todos:RedSortArray})
    }
    render() {
        const {todos,userID,comand,open} = this.state
        
        return (
            <div className="postisitonRelativeSmeni">
            <div>
              <ul>
                <div className="container">
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
                              <div className="todo-phone-red">
                                <Card className="todo-red" key={i}>
                                <Badge count={tod.JobArray.length}></Badge>
                                  <Link to={`/job/${tod._id}`}>
                                    <h3  style={{ color: "#ffffff" }}>
                                      {tod.title}
                                    </h3>
                                  
                                  </Link>
                                  {tod.JobArray.map((todoOne, i) => (
                                <>
                                {todoOne.user == userID + "IAMWORKED" ? (
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
                                  {tod.status === "в работе"  ? (
                                    <div style={{color:"#f0f2f5"}}>
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
                                                     <div className="todo-phone-yellow">
                                <Card className="todo-yellow" key={i}>
                                <Badge  style={{ backgroundColor: '#ffff00', color: '#000000', boxShadow: '0 0 0 1px #000000 inset' }} count={tod.JobArray.length}></Badge>
                                  <Link to={`/job/${tod._id}`}>
                                    <h3>
                                      {tod.title}
                                    </h3>
                                  </Link>
                                  {tod.JobArray.map((todoOne, i) => (
                                <>
                                {todoOne.user == userID  + "IAMWORKED"? (
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
                                    <div>
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
                                     <div className="todo-phone-green">
                                <Card className="todo-green" key={i}>
                                <Badge style={{ backgroundColor: '#15b11a', color: '#000000', boxShadow: '0 0 0 1px #000000 inset' }} count={tod.JobArray.length}></Badge>
                                  <Link to={`/job/${tod._id}`}>
                                    <h3 >
                                      {tod.title}
                                    </h3>
                                  </Link>
                                  {tod.JobArray.map((todoOne, i) => (
                                <>
                                {todoOne.user == userID + "IAMWORKED" ? (
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
                      tod.comand == false ? (
                        <>
                          <div className="todo-phone-red">
                            <Card className="todo-red" key={i}>
                              <Link to={`/job/${tod._id}`}>
                                <h3 style={{ color: "#ffffff" }}>{tod.title}</h3>
                              </Link>
                              {tod.status === "в работе" ? (
                                <div style={{ color: "#ffffff" }}>
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
                      {tod.importance === "Средней важности" &&
                      tod.comand == false ? (
                        <>
                          <div className="todo-phone-yellow">
                            <Card className="todo-yellow" key={i}>
                              <Link to={`/job/${tod._id}`}>
                                <h3 style={{ color: "#141412" }}>{tod.title}</h3>
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
                      tod.comand == false ? (
                        <>
                          <div className="todo-phone-green">
                            <Card className="todo-green">
                              <Link to={`/job/${tod._id}`}>
                                <h3 style={{ color: "#ffffff" }}>{tod.title}</h3>
                              </Link>
                              {tod.status === "в работе" ? (
                                <div>
                                  {tod.status}
                                </div>
                              ) : (
                                ""
                              )}
                              <div style={{ color: "#ffffff" }}>{tod.time}</div>
                            </Card>
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                    </>
                  ))}
                  {comand.map((tod, i) => (
                    <>
                      {tod.importance === "Очень важное" ? (
                        <>
                          <div className="todo-phone-red">
                            <Card className="todo-comand-red" key={i}>
                              <Link to={`/job/${tod._id}`}>
                                <h3 style={{ color: "#ffffff" }}>{tod.title}</h3>
                              </Link>
                              {tod.status === "в работе" ? (
                                <div>
                                  {tod.status}
                                </div>
                              ) : (
                                ""
                              )}
                              <div style={{ color: "#fff5f5" }}>{tod.time}</div>
                            </Card>
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                      {tod.importance === "Средней важности" ? (
                        <>
                          <div className="todo-phone-yellow">
                            <Card className="todo-comand-yellow" key={i}>
                              <Link to={`/job/${tod._id}`}>
                                <h3 style={{ color: "#141412" }}>{tod.title}</h3>
                              </Link>
                              {tod.status === "в работе" ? (
                                <div className="todo-text-status-job">
                                  {tod.status}
                                </div>
                              ) : (
                                ""
                              )}
    
                              <div style={{ color: "#141412" }}>{tod.time}</div>
                            </Card>
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                      {tod.importance === "Не очень важное" ? (
                        <>
                          <div className="todo-phone-green">
                            <Card className="todo-comand-green">
                              <Link to={`/job/${tod._id}`}>
                                <h3 style={{ color: "#ffffff" }}>{tod.title}</h3>
                              </Link>
                              {tod.status === "в работе" ? (
                                <div className="todo-text-status-green">
                                  {tod.status}
                                </div>
                              ) : (
                                ""
                              )}
                              <div style={{ color: "#ffffff" }}>{tod.time}</div>
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
