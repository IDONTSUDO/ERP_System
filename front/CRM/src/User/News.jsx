import React, { Component } from "react";
import { isAuthenticated } from "../Api/Auth";
import { listNews, UpdateNews, OneNewsDelete } from "../Api/Http";
import { Badge } from "antd";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import Error from "../Error/Error.jsx";


export default class News extends Component {
  constructor() {
    super();
    this.state = {
      userId: "",
      newsList: [],
      error: false
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
        this.setState({ newsList: reversedData });
        
        var NewsArray = [];
        
        for (var i = 0; data.length > i; i++) {
          NewsArray.push(data[i]._id);
        }
        
        UpdateNews(NewsArray);
      }
    });
  }

  NewsOneDelete = () => {
    OneNewsDelete();
  };
  render() {
    const { newsList, error } = this.state;

    let userID = isAuthenticated().direct._id;
    return (
      <div className="postisitonRelativeSmeni">
        <div className="container">
          <div className="row">
            {error ? <Error></Error> : null}
            <div style={{ padding: "20px" }}>
              {newsList.map((news, i) => (
                <>
                {news.eventNews === "Не выполененое дело" ? (
                    <>
                      <div  className="news-width  security">
                        <div>{news.descriptionArray.map((user,i) =>(
                          <div className="user-list">
                          {user}
                          </div>
                        ))} </div>
                        <div>Не выполененое дело</div>
                        <Link to={`/job/${news.link}`}>
                          <h5 style={{ color: "black" }}>
                            Посмотреть дело *
                          </h5>
                        </Link>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                  {news.eventNews === "warning" ? (
                    <>
                      <div  className="news-width  security">
                        <div>{news.description}</div>
                        <Link to={`/security/${userID}`}>
                          <h5 style={{ color: "black" }}>
                            Посмотреть историю посещений *
                          </h5>
                        </Link>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                  {news.eventNews === "Выполнено" ? (
                    <>
                      <div style={{ padding: "5px" }}>
                        <div className="news-width news_width alert-complete-status" key={i}>
                         

                          <h6>
                            <strong>{news.eventNews}</strong>
                          </h6>
                          <div className="">
                          <div dangerouslySetInnerHTML={{ __html: news.description }} />
                            <Link to={`/user/${news.link_posted}`}>
                            <div style={{ padding: "5px" }}>
                              Выполнил: {news.name_posted} *
                            </div>
                            </Link>
                          </div>
                          <Moment fromNow>{news.dateCreated}</Moment>
                        </div>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                   {news.eventNews === "вам пришло новое дело" ? (
                    <>
                      <div  style={{ padding: "5px" }}>
                        <div className="news-width news_width alert-redirect-todo" key={i}>
                         

                          <h6>
                            <strong>{news.eventNews}</strong>
                          </h6>
                          <div className="">
                          <div dangerouslySetInnerHTML={{ __html: news.description }} />
                          </div>
                          <Moment  fromNow>{news.dateCreated}</Moment>
                        </div>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                  {news.eventNews === "Новый статус" ? (
                    <>
                      <div style={{ padding: "5px" }}>
                        <div
                          className="news_width alert-warning-yellow fade.show-yellow alert-dismissible-yellow alert-yellow"
                          key={i}
                        >
                          <Link className="link" to={`${news.link}`}>
                            <strong>{news.eventNews} *</strong>
                          </Link>
                      
                        </div>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                  {news.eventNews === "Новый коментарий" ? (
                    <>
                      <div style={{ padding: "5px" }}>
                        <div className="news_width alert-new-comment" key={i}>
                          {/* <button
                            type="button"
                            class="close"
                            data-dismiss="alert"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button> */}
                          <div>От {news.name_posted}</div>
                          <Link className="link" to={`${news.link}`}>
                            <h6>
                              <strong>{news.eventNews} *</strong>
                            </h6>
                          </Link>
                          <div dangerouslySetInnerHTML={{ __html: news.description }} />
                          <Moment fromNow>{news.dateCreated}</Moment>
                        </div>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                  {news.eventNews === "Назначено новое дело" ? (
                    <>
                      <div style={{ padding: "5px" }}>
                        <div
                          className={
                            news.comand === true
                              ? "news_width alert-alert-info"
                              : "news_width alert-warning-yellow fade.show-yellow alert-dismissible-yellow alert-yellow"
                          }
                          key={i}
                        >
                          {/* <button
                            type="button"
                            class="close"
                            data-dismiss="alert"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button> */}
                          <Link
                            style={{ color: "black" }}
                            to={`/user/${news.posted_by}`}
                          >
                            <div style={{ padding: "5px" }}>
                              от {news.name_posted} *
                            </div>
                          </Link>
                          <Link className="link" to={`${news.link}`}>
                            <h6>
                              <strong>{news.eventNews} *</strong>
                            </h6>
                          </Link>
                          {news.comand === false ? (
                            <div className="news_width SoloTodoBorder">
                              <div>Подробности</div>
                              <div dangerouslySetInnerHTML={{ __html: news.description }} />
                              <div>{news.time}</div>
                            </div>
                          ) : (
                            ""
                          )}

                          {news.jobNews.length > 1 ? (
                            <>
                              {news.jobNews.map((news, i) => (
                                <>
                                  {news.user === userID ? (
                                    <>
                                      <Badge status="red" text="Командное" />
                                      <div
                                        className="news_width ComandTodoBorder"
                                        style={{ wordBreak: "break-all" }}
                                      >
                                        <div>Подробности</div>

                                        <div style={{ padding: "5px" }}>
                                          {news.action}
                                        </div>
                                        <div style={{ padding: "5px" }}>
                                          {news.date}
                                        </div>
                                      </div>
                                    </>
                                  ) : (
                                    ""
                                  )}
                                </>
                              ))}
                            </>
                          ) : (
                            <></>
                          )}
                          <Moment fromNow>{news.dateCreated}</Moment>
                        </div>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
