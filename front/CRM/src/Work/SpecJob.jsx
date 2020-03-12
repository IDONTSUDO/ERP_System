import React, { Component } from "react";
import {
  soloJob,
  MyTodoMount,
  NewComentSpecTodo,
  GetAgentMountAndYear
} from "../Api/Http.js";
import { Link,Redirect } from "react-router-dom";
import { isAuthenticated } from "../Api/Auth";
// import { ResponsivePieCanvas } from "@nivo/pie";
import Localisation from "../helper/LocalisationCalendar.json";
import DefaultProfile from "../Assets/default.png";
import {
  TeamOutlined,
  UserOutlined,
  PhoneOutlined,
  WhatsAppOutlined,
  CoffeeOutlined
} from "@ant-design/icons";
import None from "../Components/None.jsx";
import {
  Icon,
  Popover,
  Comment,
  Badge,
  Avatar,
  Form,
  Button,
  List,
  Input,
  Rate,
  Calendar,
  Tabs,
  notification,
  Spin,
  Skeleton
} from "antd";

import moment from "moment";

const { TextArea } = Input;
const { TabPane } = Tabs;

let today = moment(Date.now());

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <div>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>

    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Новый коментарий
      </Button>
    </Form.Item>
  </div>
);
class SpecJob extends Component {
  constructor() {
    super();
    this.state = {
      err: false,
      task: [],
      comments: [],
      submitting: false,
      value: "",
      todoMounth: [],
      newTodoSetDate: undefined,
      rate: undefined,
      dateSelect: undefined,
      userIdView: undefined,
      agent: [],
      todosAtAgent: [],
      peopelLoader: false,
      SelectDatedTodo: [],
      editorSwitcher: false,
      comentEditId: "",
      description: "",
      EditCommentLoad: false,
      open:true
    };
  }
  componentDidMount() {
    let specId = this.props.match.params.specId;
    let agentId;
    soloJob(specId).then(data => {
      if (data.err) {
        this.setState({ err: true });
      } else {
        agentId = data.agentByTodo[0]._id;
        this.setState({ task: data, agent: data.agentByTodo[0] });
        let Mounth = moment()
          .locale("ru")
          .format("MM");
        let Year = moment()
          .locale("ru")
          .format("YY");
        GetAgentMountAndYear(agentId, Year, Mounth).then(agentData => {
          this.setState({ comments: agentData, open: false });
        });
      }
    });

    let startdate = Date.now();
    let user = isAuthenticated().direct._id;
    let mounthTodo = moment(startdate)
      .locale("ru")
      .format("MM");
    let yearTodo = moment(startdate)
      .locale("ru")
      .format("YY");

    MyTodoMount(mounthTodo, user, yearTodo).then(data => {
      if (data.err) {
        this.setState({ err: true });
      } else {
        this.setState({ todoMounth: data, userIdView: user });
      }
    });
  }
  handelRateChaange = e => {
    this.setState({ rate: e });
  };
  handelAnyChange = name => event => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };
  handelSelect = momentDate => {
    this.setState({ dateSelect: momentDate });
  };
  handleSubmit = () => {
    let {
      value,
      rate,
      task,
      dateSelect,
      userIdView,
      agent,
      SelectDay,
      diff,
      year,
      mounth,
      time
    } = this.state;
    if (!value) {
      let err = "коментария нет";
      return this.openNoticationErrorValiid(err);
    }
    if (dateSelect === undefined) {
      let err = "Дата не выбрана";
      return this.openNoticationErrorValiid(err);
    }
    if (!rate) {
      let err = "рейтинг не выставлен";
      return this.openNoticationErrorValiid(err);
    } else {
      this.setState({
        submitting: true
      });
      let agentID = agent._id;
      let workerId = userIdView;
      let taskId = task._id;
      let description = value;
      let posted_by = isAuthenticated().direct._id;
      let name_posted = isAuthenticated().direct.name;
      let importance = "Очень важное";
      let tags = [isAuthenticated().direct._id];
      task._id = undefined;
      let user = {
        _id: isAuthenticated().direct._id,
        name: isAuthenticated().direct.name
      };
      let newTodo = {
        SelectDay,
        diff,
        year,
        mounth,
        time,
        description,
        rate,
        tags,
        importance,
        name_posted,
        posted_by
      };
      let body = {
        user,
        task,
        rate,
        agentID,
        workerId,
        taskId,
        newTodo
      };

      NewComentSpecTodo(body).then(data => {
        console.log(data);
      });
    }
  };
  dateCellRender = value => {
    const listData = this.state.todoMounth;

    let days = moment().diff(value, "days");

    let itemQuality = 0;
    let jobArray = 0;
    let SoloTodo = 0;
    let systemTodo = 0;
    let timeInteration;
    let time = moment(value)
      .locale("ru")
      .format("LL");
    listData.map((item, i) =>
      time === item.time
        ? (itemQuality++,
          item.JobArray.length != 0 ? jobArray++ : SoloTodo++,
          item.status === "system" ? systemTodo++ : null)
        : null
    );
    return (
      <ul className="events">
        {systemTodo === 0 ? null : (
          <>
            <PhoneOutlined />
          </>
        )}
        {jobArray === 0 ? null : (
          <>
            <TeamOutlined />
          </>
        )}
        {SoloTodo === 0 ? null : (
          <>
            <UserOutlined />
          </>
        )}
        {itemQuality === 0 ? null : (
          <>
            <Badge
              status={
                days >= 1
                  ? "red"
                  : days >= 1
                  ? "yellow"
                  : days > -6
                  ? "yellow"
                  : days <= -6
                  ? "green"
                  : null
              }
              text={itemQuality}
            />
          </>
        )}
      </ul>
    );
  };
  handelAnyChange = name => event => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };
  monthCellRender = () => {};

  calendarChange = e => {
    let data = moment(e)
      .locale("ru")
      .format("LL");
    let todoDate = moment(e)
      .locale("ru")
      .format("LL");
    let time = moment(e)
      .locale("ru")
      .format("LL");
    let mounth = moment(e)
      .locale("ru")
      .format("MM");
    let year = moment(e)
      .locale("ru")
      .format("YY");

    let diff = [];
    diff.push(moment(e).toDate());
    this.setState({
      SelectDay: todoDate,
      diff: diff,
      year: year,
      mounth: mounth,
      time: time
    });
    if (this.state.switchCalendarEditor) {
      this.showModal();
    } else {
      const listData = this.state.todoMounth;
      let time = moment(e).format("L");

      let SelectDatedTodo = [];
      listData.map((todo, i) =>
        time === moment(todo.diff[0]).format("L")
          ? SelectDatedTodo.push(todo)
          : null
      );
      this.setState({ SelectDatedTodo: SelectDatedTodo });
    }
    this.setState({ newTodoSetDate: data });
  };
  handleChange = e => {
    this.setState({
      value: e.target.value
    });
  };
  editorComments = (id, data) => {
    this.setState({ description: data });
    this.setState({ comentEditId: id });
    let { editorSwitcher } = this.state;
    if (editorSwitcher === false) {
      this.setState({ editorSwitcher: true });
    } else {
      this.setState({ editorSwitcher: true });
    }
  };
  openNoticationErrorValiid = err => {
    notification.open({
      message: `${err}`,
      icon: <Icon type="frown" style={{ color: "#108ee9" }} />
    });
  };
  changePodPanel = tabsActiveNum => {
    if (tabsActiveNum === "2") {
      this.setState({ peopelLoader: true });
    }
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
  changePanel = key => {
    if (key === "2") {
      console.log(key);
    }
  };
  EditComment = () => {};
  render() {
    const { comments, submitting, value, agent } = this.state;

    return (
      <div className="email_main_pos">
        <div>
        <Skeleton paragraph={{ rows: 20 }} active loading={this.state.open}>
        <Icon type="question" />
          <Tabs onChange={this.changePanel} defaultActiveKey="1">
            <TabPane tab="Коментарий" key="1">
              <Comment
                content={
                  <>
                    {this.state.SelectDatedTodo.map((todo, i) => (
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
                                  color: "#673AB7",
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
                                  fontSize: "30px",
                                  color: "#03A9F4",
                                  marfin: "5px"
                                }}
                              />
                            </Popover>
                          </>
                        )}
                      </>
                    ))}
                    <Calendar
                      // headerRender={(<><h1>Ваш график дел</h1></>)}
                      locale={Localisation}
                      mode="month"
                      dateCellRender={this.dateCellRender}
                      monthCellRender={this.monthCellRender}
                      validRange={[
                        moment(new Date()),
                        moment(new Date()).add(13, "days")
                      ]}
                      fullscreen={true}
                      className="calendar_body"
                      onChange={this.calendarChange}
                      onSelect={this.handelSelect}
                    />

                    <Rate
                      onChange={this.handelRateChaange}
                      allowClear={false}
                      defaultValue={3}
                    />
                    <Editor
                      onChange={this.handleChange}
                      onSubmit={this.handleSubmit}
                      submitting={submitting}
                      value={value}
                    />
                  </>
                }
              />
            </TabPane>
            <TabPane tab="Прошлая активность" key="2">
              <List
                dataSource={comments}
                header={`Всего:${comments.length}`}
                itemLayout="horizontal"
                renderItem={item => (
                  <div className="comment-and-todo-list">
                    {item.status === "system" ? (
                      <div>
                        <Comment
                          actions={[
                            <span
                              onClick={id =>
                                this.editorComments(
                                  item._id,
                                  item.description,
                                  id
                                )
                              }
                              key="comment-nested-reply-to"
                            >
                              редактировать
                            </span>
                          ]}
                          author={<a>{item.user.name}</a>}
                          avatar={
                            <Link to={`/user/${item.user._id}`}>
                              <Avatar
                                src={`${process.env.REACT_APP_API_URL}/user/photo/${item.user._id}?`}
                                alt={item.user.name}
                              />
                            </Link>
                          }
                          content={<p>{item.description}</p>}
                        ></Comment>
                        <Rate
                          disabled={true}
                          allowClear={false}
                          defaultValue={item.rate}
                        />
                      </div>
                    ) : (
                      <>
                        <div className="bg-item-spec-job">
                          <div>Статус: {item.status}</div>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: item.description
                            }}
                          />
                          <div>{item.name_posted}</div>
                          <div>Описание:{item.title}</div>
                        </div>
                      </>
                    )}
                  </div>
                )}
              />
            </TabPane>
            <TabPane tab="Агент" key="3">
              <Tabs onChange={this.changePodPanel} type="card">
                <TabPane tab="Профиль" key="1">
                  <div className="agent-profile-info">
                    {/* font-size: 20px;
    color: black */}
                    <div>
                      Короткое имя:
                      <None tag={agent.name} />
                    </div>
                    <div>
                      Полное имя:
                      <None tag={agent.full_name} />
                    </div>
                    <div>
                      Email:
                      <None tag={agent.email} />
                    </div>
                    <div>
                      Телефон :<None tag={agent.phone} />
                    </div>
                    <div>
                      ИНН:
                      <None tag={agent.INN} />
                    </div>
                    <div>
                      ОГРН: <None tag={agent.OGRN} />
                    </div>
                    <div>
                      Специализация: <None tag={agent.agentGeo} />
                    </div>
                    <div>
                      Техника: <None tag={agent.TechAgent} />
                    </div>
                    <Link to={`/agent/edit/${agent._id}`}>
                      <Button style={{ marginTop: "20px" }}>
                        Редактировать
                      </Button>
                    </Link>
                  </div>
                </TabPane>
                <TabPane tab="Люди" key="2">
                  {this.state.peopelLoader ? (
                    <Spin style={{ margin: " 8px" }} size="large" />
                  ) : (
                    <></>
                  )}
                </TabPane>
                <TabPane tab="Статистика" key="3">
                  <div className="agentChart">
                    {/* <ResponsivePieCanvas
                      data={data}
                      margin={{ top: 40, right: 200, bottom: 40, left: 80 }}
                      pixelRatio={1}
                      startAngle={-180}
                      endAngle={357}
                      innerRadius={0.1}
                      padAngle={0.7}
                      cornerRadius={3}
                      colors={{ scheme: "paired" }}
                      borderColor={{
                        from: "color",
                        modifiers: [["darker", 0.6]]
                      }}
                      radialLabelsSkipAngle={10}
                      radialLabelsTextXOffset={6}
                      radialLabelsTextColor="#333333"
                      radialLabelsLinkOffset={0}
                      radialLabelsLinkDiagonalLength={16}
                      radialLabelsLinkHorizontalLength={24}
                      radialLabelsLinkStrokeWidth={1}
                      radialLabelsLinkColor={{ from: "color" }}
                      slicesLabelsSkipAngle={10}
                      slicesLabelsTextColor="#333333"
                      animate={true}
                      motionStiffness={90}
                      motionDamping={15}
                      defs={[
                        {
                          id: "dots",
                          type: "patternDots",
                          background: "inherit",
                          color: "rgba(255, 255, 255, 0.3)",
                          size: 4,
                          padding: 1,
                          stagger: true
                        },
                        {
                          id: "lines",
                          type: "patternLines",
                          background: "inherit",
                          color: "rgba(255, 255, 255, 0.3)",
                          rotation: -45,
                          lineWidth: 6,
                          spacing: 10
                        }
                      ]}
                      fill={[
                        {
                          match: {
                            id: "ruby"
                          },
                          id: "dots"
                        },
                        {
                          match: {
                            id: "c"
                          },
                          id: "dots"
                        },
                        {
                          match: {
                            id: "go"
                          },
                          id: "dots"
                        },
                        {
                          match: {
                            id: "python"
                          },
                          id: "dots"
                        },
                        {
                          match: {
                            id: "scala"
                          },
                          id: "lines"
                        },
                        {
                          match: {
                            id: "lisp"
                          },
                          id: "lines"
                        },
                        {
                          match: {
                            id: "elixir"
                          },
                          id: "lines"
                        },
                        {
                          match: {
                            id: "javascript"
                          },
                          id: "lines"
                        }
                      ]}
                      legends={[
                        {
                          anchor: "right",
                          direction: "column",
                          translateX: 140,
                          itemWidth: 60,
                          itemHeight: 14,
                          itemsSpacing: 2,
                          symbolSize: 14,
                          symbolShape: "circle"
                        }
                      ]}
                    /> */}
                  </div>
                </TabPane>
              </Tabs>
            </TabPane>
          </Tabs>
        </Skeleton>
        </div>
        {this.state.editorSwitcher ? (
          <>
            <Form.Item>
              <TextArea
                rows={4}
                onChange={this.handelAnyChange("description")}
                value={this.state.description}
              />
            </Form.Item>
            <Form.Item>
              <Button
                htmlType="submit"
                loading={this.state.EditCommentLoad}
                onClick={this.EditComment}
                type="primary"
              >
                Редактировать
              </Button>
            </Form.Item>
          </>
        ) : null}
      </div>
    );
  }
}

export default SpecJob;
