import React, { Component } from "react";
import { isAuthenticated } from "../Api/Auth";
import ReactQuill from "react-quill";
import moment from "moment";
import { Link, Redirect } from "react-router-dom";
import { soloJob, TodoChangeComandList, DeleteTodo } from "../Api/Http";
import {
  Button,
  Tabs,
  notification,
  Icon,
  DatePicker,
  Input,
  Select
} from "antd";
import "suneditor/dist/css/suneditor.min.css";

const { Option } = Select;
export default class EditorJob extends Component {
  constructor() {
    super();
    this.state = {
      status: String,
      description: String,
      time: String,
      tags: [],
      importance: String,
      JobArray: [],
      comand: Boolean,
      postedBy: String,
      TodoTitel: String,
      err: false,
      err_text: String,
      user_last_worked: String,
      resultDestrComand: Array,
      resultComandAction: [],
      resultComandDate: [],
      tags: [],
      names_workers_list: [],
      time: String,
      redirectTo: false,
      title: String,
      todoId: String,
      LonelyTodoTime: String,
    };
    this.handleActionEditor = this.handleActionEditor.bind(this);
  }

  componentDidMount() {
    const todoId = this.props.match.params.jobid;
    this.setState({ todoId: todoId });
    this.init(todoId);
  }

  forceUpdate() {
    const todoId = this.props.match.params.jobid;
    this.setState({ todoId: todoId });
    this.init(todoId);
  }
  handleClickDeleted = () => {};
  handleChange = () => {};
  handleClickEditedLonelyJob = userId => {
    let { JobArray, todoId } = this.state;
    let i = 0;
    let USER_DESTR_ARR = [];
    let TIME_DESTR_ARR = [];
    let ACT_DESTR_ARR = [];
    let USER_NEWS_ARR = [];
    let worker_by = [];
    // выясняем какой по счету элемент нужно удалить и удаляем
    for (let el of JobArray) {
      if (el.user === userId) {
        // ищем совпадение в строке работника
        if (el.user[25] === "A") {
          // если  это исполнитель дела, то тогда спрашиваем у человека что делать дальше
          let answer = window.confirm(
            "На данный момент этот пользователь является исполнителем дела хотите продолжить? P.S. дело просто перейдет к следующему исполнителю"
          );
          if (answer) {
            // если пользователь ответил да, удаляем нужный элемент обьекта
            // за этим нам и понадобилась переменная в начале.
            delete JobArray[i];
            for (let elDestyArray in JobArray) {
              if (elDestyArray !== undefined) {
                // делаем 3 новых массива что бы потом составить из них обьект
                USER_NEWS_ARR.push(JobArray[elDestyArray].user);
                USER_DESTR_ARR.push(JobArray[elDestyArray].user);
                TIME_DESTR_ARR.push(JobArray[elDestyArray].date);
                ACT_DESTR_ARR.push(JobArray[elDestyArray].action);
              }
            }
            // передали дело дальше то есть назначили нового работника отвественный за дело.
            USER_DESTR_ARR[i] = `${USER_DESTR_ARR[i]}` + "IAMWORKED";
            JobArray = [];

            JobArray = USER_DESTR_ARR.map((user, index) => {
              return {
                user: user,
                date: TIME_DESTR_ARR[index],
                action: ACT_DESTR_ARR[index]
              };
            });
            // Подготовка массива для новости,
            // Отправляем на бэк.
            for (let elem = 0; elem < USER_NEWS_ARR.length; elem++) {
              worker_by.push({ user: USER_NEWS_ARR[elem] });
            }
            let payload = {
              JobArray
            };
            TodoChangeComandList(todoId, payload).then(data => {
              if (data.err) {
                console.log(data.err);
              } else {
                this.forceUpdate();
              }
            });
          }
        } else {
          delete JobArray[i];
          for (let DestArr in JobArray) {
            USER_NEWS_ARR.push(JobArray[DestArr].user);
            USER_DESTR_ARR.push(JobArray[DestArr].user);
            TIME_DESTR_ARR.push(JobArray[DestArr].date);
            ACT_DESTR_ARR.push(JobArray[DestArr].action);
          }

          JobArray = null;
          JobArray = USER_DESTR_ARR.map((user, index) => {
            return {
              user: user,
              date: TIME_DESTR_ARR[index],
              action: ACT_DESTR_ARR[index]
            };
          });

          let payload = {
            JobArray,
          };
          // РАБОТАЕТ НЕ ТРОЖЬ!
          TodoChangeComandList(todoId, payload).then(data => {
            if (data.err) {
              console.log(data.err);
            } else {
              this.forceUpdate();
            }
          });

          i++;
        }
        //
      }
    }
  };
  handelClickDelete = () => {
    let { todoId } = this.state;

    DeleteTodo(todoId).then(data => {
      if (data.err) {
        console.log(data.err);
      } else {
        this.setState({ redirectTo: true });
      }
    });
  };
  handelChangeSoloWork = () => {
    let { todoId, title, tags,names_workers_list,LonelyTodoTime } = this.state;
    let UsersArray = document.querySelectorAll(
      ".ant-select-selection__choice__content"
    );
    let UserActions = document.querySelectorAll(".ql-editor");
    let DateItems = document.querySelectorAll(".ant-calendar-picker-input");
    let ActionArray = [];
    let description = "";
    let validatedObject = []
    let re = /<div class="ql-editor" data-gramm="false" contenteditable="true">/gi;
    // UserAction.outerHTML.replace(re, "");
    UsersArray.forEach(function(user) {
      ActionArray.push(user.innerHTML);
    });
    UserActions.forEach(function(act) {
      description = act.outerHTML.replace(re, "");
    });
    
    for(let i =0; i < tags.length; i++){
      validatedObject.push({[names_workers_list[i]]:tags[i]})
    }
    if(LonelyTodoTime === undefined){
      console.log(200)
    }
    let payload = {
      description,
      title
    }
    TodoChangeComandList(todoId, payload).then(data => {
      if (data.err) {
        console.log(data.err);
      } else {
        this.forceUpdate();
      }
    });
  
  };
  handelDateChange = (date, dateString) => {
    // console.log(date, dateString);
    let time = moment(date)
    .locale("ru")
    .format("LL");
    this.setState({LonelyTodoTime:time})
  };
  init = todoId => {
    soloJob(todoId).then(data => {
      if (data.error) {
        this.setState({ err: true, err_text: data.err });
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
          tags: data.tags,
          names_workers_list: data.names_workers_list,
          time: data.time,
          title: data.title
        });
        // moment(str, "L", "my-locale-id").

        if (data.comand === true) {
          let comandata = data.JobArray;
          let resultComandDate = [];
          let momentObjDatesOrComandDate = [];
          for (let value of comandata) {
            resultComandDate.push(value.date);
          }
          let resultats = moment(resultComandDate[0], "LL", "ru");
          for (let i in resultComandDate) {
            momentObjDatesOrComandDate.push(
              moment(resultComandDate[i], "LL", "ru")
            );
          }

          let iterator = momentObjDatesOrComandDate[Symbol.iterator]();

          this.setState({ momentComandDate: momentObjDatesOrComandDate });
        }
      }
    });
  };
  hendelActionDate = user => {
    console.log(user);
  };

  handelCLick = event => {
    event.preventDefault();
    let { JobArray, todoId } = this.state;

    let arrayToTimes = [];
    let arrayToJob = [];
    let arrayToUsers = [];
    let i;
    let elem;

    let DateItems = document.querySelectorAll(".ant-calendar-picker-input");
    let UserActions = document.querySelectorAll(".ql-editor");
    let newstr;
    let re = /<div class="ql-editor" data-gramm="false" contenteditable="true">/gi;
    UserActions.forEach(function(UserAction) {
      //  обрезаем регуляркой хуйню
      UserAction.outerHTML.replace(re, "");
      arrayToJob.push(UserAction.outerHTML);
    });
    // console.log(DateItems)
    DateItems.forEach(function(DateItem) {
      arrayToTimes.push(
        moment(DateItem.value)
          .locale("ru")
          .format("LL")
      );
      // console.log(moment(DateItem.value).locale("ru").format("LL"))
    });
    // moment(filteredTime[k])
    //     .locale("ru")
    //     .format("LL")
    //собираем данные об измененной работе сотрудников из HTML

    for (let i in JobArray) {
      arrayToUsers.push(JobArray[i].user);
      // деструкторизируем массив
    }

    JobArray = null;
    JobArray = arrayToUsers.map((user, index) => {
      return {
        user: user,
        date: arrayToTimes[index],
        action: arrayToJob[index]
      };
    });
    let payload = {
      JobArray
    };
    // РАБОТАЕТ НЕ ТРОЖЬ!
    TodoChangeComandList(todoId, payload).then(data => {
      if (data.err) {
        console.log(data.err);
      } else {
        this.forceUpdate();
      }
    });
  };
  handleActionEditor = name => event => {
    console.log(name, event);
    this.setState({ error: "" });
    this.setState({ [name]: event });
  };
  handleAction = name => event => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };

  handleChangeTimes = (date, dateString) => {
    // moment().locale("ru").format("LL")
    console.log(date, dateString);
  };
  renderJobArray = (JobArray, names_workers_list) => {
    return Object.keys(JobArray).map((obj, i) => {
      let current = JobArray[obj].date;
      let date = moment(current, "LL", "ru");
      return (
        <>
        <div className="hr_job_list">

       
          <div className="editor_job_team_background">
            <div className="jobs_timers" style={{ padding: "5px" }}>
              {JobArray[obj].date}
            </div>
         
            <DatePicker disabled={true} defaultValue={date} />
           
            <Icon
             
              onClick={userId =>
                this.handleClickEditedLonelyJob(`${JobArray[obj].user}`, userId)
              }
              theme="twoTone"
              twoToneColor="#eb2f96"
              type="delete"
            />
            <Link to={`/user/${JobArray[obj].user}`}>
              <h5>{names_workers_list[i]} *</h5>
            </Link>

            <ReactQuill value={JobArray[obj].action} id={`workerAction${i}`} />
          </div>
          <div></div>
          </div>
        </>
      );
    });
  };
  renderJobNoTeamArray = (
    tags,
    names_workers_list,
    description,
    time,
    title
  ) => {
    let date = moment(time, "LL", "ru");

    return (
      <>
        <div className="container">
          <div className="row">
            <div className="hr_job_list">
              <label>
                Заголовок
                <input
                  value={title}
                  onChange={this.handleAction("title")}
                  type="text"
                  class="form-control"
                ></input>
              </label>
              <div className="new_jobs_list">
                <ReactQuill value={description} />
              </div>
              <DatePicker  disabled={true} onChange={this.handelDateChange} defaultValue={date} />
              <Select
                mode="multiple"
                style={{ width: "100%" }}
                placeholder="select one country"
                defaultValue={names_workers_list.map((name, i) => (
                  <>{name}</>
                ))}
                disabled={true}
                optionLabelProp="label"
              ></Select>
              <div style={{ padding: "5px" }} className="">
                <Button onClick={this.handelChangeSoloWork}>Изменить</Button>
                <Button onClick={this.handelClickDelete} type="danger">
                  Удалить
                </Button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  render() {
    let {
      status,
      title,
      description,
      time,
      tags,
      importance,
      JobArray,
      comand,
      postedBy,
      TodoTitel,
      err,
      err_text,
      resultDestrComand,
      names_workers_list,
      redirectTo
    } = this.state;
    if (redirectTo) {
      return <Redirect to={`/user/work/${isAuthenticated().direct._id}`} />;
    }
    return (
      <div className="postisitonRelativeSmeni">
        {comand ? (
          <div>
            {this.renderJobArray(JobArray, names_workers_list)}
            <Button onClick={this.handelCLick}>Изменить</Button>
            <Button onClick={this.handelClickDelete} type="danger">
              Удалить
            </Button>
          </div>
        ) : (
          <>
            {this.renderJobNoTeamArray(
              tags,
              names_workers_list,
              description,
              time,
              title
            )}
          </>
        )}
      </div>
    );
  }
}
