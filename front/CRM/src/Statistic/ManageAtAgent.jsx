import React, { Component } from "react";
import {
  GetEnterpriseManageAtAgentStatistic,
  GetManagerAtAgent,
  GetUserActiveByAgent
} from "../Api/Http";
import {
  List,
  Avatar,
  Button,
  Skeleton,
  Collapse,
  Statistic,
  Spin,
  Timeline,
  Popover,
  Calendar,
  Badge
} from "antd";
import { Link } from "react-router-dom";
import moment from "moment";
import {
  LineChartOutlined,
  TeamOutlined,
  UserOutlined,
  PhoneOutlined,
  WhatsAppOutlined,
  CoffeeOutlined
} from "@ant-design/icons";
import Localisation from "../helper/LocalisationCalendar.json";
const { Panel } = Collapse;
export default class ManageAtAgent extends Component {
  constructor() {
    super();
    this.state = {
      manageAtAgent: [],
      loading: true,
      preloaderManageAtAgent: true,
      AgentAtManager: [],
      activeLoader: false,
      manageId: "",
      activUser: [],
      managerActive: [],
      daySelect: []
    };
  }
  componentDidMount() {
    GetEnterpriseManageAtAgentStatistic().then(data => {
      this.setState({ manageAtAgent: data, loading: false });
    });
  }
  helperManager = (id, key) => {
    console.log(id, ...key);
    console.log(...key);
    this.setState({ manageId: id });
    GetManagerAtAgent(id).then(data =>
      this.setState({ preloaderManageAtAgent: false, AgentAtManager: data })
    );
  };
  activeLoader = id => {
    this.setState({ activeLoader: true });
    let { manageId } = this.state;
    console.log(manageId, id);
    let FetchData = {
      manageId: manageId,
      agentId: id
    };
    GetUserActiveByAgent(FetchData).then(data => {
      this.setState({ managerActive: data, activeLoader: false });
    });
  };
  onSelect = value => {
    let time = moment(value).format("L");
    const listData = this.state.managerActive;
    let day = [];
    listData.map((todo, i) =>
      time === moment(todo.diff[0]).format("L") ? day.push(todo) : null
    );
    this.setState({ daySelect: day });
  };
  dateCellRender = value => {
    let time = moment(value).format("L");
    let day = 0;
    const listData = this.state.managerActive;
    listData.map((todo, i) =>
      time === moment(todo.diff[0]).format("L") ? day++ : null
    );
    return (
      <ul className="events">
        {day > 0 ? (
          <>
            <Badge color="#2db7f5" text={day} />
          </>
        ) : null}
      </ul>
    );
  };

