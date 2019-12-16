import React, { Component } from "react";
import { isAuthenticated } from "../Api/Auth";
import { UserSecurityList, GetIpData } from "../Api/Http.js";
import Error from "../Error/Error.jsx";
import Moment from "react-moment";
import { Popover, Button,Icon } from "antd";

import platform from "platform";

export default class Security extends Component {
  constructor() {
    super();
    this.state = {
      user: "",
      security: [],
      error: false,
      name: "",
      os_architecture: "",
      os_family: "",
      city: "",
      country: "",
      timezone: ""
    };
  }
  init = userId => {
    UserSecurityList(userId).then(data => {
      if (data.error) {
        console.log(data.error);
        this.setState({ error: true });
      } else {
        this.setState({ security: data });
      }
    });
  };
  componentDidMount() {
    const userId = isAuthenticated().direct._id;
    this.setState({ user: userId });
    this.init(userId);
  }
  userDeviceInfo(security_data) {
    console.log(security_data);
    var info = platform.parse(security_data);
    this.setState({
      name: info.name,
      os_architecture: info.os.architecture,
      os_family: info.os.family
    });
  }
  geoIplocation(ip) {
    console.log(ip)
    GetIpData(ip).then(data => {
      console.log(data)
      if (data === null) {
        return false;
      } else {
        this.setState({
          city: data.city,
          country: data.country,
          timezone: data.timezone
        });
      }
    });
  }
  render() {
    let {
      security,
      error,
      name,
      os_architecture,
      os_family,
      city,
      country,
      timezone
    } = this.state;
    // geoip.lookup(one.user_ip)
    return (
      <div className="postisitonRelativeSmeni">
        {error ? <Error /> : null}
        <div className="container">
          <div className="row">
            <div className="mb-4">
              {security.map((one, i) => (
                <>
                  {" "}
                  <div style={{ padding: "5px" }}>
                    <Popover
                      placement="bottom"
                      title={<div>Информация о подключении</div>}
                      content={
                        <>
                          <div> С браузера: {name}</div>
                          <div>
                            {" "}
                            Операционная система:{os_family} {os_architecture}{" "}
                          </div>
                          <Popover
                            placement="bottom"
                            content={
                              <>
                                <div>Город: {city}</div>
                                <div>Страна: {country}</div>
                                <div>ТаймЗона: {timezone}</div>
                              </>
                            }
                            title={<div>Информация об IP.</div>}
                          >
                            <div
                              onClick={ip =>
                                this.geoIplocation(one.user_ip, ip)
                              }
                            >
                              IP точки авторизации: {one.user_ip}
                            </div>
                          </Popover>
                        </>
                      }
                      trigger="click"
                    >
                      <div
                        onClick={security_data =>
                          this.userDeviceInfo(
                            one.user_security_data,
                            security_data
                          )
                        }
                      >
                        {
                          <h5 style={{ padding: "5px" }}>
                            Авторизация
                            <Moment 
                            format="YYYY/MM/DD"
                              locale="ru"
                              style={{ padding: "5px" }}
                            >
                              {one.date}
                              
                            </Moment>
                            <Icon theme="twoTone" twoToneColor="#eb2f96"  style={{ fontSize: '32px' }} type="api" />
                          </h5>
                        }
                      </div>
                    </Popover>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
