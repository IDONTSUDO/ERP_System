import React, { Component } from "react";
import { isAuthenticated } from "../Api/Auth";
import { UserSecurityList } from "../Api/Http.js";
import Moment from "react-moment";
import "moment/locale/ru";

export default class Security extends Component {
  constructor() {
    super();
    this.state = {
      user: "",
      security: []
    };
  }
  init = userId => {
    UserSecurityList(userId).then(data => {
      if (data.error) {
        console.log(data.error);
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
  render() {
    let { security } = this.state;
    return (
      <div className="postisitonRelativeSmeni">
        <div className="container">
          <div className="row">
            {security.map((one, i) => (
              <>
                <div style={{ padding: "5px" }}>
                  Время
                  <Moment locale="ru" fromNow style={{ padding: "5px" }}>
                    {one.date}
                  </Moment>
                </div>
                <div style={{ padding: "5px" }}>
                  Информация о системе:{one.user_security_data}
                </div>
                <div style={{ padding: "5px" }}> IP: {one.user_ip}</div>
              </>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
