import React, { Component } from "react";
import { isAuthenticated } from "../Api/Auth";
import { listNews, UpdateNews, OneNewsDelete } from "../Api/Http";
import { Badge, Popover, Button, Skeleton, List, Avatar } from "antd";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import Error from "../Error/Error.jsx";
import DefaultProfile from "../Assets/default.png";
import {
  TeamOutlined,
  UserOutlined,
  PhoneOutlined,
  WhatsAppOutlined,
  CoffeeOutlined,
  MessageOutlined,
  NotificationOutlined,
  UsergroupAddOutlined
} from "@ant-design/icons";

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

        // UpdateNews(NewsArray);
      }
    });
  }

  NewsOneDelete = () => {
    OneNewsDelete();
  };
  render() {
    {
      /* /* "Новый коментарий" */
      /* Назначено новое дело"jobNews */
      /* "Новый Агент" */
      /* "вам пришло новое дело" */
    }
    const { newsList, error } = this.state;
    let err = false;
    let userID = isAuthenticated().direct._id;
    return (
      <div className="news_pos">
        {error ? <Error></Error> : null}
        <div style={{ padding: "20px" }}>
          <Skeleton paragraph={{ rows: 20 }} active loading={false}>
            <List
              locale="Новых новостей нет"
              itemLayout="horizontal"
              dataSource={newsList}
              renderItem={item => (
                <List.Item>
                  <div style={{ width: "100%" }}>
                    <List.Item.Meta
                      className="px100"
                      style={{ margin: "5px" }}
                      avatar={
                        <div className="pos-icon">
                          {item.eventNews === "Новый коментарий" ? (
                            <MessageOutlined style={{ fontSize: "32px" }} />
                          ) : item.eventNews === "Новый Агент" ? (
                            <UsergroupAddOutlined
                              style={{ fontSize: "32px" }}
                            />
                          ) : item.eventNews === "вам пришло новое дело" ? (
                            <NotificationOutlined
                              style={{ fontSize: "32px" }}
                            />
                          ) : item.jobNews.length === 0 ? (
                            <UserOutlined style={{ fontSize: "32px" }} />
                          ) : (
                            <TeamOutlined style={{ fontSize: "32px" }} />
                          )}
                        </div>
                      }
                      title={
                        <Link to={item.eventNews === "Новый коментарий"} />
                      }
                      description={
                        <>
                          {item.eventNews === "Назначено новое дело" ? (
                            item.jobNews.length === 0 ? (
                              <>
                                {" "}
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: item.description
                                  }}
                                ></div>
                                <div>На дату: {item.time}</div>
                              </>
                            ) : (
                              <div>
                                {item.jobNews.map((job, i) => (
                                  <>
                                    {job.user === userID ? (
                                      <>
                                        <div
                                          dangerouslySetInnerHTML={{
                                            __html: job.action
                                          }}
                                        ></div>
                                      </>
                                    ) : null}
                                    <div></div>
                                  </>
                                ))}
                                <Popover
                                  content={
                                    <>
                                      {item.jobNews.map((job, i) => (
                                        <>
                                          <>
                                            <div
                                              dangerouslySetInnerHTML={{
                                                __html: job.action
                                              }}
                                            ></div>
                                          </>
                                          <div></div>
                                        </>
                                      ))}
                                    </>
                                  }
                                >
                                  Подробности
                                </Popover>
                              </div>
                            )
                          ) : null}

                          {item.eventNews === "Новый Агент" ? (
                            <div>
                              <div>{item.description}</div>
                              <div>
                                <Popover
                                  content={
                                    <>
                                      <div>
                                        Имя:<b>{item.agent.name}</b>
                                      </div>
                                      <div>Специализация:</div>
                                      {item.agent.specialications.map(
                                        (spec, i) => (
                                          <div>
                                            <b>{spec} </b>
                                          </div>
                                        )
                                      )}
                                      <div>
                                        Закрпелен:
                                        {item.agent.tags.map((tag, i) => (
                                          <>
                                            <b> {tag.name}</b>
                                          </>
                                        ))}
                                      </div>
                                    </>
                                  }
                                  title="Агент"
                                >
                                  <Button>Подробности</Button>
                                </Popover>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                          <Moment fromNow>{item.dateCreated}</Moment>
                        </>
                      }
                    />
                  </div>
                  <Avatar
                    src={`${process.env.REACT_APP_API_URL}/user/photo/${
                      item.posted_by
                      // e.hasOwnProperty(target)
                    }?`}
                    onError={e =>
                      e === undefined
                        ? null
                        : e.targer === undefined
                        ? null
                        : (e.target.src = DefaultProfile)
                    }
                  />
                </List.Item>
              )}
            />
          </Skeleton>
        </div>
        {/* </div> */}
        {/* </div> */}
      </div>
    );
  }
}
// {newsList.map((news, i) => (
//   <>
//     {news.eventNews === "Новый Агент" ? (
//       <>
//         <div className="news-width  alert-complete-status">
//           <div style={{color:"#fff"}}>{news.description}</div>
// <Popover
//   content={
//     <>
//       <div>Имя:<b>{news.agent.name}</b></div>
//       <div>Специализация:</div>
//       {news.agent.specialications.map((spec, i) => (
//         <div><b>{spec}  </b></div>
//       ))}
//       <div>Закрпелен:{news.agent.tags.map((tag,i) =>(
//         <>
//         <b> {tag.name}</b>
//         </>
//       )
//       )}</div>
//     </>
//   }
//   title="Агент"
// >
//   <Button ghost>Подробности</Button>
// </Popover>
//         </div>
//       </>
//     ) : (
//       ""
//     )}
//     {news.eventNews === "Не выполененое дело" ? (
//       <>
//         <div className="news-width  security">
//           <div>
//             {news.descriptionArray.map((user, i) => (
//               <div className="user-list">{user}</div>
//             ))}{" "}
//           </div>
//           <div>Не выполененое дело</div>
//           <Link to={`/job/${news.link}`}>
//             <h5 style={{ color: "black" }}>Посмотреть дело *</h5>
//           </Link>
//         </div>
//       </>
//     ) : (
//       ""
//     )}
//     {news.eventNews === "warning" ? (
//       <>
//         <div className="news-width  security">
//           <div>{news.description}</div>
//           <Link to={`/security/${userID}`}>
//             <h5 style={{ color: "black" }}>
//               Посмотреть историю посещений *
//             </h5>
//           </Link>
//         </div>
//       </>
//     ) : (
//       ""
//     )}
//     {news.eventNews === "Выполнено" ? (
//       <>
//         <div style={{ padding: "5px" }}>
//           <div
//             className="news-width news_width alert-complete-status"
//             key={i}
//           >
//             <h6>
//               <strong>{news.eventNews}</strong>
//             </h6>
//             <div className="">
// <div
//   dangerouslySetInnerHTML={{
//     __html: news.description
//   }}
// />
//               <Link to={`/user/${news.posted_by}`}>
//                 <div style={{ padding: "5px", color: "black" }}>
//                   Выполнил: {news.name_posted} *
//                 </div>
//               </Link>
//             </div>
//             <Moment fromNow>{news.dateCreated}</Moment>
//           </div>
//         </div>
//       </>
//     ) : (
//       ""
//     )}
//     {news.eventNews === "вам пришло новое дело" ? (
//       <>
//         <div style={{ padding: "5px" }}>
//           <div
//             className="news-width news_width alert-redirect-todo"
//             key={i}
//           >
//             <h6>
//               <strong>{news.eventNews}</strong>
//             </h6>
//             <div className="">
//               <div
//                 dangerouslySetInnerHTML={{
//                   __html: news.description
//                 }}
//               />
//             </div>
//             <Moment fromNow>{news.dateCreated}</Moment>
//           </div>
//         </div>
//       </>
//     ) : (
//       ""
//     )}
//     {news.eventNews === "Новый статус" ? (
//       <>
//         <div style={{ padding: "5px" }}>
//           <div
//             className="news_width alert-warning-yellow fade.show-yellow alert-dismissible-yellow alert-yellow"
//             key={i}
//           >
//             <Link className="link" to={`${news.link}`}>
//               <strong>{news.eventNews} *</strong>
//             </Link>
//           </div>
//         </div>
//       </>
//     ) : (
//       ""
//     )}
//     {news.eventNews === "Новый коментарий" ? (
//       <>
//         <div style={{ padding: "5px" }}>
//           <div className="news_width alert-new-comment" key={i}>
//             {/* <button
//               type="button"
//               class="close"
//               data-dismiss="alert"
//               aria-label="Close"
//             >
//               <span aria-hidden="true">&times;</span>
//             </button> */}
//             <div>От {news.name_posted}</div>
//             <Link className="link" to={`${news.link}`}>
//               <h6>
//                 <strong>{news.eventNews} *</strong>
//               </h6>
//             </Link>
//             <div
//               dangerouslySetInnerHTML={{
//                 __html: news.description
//               }}
//             />
//             <Moment fromNow>{news.dateCreated}</Moment>
//           </div>
//         </div>
//       </>
//     ) : (
//       ""
//     )}
//     {news.eventNews === "Назначено новое дело" ? (
//       <>
//         <div style={{ padding: "5px" }}>
//           <div
//             className={
//               news.comand === true
//                 ? "news_width alert-alert-info"
//                 : "news_width alert-warning-yellow fade.show-yellow alert-dismissible-yellow alert-yellow"
//             }
//             key={i}
//           >
//             {/* <button
//               type="button"
//               class="close"
//               data-dismiss="alert"
//               aria-label="Close"
//             >
//               <span aria-hidden="true">&times;</span>
//             </button> */}
//             <Link
//               style={{ color: "black" }}
//               to={`/user/${news.posted_by}`}
//             >
//               <div style={{ padding: "5px" }}>
//                 от {news.name_posted} *
//               </div>
//             </Link>
//             <Link className="link" to={`${news.link}`}>
//               <h6>
//                 <strong>{news.eventNews} *</strong>
//               </h6>
//             </Link>
//             {news.comand === false ? (
//               <div className="news_width SoloTodoBorder">
//                 <div>Подробности</div>
//                 <div
//                   dangerouslySetInnerHTML={{
//                     __html: news.description
//                   }}
//                 />
//                 <div>{news.time}</div>
//               </div>
//             ) : (
//               ""
//             )}

//             {news.jobNews.length > 1 ? (
//               <>
//                 {news.jobNews.map((news, i) => (
//                   <>
//                     {news.user === userID ? (
//                       <>
//                         <Badge status="red" text="Командное" />
//                         <div
//                           className="news_width ComandTodoBorder"
//                           style={{ wordBreak: "break-all" }}
//                         >
//                           <div>Подробности</div>

//                           <div style={{ padding: "5px" }}>
//                             <div
//                               dangerouslySetInnerHTML={{
//                                 __html: news.action
//                               }}
//                             />
//                           </div>
//                           <div style={{ padding: "5px" }}>
//                             {news.date}
//                           </div>
//                         </div>
//                       </>
//                     ) : (
//                       ""
//                     )}
//                   </>
//                 ))}
//               </>
//             ) : (
//               <></>
//             )}
//             <Moment fromNow>{news.dateCreated}</Moment>
//           </div>
//         </div>
//       </>
//     ) : (
//       ""
//     )}
//   </>
// ))}
