import React, { Component } from "react";
import {
  soloJob,
  readComentList,
  NewComent,
  DeleteComment,
  NewNewsToComment,
  NewNewToSetStatusJob,
  SetStatusJob,
  TodoChangeExperienseAtHTTP,
  TodoUpTime,
  TodoChangeComandList,
  NewComentStatistic,
  UpdateDaysTodoComplete,
  UpdateCommentStatistic
} from "../Api/Http";
import { IsEveryDaySub, everyday } from "../helper/everyday.js";
import { isAuthenticated } from "../Api/Auth";
import {
  Comment,
  Tooltip,
  Select,
  Button,
  Card,
  notification,
  Icon,
  Modal,
  Popover
} from "antd";
import dateFormat from "dateformat";
import DatePicker from "react-datepicker";
import DefaultProfile from "../Assets/default.png";
import Moment from "react-moment";

import { Link, Redirect } from "react-router-dom";

const { Option } = Select;

export default class Job extends Component {
  constructor() {
    super();
    this.state = {
      message: "",
      name: "",
      todo: [],
      postedBy: "",
      redirectToSignin: false,
      error: "",
      comments: [],
      body: "",
      worker: "",
      ID: "",
      event: "",
      startDate: "",
      loading: false,
      visible: false,
      tags: [],
      JobArray: [],
      description: "",
      todoTitel: "",
      redirectToProfile: false,
      name_posted:""
    };
  }
  // life hooks
  componentDidMount() {
    everyday();
    const todoId = this.props.match.params.todoId;
    const workerId = isAuthenticated().direct._id;
    const nameWorker = isAuthenticated().direct.name;
    this.init(todoId);
    this.setState({ ID: todoId });
    this.setState({ worker: workerId });
    this.setState({ name: nameWorker });
  }

