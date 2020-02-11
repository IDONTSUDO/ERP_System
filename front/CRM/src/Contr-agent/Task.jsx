import React, { Component } from "react";
import { GetTask } from "../Api/Http.js";
import { isAuthenticated } from "../Api/Auth";
import moment from "moment";

import {Link} from "react-router-dom";
import { Button, Tabs, notification, Icon, Select,Spin,Popover,Card } from "antd";


const { Option } = Select;


export default class Task extends Component {
  // taskId
  constructor() {
    super();
    this.state = {
      JobArray: [],
      agentByTodo: [],
      comand: false,
      created: String,
      description: String,
      importance: String,
      mounth: String,
      names_workers_list: [],
      posted_by: String,
      status: String,
      tags: [],
      time: String,
      timeComand: [],
      title: String,
      year: String,
      id: String,
      name_posted:String,
      open:true
    };
  }
  componentDidMount() {
    let taskId = this.props.match.params.taskId;
    GetTask(taskId).then(data => {
      let dated  = moment(data.created).format('DD-MM-YYYY');

      this.setState({ 
        JobArray: data.JobArray,
        agentByTodo: data.agentByTodo,
        comand: data.comand,
        created:dated,
        description: data.description,
        importance: data.importance,
        mounth: data.mounth,
        names_workers_list:data.names_workers_list,
        posted_by: data.posted_by,
        status:data.status,
        tags: data.tags,
        time: data.time,
        timeComand: data.timeComand,
        title: data.title,
        year:data.year,
        id: data._id,
        name_posted:data.name_posted,
        open: false});
    });
  }
  render() {
    const { 
        JobArray,
        name_posted,
        agentByTodo,
        comand,
        created,
        description,
        importance,
        mounth,
        names_workers_list,
        posted_by,
        status,
        tags,
        time,
        timeComand,
        title,
        year,
        id,
        open
     } = this.state;

    return (
      <div>
        <div className="postisitonRelativeSmeni">
        {open ? (
              <Spin size="large" />
            ) : (
                <div className="container">
                {comand ? (<div>
                    
                </div>) : (<div>
                    <Card className="hr_job_list card-job-style">
                    <a>
                 
                         <Link to={`/user/${posted_by}`}><small class="text-muted">От {this.state.name_posted} *</small></Link>
                      <div class="d-flex w-100 justify-content-between">
                        <small class="text-muted">{status}</small>
                      </div>
                      <div dangerouslySetInnerHTML={{ __html: description }} />
                      <small class="text-muted"></small>
                    </a>
                    <div class="btn-group dropup">
                  
                      <Select
                        disabled
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
                      <div>{created}</div>
                                               
                    </div>
                  </Card>
                </div>)}
                </div>
            )}
        </div>
      </div>
    );
  }
}
