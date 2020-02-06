import React, { Component } from "react";
import { GetTodoByAgent } from "../Api/Http.js";
import { isAuthenticated } from "../Api/Auth";
import { Link } from "react-router-dom";
import { Spin } from "antd";
import { Calendar, Badge, Popover } from "antd";
import moment from "moment";

class AgentTasks extends Component {
  constructor() {
    super();
    this.state = {
      todos: []
    };
  }
  componentDidMount() {
    let agentId = this.props.match.params.agentId;
    GetTodoByAgent(agentId).then(data => {
      if (data.err) {
        console.log(data.err);
      } else {
        this.setState({ todos: data });
      }
    });
  }

  
  renderPopoverComand(item) {
    return (
      <Popover
        content={
          <>
            {item.JobArray.map((job,k) =>(
              <>
              <div
              dangerouslySetInnerHTML={{
                __html: job.action
              }}
            />
              <div>{job.date}</div>
              <div></div>
              </>
            ))}
            <div>
              <div>{item.time}</div>
            </div>
            <div>
              {item.names_workers_list.map((worker, i) => (
                <Link to={`/user/${item.tags[i]}`}>
                  <div>{worker}</div>
                </Link>
              ))}
            </div>
          </>
        }
        title={item.title}
        trigger="hover"
      >
        <div>{item.title}</div>{" "}
      </Popover>
    );
  }

  panelChange = (m,regim)=>{
    console.log(m,regim)
  }
  calendarHandler = () =>{

  }
  calendarChange = (m) =>{
    console.log(m)
  }
  renderPopoverNotTeam(item) {
    return (
      <Popover
        content={
          <>
            <div
              dangerouslySetInnerHTML={{
                __html: item.description
              }}
            />
            <div>
              <div>{item.time}</div>
            </div>
            <div>
              {item.names_workers_list.map((worker, i) => (
                <Link to={`/user/${item.tags[i]}`}>
                  <div>{worker}</div>
                </Link>
              ))}
            </div>
          </>
        }
        title={item.title}
        trigger="hover"
      >
        <div>{item.title}</div>{" "}
      </Popover>
    );
  }
  dateCellRender = value => {
    let time = moment(value)
      .locale("ru")
      .format("LL");

    const listData = this.state.todos;
    return (
      <ul className="events">
        {listData.map(item => (
          <li key={item.title}>
            {time ===
            moment(item.created)
              .locale("ru")
              .format("LL") ? (
              <>
                {item.comand == true ? (
                  <>
                  
                    {item.importance === "Очень важное" ? (
                      <Badge
                        status="error"
                        text={this.renderPopoverComand(item)}
                      />
                    ) : null}
                    {item.importance === "Средней важности" ? (
                      <Badge
                        status="warning"
                        text={this.renderPopoverComand(item)}
                      />
                    ) : null}
                    {item.importance === "Не очень важное" ? (
                      <Badge
                        status="success"
                        text={this.renderPopoverComand(item)}
                      />
                    ) : null}
                  </>
                ) : null}
                {item.comand === false ? (
                  <>
                    {item.importance === "Очень важное" ? (
                      <Badge
                        status="error"
                        text={this.renderPopoverNotTeam(item)}
                      />
                    ) : null}
                    {item.importance === "Средней важности" ? (
                      <Badge
                        status="warning"
                        text={this.renderPopoverNotTeam(item)}
                      />
                    ) : null}
                    {item.importance === "Не очень важное" ? (
                      <Badge
                        status="success"
                        text={this.renderPopoverNotTeam(item)}
                      />
                    ) : null}
                  </>
                ) : null}
              </>
            ) : null}
          </li>
        ))}
      </ul>
    );
  };
  render() {
    function getMonthData(value) {
      if (value.month() === 8) {
        return 1394;
      }
    }

    function monthCellRender(value) {
      const num = getMonthData(value);
      return num ? (
        <div className="notes-month">
          <section>{num}</section>
          <span>Backlog number</span>
        </div>
      ) : null;
    }
    return (
      <div className="postisitonRelativeSmeni">
        <Calendar
        className="calendar_body"
        onPanelChange={this.panelChange}
        onChange={this.calendarChange}
          dateCellRender={this.dateCellRender}
          monthCellRender={monthCellRender}
        />
      </div>
    );
  }
}

export default AgentTasks;
