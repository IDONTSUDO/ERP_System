import React, { Component } from "react";
import None from "../Components/None.jsx";
import { Link, Route } from "react-router-dom";
import {
  ContrAgentList,
  SearchContrAgent,
  ContrAgentDontManage
} from "../Api/Http";
import {
  Button,
  Modal,
  Icon,
  Card,
  Table,
  Divider,
  Spin,
  Checkbox,
  Popover,
  Dropdown
} from "antd";
import { isAuthenticated } from "../Api/Auth";
import Error from "../Error/Error.jsx";
import { string } from "prop-types";
import {
  FrownOutlined
} from "@ant-design/icons";
import { UserDeleteOutlined,DownOutlined } from "@ant-design/icons";

export default class AllAgent extends Component {
  constructor() {
    super();
    this.state = {
      agent: [],
      item: "",
      search: [],
      stripBg: "",
      page: 1,
      loading: true,
      AgentButDontManager: false
    };
  }
  componentDidMount() {
    this.LoadContrAgentList(this.state.page);
  }
  LoadContrAgentList = page => {
    ContrAgentList(page)
      .then(data => {
        this.setState({ agent: data, loading: false });
      })
      .catch(data => {
        console.log(data);
      });
  };
  loadMore = number => {
    if (this.state.AgentButDontManager) {
      this.setState({ page: this.state.page + number });
      this.LoadContrAgentList(this.state.page + number);
    } else {
      this.setState({ page: this.state.page + number });
      ContrAgentList(this.state.page + number)
        .then(data => {
          this.setState({ agent: data, loading: false });
        })
        .catch(data => {
          console.log(data);
        });
    }
  };

  loadLess = number => {
    if (this.state.AgentButDontManager) {
      this.setState({ page: this.state.page - number });
      this.LoadContrAgentList(this.state.page - number);
    } else {
      this.setState({ page: this.state.page - number });
      ContrAgentList(this.state.page - number)
        .then(data => {
          this.setState({ agent: data, loading: false });
        })
        .catch(data => {
          console.log(data);
        });
    }
  };
  handleChange = name => event => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
    this.searchHelper();
  };
  searchHelper() {
    let { item } = this.state;
    if (item.length > 1) {
      SearchContrAgent(item)
        .then(data => {
          this.setState({ search: data });
        })
        .catch(data => {
          console.log(data);
        });
    }
  }
  handleClick(e) {}
  AgentButNoManagerSwitcher = cheked => {
    this.setState({ AgentButDontManager: cheked.target.checked });
    if (cheked.target.checked) {
      this.setState({ loading: true });
      ContrAgentDontManage().then(data => {
        this.setState({ agent: data, loading: false });
      });
    } else {
      ContrAgentList()
        .then(data => {
          this.setState({ agent: data, loading: false });
        })
        .catch(data => {
          console.log(data);
        });
    }
  };

  render() {
    let { agent, item, search, page } = this.state;
    let notFound = {
      emptyText:(<div>Ничего не найдено   <FrownOutlined  style={{fontSize:"32px",marginRight:"5px"}}/></div>)
    }
    const columns = [
      {
        title: "Короткое имя",
        dataIndex: "name",
        key: "name",
        render: text => <a>{text}</a>
      },
      {
        title: "Полное имя",
        dataIndex: "full_name",
        key: "name",
        render: text => <a>{text}</a>
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        render: text => <a>{text}</a>
      },
      {
        title: (
          <Checkbox
            checked={this.state.AgentButDontManager}
            onChange={this.AgentButNoManagerSwitcher}
          >
            <UserDeleteOutlined />
          </Checkbox>
        ),
        key: "tags",
        dataIndex: "tags",
        render: tags => (
          <>
            {tags === "none" ? (
              <div className="square-red"></div>
            ) : (
                <div className="square-green"></div>
            )}
          </>
        )
      },
      {
        title: "",
        key: "_id",
        render: (text, record) => (
          <span>
            <div style={{ padding: "5px" }}>
              <Button>
                <Link to={`/agent/${text._id}`}>Посмотреть профиль</Link>
              </Button>
            </div>
          </span>
        )
      }
    ];
    const style = { backgroundColor: this.state.stripBg };
    return (
      <div className="postisitonRelativeSmeni">
        {this.state.loading ? (
          <Spin size="large" />
        ) : (
          <>
            <div className="search_positon">
              <div style={{ padding: "5px" }}></div>
            </div>
            <div>
              <div style={{ padding: "5px" }}>
                <div className="row">
                  <Table locale={notFound} dataSource={this.state.agent} columns={columns} />
                </div>
              </div>
              {page > 1 ? (
                <Button
                  className="ButtonPosition"
                  onClick={() => this.loadLess(1)}
                >
                  Назад ({this.state.page - 1})
                </Button>
              ) : (
                ""
              )}

              {agent.length ? (
                <Button
                  className="ButtonPosition"
                  onClick={() => this.loadMore(1)}
                >
                  Вперед ({page + 1})
                </Button>
              ) : (
                ""
              )}
              <Button
                type="primary"
                icon="search"
                type="button"
                class="btn btn-primary"
                data-toggle="modal"
                data-target="#exampleModalCenter"
              >
                Поиск контр агентов
              </Button>
              <div
                style={style}
                class="modal fade"
                id="exampleModalCenter"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalCenterTitle"
                aria-hidden="true"
              >
                <div className="search-position">
                  <div
                    class="modal-dialog modal-dialog-centered"
                    role="document"
                  >
                    <div class="modal-content">
                      <input
                        onChange={this.handleChange("item")}
                        value={item}
                        type="text"
                        class="form-control"
                        placeholder="Поиск "
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                      />
                    </div>
                    <div class="modal-content-position">
                      {search.map((agn, i) => (
                        <>
                          <div class="modal-content" style={{ padding: "5px" }}>
                            <div className="modal-list-search">
                              <div className="row">
                                <div className="col-md-4">
                                  <h1>
                                    <a href={`/agent/${agn._id}`}>{agn.name}</a>
                                  </h1>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      ))}
                    </div>
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
