import React, { Component } from "react";
import { NewPeopel } from "../Api/Http";
import { Icon, notification, Select,Button,DatePicker } from "antd";
import { isAuthenticated } from "../Api/Auth";
const { Option } = Select;

class NewWorker extends Component {
  constructor() {
    super(); 
    this.state = {
      startDate: new Date(),
      name: "",
      email: "",
      role: "",
      password: "",
      error: "",
      Date_of_Birth:Date.now(),
      phone: ""
    };
  }

  handleChangeInput = name => event => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };
  handleChangeDate = date => {
    this.setState({
      startDate: date
    });
  };
  setRole = () => {
    console.log(200);
  };
  clickSetStatusCompleteJob = value => {
    if (value === "Директор") {
      this.setState({ role: "Директор" });
    }
    if (value === "Менеджер") {
      this.setState({ role: "Менеджер" });
    }
    if (value === "Бухгалтер") {
      this.setState({ role: "Бухгалтер" });
    }
    if (value === "Кладовщик") {
      this.setState({ role: "Кладовщик" });
    }
    if (value === "Логист") {
      this.setState({ role: "Логист" });
    }
    if (value === "Управляющий") {
      this.setState({ role: "Управляющий" });
    }
  };
  clickSubmit = event => {
    event.preventDefault();
    if (this.isValid()) {
      const { name, email, password, phone, role, startDate } = this.state;
      let yyyy = startDate.getFullYear();
      let mm = startDate.getMonth();
      let dd = startDate.getDate();
      //
      let FuckingDataPicker = +mm + 1;
      //
      let ItsRealyFucking = "0" + FuckingDataPicker;
      //
      let Date_of_Birth = dd + "/" + ItsRealyFucking + "/" + yyyy;

      const user = {
        name,
        email,
        password,
        phone,
        role,
        Date_of_Birth
      };
      const token = isAuthenticated().token;
      NewPeopel(user, token).then(data => {
        if (data.error) {
          this.openNotificationError();
        } else this.openNotificationNewWorker();
        this.setState({
          error: "",
          name: "",
          email: "",
          password: "",
          phone: ""
        });
      });
    }
  };
  isValid = () => {
    const { name, email, role, password } = this.state;
    if (name.length === 0) {
      this.setState({ error: "Имя  является обязательным параметром" });
      return false;
    }
    if (!/^\w+([\.-]?\w+)*@\w([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      this.setState({ error: "Email не валиден" });
      return false;
    }
    if (password.length === 0) {
      this.setState({ error: "Пароль является обязательным параметром" });
      return false;
    }
    if (role.length === 0) {
      this.setState({
        error: "Роль является обязательным параметром",
        loading: false
      });
      return false;
    }
    return true;
  };
  onChangeworkerDate = (date, dateString) => {
    this.setState({ Date_of_Birth: date });
  };
  openNotificationError() {
    notification.open({
      message: "Ой что то пошло не так, мне жаль",
      icon: <Icon type="frown" style={{ color: "#108ee9" }} />
    });
  }
  openNotificationNewWorker() {
    notification.open({
      message: "Новый работник успешно добавлен в систему!",
      icon: <Icon type="smile" style={{ color: "#108ee9" }} />
    });
  }
  openNotificationErrorValidation() {
    const { error } = this.state;
    notification.open({
      message: `${error}`,
      icon: <Icon type="frown" style={{ color: "#108ee9" }} />
    });
  }

  handleChange = value => {
    if (value != undefined) {
      this.clickSetStatusCompleteJob(value);
    } else {
      return;
    }
  };
  render() {
    const { name, email, password, error, phone } = this.state;
    return (
      <div className="postisitonRelativeSmeni">
        <div className="container">
          <h2 className="mt-5 mb-5">Новый пользователь</h2>
          <form>
            <div className="form-group">
              <label className="text-muted">Полное имя</label>
              <input
                onChange={this.handleChangeInput("name")}
                type="text"
                className="form-control"
                value={name}
              />
            </div>
            <div className="form-group">
              <label className="text-muted">Email</label>
              <input
                onChange={this.handleChangeInput("email")}
                type="email"
                className="form-control"
                value={email}
              />
            </div>
            <div className="form-group">
              <label className="text-muted">Пароль</label>
              <input
                onChange={this.handleChangeInput("password")}
                type="password"
                className="form-control"
                value={password}
              />
            </div>
            <div className="form-group">
              <label className="text-muted">Номер телефона</label>
              <input
                onChange={this.handleChangeInput("phone")}
                type="number"
                className="form-control"
                value={phone}
              />
            </div>
            <div className="form-group">
              <div style={{ padding: "10px" }}></div>
              <DatePicker
                placeholder={"Дата рождения"}
                showToday={false}
                selected={this.state.Date_of_Birth}
                onChange={this.onChangeworkerDate}
              />
            </div>
            <div className="form-group">
              <label for="exampleFormControlSelect1">Роль</label>
              <Select
                className="form-control"
                defaultValue="Роль"
                onChange={this.handleChange}
              >
                <Option value="Директор">Директор</Option>
                <Option value="Управляющий">Управляющий</Option>
                <Option value="Менеджер">Менеджер</Option>
                <Option value="Бухгалтер">Бухгалтер</Option>
                <Option value="Кладовщик">Кладовщик</Option>
                <Option value="Логист">Логист</Option>
              </Select>
            </div>
            <Button
              onClick={this.clickSubmit}
            >
              Отправить
            </Button>
          </form>
        </div>
        {error.length > 2 ? this.openNotificationErrorValidation() : ""}
      </div>
    );
  }
}
export default NewWorker;
