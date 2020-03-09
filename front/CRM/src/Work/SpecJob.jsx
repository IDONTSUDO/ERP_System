import React, { Component } from "react";
import {
  soloJob,
  MyTodoMount,
  NewComentSpecTodo,
  GetAgentMountAndYear
} from "../Api/Http.js";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../Api/Auth";
import { ResponsivePieCanvas } from "@nivo/pie";
import Localisation from "../helper/LocalisationCalendar.json";
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
  Spin
} from "antd";

import moment from "moment";

const { TextArea } = Input;
const { TabPane } = Tabs;

const CommentList = ({ comments }) => (
  <>
    <List
      dataSource={comments}
      header={`Всего:${comments.length}`}
      itemLayout="horizontal"
      renderItem={item => (
        <>
          {item.status === "system" ? (
            <></>
          ) : (
            <>
              <div className="bg-item-spec-job">
                <div>Статус: {item.status}</div>
                <div dangerouslySetInnerHTML={{ __html: item.description }} />
                <div>{item.name_posted}</div>
                <div>Описание:{item.title}</div>
              </div>
            </>
          )}
        </>
      )}
    />
  </>
);
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
      peopelLoader:false
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

  handelSelect = momentDate => {
    this.setState({ dateSelect: momentDate });
  };
  handleSubmit = () => {
    let { value, rate, task, dateSelect, userIdView } = this.state;
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
      let agentID = task.agent._id;
      let workerId = userIdView;
      let taskId = task._id;
      let body = {
        value,
        rate,
        agentID,
        workerId,
        taskId
      };

      NewComentSpecTodo(body).then(data => {
        console.log(data);
      });
    }
  };
  dateCellRender = value => {
    let time = moment(value)
      .locale("ru")
      .format("LL");

    const listData = this.state.todoMounth;

    let days = moment(today).diff(value, "days");

    let itemQuality = 0;
    let timeInteration;

    listData.map((item, i) => (time === item.time ? itemQuality++ : null));

    return (
      <ul className="events">
        {itemQuality === 0 ? null : (
          <>
            <Badge status="error" text={itemQuality} />
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
    this.setState({ newTodoSetDate: data });
  };
  handleChange = e => {
    this.setState({
      value: e.target.value
    });
  };
  openNoticationErrorValiid = err => {
    notification.open({
      message: `${err}`,
      icon: <Icon type="frown" style={{ color: "#108ee9" }} />
    });
  };
  changePodPanel = tabsActiveNum => {
    if(tabsActiveNum === "2"){
      this.setState({peopelLoader:true})

    }

  };
  render() {
    const { comments, submitting, value, agent } = this.state;
    let data = [
      {
        id: "css",
        label: "css",
        value: 309,
        color: "hsl(18, 70%, 50%)"
      },
      {
        id: "php",
        label: "php",
        value: 19,
        color: "hsl(272, 70%, 50%)"
      },
      {
        id: "rust",
        label: "rust",
        value: 181,
        color: "hsl(178, 70%, 50%)"
      },
      {
        id: "ruby",
        label: "ruby",
        value: 76,
        color: "hsl(235, 70%, 50%)"
      },
      {
        id: "sass",
        label: "sass",
        value: 323,
        color: "hsl(214, 70%, 50%)"
      },
      {
        id: "go",
        label: "go",
        value: 46,
        color: "hsl(41, 70%, 50%)"
      },
      {
        id: "make",
        label: "make",
        value: 205,
        color: "hsl(210, 70%, 50%)"
      },
      {
        id: "haskell",
        label: "haskell",
        value: 385,
        color: "hsl(113, 70%, 50%)"
      },
      {
        id: "elixir",
        label: "elixir",
        value: 245,
        color: "hsl(134, 70%, 50%)"
      },
      {
        id: "c",
        label: "c",
        value: 526,
        color: "hsl(355, 70%, 50%)"
      },
      {
        id: "python",
        label: "python",
        value: 344,
        color: "hsl(316, 70%, 50%)"
      },
      {
        id: "lisp",
        label: "lisp",
        value: 508,
        color: "hsl(7, 70%, 50%)"
      },
      {
        id: "java",
        label: "java",
        value: 182,
        color: "hsl(50, 70%, 50%)"
      },
      {
        id: "javascript",
        label: "javascript",
        value: 573,
        color: "hsl(288, 70%, 50%)"
      },
      {
        id: "scala",
        label: "scala",
        value: 524,
        color: "hsl(222, 70%, 50%)"
      },
      {
        id: "erlang",
        label: "erlang",
        value: 305,
        color: "hsl(199, 70%, 50%)"
      },
      {
        id: "hack",
        label: "hack",
        value: 398,
        color: "hsl(108, 70%, 50%)"
      },
      {
        id: "stylus",
        label: "stylus",
        value: 395,
        color: "hsl(4, 70%, 50%)"
      }
    ];
    return (
      <div className="email_main_pos">
        <div>
          <Icon type="question" />
          <Tabs defaultActiveKey="1">
            <TabPane tab="Коментарий" key="1">
              <Comment
                content={
                  <>
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
              {comments.length > 0 && <CommentList comments={comments} />}
            </TabPane>
            <TabPane tab="Агент" key="3">
              <Tabs  onChange={this.changePodPanel} type="card">
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
                {this.state.peopelLoader ? (  <Spin style={{margin:" 8px"}} size="large" />):(<>
                
                
                
                








                  
                </>)}

                </TabPane>
                <TabPane tab="Статистика" key="3">
                  <div className="agentChart">
                    <ResponsivePieCanvas
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
                    />
                  </div>
                </TabPane>
              </Tabs>
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default SpecJob;
