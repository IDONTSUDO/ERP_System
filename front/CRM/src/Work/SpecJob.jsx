import React, { Component } from "react";
import { soloJob, MyTodoMount,NewComentSpecTodo } from "../Api/Http.js";
import { isAuthenticated } from "../Api/Auth";


import {
  Icon,
  Popover,
  Comment,
  Badge,
  Avatar,
  Form,
  Button,
  List,
  Input,
  Rate,
  Calendar,
  Tabs,
  notification
} from "antd";


import moment from "moment";
import Localisation from "../helper/LocalisationCalendar.json";

const { TextArea } = Input;
const { TabPane } = Tabs;

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? "replies" : "reply"}`}
    itemLayout="horizontal"
    renderItem={props => <Comment {...props} />}
  />
);
let today = moment(Date.now());

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <div>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>

    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Новый коментарий
      </Button>
    </Form.Item>
  </div>
);
class SpecJob extends Component {
  constructor() {
    super();
    this.state = {
      err: false,
      task: [],
      comments: [],
      submitting: false,
      value: "",
      todoMounth: [],
      newTodoSetDate:undefined,
      rate:undefined,
      dateSelect:undefined,
      userIdView:undefined
    };
  }
  componentDidMount() {
    let specId = this.props.match.params.specId;
    soloJob(specId).then(data => {
      if (data.err) {
        this.setState({ err: true });
      } else {
        this.setState({ task: data });
      }
    });
    let startdate = Date.now();
    let user = isAuthenticated().direct._id;
    let mounthTodo = moment(startdate)
      .locale("ru")
      .format("MM");
    let yearTodo = moment(startdate)
      .locale("ru")
      .format("YY");

    MyTodoMount(mounthTodo, user, yearTodo).then(data => {
      if (data.err) {
        this.setState({ err: true });
      } else {
        this.setState({ todoMounth: data,userIdView:user });
      }
    });
  }
  handelRateChaange = (e) =>{
    this.setState({rate:e})
  }

  handelSelect = (momentDate) =>{
    this.setState({dateSelect:momentDate})
  }
  handleSubmit = () => {
    let {value,rate,task,dateSelect,userIdView} = this.state;
    if (!value) {
      let err = "коментария нет"
    return   this.openNoticationErrorValiid(err)
    }
    if(dateSelect === undefined){
      let err = "Дата не выбрана"
      return this.openNoticationErrorValiid(err)
    }
    if(!rate){
      let err = "рейтинг не выставлен"
      return this.openNoticationErrorValiid(err)
    }else{
      this.setState({
        submitting: true
      });
      let agentID = task.agent._id
      let workerId = userIdView
      let taskId = task._id
      let body = {
        value,
        rate,
        agentID,
        workerId,
        taskId,
      }
      
      NewComentSpecTodo(body).then(data =>{
        console.log(data)
      })
    }
  };
  dateCellRender = value => {
    let time = moment(value)
      .locale("ru")
      .format("LL");

    const listData = this.state.todoMounth;

    let days = moment(today).diff(value, "days");
  
    let itemQuality = 0;
    let timeInteration;
  
    
    listData.map((item, i) => (time === item.time ? (itemQuality++) : null));
   
    return (
      <ul className="events">
        
        {itemQuality === 0 ? null :(
          <>
          <Badge status="error" text={itemQuality} />
        
          </>
          )}
      </ul>
    );
  };
  handelAnyChange = name => event => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };
  monthCellRender = () => {};
  calendarChange = (e) =>{
   let data = moment(e)
    .locale("ru")
    .format("LL");
    this.setState({newTodoSetDate:data})

  }
  handleChange = e => {
    this.setState({
      value: e.target.value,
    });
  };
  openNoticationErrorValiid = (err) =>{
    notification.open({
      message:`${err}`,
      icon: <Icon type="frown" style={{ color: "#108ee9" }} />
    });
  }
  render() {
    const { comments, submitting, value } = this.state;

    return (
      <div className="email_main_pos">
        <div>
          <Icon type="question" />
          <Tabs defaultActiveKey="1">
            <TabPane tab="Коментарий" key="1">
              <Comment
              
                content={
                  <>
                    <Calendar
                      dateCellRender={this.dateCellRender}
                      monthCellRender={this.monthCellRender}
                      validRange={[
                        moment(new Date()),
                        moment(new Date()).add(13, "days")
                      ]}
                      fullscreen={true}
                      className="calendar_body"
                      onChange={this.calendarChange}
                      onSelect={this.handelSelect}
                    />
                 
                    <Rate onChange={this.handelRateChaange}	 allowClear={false} defaultValue={3} />
                    <Editor
                      onChange={this.handleChange}
                      onSubmit={this.handleSubmit}
                      submitting={submitting}
                      value={value}
                    />
                  </>
                }
              />
            </TabPane>
            <TabPane tab="Прошлые коментарии" key="2">
              {comments.length > 0 && <CommentList comments={comments} />}
            </TabPane>
            <TabPane tab="Агент" key="3">
  
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default SpecJob;
