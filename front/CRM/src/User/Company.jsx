import React, { Component } from "react";
import { list, DeleteUser } from "../Api/Http";
import { isAuthenticated } from "../Api/Auth";
import DefaultProfile from "../Assets/default.png";
import { Link } from "react-router-dom";
import { Button } from "antd";
import Error from "../Error/Error.jsx";
import Online from "./Online.jsx";
export default class Company extends Component {
  constructor() {
    super();
    this.state = {
      workers: [],
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
        this.setState({ workers: data });
      }
    });
  }
  LoadCompanyUser = page => {
    list(page)
      .then(data => {
        this.setState({ workers: data });
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
    const { workers, page, error } = this.state;

    return (
      <div className="postisitonRelativeSmeni">
        <div className="container" style={{ padding: "5px" }}>
          {error ? <Error></Error> : null}
          <div className="row">
            {workers.map((user, i) => (
              <>
                <div className="company_worker_width" class="card">
                  {user.avatar === true ? (
                    <img
                      className="img-fluid img-thumbnail card-img-top img-resize"
                      src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}?`}
                      alt={user.name}
                      // style={{ height: "250px", width: "250px" }}
                    />
                  ) : (
                    <img
                      className="img-fluid  img-thumbnail card-img-top img-resize"
                      src={`${DefaultProfile}`}
                      // style={{ height: "250px", width: "250px" }}
                    />
                  )}

                  <div class="card-body">
                    <h5 class="card-text">{user.role}</h5>
                    <div
                      style={{ wordBreak: "break-word" }}
                      className="card-title"
                    >
                      {user.name}
                      {/* <Online  user={user._id}/> */}
                    </div>
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
                  </div>
                </div>
              </>
            ))}
          </div>
          {/* <div>
            <div>
              <div style={{ padding: "10px" }}></div>
              {workers.length ? (
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
          </div>*/}
        </div> 
      </div>
    );
  }
}
