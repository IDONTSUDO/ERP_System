import React, { Component } from "react";
import {
  GetTodoByAgent,
  GetAgentYearStatistic,
  GetAgentMountAndYear
} from "../Api/Http.js";
import { isAuthenticated } from "../Api/Auth";
import { Link } from "react-router-dom";
import { Spin } from "antd";
import { Calendar, Badge, Popover } from "antd";
import moment from "moment";
import Localisation from "../helper/LocalisationCalendar.json";

class AgentTasks extends Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      yearStatistic: [],
      agentID: undefined
    };
  }
  componentDidMount() {
    let agentId = this.props.match.params.agentId;
    let Mounth = moment()
      .locale("ru")
      .format("MM");
    let Year = moment()
      .locale("ru")
      .format("YY");
    GetAgentMountAndYear(agentId, Year, Mounth).then(data => {
      this.setState({ todos: data, open: false, agentID: agentId });
    });
  }

  panelChange = (momentDate, regim) => {
    let { agentID } = this.state;

    if (regim === "year") {
      let Year = moment(momentDate)
        .locale("ru")
        .format("YY");
      GetAgentYearStatistic(agentID, Year).then(data => {
        if (data.err) {
          console.log(data.err);
        } else {
          this.setState({ yearStatistic: data });
        }
      });
    } else {
    }
  };

  calendarChange = m => {
    console.log(m);
  };
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

  getMonthData = value => {
    let { yearStatistic } = this.state;


    if (value.month() === 0) {
      return yearStatistic[1];
    }
    if (value.month() === 1) {
      return yearStatistic[2];
    }
    if (value.month() === 2) {
      return yearStatistic[3];
    } else if (value.month() === 3) {
      return yearStatistic[4];
    } else if (value.month() === 4) {
      return yearStatistic[5];
    } else if (value.month() === 5) {
      return yearStatistic[6];
    } else if (value.month() === 6) {
      return yearStatistic[7];
    } else if (value.month() === 7) {
      return yearStatistic[8];
    } else if (value.month() === 8) {
      return yearStatistic[9];
    } else if (value.month() === 9) {
      return yearStatistic[10];
    } else if (value.month() === 10) {
      return yearStatistic[11];
    } else if (value.month() === 11) {
      return yearStatistic[12];
    }
  };
  monthCellRender = value => {
    const num = this.getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>
          <Link
            // :agentId/:month/:year
            to={`/agent/task/${this.state.agentID}/${moment(value)
              .locale("ru")
              .format("MM")}/${moment(value)
              .locale("ru")
              .format("YY")}`}
          >
            <h2>{num} *</h2>
          </Link>
        </section>
      </div>
    ) : null;
  };
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

  renderPopoverComand(item) {
    return (
      <Popover
        content={
          <>
            {item.JobArray.map((job, k) => (
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
  render() {
    return (
      <div className="postisitonRelativeSmeni">
        <Calendar
          className="calendar_body"
          onPanelChange={this.panelChange}
          locale={Localisation}
          onChange={this.calendarChange}
          dateCellRender={this.dateCellRender}
          monthCellRender={this.monthCellRender}
        />
      </div>
    );
  }
}

export default AgentTasks;