  renderPopoverComand(item) {
    return (
      <Popover
        content={
          <>
            {item.JobArray.map((job, k) => (
              <>
                <div
                  dangerouslySetInnerHTML={{
                    __html: job.action
                  }}
                />
                <div>{job.date}</div>
                <div></div>
              </>
            ))}
            <div>
              <div>{item.time}</div>
            </div>
            <div>
              {item.names_workers_list.map((worker, i) => (
                <Link to={`/user/${item.tags[i]}`}>
                  <div>{worker}</div>
                </Link>
              ))}
            </div>
          </>
        }
        title={item.title}
        trigger="hover"
      >
        <div>{item.title}</div>{" "}
      </Popover>
    );
  }
  monthCellRender = value => {
    const listData = this.state.managerActive;
    let MounthTodo = 0;
    let Mounth = moment(value).format("MMMM");
    listData.map((todo, i) =>
      Mounth == moment(todo.diff[0]).format("MMMM") ? MounthTodo++ : null
    );
    return (
      <>
        <ul className="events">
          {MounthTodo > 0 ? (
            <>
              <Badge color="#2db7f5" text={MounthTodo} />
            </>
          ) : null}
        </ul>
      </>
    );
  };
  renderPopoverSystem = todo => {
    return (
      <>
        <Link
          to={
            todo.status === "system"
              ? `/spec/job/${todo._id}`
              : `/job/${todo._id}`
          }
          className="news"
        >
          <div>Имя:{todo.agentByTodo[0].name}</div>
          <div>Телефон:{todo.agentByTodo[0].phone}</div>
          <div>Полное имя:{todo.agentByTodo[0].full_name}</div>
          <div>Email:{todo.agentByTodo[0].email}</div>
        </Link>
      </>
    );
  };
  renderPopoverAgent = todo => {
    return (
      <>
        <Link
          to={
            todo.status === "system"
              ? `/spec/job/${todo._id}`
              : `/job/${todo._id}`
          }
          className="news"
        >
          <div>Имя:{todo.agentByTodo[0].name}</div>
          <div>Телефон:{todo.agentByTodo[0].phone}</div>
          <div>Полное имя:{todo.agentByTodo[0].full_name}</div>
          <div>Email:{todo.agentByTodo[0].email}</div>
          <div>
            Индивидуальные условия:
            {todo.agentByTodo[0].individual_conditions_job}
          </div>
          <div>Откуда пришел:{todo.agentByTodo[0].work_begin_with_him}</div>
        </Link>
      </>
    );
  };
  onPanelChange = value => {
    this.setState({ value });
  };
  render() {
    return (
      <div className="job-main-content">
        <List
          className="demo-loadmore-list"
          loading={this.state.loading}
          itemLayout="horizontal"
          style={{ margin: "5px" }}
          dataSource={this.state.manageAtAgent}
          renderItem={item => (
            <List.Item>
              <Skeleton
                avatar
                title={false}
                loading={this.state.loading}
                active
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={`${process.env.REACT_APP_API_URL}/user/photo/${item._id}?`}
                    />
                  }
                  description={
                    <>
                      <h1>{item.result}</h1>
                      <Collapse
                        onChange={itemId =>
                          this.helperManager(item._id, itemId)
                        }
                      >
                        <Panel header="Агенты" key="1">
                          <Skeleton
                            title={false}
                            loading={this.state.preloaderManageAtAgent}
                            active
                          >
                            <div className="list-agent-at-manager">
                              <div className="border-right">
                                {this.state.AgentAtManager.map((agent, i) => (
                                  <>
                                    <span
                                      onClick={id =>
                                        this.activeLoader(agent.el._id, id)
                                      }
                                    >
                                      <h1>Агент</h1>Имя:<b>{agent.el.name}</b>
                                      <Statistic
                                        title="Активность"
                                        value={agent.Counter}
                                        prefix={<LineChartOutlined />}
                                      />
                                      <hr />
                                    </span>
                                  </>
                                ))}
                              </div>
                              <div className="active">
                                {this.state.activeLoader ? (
                                  <Spin size="large" />
                                ) : (
                                  <>
                                  {this.state.daySelect.map((todo,i) =>(
                                    <>
                                    <>
              {todo.status === "system" ? (
                <>
                  <Popover
                    Popover
                    content={<>{this.renderPopoverSystem(todo)}</>}
                    title="Задача"
                  >
                    <WhatsAppOutlined
                      style={{
                        fontSize: "30px",
                        color: "rgb(103, 58, 183)",
                        marfin: "5px"
                      }}
                    />
                  </Popover>
                </>
              ) : (
                <>
                  {todo.JobArray.length === 0 ? (
                    <>
                      <Popover
                        Popover
                        content={<>{this.renderPopoverSolo(todo)}</>}
                        title="Задача"
                      >
                        <UserOutlined
                          style={{
                            fontSize: "30px",
                            color: "rgb(3, 169, 244)",
                            marfin: "5px"
                          }}
                        />
                      </Popover>
                    </>
                  ) : (
                    <>
                      <Popover
                        Popover
                        content={<>{this.renderPopoverTeam(todo)}</>}
                        title="Задача"
                      >
                        <TeamOutlined
                          style={{
                            fontSize: "30px",
                            color: "rgb(3, 169, 244)",
                            marfin: "5px"
                          }}
                        />
                      </Popover>
                    </>
                  )}
                </>
              )}
            </>
                                    </>
                                  ))}
                                    <Calendar
                                      dateCellRender={this.dateCellRender}
                                      monthCellRender={this.monthCellRender}
                                      locale={Localisation}
                                      style={{ width: "93%" }}
                                      onSelect={this.onSelect}
                                      onPanelChange={this.onPanelChange}
                                    />
                                  </>
                                )}
                              </div>
                            </div>
                          </Skeleton>
                        </Panel>
                      </Collapse>
                    </>
                  }
                />
              </Skeleton>
            </List.Item>
          )}
        />
      </div>
    );
  }
}
