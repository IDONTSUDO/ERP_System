import React, { Component } from "react";
import None from "../Components/None.jsx";
import { Link, Route } from "react-router-dom";
import { ContrAgentList, SearchContrAgent } from "../Api/Http";
import { Button, Modal, Icon, Card, Table, Divider } from "antd";
import { isAuthenticated } from "../Api/Auth";
import Error from "../Error/Error.jsx";

export default class AllAgent extends Component {
  constructor() {
    super();
    this.state = {
      agent: [],
      item: "",
      search: [],
      stripBg: "",
      page: 1
    };
  }
  componentDidMount() {
    this.LoadContrAgentList(this.state.page);
  }
  LoadContrAgentList = page => {
    ContrAgentList(page)
      .then(data => {
        this.setState({ agent: data });
      })
      .catch(data => {
        console.log(data);
      });
  };
  loadMore = number => {
    this.setState({ page: this.state.page + number });
    this.LoadContrAgentList(this.state.page + number);
  };

  loadLess = number => {
    this.setState({ page: this.state.page - number });
    this.LoadContrAgentList(this.state.page - number);
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

  render() {
    let { agent, item, search, page } = this.state;
    const columns = [
      {
        title: "Короткое имя",
        dataIndex: "name",
        key: "name",
        render: text => <a>{text}</a>
      },
      // {
      //   title: "Tags",
      //   key: "tags",
      //   dataIndex: "tags",
      //   render: tags => (
      //     <span>
      //       {tags.map(tag => {
      //         return <None tag={tag}></None>;
      //       })}
      //     </span>
      //   )
      // },
      {
        title: "Action",
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

    const data = [
      {
        key: "1",
        name: "John Brown",
        age: 32,
        address: "New York No. 1 Lake Park",
        tags: ["nice", "developer"]
      },
      {
        key: "2",
        name: "Jim Green",
        age: 42,
        address: "London No. 1 Lake Park",
        tags: ["loser"]
      },
      {
        key: "3",
        name: "Joe Black",
        age: 32,
        address: "Sidney No. 1 Lake Park",
        tags: ["cool", "teacher"]
      }
    ];

    const style = { backgroundColor: this.state.stripBg };
    return (
      <div className="postisitonRelativeSmeni">
        <div className="search_positon">
          <div style={{ padding: "5px" }}></div>
        </div>
        <div>
          <div style={{ padding: "5px" }}>
            <div className="row">
              <Table dataSource={this.state.agent} columns={columns} />
              {/* {agent.map((agn, i) => (
                <>
                  <hr />
                  <Card className="col-md-4" size="small" title="Контр Агент">
                    Имя: {agn.name}
                    <div style={{ padding: "5px" }}>
                      <Button>
                        <Link to={`/agent/${agn._id}`}>Посмотреть профиль</Link>
                      </Button>
                    </div>
                  </Card>

                  <hr />
                </>
              ))} */}
            </div>
          </div>
          {page > 1 ? (
            <Button className="ButtonPosition" onClick={() => this.loadLess(1)}>
              Назад ({this.state.page - 1})
            </Button>
          ) : (
            ""
          )}

          {agent.length ? (
            <Button className="ButtonPosition" onClick={() => this.loadMore(1)}>
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
          {/* <!-- Modal --> */}
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
              <div class="modal-dialog modal-dialog-centered" role="document">
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
      </div>
    );
  }
}
