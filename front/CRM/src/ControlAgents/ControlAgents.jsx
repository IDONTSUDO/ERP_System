import React, { Component } from "react";
import { Button,Tabs, Icon  } from "antd";
import { ItegrationContrAgent, integrationList, agentStaticAtMail,agentStaticAtJob,agentStaticAtAll,agentStaticAtTech,agentStatiAtManager } from "../Api/Http";
import { isAuthenticated } from "../Api/Auth";
import Moment from "react-moment";
const { TabPane } = Tabs;

export default class ControlAgents extends Component {
  constructor() {
    super();
    this.state = {
      user: undefined,
      listIntegration: [],
      MailAgent:undefined,
      jobByAgent:undefined,
      agentAll:undefined,
      TechAgent:undefined,
      ManageToAgent:undefined
    };
  }
  componentDidMount() {
    let name = isAuthenticated().direct.name;
    let userId = isAuthenticated().direct._id;

    let userBy = {
      name,
      userId
    };
    this.setState({ user: userBy });
    integrationList().then(data => {
      this.setState({ listIntegration: data });
    })
    agentStaticAtMail().then(data =>{ this.setState({MailAgent:data.result})})
    agentStaticAtJob().then(data => {this.setState({jobByAgent:data.result})})
    agentStaticAtAll().then(data => { this.setState({agentAll:data.result})})
    agentStaticAtTech().then(data => {this.setState({TechAgent:data.result})})
    agentStatiAtManager().then(data => {this.setState({ManageToAgent:data.result})})
  }
  forceUpdate() {}
  integrationHelper = () => {
    let { user } = this.state;

    ItegrationContrAgent(user).then(data => {
      console.log(data);
    });
  };
  render() {
    return (
      <div>
        <div className="control_agent_main">
        <Tabs defaultActiveKey="2">
    <TabPane
      tab={
        <span>
          <Icon type="dashboard" />
          Статиска контр агентов
        </span>
      }
      key="1"
    >
     <div className="itg_icon">
       <h1>Всего КонтрАгентов: {this.state.agentAll}</h1><hr/>
       <Icon style={{ fontSize: '32px',color: '#ebe134'  }} className="icon_width_itg" type="mail" />
       <h2>{`Email заполненных: ${this.state.MailAgent} из ${this.state.agentAll}`}</h2>
       <Icon style={{ fontSize: '32px',color: '#13e83a'  }} className="icon_width_itg" type="audit" />
       <h2>{`Дел выполненно:${this.state.jobByAgent}`}</h2>
       <Icon style={{ fontSize: '32px',color: '#eb3434'  }} className="icon_width_itg" type="exclamation-circle" />
       <h2>{`Не назначеные  ${this.state.ManageToAgent}`}</h2>
       <div >
     
       </div>
     </div>
    </TabPane>
    <TabPane
      tab={
        <span>
         <Icon type="cloud-sync" />
          Синхронизации
        </span>
      }
      key="2"
    >
        <div>
            <Button onClick={() =>this.integrationHelper()}>
              {" "}
              Синхронизация с 1-С
            </Button>
           <h1>Последниее синхронизции</h1>
           
                {this.state.listIntegration.map((itg, i) => (
                  <div >
                    {/* <div>{itg.userBy}</div> */}

                    <Moment fromNow>{itg.date}</Moment>
                  </div>
                ))}
              </div>
    </TabPane>
  </Tabs>
        </div>
      </div>
    );
  }
}
