//TODO[!] Не выполененое дело
//TODO[!]

import React, { Component } from "react";
import { isAuthenticated } from "../Api/Auth";
import { listNews, UpdateNews, OneNewsDelete } from "../Api/Http";
import { Badge, Popover, Button, Skeleton, List, Avatar } from "antd";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import Error from "../Error/Error.jsx";
import AvatarCus from "../Components/Avatar";

import {
  TeamOutlined,
  UserOutlined,
  PhoneOutlined,
  WhatsAppOutlined,
  CoffeeOutlined,
  MessageOutlined,
  NotificationOutlined,
  UsergroupAddOutlined,
  FrownOutlined,
  CloseOutlined
} from "@ant-design/icons";

export default class News extends Component {
  constructor() {
    super();
    this.state = {
      userId: "",
      newsList: [],
      error: false,
      loadingNews: true
    };
  }
  componentDidMount() {
    const Id = isAuthenticated().direct._id;
    const token = isAuthenticated().token;
    this.setState({ userId: Id });
    listNews(Id, token).then(data => {
      if (data.error) {
        this.setState({ error: true });
        console.log(data.error);
      } else {
        var reversedData = data.reverse();
        this.setState({ newsList: reversedData, loadingNews: false });
        var NewsArray = [];
        for (var i = 0; data.length > i; i++) {
          NewsArray.push(data[i]._id);
        }

        UpdateNews(NewsArray);
      }
    });
  }
  deleteNews = id => {
    let newsList = this.state.newsList.filter(news => news._id != id);
    this.setState({ newsList });
    OneNewsDelete(id).then(data => console.log(data));
  };
  NewsOneDelete = () => {
    OneNewsDelete();
  };
  renderAgent(agent) {
    return (
      <>
        {agent.map((agent, i) => (
          <>
            <div>
              <b>Имя:</b>
              {agent.name}
            </div>
            <div>
              <b>Телефон:</b>
              {agent.phone}
            </div>
            <div>
              <b>Полное имя:</b>
              {agent.full_name}
            </div>
            <div>
              <b>Email:</b>
              {agent.email}
            </div>
            <div>
              <b>Индивидуальные условия:</b>
              {agent.individual_conditions_job}
            </div>
            <div>
              <b>Откуда пришел:</b>
              {agent.work_begin_with_him}
            </div>
          </>
        ))}
      </>
    );
  }
  render() {
    const { newsList, error } = this.state;
    let err = false;
    let userID = isAuthenticated().direct._id;
    let noNews = {
      emptyText: (
        <div>
          Нет новых новостей
          <FrownOutlined style={{ fontSize: "32px", marginRight: "5px" }} />
        </div>
      )
    };
    return (
      <div className="news_pos">
        {error ? <Error></Error> : null}
        <div style={{ padding: "20px" }}>
          <Skeleton
            paragraph={{ rows: 20 }}
            active
            loading={this.state.loadingNews}
          >
            <List
              itemLayout="horizontal"
              locale={noNews}
              dataSource={newsList}
              renderItem={item => (
                <List.Item>
                  <div style={{ width: "100%" }}>
                    <List.Item.Meta
                      className="px100"
                      style={{ margin: "5px" }}
                      avatar={
                        <Link
                          to={`${process.env.REACT_APP_API_URL}/user/${item.posted_by}?`}
                        >
                          <AvatarCus
                            avatarLink={`${process.env.REACT_APP_API_URL}/user/photo/${item.posted_by}?`}
                          />
                        </Link>
                      }
                      title={
                        <Link to={item.eventNews === "Новый коментарий"} />
                      }
                      description={
                        <>
                          <h2>{item.eventNews}</h2>
                          {item.eventNews === "Новый статус" ? (
                            <>
                              <Link to={item.link}>Посмотреть</Link>
                            </>
                          ) : null}
                          {item.eventNews === "Выполнено" ? (
                            <div>
                              Пользователь{" "}
                              <span className="user-complete">
                                {item.name_posted}
                              </span>{" "}
                              выполнил дело{" "}
                              <span className="todo-news-titel">
                                {item.description}
                              </span>
                            </div>
                          ) : null}
                          {item.eventNews === "Агент" ? (
                            <>
                              <div>{item.description}</div>
                            </>
                          ) : null}

                          {item.eventNews === "Новый коментарий" ? (
                            <>
                              <Link className="news" to={`${item.link}`}>
                                <div style={{ color: "#000" }}>
                                  {item.description}
                                </div>
                              </Link>
                            </>
                          ) : null}
                          {item.eventNews === "Назначено новое дело" ? (
                            <>
                              <Link to={item.link}>
                                <div style={{ color: "#2a2d30" }}>
                                  {item.jobNews.length === 0 ? (
                                    <>
                                      <div>Описание:</div>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html: item.description
                                        }}
                                      />
                                    </>
                                  ) : (
                                    <>
                                      <div>Описание:</div>
                                      {item.jobNews.map((job, i) => (
                                        <>
                                          <div
                                            dangerouslySetInnerHTML={{
                                              __html: job.action
                                            }}
                                          />
                                          <div>{job.date}</div>
                                        </>
                                      ))}
                                    </>
                                  )}
                                </div>
                              </Link>
                            </>
                          ) : null}
                          <div>{item.time}</div>
                          <>
                            {item.eventNews === "Новый Агент" ? (
                              <div>
                                <div>{item.description}</div>
                                <div>
                                  Добавил{" "}
                                  <span className="user-complete">
                                    {item.newsFrom.name}
                                  </span>
                                </div>
                                <Popover
                                  type="hover"
                                  content={
                                    <>{this.renderAgent([item.agent])}</>
                                  }
                                >
                                  <Link to={`/agent/${item.agent._id}`}>
                                    <Button style={{ margin: "5px" }}>
                                      Подробности
                                    </Button>
                                  </Link>
                                </Popover>
                              </div>
                            ) : null}
                            {item.eventNews === "Вам назначили агента" ? (
                              <></>
                            ) : null}
                          </>

                          <Moment fromNow>{item.dateCreated}</Moment>
                        </>
                      }
                    />
                  </div>
                  <CloseOutlined
                    onClick={newsId => this.deleteNews(item._id, newsId)}
                    className="close"
                  />
                </List.Item>
              )}
            />
          </Skeleton>
        </div>
      </div>
    );
  }
}
