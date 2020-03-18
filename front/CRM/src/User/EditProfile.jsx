import React, { Component } from "react";
import { isAuthenticated } from "../Api/Auth";
import { read, update, updateUser } from "../Api/Http";
import { notification, Icon, Spin, DatePicker } from "antd";
import DefaultProfile from "../Assets/default.png";
import { Link, Redirect } from "react-router-dom";
import { Button } from "antd";

class EditProfile extends Component {
  constructor() {
    super();
    this.state = {
      redirectToProfile: false,
      id: "",
      name: "",
      email: "",
      password: "",
      error: "",
      fileSize: 0,
      loading: false,
      about: "",
      phone: "",
      Date_of_Birth: "",
      open: true
    };
  }

  init = userId => {
    read(userId).then(data => {
      if (data.error) {
        this.setState({ redirectToProfile: true });
      } else {
        if (data._id === userId) {
          this.setState({
            id: data._id,
            name: data.name,
            email: data.email,
            error: "",
            about: data.about,
            open: false
          });
        } else {
          this.setState({ redirectToProfile: true });
        }
      }
    });
  };
  componentDidMount() {
    let userId = isAuthenticated().direct._id;
    this.userData = new FormData();
    this.init(userId);
  }
  isValid = () => {
    const { name, email, password } = this.state;
    if (name.length === 0) {
      this.setState({
        error: "Имя является обязательным параметром",
        loading: false
      });
      return false;
    }
    if (!/^\w+([\.-]?\w+)*@\w([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      this.setState({ error: "Email  не валиден", loading: false });
      return false;
    }
    if (password.length === 0) {
      this.setState({ error: "пароль обязателен", loading: false });
      return false;
    }
    return true;
  };
  onChange = (date, dateString) => {
    this.setState({ Date_of_Birth: dateString });
  };
  handleChange = name => event => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    const fileSize = name === "photo" ? event.target.files[0].size : 0;
    this.userData.set(name, value);
    this.setState({ [name]: value, fileSize });
  };
  clickSubmit = event => {
    event.preventDefault();
    this.setState({ open: true });
    if (this.isValid()) {
      const userId = this.props.match.params.userId;
      let { Date_of_Birth } = this.state;
      this.userData.set("Date_of_Birth", Date_of_Birth);
      update(userId, this.userData).then(data => {
        if (data.error) {
          this.openNotificationError();
        } else {
          this.setState({
            name: data.direct.name,
            email: data.direct.email,
            error: "",
            open: false,
            password: ""
          });
          this.openNotificationEditProile();
          updateUser(data, () => {
            this.setState({
              redirectToProfile: true
            });
          });
        }
      });
    } else {
      this.setState({ open: false });
    }
  };
  openNotificationErrorValid = () => {
    let { error } = this.state;
    notification.open({
      message: `${error}`,
      icon: <Icon type="frown" style={{ color: "#108ee9" }} />
    });
    this.setState({ error: "" });
  };
  openNotificationError() {
    notification.open({
      message: "Ой что то пошло не так, мне жаль",
      icon: <Icon type="frown" style={{ color: "#108ee9" }} />
    });
  }
  openNotificationEditProile() {
    notification.open({
      message: "Ваш профиль изменен",
      icon: <Icon type="smile" style={{ color: "#108ee9" }} />
    });
  }
  SignUpForm = (name, email, password, phone, Date_of_Birth, about, id) => (
    <form>
      <div>
        <div style={{ padding: "5px" }}>
          <div class="upload-btn-wrapper">
            <button class="btn-uploaded">Выберете файл</button>
            <input
              onChange={this.handleChange("photo")}
              type="file"
              accept="image/*"
            />
          </div>
        </div>
      </div>
      <div>
        <label>Email</label>
        <input
          className="form-control"
          onChange={this.handleChange("email")}
          type="email"
          value={email}
        />
      </div>
      <div>
        <label>Пароль</label>
        <input
          className="form-control"
          onChange={this.handleChange("password")}
          type="password"
          value={password}
        />
      </div>
      <div>
        <label>Номер телефона</label>
        <input
          className="form-control"
          onChange={this.handleChange("phone")}
          type="number"
          value={phone}
        />
      </div>
      <div>
        <label>Дата рождения </label>
        <div>
          <DatePicker
            placeholder="Дата рождения"
            size="large"
            onChange={this.onChange}
          />
        </div>
      </div>
      <div>
        <label className="text-muted">Имя</label>
        <input
          className="form-control"
          onChange={this.handleChange("name")}
          type="text"
          value={name}
        />
      </div>
      <div style={{ padding: "10px" }}></div>
      <Button onClick={this.clickSubmit}>Обновить</Button>
    </form>
  );
  render() {
    const {
      id,
      password,
      name,
      email,
      error,
      loading,
      about,
      open,
      redirectToProfile,
      phone,
      Date_of_Birth
    } = this.state;
    if (redirectToProfile) {
      return <Redirect to={`/user/${id}`} />;
    }
    const photoUrl = id
      ? `${
          process.env.REACT_APP_API_URL
        }/user/photo/${id}?${new Date().getTime()}`
      : DefaultProfile;

    return (
      <div className="edit_profile_main">
        {error.length > 0 ? <>{this.openNotificationErrorValid()}</> : ""}
        {this.state.open ? (
          <>
            <Spin size="large" />
          </>
        ) : (
          <>
            <div className="container">
              <div class="row">
                <div class="col-8">
                  <h2 className="dSnone"> Редактирование профиля</h2>
                  {this.SignUpForm(
                    name,
                    email,
                    password,
                    phone,
                    Date_of_Birth,
                    about,
                    id
                  )}
                </div>
                <div class="col-4">
                  <>
                    <div style={{ padding: "10px" }}>
                      <img
                        className="dSnone"
                        style={{ height: "200px", width: "auto" }}
                        onError={i => (i.target.src = `${DefaultProfile}`)}
                        src={`http://localhost:8080/user/photo/${id}?`}
                        onerror={DefaultProfile}
                        alt={name}
                      />
                    </div>
                    <div className="dSnone" style={{ padding: "5px" }}></div>
                  </>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}
export default EditProfile;
