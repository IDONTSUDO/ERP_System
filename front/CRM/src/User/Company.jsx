import React, { Component } from "react";
import { list, DeleteUser } from "../Api/Http";
import { isAuthenticated } from "../Api/Auth";
import DefaultProfile from "../Assets/default.png";
import { Link } from "react-router-dom";
import { Button, Card } from "antd";
import Error from "../Error/Error.jsx";

export default class Company extends Component {
  constructor() {
    super();
    this.state = {
      worker: [],
      page: 1,
      error: false
    };
  }
  componentDidMount() {
    this.LoadCompanyUser(this.state.page);
  }
  handleClick(userId) {
  
    DeleteUser(userId).then(data => {
      if (data.error) {
        this.state({ error: true });
        console.log(data.error);
      } else {
        this.forceUpdate();
      }
    });
  }

  handleChange = name => event => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };

  forceUpdate() {
    const { page } = this.state;

    
    list(page).then(data => {
      if (data.error) {
        this.state({ error: true });
        console.log(data.error);
      } else {
        this.setState({ worker: data });
      }
    });
  }

  LoadCompanyUser = page => {
    list(page)
      .then(data => {
        this.setState({ worker: data });
      })
      .catch(data => {
        console.log(data);
      });
  };

  loadMore = number => {
    this.setState({ page: this.state.page + number });
    this.LoadCompanyUser(this.state.page + number);
  };

  loadLess = number => {
    this.setState({ page: this.state.page - number });
    this.LoadCompanyUser(this.state.page - number);
  };

  render() {
    const { worker, page, error } = this.state;

    return (
      <div className="postisitonRelativeSmeni">
        <div style={{ padding: "5px" }}>
          {error ? <Error></Error> : null}
          <div className="row">
            {worker.map((user, i) => (
              <>
                <div className=""></div>

                <Card size="small" title={<b>{user.role}</b>}>
                  {user.avatar === true ? (
                    <img
                      className="card-img-top"
                      src={`http://localhost:8080/user/photo/${user._id}?`}
                      alt={user.name}
                      style={{ height: "50px", width: "50px" }}
                    />
                  ) : (
                    <img
                      className="card-img-top"
                      src={`${DefaultProfile}`}
                      style={{ height: "50px", width: "50px" }}
                    />
                  )}

                  <h5 className="card-title">{user.name}</h5>
                  <p className="card-text">{user.email}</p>

                  <Button>
                    <Link to={`/user/${user._id}`}>Посмотреть профиль</Link>
                  </Button>
                  
                  <div style={{ padding: "5px" }}></div>
                  <>
                    {isAuthenticated().direct.role === "Директор" ? (
                      <Button
                        type="danger"
                        onClick={userId => this.handleClick(user._id, userId)}
                      >
                        Удалить Пользователя
                      </Button>
                    ) : (
                      ""
                    )}
                  </>
                </Card>
              </>
            ))}
          </div>
          <div style={{ padding: "10px" }}></div>
          {worker.length ? (
            <Button
              style={{ padding: "5px" }}
              className="ButtonPosition"
              onClick={() => this.loadMore(1)}
            >
              Вперед
            </Button>
          ) : (
            ""
          )}
          {page > 1 ? (
            <Button
              style={{ padding: "5px" }}
              className="ButtonPosition"
              onClick={() => this.loadLess(1)}
            >
              Назад
            </Button>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}
