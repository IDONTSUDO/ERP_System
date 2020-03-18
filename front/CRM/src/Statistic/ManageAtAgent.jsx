import React, { Component } from "react";
import {
  GetEnterpriseManageAtAgentStatistic,
  GetManagerAtAgent
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
  Popover
} from "antd";

import {
  LineChartOutlined,
  TeamOutlined,
  UserOutlined,
  PhoneOutlined,
  WhatsAppOutlined,
  CoffeeOutlined
} from "@ant-design/icons";
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
      activUser: []
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
    console.log(id);
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
                              <div>
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
                                    </span>
                                  </>
                                ))}
                              </div>
                              <div className="active">
                                {this.state.activeLoader ? (
                                  <Spin size="large" />
                                ) : (
                                  <Timeline>
                                    {this.state.activUser.map((active, i) => (
                                      <>
                                        {active.status === "system" ? (
                                          <Popover
                                            content={
                                              <>
                                                {this.renderPopoverSystem(
                                                  active
                                                )}
                                              </>
                                            }
                                          >
                                            <Timeline.Item
                                              style={{ margin: "5px" }}
                                              dot={
                                                <WhatsAppOutlined
                                                  style={{
                                                    fontSize: "16px",
                                                    color: "purple"
                                                  }}
                                                />
                                              }
                                              color="purple"
                                              label={active.time}
                                            >
                                              {active.title}
                                              <span> {active.time}</span>
                                            </Timeline.Item>
                                          </Popover>
                                        ) : active.JobArray.length === 0 ? (
                                          <>
                                            <Popover
                                              content={
                                                <>
                                                  {this.renderPopoverSolo(
                                                    active
                                                  )}
                                                </>
                                              }
                                            >
                                              <Timeline.Item
                                                style={{ margin: "5px" }}
                                                dot={
                                                  <UserOutlined
                                                    style={{
                                                      fontSize: "16px",
                                                      color: "#621aff"
                                                    }}
                                                  />
                                                }
                                                label={active.time}
                                              >
                                                {active.title}
                                              </Timeline.Item>
                                            </Popover>
                                          </>
                                        ) : (
                                          <>
                                            <Popover
                                              content={
                                                <>
                                                  {this.renderPopoverTeam(
                                                    active
                                                  )}
                                                </>
                                              }
                                            >
                                              <Timeline.Item
                                                style={{ margin: "5px" }}
                                                dot={
                                                  <TeamOutlined
                                                    style={{ fontSize: "16px" }}
                                                  />
                                                }
                                                color="blue"
                                              >
                                                {active.title}
                                                <span>
                                                  {active.JobArray.map(
                                                    (job, i) => (
                                                      <>
                                                        {job.user ===
                                                        this.state.manageId
                                                          ? console.log(
                                                              this.state
                                                                .manageId
                                                            )
                                                          : null}{" "}
                                                      </>
                                                    )
                                                  )}
                                                </span>
                                              </Timeline.Item>
                                            </Popover>
                                          </>
                                        )}
                                      </>
                                    ))}
                                  </Timeline>
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