  componentWillReceiveProps(props) {
    const todoId = props.match.params.todoId;
    this.init(todoId);
  }
  forceUpdate() {
    const todoId = this.props.match.params.todoId;
    this.init(todoId);
    this.setState({ ID: todoId });
    this.setState({ body: "" });
  }
  // other
  handleChange = name => event => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };
  handleAction = name => event => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };

  init = todoId => {
    soloJob(todoId).then(data => {
      if (data.error) {
        this.setState({ redirectToSignin: true });
      } else {
        this.setState({
          status: data.status,
          tags: data.tags,
          importance: data.importance,
          JobArray: data.JobArray,
          comand: data.comand,
          description: data.description,
          postedBy: data.posted_by,
          TodoTitel: data.title,
          name_posted:data.name_posted
        });
      }
    });
    readComentList(todoId).then(data => {
      if (data.error) {
        this.setState({ redirectToSignin: true });
      } else {
        this.setState({ comments: data });
      }
    });
  };
  // Status Job
  clickSetStatusCompleteJob = () => {
    const { ID, postedBy } = this.state;
    let userId = isAuthenticated().direct._id;
    const todoId = ID;
    let expireAt = new Date();
    let status = "Выполнено";
    let tags = "";
    let worker_by = [];
    if (userId != postedBy) {
      // worker_by.push(postedBy);
      worker_by = { user: postedBy };
    }
    let eventNews = "Выполнено";
    let payload = {
      eventNews,
      status,
      todoId,
      worker_by
    };
    SetStatusJob(payload, todoId).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.forceUpdate();
        TodoChangeExperienseAtHTTP(expireAt, todoId);
        NewNewToSetStatusJob(payload);
        // this.openNotificationNewStatus();
        this.setState({ redirectToProfile: true });
      }
    });
  };
  clickSetStatusMoreInfoJob = () => {
    const { ID, postedBy } = this.state;
    const todoId = ID;

    let status = "Требуется уточнение";
    let payload = {
      status
    };
    SetStatusJob(payload, todoId).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.forceUpdate();

        let worker_by = { user: postedBy };

        let link = `/job/` + ID;
        let eventNews = "Новый статус";
        let posted_by = isAuthenticated().direct._id
        let payloads = {
          link,
          worker_by,
          eventNews,
          posted_by
        };
        this.openNotificationNewStatus();
        NewNewToSetStatusJob(payloads);
      }
    });
  };
  handleChangeComandWork = value => {
    if (value === "Выполнено") {
      this.clickSetStatusCompleteJobWorker();
    }
    if (value === "Требуется уточнение") {
      this.clickSetStatusMoreInfoJob();
    } else {
      return;
    }
  };
  handleChange = value => {
    if (value === "Выполнено") {
      this.clickSubmitOneJob();
    }
    if (value === "Требуется уточнение") {
      this.clickSetStatusMoreInfoJob();
    } else {
      return;
    }
  };
  clickSubmitSoloJob = event => {
    event.preventDefault();
    const { body, worker, ID, name, tags } = this.state;
    let todoId = ID;

    let userID = isAuthenticated().direct._id;

    let comment = JSON.stringify({ body, worker, todoId, name });
    NewComent(comment).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.forceUpdate();
        // здесь сложная фича, приготовления финального массива
        let arr = [];
        // массив для  первой сортировки
        for (let i = 0; i < tags.length; i++) {
          if (tags[i]._id !== worker) {
            arr.push(tags[i]._id);
          }
        }
        // и так берем всех юзеров участвующих в деле, и исключаем от туда автора коментария
        let fynalyArray = tags.filter().filter(el => el !== userID);

        let worker_by = fynalyArray.map((user, index) => {
          return {
            user: user
          };
          // [{user: userId },{user: userId},{user: userId }] по итогу получается такая структура
        });

        let link = `/job/` + ID;

        let posted_by = isAuthenticated().direct._id;
        let name_posted = isAuthenticated().direct.name;
        let eventNews = "Новый коментарий";
        // это инфа для формирования новости
        let payload = {
          link,
          worker_by,
          eventNews,
          name_posted,
          posted_by
        };

        NewNewsToComment(payload);
      }
    });
  };
  clickSubmitComentOneJob = () => {
    // функция для коментариев дела которое не переходит от пользователя к пользователю,
    // это можно было сделать по другому. Но это были бы макороны похлеще.
    const { body, worker, ID, tags, name,postedBy } = this.state;
    let todoId = ID;
    let comment = JSON.stringify({ body, worker, todoId, name });

    let userID = isAuthenticated().direct._id;

    NewComent(comment).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.forceUpdate();
        let finalyUser = [];
        finalyUser.push(postedBy)
        finalyUser = tags.filter(el => el !== userID); //валидируем, что бы в массиве не было юзер айди того кто отправляет коменатрий
        let worker_by = finalyUser.map((user, index) => {
          return {
            user: user
          };
        });
        let link = `/job/` + todoId;
        let sub = IsEveryDaySub()._id;
        NewComentStatistic(sub);

        let name_posted = isAuthenticated().direct.name;
        let posted_by = isAuthenticated().direct._id;
        let description = body;

        let eventNews = "Новый коментарий";
        let payload = {
          tags,
          link,
          worker_by,
          eventNews,
          name_posted,
          posted_by,
          description
        };
        NewNewsToComment(payload).then(data => {
          this.openNotificationNewComment();
        });
      }
    });
  };
  clickSubmit = () => {
    // обработка коментария одиночного  дела.
    const { body, worker, ID, name, JobArray,postedBy } = this.state;
    let todoId = ID;
    let tags = [];
    tags.push(postedBy)
    for (let i = 0; JobArray.length > i; i++) {
      if (JobArray[i].user[25] === "A") {
        tags.push(JobArray[i].user.slice(0, -9));
      }
      if (JobArray[i].user[25] === undefined) {
        tags.push(JobArray[i].user);
      }
    }
    let sub = IsEveryDaySub()._id;
    NewComentStatistic(sub);

    let comment = JSON.stringify({ body, worker, todoId, name });

    NewComent(comment).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.forceUpdate();
        let link = `/job/` + todoId;

        let name_posted = isAuthenticated().direct.name;
        let posted_by = isAuthenticated().direct._id;
        let description = body;
        let fynalyArray = [];
        fynalyArray = tags.filter(el => el !== posted_by);
        let worker_by = fynalyArray.map((user, index) => {
          return {
            user: user
          };
        });
      

        let eventNews = "Новый коментарий";
        let payload = {
          tags,
          link,
          worker_by,
          eventNews,
          name_posted,
          posted_by,
          description
        };
        this.openNotificationNewComment();
        NewNewsToComment(payload);
      }
    });
  };
  clickSubmitOneJob = () => {
    // TODO Генерация новости
    const { ID, postedBy, TodoTitel } = this.state;
    let description;
    description = TodoTitel;

    let status = "Выполнено";
    let expireAt = new Date();
    let payload = {
      status,
      expireAt
    };
    TodoChangeComandList(ID, payload).then(data => {
      if (data.error) {
      } else {
        this.forceUpdate();
        let link = ID;
        let posted_by = isAuthenticated().direct._id;
        let name_posted = isAuthenticated().direct.name;
        let worker_by = { user: postedBy };
        if(postedBy === posted_by){
          return null
        }else{
          let eventNews = status;
          let payload = {
            worker_by,
            eventNews,
            link,
            name_posted,
            posted_by,
            description
          };
          NewNewsToComment(payload);
        }
        let sub = IsEveryDaySub()._id;

        UpdateDaysTodoComplete(sub);
        this.setState({ redirectToProfile: true });
      }
    });
  };
  deleteConfirmed = comment => {
    let answer = window.confirm("Точно?");
    if (answer) {
      this.deleteComment(comment);
    }
  };
  deleteComment = comment => {
    DeleteComment(comment).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.forceUpdate();
        this.openNotification();
      }
    });
  };

  NewDate = event => {
    event.preventDefault();
    const { startDate, ID } = this.state;

    let UpTime = dateFormat(startDate);
    TodoUpTime(ID, UpTime).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.openNotificationNewDate();
      }
    });
  };

  DeleteTodo = event => {
    event.preventDefault();
    const { ID } = this.state;
    let todoId = ID;
    let expireAt = new Date();
    TodoChangeExperienseAtHTTP(expireAt, todoId);
  };
  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };
  SetStatusCompleteComandWork = () => {
    const { ID, postedBy } = this.state;
    let userId = isAuthenticated().direct._id;
    const todoId = ID;
    let expireAt = new Date();
    let status = "Выполнено";
    let tags = "";
    let worker_by = [];
    if (userId != postedBy) {
      worker_by = { user: postedBy };
    }
 
    let eventNews = "Выполнено";
    let payload = {
      eventNews,
      status,
      todoId,
      worker_by,
      expireAt
    };
    console.log(payload)    
   // SetStatusJob(payload, todoId).then(data => {
    //   if (data.err) {
    //     console.log(data.err);
    //   } else {
    //     this.setState({ redirectToProfile: true });
    //   }
    // });
  };
  clickSetStatusCompleteJobWorker = () => {
    let { JobArray, ID,postedBy } = this.state;
    let sub = IsEveryDaySub()._id;

    UpdateDaysTodoComplete(sub);

    const todoId = ID;

    let userId = isAuthenticated().direct._id;
    let usersArray = [];
    let dateArray = [];
    let actionArray = [];
    let UsersLsatArray = [];
    let worker_by = [];
    let news;
    let i = 0;
    while (JobArray.length > i) {
      dateArray.push(JobArray[i].date);
      actionArray.push(JobArray[i].action);
      usersArray.push(JobArray[i].user);
      i++;
    }
    let str1;
    let el1;
    let El3;
    let str2 = 0;
    let ComandDealComplete = false
  
    while (usersArray.length > str2) {
 
      if (usersArray[str2] !== userId + "IAMWORKED") {
        UsersLsatArray.push(usersArray[str2]);
      }
      if (usersArray[str2] === userId + "IAMWORKED") {
        str1 = str2;
       
        if (usersArray[str1 + 1] !== undefined) {
          el1 = usersArray[str2].slice(0, -9);
          UsersLsatArray.push(el1);
          UsersLsatArray.push(usersArray[str1 + 1] + "IAMWORKED");
          El3 = usersArray[str1 + 1];
        } else {
         
          UsersLsatArray.push(usersArray[str1].slice(0,-9));
        
          ComandDealComplete = true
         
        }
      }
      str2++;
    }
   
    var filteredTime = UsersLsatArray.filter(function(el) {
      return el !== El3;
    });

    let LastArray = filteredTime.map((user, index) => {
      return {
        user: user,
        date: dateArray[index],
        action: actionArray[index]
      };
    });
    
    worker_by = { user: El3 };

    
    JobArray = LastArray;
 
    let payload = {}
    let status = "Выполнено"
    if(ComandDealComplete === true){
      payload ={JobArray,status}
    }else{
      payload = {
        JobArray
      };
    }
    
    if(ComandDealComplete === true){
      worker_by = null;
      worker_by = { user: postedBy}
      TodoChangeComandList(todoId, payload).then(data => {
        if (data.error) {
          this.setState({ error: true });
        } else {
          this.forceUpdate();
          let name_posted = isAuthenticated().direct.name;
          let link_posted = isAuthenticated().direct._id;
          let link = window.location.href;
          let eventNews = "Выполнено";
          let expireAt = new Date();

          let payloads = {
            eventNews,
            link,
            news,
            worker_by,
            name_posted,
            link_posted,
            expireAt
          };
          this.setState({redirectToProfile:true})
          this.openNotificationNewStatus();
          NewNewsToComment(payloads);
        }
      });
 
    }else{
   
      TodoChangeComandList(todoId, payload).then(data => {
        if (data.error) {
          this.setState({ error: true });
        } else {
          this.forceUpdate();
          let link = window.location.href;
          let eventNews = "вам пришло новое дело";
          let payloads = {
            eventNews,
            link,
            news,
            worker_by
          };
          this.setState({redirectToProfile: true})
          this.openNotificationNewStatus();

          NewNewsToComment(payloads);
        }
      });
    }
  };
  openNotification() {
    notification.open({
      message: "Коментарий удален",
      icon: <Icon type="smile" style={{ color: "#108ee9" }} />
    });
  }
  openNotificationNewDate() {
    notification.open({
      message: "Новая дата выставлена",
      icon: <Icon type="smile" style={{ color: "#108ee9" }} />
    });
  }
  openNotificationNewStatus() {
    notification.open({
      message: "Статус дела изменен",
      icon: <Icon type="smile" style={{ color: "#108ee9" }} />
    });
  }
  openNotificationNewComment() {
    notification.open({
      message: "Новый коментарий создан",
      icon: <Icon type="smile" style={{ color: "#108ee9" }} />
    });
  }
  openNotificationError() {
    notification.open({
      message: "Ой что то пошло не так, мне жаль",
      icon: <Icon type="frown" style={{ color: "#108ee9" }} />
    });
  }
  content = (JobArray, worker) => (
    <form>
      <div className="form-group">
        <h4>Жизненый цикл дела</h4>
        {JobArray.map((job, i) => (
          <>
            <div className="TodoListOneJob" style={{ padding: "10px" }}>
              <div>
                <>
                  {job.user[25] !== "A" ? (
                    <>
                      <>
                        <Link to={`/user/${job.user}`}>
                          <img
                            className="card-img-top"
                            src={`http://localhost:8080/user/photo/${job.user}`}
                            onError={i => (i.target.src = `${DefaultProfile}`)}
                            alt={job.user}
                            style={{ height: "3em", width: "3em" }}
                          />
                        </Link>
                      </>
                    </>
                  ) : (
                    ""
                  )}
                </>
              </div>
              <div>{job.date}</div>
              <div>
                <p></p>
                <div className="TodoListBorder">
                  <div dangerouslySetInnerHTML={{ __html: job.action }} />
                </div>
              </div>
            </div>
            <hr />
          </>
        ))}
      </div>
    </form>
  );
  render() {
    const {
      message,
      todo,
      comments,
      body,
      status,
      postedBy,
      visible,
      tags,
      worker,
      comand,
      JobArray,
      description,
      redirectToProfile,
      ID,
      name_posted
    } = this.state;
    if (redirectToProfile) {
      return <Redirect to={`/user/work/${isAuthenticated().direct._id}`} />;
    }

    return (
      <div className="todo-main">
        {comand ? (
          <>
            <div className="">
              <div class="">
                <div class="">
                  <Card className="card-job-style">
                    <a>
                      <div class="">
                        {isAuthenticated().direct._id === postedBy ? (
                          <Link to={`/edit/job/${ID}`}>
                            <Icon  theme="twoTone" twoToneColor="#eb2f96"  type="edit" />
                          </Link>
                        ) : null}
                        <Link to={`/user/${postedBy}`}><small class="text-muted">От {name_posted} *</small></Link>
                        <small class="text-muted">{todo.status}</small>
                      </div>
                    </a>
                    <div class="btn-group dropup"></div>
                    <div style={{ padding: "10px" }}> </div>
                    {JobArray.map((job, i) => (
                      <>
                        {/* когда дело командное  */}
                        {isAuthenticated().direct._id + "IAMWORKED" ===
                        job.user ? (
                          <>
                            <>
                              <Select
                                defaultValue="Статус"
                                style={{ width: 120 }}
                                onChange={this.handleChangeComandWork}
                              >
                                <Option value="Выполнено">Выполнено</Option>
                                <Option value="Требуется уточнение">
                                  Требуется уточнение
                                </Option>
                              </Select>
                              <div
                                dangerouslySetInnerHTML={{ __html: job.action }}
                              />
                              <small class="text-muted">{job.date}</small>
                            </>
                          </>
                        ) : (
                          ""
                        )}
                      </>
                    ))}

                    <div style={{ padding: "1px" }}>
                      <Popover
                        content={this.content(JobArray, worker)}
                        trigger="hover"
                        placement="bottom"
                      >
                        <Button type="dashed">Посмотреть дело </Button>
                      </Popover>
                    </div>
                  </Card>
                </div>
              </div>

              <hr className="main_position_job_container" />

              <div className="">
                <div class="">
                  <div>
                    {comments.map((comment, i) => (
                      <>
                        <Card className="card-job-style">
                          <Comment key={i}>
                            <Tooltip>
                              <Link to={`/user/${comment.worker}`}>
                                <img
                                  className="card-img-top"
                                  src={`${process.env.REACT_APP_API_URL}/user/photo/${comment.worker}`}
                                  onError={i =>
                                    (i.target.src = `${DefaultProfile}`)
                                  }
                                  alt={comment.name}
                                  style={{ height: "50px", width: "50px" }}
                                />
                              </Link>
                              <h5>{comment.body}</h5>
                              <h5 class="text-muted">{comment.name}</h5>
                              <Moment locale="ru" format="D MMM YYYY">
                                {comment.created}
                              </Moment>
                            </Tooltip>
                          </Comment>
                          {isAuthenticated().direct._id === comment.worker && (
                            <>
                              <Button
                                onClick={() =>
                                  this.deleteConfirmed(comment._id)
                                }
                                className="text-danger float-right mr-1"
                              >
                                Удалить
                              </Button>
                            </>
                          )}
                        </Card>
                      </>
                    ))}
                  </div>
                  <>
                    <div className=""></div>
                    <div style={{ padding: "5px" }}></div>
                    <div class="form-group col-sm-8 ">
                      <label for="exampleFormControlTextarea1">
                        Новый Коментарий
                      </label>
                      <textarea
                        value={body}
                        onChange={this.handleAction("body")}
                        class="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                      ></textarea>
                      <div style={{ padding: "10px" }}>
                        <Button
                          onClick={this.clickSubmit}
                          className="btn btn-primary"
                        >
                          Отправить
                        </Button>
                      </div>
                    </div>
                  </>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="">
              <div class="">
                <div class="">
                  <Card className="card-job-style">
                    <a>
                    {isAuthenticated().direct._id === postedBy ? (
                          <Link to={`/edit/job/${ID}`}>
                            <Icon  theme="twoTone" twoToneColor="#eb2f96"  type="edit" />
                          </Link>
                        ) : null}
                         <Link to={`/user/${postedBy}`}><small class="text-muted">От {this.state.name_posted} *</small></Link>
                      <div class="d-flex w-100 justify-content-between">
                        <small class="text-muted">{status}</small>
                      </div>
                      <div dangerouslySetInnerHTML={{ __html: description }} />
                      <small class="text-muted"></small>
                    </a>
                    <div class="btn-group dropup">
                      <Select
                        defaultValue="Статус"
                        style={{ width: 120 }}
                        onChange={this.handleChange}
                      >
                        <Option value="Выполнено">Выполнено</Option>
                        <Option value="Требуется уточнение">
                          Требуется уточнение
                        </Option>
                      </Select>
                    </div>
                    <div style={{ padding: "10px" }}>
                      <Popover
                        content={tags.map((tod, i) => (
                          <>
                            <Link to={`/user/${tod}`}>
                              <img
                                className="card-img-top"
                                src={`${process.env.REACT_APP_API_URL}/user/photo/${tod}?`}
                                onError={i =>
                                  (i.target.src = `${DefaultProfile}`)
                                }
                                style={{ height: "2em", width: "2em" }}
                              />
                            </Link>
                          </>
                        ))}
                        trigger="hover"
                        placement="bottom"
                      >
                        <Button type="dashed">Посмотреть дело </Button>
                      </Popover>

                    </div>
                  </Card>
                </div>
              </div>
              <hr className="hr_job_list" />
              <div className="">
                <div class="">
                  <div>
                    {comments.map((comment, i) => (
                      <>
                        <Card className="card-job-style">
                          <Comment style={{ wordBreak: "break-all" }} key={i}>
                            <Tooltip>
                              <Link to={`/user/${comment.worker}`}>
                                <img
                                  className="card-img-top"
                                  src={`${process.env.REACT_APP_API_URL}/user/photo/${comment.worker}?`}
                                  onError={i =>
                                    (i.target.src = `${DefaultProfile}`)
                                  }
                                  alt={comment.name}
                                  style={{ height: "50px", width: "50px" }}
                                />
                              </Link>
                              <h5>{comment.body}</h5>
                              <h5 className="text-muted">{comment.name}</h5>
                              <Moment locale="ru" format="D MMM YYYY">
                                {comment.created}
                              </Moment>
                            </Tooltip>
                          </Comment>
                          {isAuthenticated().direct._id === comment.worker && (
                            <>
                              <Button
                                onClick={() =>
                                  this.deleteConfirmed(comment._id)
                                }
                                className="text-danger float-right mr-1"
                              >
                                Удалить
                              </Button>
                            </>
                          )}
                        </Card>
                      </>
                    ))}
                  </div>
                  <>
                    <div style={{ padding: "5px" }}></div>
                    <div class="form-group col-sm-8 ">
                      <label for="exampleFormControlTextarea1">
                        Новый Коментарий
                      </label>
                      <textarea
                        value={body}
                        onChange={this.handleAction("body")}
                        class="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                      ></textarea>
                      <div style={{ padding: "10px" }}>
                        {comand === true ? (
                          <>
                            <Button
                              onClick={this.clickSubmit}
                              className="btn btn-primary"
                            >
                              Отправить
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              onClick={this.clickSubmitComentOneJob}
                              className="btn btn-primary"
                            >
                              Отправить
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </>
                </div>
              </div>
            </div>
          </>
        )}
        <div></div>
      </div>
    );
  }
}