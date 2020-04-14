import React, { Component } from "react";
import { isAuthenticated } from "../Api/Auth";
import { Redirect, Link } from "react-router-dom";
import { Spin, Typography, Popover, Skeleton, Avatar } from "antd";
import {
  read,
  AllStatistic,
  userActive,
  UserActiveMounthAndYear,
} from "../Api/Http";
import DefaultProfile from "../Assets/default.png";
import moment from "moment";

import Error from "../Error/Error.jsx";
import { Button, Timeline } from "antd";
import Moment from "react-moment";
import { ResponsiveCalendar } from "@nivo/calendar";
import Online from "./Online.jsx";
import {
  TeamOutlined,
  UserOutlined,
  PhoneOutlined,
  WhatsAppOutlined,
  CoffeeOutlined,
} from "@ant-design/icons";
const { Text } = Typography;

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: [],
      open: true,
      error: false,
      static: [],
      browserCalendar: false,
      activUser: [],
      loading: true,
      userId: "",
    };
  }
  init = (userId) => {
    this.setState({ userId: userId });
    read(userId).then((data) => {
      if (data.error) {
        this.setState({ error: true });
      } else {
        this.setState({ user: data });
      }
    });
    AllStatistic(userId).then((data) => {
      let total_installment = 0;
      if (data === "Not found") {
        this.setState({ browserCalendar: false, open: false });
      } else {
        this.setState({ static: data, open: false });
        userActive(userId).then((data) => {
          this.setState({ activUser: data, loading: false });
        });
      }
    });
  };
  initNotCalendar = (userId) => {
    read(userId).then((data) => {
      if (data.error) {
        this.setState({ error: true });
      } else {
        this.setState({ user: data });
      }
      this.setState({ open: false });
    });
  };
  componentDidMount() {
    const userId = this.props.match.params.userId;

    let browsingID = isAuthenticated().direct._id;
    let browsingRole = isAuthenticated().direct.role;
    const rolesBrowser = ["Директор", "Управляющий"];

    if (rolesBrowser.includes(browsingRole)) {
      this.setState({ browserCalendar: true });
      this.init(userId);
    } else if (browsingID === userId) {
      this.setState({ browserCalendar: true });
      this.init(userId);
    } else {
      this.initNotCalendar(userId);
    }
  }

  componentWillReceiveProps(props) {
    const userId = props.match.params.userId;
    this.init(userId);
  }
  calendarClick = (e) => {
    this.setState({ loading: true });
    let { userId } = this.state;
    let Mounth = moment(e.date).locale("ru").format("MM");
    let Year = moment(e.date).locale("ru").format("YY");
    let Day = moment(e.date).locale("ru").format("YY");
    let Body = {
      userId,
      Year,
      Mounth,
    };
    UserActiveMounthAndYear(Body).then((data) => {
      this.setState({ loading: false, activUser: data });
    });
  };
  renderPopoverTeam = (todo) => {
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
          {todo.JobArray.map((job, i) => (
            <>
              {job.user.length === 33 ? (
                <Link to={`/user/${job.user.slice(0, -9)}`}>
                  <Avatar
                    src={`${
                      process.env.REACT_APP_API_URL
                    }/user/photo/${job.user.slice(0, -9)}?`}
                    shape="square"
                  />
                </Link>
              ) : (
                <Link to={`/user/${job.user}`}>
                  <Avatar
                    src={`${process.env.REACT_APP_API_URL}/user/photo/${job.user}?`}
                    shape="square"
                  />
                </Link>
              )}
              <div
                dangerouslySetInnerHTML={{
                  __html: job.action,
                }}
              ></div>
              <div>{job.date}</div>
              <hr />
            </>
          ))}
          <div>
            <span style={{ marginRight: "15px" }}></span>
            <Avatar
              src={`${process.env.REACT_APP_API_URL}/user/photo/${todo.posted_by}?`}
            />
          </div>
        </Link>
      </>
    );
  };
  renderPopoverSystem = (todo) => {
    return <>1</>;
  };
  renderPopoverAgent = (todo) => {
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
  renderPopoverSolo = (todo) => {
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
          <div>{todo.title}</div>
          <div dangerouslySetInnerHTML={{ __html: todo.description }} />
          <hr />
          <div>
            <span style={{ marginRight: "15px" }}></span>
            <Link to={`/user/${todo.posted_by}`}>
              <Avatar
                src={`${process.env.REACT_APP_API_URL}/user/photo/${todo.posted_by}?`}
              />
            </Link>
          </div>
        </Link>
      </>
    );
  };
  render() {
    const { redirectToSignin, user, open, error, browserCalendar } = this.state;
    const photoUrl = user._id
      ? `${process.env.REACT_APP_API_URL}/user/photo/${
          user._id
        }?${new Date().getTime()}`
      : DefaultProfile;
    const avatarBolean = user.avatar;
    const userId = user._id;
    var d = new Date();
    let curr_year = d.getFullYear();
    let minimalDateYear = `${curr_year}-01-01`;
    let maximumDateYear = `${curr_year}-12-31`;
    const RussianLocalisation = [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ];
    let data = this.state.static;
    return (
      <div>
        <div>
          {error ? <Error /> : null}
          {open ? (
            <>
              <Spin size="large" />
            </>
          ) : (
            <>
              <div className="postisitonRelativeSmeni">
                <div className="container">
                  <div class="row">
                    <div class="mb-4">
                      <div className="avatar">
                        <img
                          style={{ height: "260px", width: "260px" }}
                          onError={(i) => (i.target.src = `${DefaultProfile}`)}
                          src={photoUrl}
                        />
                        <div style={{ padding: "5px" }}>
                          <h1 className="name_user">Имя: {user.name}</h1>
                          <h2 style={{ backgroundColor: "#fcff38" }}>
                            Должность: {user.role}
                          </h2>
                        </div>
                        <div>
                          <Text type="secondary"> {user.Date_of_Birth}</Text>
                        </div>
                        <div>
                          <Text type="secondary"> {user.phone}</Text>
                        </div>
                        <div>
                          <Text type="secondary"> {user.email}</Text>
                        </div>
                      </div>
                    </div>
                    <div className="activiti-list">
                      {browserCalendar ? (
                        <>
                          <Timeline>
                            <Skeleton
                              paragraph={{ rows: 5 }}
                              active
                              loading={this.state.loading}
                            >
                              <div>
                                <Timeline>
                                  {this.state.activUser.map((active, i) => (
                                    <>
                                      {active.status === "system" ? (
                                        <Popover
                                          content={
                                            <>
                                              {this.renderPopoverSystem(active)}
                                            </>
                                          }
                                        >
                                          <Timeline.Item
                                            style={{ margin: "5px" }}
                                            dot={
                                              <WhatsAppOutlined
                                                style={{
                                                  fontSize: "16px",
                                                  color: "purple",
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
                                                {this.renderPopoverSolo(active)}
                                              </>
                                            }
                                          >
                                            <Timeline.Item
                                              style={{ margin: "5px" }}
                                              dot={
                                                <UserOutlined
                                                  style={{
                                                    fontSize: "16px",
                                                    color: "#621aff",
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
                                                {this.renderPopoverTeam(active)}
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
                                                      {job.user === userId
                                                        ? console.log(user)
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
                              </div>
                            </Skeleton>
                          </Timeline>
                        </>
                      ) : null}
                    </div>
                    {browserCalendar ? (
                      <>
                        <div className="profile_statistic" id="footer">
                          <div className="footer-bar"></div>
                          <div className="dSnone profile_statistic_chart">
                            <ResponsiveCalendar
                              className="dSnone"
                              data={data}
                              monthLegend={(year, month) =>
                                RussianLocalisation[month]
                              }
                              from={minimalDateYear}
                              to={maximumDateYear}
                              onClick={this.calendarClick}
                              emptyColor="#eeeeee"
                              colors={[
                                "#61cdbb",
                                "#97e3d5",
                                "#e8c1a0",
                                "#f47560",
                              ]}
                              margin={{
                                top: 40,
                                right: 40,
                                bottom: 40,
                                left: 40,
                              }}
                              yearSpacing={40}
                              monthBorderColor="#ffffff"
                              dayBorderWidth={2}
                              dayBorderColor="#ffffff"
                              tooltip={function (e) {
                                return (
                                  <>
                                    {data[0].day}
                                    <h5 className="dSnone">
                                      Назначено дел: {data[0].assigned_todo}
                                    </h5>
                                    <h5>
                                      Выполеннено дел: {data[0].todo_complete}
                                    </h5>
                                    <h5 className="dSnone">
                                      Сделано коментариев:{data[0].comment}
                                    </h5>
                                    <h5></h5>
                                  </>
                                );
                              }}
                              legends={[
                                {
                                  anchor: "bottom-right",
                                  direction: "row",
                                  translateY: 36,
                                  itemCount: 4,
                                  itemWidth: 42,
                                  itemHeight: 36,
                                  itemsSpacing: 14,
                                  itemDirection: "right-to-left",
                                },
                              ]}
                            />
                          </div>
                        </div>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}
export default Profile;
