import React, { Component } from "react";
import { isAuthenticated } from "../Api/Auth";
import { Redirect, Link } from "react-router-dom";
import { notification, Icon,Spin } from "antd";
import { read } from "../Api/Http";
import DefaultProfile from "../Assets/default.png";
import Moment from "react-moment";
class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: [],
      open: true,
      error: ""
    };
  }
  init = userId => {
    read(userId).then(data => {
      if (data.error) {
        this.openNotificationError();
      } else {
        this.setState({ user: data });
      }
      this.setState({open: false})
    });
  };

  componentDidMount() {
    const userId = this.props.match.params.userId;
    this.init(userId);
  }

  componentWillReceiveProps(props) {
    const userId = props.match.params.userId;
    this.init(userId);
  }
  openNotificationError() {
    notification.open({
      message: "Ой что то пошло не так, мне жаль",
      icon: <Icon type="frown" style={{ color: "#108ee9" }} />
    });
  }
  render() {
    const { redirectToSignin, user,open } = this.state;
    console.log(typeof user)
    const photoUrl = user._id
    const avatarBolean = user.avatar
      
    return (
      <div className="postisitonRelativeSmeni">
        {open ? (
          <><Spin size="large"/></>
        ):(
          <>
           <div className="">
          <h2 className="">Профиль сотрудника </h2>
          <div className="">
            <div className="">
            <img
                style={{ height: "200px", width: "auto" }}
                className="img-thumbnail"
                onError={i => (i.target.src = `${DefaultProfile}`)}
                src={photoUrl}
              />

              <div className="">
                <p>Имя: {user.name}</p>
                <p>Должность: {user.role}</p>
                <p>Дата рождения: {user.Date_of_Birth}</p>
                <p>Телефон: {user.phone}</p>
                <p>Email: {user.email}</p>
                <Moment  locale="ru" format="D MMM YYYY">
                  {user.created}
                </Moment>

              </div>
            </div>
          </div>
        </div>
          </>
        )}
      </div>
    );
  }
}
export default Profile;
