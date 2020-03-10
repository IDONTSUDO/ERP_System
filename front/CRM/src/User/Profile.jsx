import React, { Component } from "react";
import { isAuthenticated } from "../Api/Auth";
import { Redirect, Link } from "react-router-dom";
import { Spin, Typography } from "antd";
import { read, AllStatistic, userActive } from "../Api/Http";
import DefaultProfile from "../Assets/default.png";

import Error from "../Error/Error.jsx";
import { Button, Timeline } from "antd";
import Moment from "react-moment";
import { ResponsiveCalendar } from "@nivo/calendar";
import Online from "./Online.jsx";

const { Text } = Typography;

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: [],
      open: true,
      error: false,
      static: [],
      browserCalendar: false
    };
  }
  init = userId => {
    read(userId).then(data => {
      if (data.error) {
        this.setState({ error: true });
      } else {
        this.setState({ user: data });
      }
    });
    AllStatistic(userId).then(data => {
      let total_installment = 0;
      // console.log(typeof data)
      if (data === "Not found") {
        this.setState({ browserCalendar: false, open: false });
      } else {
        this.setState({ static: data, open: false });
        userActive(userId).then(data =>{
          console.log(data)
        })
      }
    });
  };
  initNotCalendar = userId => {
    read(userId).then(data => {
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
  calendarClick = e => {
    console.log(e);
  };
  render() {
    const { redirectToSignin, user, open, error, browserCalendar } = this.state;
    const photoUrl = user._id
      ? `${process.env.REACT_APP_API_URL}/user/photo/${
          user._id
        }?${new Date().getTime()}`
      : DefaultProfile;
    const avatarBolean = user.avatar;
    var d = new Date();
    let curr_year = d.getFullYear();
    let minimalDateYear = `${curr_year}-01-01`;
    let maximumDateYear = `${curr_year}-12-31`;
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
                          onError={i => (i.target.src = `${DefaultProfile}`)}
                          src={photoUrl}
                        />
                        {/* <Online  user={user._id}/> */}
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
                      <Timeline>
                        <Timeline.Item color="green">
                          TODO TODO TODO TODO 2015-09-01
                        </Timeline.Item>
                        <Timeline.Item color="green">
                        TODO TODO TODO TODO 2015-09-01
                        </Timeline.Item>
                        <Timeline.Item color="red">
                          <p>  TODO TODO TODO TODO 1</p>
                          <p>   TODO TODO TODO TODO2</p>
                          <p>   TODO TODO TODO TODO 3 2015-09-01</p>
                        </Timeline.Item>
                        <Timeline.Item>
                          <p>  TODO TODO TODO TODO 1  2015-09-01</p>
                          <p>   TODO TODO TODO TODO 2  2015-09-01</p>
                          <p>  TODO TODO TODO TODO 3 2015-09-01</p>
                        </Timeline.Item>
                        <Timeline.Item color="gray">
                          <p>  TODO TODO TODO TODO 1  2015-09-01</p>
                          <p>  TODO TODO TODO TODO 2  2015-09-01</p>
                          <p> TODO TODO TODO TODO 3 2015-09-01</p>
                        </Timeline.Item>
                        <Timeline.Item color="gray">
                          <p>  TODO TODO TODO TODO 1</p>
                          <p>  TODO TODO TODO TODO 2</p>
                          <p>   TODO TODO TODO TODO  3 2015-09-01</p>
                        </Timeline.Item>
                      </Timeline>
                    </div>
                    {browserCalendar ? (
                      <>
                        <div className="profile_statistic" id="footer">
                          <div className="footer-bar"></div>
                          <div className="dSnone profile_statistic_chart">
                            <ResponsiveCalendar
                              className="dSnone"
                              data={data}
                              from={minimalDateYear}
                              to={maximumDateYear}
                              onClick={this.calendarClick}
                              emptyColor="#eeeeee"
                              colors={[
                                "#61cdbb",
                                "#97e3d5",
                                "#e8c1a0",
                                "#f47560"
                              ]}
                              margin={{
                                top: 40,
                                right: 40,
                                bottom: 40,
                                left: 40
                              }}
                              yearSpacing={40}
                              monthBorderColor="#ffffff"
                              dayBorderWidth={2}
                              dayBorderColor="#ffffff"
                              tooltip={function(e) {
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
                                  itemDirection: "right-to-left"
                                }
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
