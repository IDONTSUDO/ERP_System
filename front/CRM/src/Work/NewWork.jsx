import React from "react";
import { list, NewTodo, NewNewsJob, NewAssignTodoToday } from "../Api/Http";
import { isAuthenticated } from "../Api/Auth";
import { everyday, IsEveryDaySub } from "../helper/everyday.js";
import {
  Button,
  Tabs,
  notification,
  Icon,
  DatePicker,
  Input,
  Select
} from "antd";
import moment from "moment";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // ES6

// import "suneditor/dist/css/suneditor.min.css";

import "react-datepicker/dist/react-datepicker.css";

const { Option } = Select;
const { TabPane } = Tabs;

class Work extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newEvent: "",
      // это нужно для формирования новостей
      startDate: new Date(),
      tags: [],
      //это список юзеров
      worker: [],
      title: "",
      description: "",
      user: "",
      loading: false,
      importance: "",
      visible: false,
      error: "",
      // это то что должен сделать работник
      workerJob0: "",
      workerJob1: "",
      workerJob2: "",
      workerJob3: "",
      workerJob4: "",
      workerJob5: "",
      workerJob6: "",
      workerJob7: "",
      workerJob8: "",
      workerJob9: "",
      workerJob10: "",
      // эти даннные отвечают, за выбранное время для работника.
      workerTime0: "",
      workerTime1: "",
      workerTime2: "",
      workerTime3: "",
      workerTime4: "",
      workerTime5: "",
      workerTime6: "",
      workerTime7: "",
      workerTime8: "",
      workerTime9: "",
      disbledSelect: true
    };
    this.handleActionEditor = this.handleActionEditor.bind(this);
  }
  componentDidMount() {
    this.setState({ user: isAuthenticated().direct });
    everyday();
    list().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ worker: data });
      }
    });
  }
  /*
  И вот здесь ты скажешь мне  это полный костыль,
  а я тебе отвечу увы компоненты антд дизайна наложили на меня некоторые ограничения
  и по этому мне пришлось писать спагети  код. Я конечно мог, сделать свою реализацию и не прибегать к ним.
  Но писать велосипеды это слишком весело.
  */
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
  handleChangeForm = name => event => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };
  handleAction = name => event => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };

  // эта функция валидирует создание одиночного дела
  isValid = () => {
    const { tags, title, description, importance } = this.state;
    if (title.length === 0) {
      this.setState({ error: "Заголовок является обязательным" });
      return false;
    }
    if (importance.length === 0) {
      this.setState({ error: "Выберете важность дела" });
      return false;
    }
    if (tags.length === 0) {
      this.setState({ error: "Вы должны добавить хоть одного исполнителя" });
      return false;
    }
    if (description.length === 0) {
      this.setState({
        error: "Описание задачи является обязательным параметром"
      });
      return false;
    }
    return true;
  };
  onChangeworkerTime0 = (date, dateString) => {
    console.log(date,dateString)
    this.setState({ workerTime0: date });
  };
  onChangeworkerTime1 = (date, dateString) => {
    this.setState({ workerTime1: date });
  };
  onChangeworkerTime2 = (date, dateString) => {
    this.setState({ workerTime2: date });
  };
  onChangeworkerTime3 = (date, dateString) => {
    this.setState({ workerTime3: date });
  };
  onChangeworkerTime4 = (date, dateString) => {
    this.setState({ workerTime4: date });
  };
  onChangeworkerTime5 = (date, dateString) => {
    this.setState({ workerTime5: date });
  };
  onChangeworkerTime6 = (date, dateString) => {
    this.setState({ workerTime6: date });
  };
  onChangeworkerTime7 = (date, dateString) => {
    this.setState({ workerTime7: date });
  };
  onChangeworkerTime8 = (date, dateString) => {
    this.setState({ workerTime8: date });
  };
  onChangeworkerTime9 = (date, dateString) => {
    this.setState({ workerTime9: date });
  };
  onChangeDate = (date, dateString) => {
    this.setState({ startDate: date });
  };
  handleChange = value => {
    this.setState({ tags: value });
  };

  clickSubmit = event => {
    event.preventDefault();
    if (this.isValid()) {
      this.setState({ loading: true });
      let {
        tags,
        title,
        description,
        user,
        startDate,
        importance,
        worker
      } = this.state;


      let tagsArray = [];
      let names_workers_list = tags
      
      
    
      for (let index = 0; tags.length > index; index++) {
        for (let index1 = 0; worker.length > index1; index1++) {
          if (worker[index1].name === tags[index]) {
            tagsArray.push(worker[index1]._id);
          }
        }
      }
      

      let time = moment(startDate)
        .locale("ru")
        .format("LL");
      tags = [];
      let finalyUserArray = [];
      tags = tagsArray;

      let comand = false;
      // tags
     
      let posted_by = isAuthenticated().direct._id;
      let name_posted = isAuthenticated().direct.name;
      let eventNews = "Назначено новое дело";
      let link = `/job/`;

      var worker_job_news = tags.filter(function(el) {
        return el != posted_by;
      });

      let worker_by = worker_job_news.map((user, index) => {
        return {
          user: user
        };
      });
      let paylod = {
        posted_by,
        link,
        name_posted,
        eventNews,
        comand,
        importance,
        title,
        description,
        time,
        worker_by,
        tags,
        names_workers_list
      };

      NewNewsJob(paylod).then(data => {
        if (data.error) {
          this.openNotificationError();
        } else
          this.setState({
            title: "",
            description: "",
            workerJob0: "",
            workerJob1: "",
            workerJob2: "",
            workerJob3: "",
            workerJob4: "",
            workerJob5: "",
            workerJob6: "",
            workerJob7: "",
            workerJob8: "",
            workerJob9: "",
            workerJob10: "",
            workerTime0: "",
            workerTime1: "",
            workerTime2: "",
            workerTime3: "",
            workerTime4: "",
            workerTime5: "",
            workerTime6: "",
            workerTime7: "",
            workerTime8: "",
            workerTime9: "",
            tags: []
          });
        this.openNotificationNewWork();
        document.querySelector(".ant-select-selection__clear").click();
        let elements = document.getElementsByTagName("p");
        for (let elem of elements) {
          elem.innerHTML = "";
        }
        let sub = IsEveryDaySub()._id;
        NewAssignTodoToday(sub);
      });
    }
  };
  validateDinamicJobs = JobArray => {
    let { importance, title } = this.state;
    if (title.length === 0) {
      this.setState({ error: "Заголовок является обязательным" });
      return false;
    }
    if (importance.length === 0) {
      this.setState({ error: "Похоже что вы не до заполнили дело" });
      return false;
    }

    let i = 0;

    while (JobArray.length > i) {
      if (typeof JobArray[i].date == "undefined") {
        this.setState({
          error: "Похоже что вы не до заполнили дело"
        });
        return false;
      }
      if (typeof JobArray[i].action == "undefined") {
        this.setState({
          error: "Похоже что вы не до заполнили дело"
        });
        return false;
      }
      i++;
    }
    return true;
  };
  openNotificationErrorValidationD = errorsValid => {
    notification.open({
      message: `${errorsValid}`,
      icon: <Icon type="frown" style={{ color: "#108ee9" }} />
    });
  };

  handleActionEditor = name => event => {
    this.setState({ error: "" });
    this.setState({ [name]: event });
  };
  clickSubmitExtedensJob = event => {
    event.preventDefault();
    const {
      tags,
      worker,
      workerJob0,
      workerJob1,
      workerJob2,
      workerJob3,
      workerJob4,
      workerJob5,
      workerJob6,
      workerJob7,
      workerJob8,
      workerJob9,
      workerTime0,
      workerTime1,
      workerTime2,
      workerTime3,
      workerTime4,
      workerTime5,
      workerTime6,
      workerTime7,
      workerTime8,
      workerTime9,
      importance,
      title,
      user
    } = this.state;
    let timeArray = [];
    let newTimeArray = [];
    let lastTimeArray = [];
    let newArray = [];
    let userValidArray = [];
    let SortOfArray = [];
    let tired = []; //массив с юзер айди
    let NoHope = [];
    var posted_by = isAuthenticated().direct._id;

    timeArray.push(
      workerTime0,
      workerTime1,
      workerTime2,
      workerTime3,
      workerTime4,
      workerTime5,
      workerTime6,
      workerTime7,
      workerTime8,
      workerTime9
    );

    newArray.push(
      workerJob0,
      workerJob1,
      workerJob2,
      workerJob3,
      workerJob4,
      workerJob5,
      workerJob6,
      workerJob7,
      workerJob8,
      workerJob9
    );
    
    
    for (let t = 0; timeArray.length > t; t++) {
      newTimeArray.push(timeArray[t]._d);
    }

    var filteredTime = newTimeArray.filter(function(el) {
      return el != undefined;
    });

    for (let k = 0; filteredTime.length > k; k++) {
      lastTimeArray.push(
        moment(filteredTime[k])
          .locale("ru")
          .format("LL")
      );
    }

    var filtered = newArray.filter(function(el) {
      return el != "";
    });

    for (let i = 0; tags.length > i; i++) {
      if (i === 0) {
        userValidArray.push(tags[0] + "IAMWORKED");
      } else {
        userValidArray.push(tags[i]);
      }
    }
    let i = 0;

    while (worker.length > i) {
      for (let el2 = 0; tags.length > el2; el2++) {
        if (worker[i].name === tags[el2]) {
          SortOfArray.push(worker[i]._id, worker[i].name);
        }
      }
      i++;
    }

    for (let ar1 = 0; tags.length > ar1; ar1++) {
      for (let ar2 = 0; SortOfArray.length > ar2; ar2++) {
        if (tags[ar1] === SortOfArray[ar2]) {
          tired.push(SortOfArray[ar2 - 1]);
        }
      }
    }

    for (let i = 0; tired.length > i; i++) {
      if (i == 0) {
        NoHope.push(tired[0] + "IAMWORKED");
      } else {
        NoHope.push(tired[i]);
      }
    }

    let newsFinalyArray = []; //Users clear
    for (let i = 0; NoHope.length > i; i++) {
      if (NoHope[i][25] === "A") {
        newsFinalyArray.push(NoHope[i].slice(0, -9));
      }
      if (NoHope[i][25] == undefined) {
        newsFinalyArray.push(NoHope[i]);
      }
    }
    var filteredNewsFinalyArray = newsFinalyArray.filter(function(el) {
      return el != posted_by;
    });

    let jobNews = filteredNewsFinalyArray.map((user, index) => {
      return {
        user: user,
        date: lastTimeArray[index],
        action: filtered[index]
      };
    });
    let JobArray = NoHope.map((user, index) => {
      return {
        user: user,
        date: lastTimeArray[index],
        action: filtered[index]
      };
    });

    if (this.validateDinamicJobs(JobArray)) {
      let comand = true;

      let name_posted = isAuthenticated().direct.name;
      let worker_by = jobNews;
      let eventNews = "Назначено новое дело";
      let link = `${process.env.REACT_APP_API_NEWS_JOB}`;
      let names_workers_list = tags
      let paylod = {
        names_workers_list,
        link,
        worker_by,
        eventNews,
        posted_by,
        name_posted,
        JobArray,
        comand,
        importance,
        title,
        jobNews
      };
      NewNewsJob(paylod).then(data => {
        if (data.error) {
          this.openNotificationError();
        } else {
          this.openNotificationNewWork();
          let value = [];
          this.handleChange(value);
          this.setState({
            workerJob0: "",
            workerJob1: "",
            workerJob2: "",
            workerJob3: "",
            workerJob4: "",
            workerJob5: "",
            workerJob6: "",
            workerJob7: "",
            workerJob8: "",
            workerJob9: "",
            workerJob10: "",
            workerTime0: "",
            workerTime1: "",
            workerTime2: "",
            workerTime3: "",
            workerTime4: "",
            workerTime5: "",
            workerTime6: "",
            workerTime7: "",
            workerTime8: "",
            workerTime9: ""
          });
          document.querySelector(".ant-select-selection__clear").click();
          let sub = IsEveryDaySub()._id;
          NewAssignTodoToday(sub);
        }
      });
    }
  };
  openNotificationError() {
    notification.open({
      message: "Ой что то пошло не так, мне жаль",
      icon: <Icon type="frown" style={{ color: "#108ee9" }} />
    });
  }
  openNotificationNewWork() {
    notification.open({
      message: "Новое дело создано",
      icon: <Icon type="smile" style={{ color: "#108ee9" }} />
    });
  }
  openNotificationErrorValidation() {
    const { error } = this.state;
    notification.open({
      message: `${error}`,
      icon: <Icon type="frown" style={{ color: "#108ee9" }} />
    });
    this.setState({ error: "" });
  }


  render() {
    const {
      worker,
      description,
      error,
      tags,
      title,
      workerJob0,
      workerJob1,
      workerJob2,
      workerJob3,
      workerJob4,
      workerJob5,
      workerJob6,
      workerJob7,
      workerJob8,
      workerJob9,
      disbledSelect
    } = this.state;
    function handleScroll(event){
      console.log(event); //Get the scroll event
    }
    return (
      <div className="postisitonRelativeSmeni">
        <div className="screen-reader">
          <div className="container">
            <div className="row">
              <Tabs defaultActiveKey="1" className="new_jobs_list" >
                <TabPane tab="Одиночное" key="1">
                  <form>
                    <div>
                      <label
                        className="text-muted"
                        for="exampleFormControlInput1"
                      >
                        Название
                      </label>
                      <input
                        value={title}
                        onChange={this.handleAction("title")}
                        type="text"
                        class="form-control"
                       
                      />
                    </div>

                    <div>
                      <label
                        className="text-muted"
                        for="exampleFormControlTextarea1"
                      >
                        Описание
                      </label>
                      <ReactQuill
                        onChange={this.handleActionEditor("description")}
        
                      />
                    </div>
                  </form>

                  <div className="col-md-4">
                    <label
                      className="label_position text-muted"
                      for="exampleFormControlTextarea1"
                    >
                      Сроки Выполнения
                    </label>
                    <DatePicker
                      onChange={this.onChangeworkerTime1}
                      placeholder="Выберите дату"
                    />
                    <div class="form-group">
                      <label for="exampleFormControlSelect1">
                        Приоретет задачи
                      </label>
                      <select
                        onChange={this.handleAction("importance")}
                        class="form-control"
                      >
                        <option>Выберите приоретет</option>
                        <option>Очень важное</option>
                        <option>Средней важности</option>
                        <option>Не очень важное</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <h3>Исполнители</h3>
                    <div className="Tags">
                      <Select
                        mode="multiple"
                        style={{ width: "max-content" }}
                        placeholder="Выберете исполнителей"
                        onChange={this.handleChange}
                        optionLabelProp="label"
                        defaultActiveFirstOption={false}
                        allowClear={true}
                      >
                        {worker.map((workerOne, i = 1) => (
                          <Option value={workerOne.name} label={workerOne.name}>
                            <span role="img" aria-label="China">
                              {workerOne.name}
                            </span>
                          </Option>
                        ))}
                      </Select>
                    </div>
                  </div>
                  {/* style={{ padding: "50px" }} */}
                  <div  className="col-md-4">
                    <Button onClick={this.clickSubmit}>Отправить</Button>
                  </div>
                </TabPane>
                <TabPane tab="Командное" key="3">
                  <div className="col-md-4">
                    <h3>Исполнители</h3>
                    <div className="Tags">
                      <Select
                        // disabled={disbledSelect  ?(true):(false)}
                        autoFocus={true}
                        mode="multiple"
                        style={{ width: "max-content" }}
                        placeholder="Выберете исполнителей"
                        onChange={this.handleChange}
                        optionLabelProp="label"
                        defaultActiveFirstOption={false}
                        allowClear={true}
                        defaultValue={this.state.tags}
                      >
                        {worker.map((workerOne, i = 1) => (
                          <Option value={workerOne.name} label={workerOne.name}>
                            <span role="img" aria-label="China">
                              {workerOne.name}
                            </span>
                          </Option>
                        ))}
                      </Select>
                      
                    </div>
                  </div>
                  <h1 style={{ padding: "0.5em" }}></h1>

                  <div>
                    {tags.length > 0 ? (
                      <>
                        <Input
                          value={title}
                          onChange={this.handleChangeForm("title")}
                          placeholder="Заголовок дела..."
                        />
                        <label for="exampleFormControlSelect1">
                          Приоретет задачи
                        </label>
                        <select
                          onChange={this.handleChangeForm("importance")}
                          class="form-control"
                        >
                          <option>Выберите приоретет</option>
                          <option>Очень важное</option>
                          <option>Средней важности</option>
                          <option>Не очень важное</option>
                        </select>
                      </>
                    ) : (
                      ""
                    )}
                    {tags.map((tod, i = 1) => (
                      <>
                        {tags.length < 10 ? (
                          <>
                            <form>
                              <label
                                className="text-muted"
                                for="exampleFormControlTextarea1"
                              >
                                Описание дела №{i}
                                <h5>{tod}</h5>
                              </label>
                              {/* <textarea
                                onChange={this.handleAction(`workerJob${i}`)}
                                class="form-control"
                                id="exampleFormControlTextarea1"
                                rows="3"
                                value={this.state[`workerJob${i}`]}
                              ></textarea> */}
                              <ReactQuill
                                onChange={this.handleActionEditor(
                                  `workerJob${i}`
                                )}
                              />
                            </form>
                            {i == 0 ? <></> : ""}
                            {i === 0 ? (
                              <>
                                <DatePicker
                                  onChange={this.onChangeworkerTime0}
                                  placeholder="Выберите дату"
                                />
                              </>
                            ) : (
                              ""
                            )}
                            {i === 1 ? (
                              <>
                                <DatePicker
                                  onChange={this.onChangeworkerTime1}
                                  placeholder="Выберите дату"
                                />
                              </>
                            ) : (
                              ""
                            )}
                            {i === 2 ? (
                              <>
                                <DatePicker
                                  onChange={this.onChangeworkerTime2}
                                  placeholder="Выберите дату"
                                />
                              </>
                            ) : (
                              ""
                            )}
                            {i === 3 ? (
                              <>
                                <DatePicker
                                  onChange={this.onChangeworkerTime3}
                                  placeholder="Выберите дату"
                                />
                              </>
                            ) : (
                              ""
                            )}
                            {i === 4 ? (
                              <>
                                <DatePicker
                                  onChange={this.onChangeworkerTime4}
                                  placeholder="Выберите дату"
                                />
                              </>
                            ) : (
                              ""
                            )}
                            {i === 5 ? (
                              <>
                                <DatePicker
                                  onChange={this.onChangeworkerTime5}
                                  placeholder="Выберите дату"
                                />
                              </>
                            ) : (
                              ""
                            )}
                            {i === 6 ? (
                              <>
                                <DatePicker
                                  onChange={this.onChangeworkerTime6}
                                  placeholder="Выберите дату"
                                />
                              </>
                            ) : (
                              ""
                            )}
                            {i === 7 ? (
                              <>
                                <DatePicker
                                  onChange={this.onChangeworkerTime7}
                                  placeholder="Выберите дату"
                                />
                              </>
                            ) : (
                              ""
                            )}
                            {i === 8 ? (
                              <>
                                <DatePicker
                                  onChange={this.onChangeworkerTime8}
                                  placeholder="Выберите дату"
                                />
                              </>
                            ) : (
                              ""
                            )}
                            {i === 9 ? (
                              <>
                                <DatePicker
                                  onChange={this.onChangeworkerTime9}
                                  placeholder="Выберите дату"
                                />
                              </>
                            ) : (
                              ""
                            )}
                          </>
                        ) : (
                          <>
                            <h5>Нельзя создавать больше 10 дел одновременно</h5>
                          </>
                        )}
                      </>
                    ))}
                  </div>
                  {tags.length > 1 ? (
                    <>
                      {" "}
                      <div style={{ padding: "0.5em" }}>
                        {" "}
                        <Button onClick={this.clickSubmitExtedensJob}>
                          {" "}
                          Создать
                        </Button>
                      </div>{" "}
                    </>
                  ) : (
                    <></>
                  )}
                </TabPane>
              </Tabs>
            </div>
          </div>
          {error.length > 2 ? this.openNotificationErrorValidation() : ""}
        </div>
      </div>
    );
  }
}
export default Work;
