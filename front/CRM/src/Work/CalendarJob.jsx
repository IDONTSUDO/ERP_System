import React, { Component } from 'react'


import { Calendar, Badge } from 'antd';
import {isAuthenticated} from "../Api/Auth"
import {UserTodoYear} from "../Api/Http"
import moment from "moment";


export default class CalendarJob extends Component {
  constructor(){
    super()
    this.state = {

    }
  }
  componentDidMount(){
    const user = isAuthenticated().direct._id
    let startDate = Date.now()

    let mounthTodo = moment(startDate)
    .locale("ru")
    .format("MM");
    let year = moment(startDate)
    .locale("ru")
    .format("YY");
    let dataFetch = {
      mounthTodo,
        year,
        user
    }
    UserTodoYear(dataFetch).then(data =>{
        console.log(data)
    })
  }
  forceUpdate(){}

    render() {
        function getListData(value) {
            let listData;
            switch (value.date()) {
              case 8:
                listData = [
                  { type: 'warning', content: 'This is warning event.' },
                  { type: 'success', content: 'This is usual event.' },
                ];
                break;
              case 10:
                listData = [
                  { type: 'warning', content: 'This is warning event.' },
                  { type: 'success', content: 'This is usual event.' },
                  { type: 'error', content: 'This is error event.' },
                ];
                break;
              case 15:
                listData = [
                  { type: 'warning', content: 'This is warning event' },
                  { type: 'success', content: 'This is very long usual event。。....' },
                  { type: 'error', content: 'This is error event 1.' },
                  { type: 'error', content: 'This is error event 2.' },
                  { type: 'error', content: 'This is error event 3.' },
                  { type: 'error', content: 'This is error event 4.' },
                ];
                break;
              default:
            }
            return listData || [];
          }
          
          function dateCellRender(value) {
            const listData = getListData(value);
            return (
              <ul className="events">
                {listData.map(item => (
                  <li key={item.content}>
                    <Badge status={item.type} text={item.content} />
                  </li>
                ))}
              </ul>
            );
          }
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
            <div className="">
                  <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} />
            </div>
        )
    }
}
