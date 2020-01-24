import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { signin, authencate, isAuthenticated } from "../Api/Auth";
import { Spin } from "antd";

class Signin extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      error: "",
      redirectToRefer: false,
      loading: false
    };
  }
  handleChange = name => event => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };
  clickSubmit = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const { email, password } = this.state;
    const user = {
      email,
      password
    };

    signin(user).then(data => {
      if (data.error) {
        this.setState({ error: data.error, loading: false });
      } else {
        authencate(data, () => {
          this.setState({ redirectToRefer: true });

          window.location.reload();
        });
      }
    });
  };
  render() {
    const { email, password, error, redirectToRefer, loading } = this.state;
    if (redirectToRefer) {
      return <Redirect to="/news" refresh="true" />;
    }
    return (
      <>
        {isAuthenticated() ? null : (
          <div className="container">
            <div className="row">
            <div
              className="alert alert-danger"
              style={{ display: error ? "" : "none" }}
            >
              {error}
            </div>
            {loading ? (
              <div className="jumbotron text-center">
                <Spin size="large" />
              </div>
            ) : (
              null
            )}
            <form>
            <h2 className="">Авторизация</h2>
              <div className="form-group">
                <label className="text-muted">Email</label>
                <input
                  onChange={this.handleChange("email")}
                  type="email"
                  className="form-control"
                  value={email}
                />
              </div>
              <div className="form-group">
                <label className="text-muted">Пароль</label>
                <input
                  onChange={this.handleChange("password")}
                  type="password"
                  className="form-control"
                  value={password}
                />
              </div>
              <button
                onClick={this.clickSubmit}
                className="btn btn-raised btn-primary"
              >
                Отправить
              </button>
            </form>
            </div>
          </div>
        )}
      </>
    );
  }
}
export default Signin;
