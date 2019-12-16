import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import { GetAgentProfile } from "../Api/Http";
import { notification,Icon,Table } from "antd";
import { isAuthenticated } from "../Api/Auth";
import Error from "../Error/Error.jsx"

export default class AllAgent extends Component {
  constructor() {
    super();
    this.state = {
      agentId: "",
      agentData:[],
      error:false
    };
  }
  componentDidMount() {
    let agnetIdRout = this.props.match.params.agentId
    this.setState({agentId:agnetIdRout})
    this.init(agnetIdRout)
  }
  init = agentId =>{
      console.log(agentId)
      GetAgentProfile(agentId).then(data => {
          if(data.error){
            this.setState({error:true})
          }else{
              this.setState({agentData:data.tags})
          }
      })
  }
  openNotificationError() {
    notification.open({
      message: "Ой что то пошло не так, мне жаль",
      icon: <Icon type="frown" style={{ color: "#108ee9" }} />
    });
  }
  render() {
    let { agentData,error } = this.state;
    
    return (
      <div className="postisitonRelativeSmeni">
          <div className="container">
              <div className="row">
                  {error ? (<>
                      {this.openNotificationError()}
                      </>):("")}
                  {agentData.map((agn, i) => (
                  <>
                  <div>
                  {i}
                  </div>
                  </>  
                  ))}
                  
              </div>
          </div>
      </div>
    );
  }
}
