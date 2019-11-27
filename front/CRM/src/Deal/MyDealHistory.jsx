import React, { Component } from "react";
import { MyHistoryComplete } from "../Api/Http.js";
import { isAuthenticated } from "../Api/Auth";
import { Button, Rate, Card, Icon, notification, Anchor } from "antd";
import Moment from "react-moment";
import 'moment/locale/ru';
import Error from "../Error/Error.jsx"

export default class MyDealHistory extends Component {
  constructor() {
    super();
    this.state = {
      history: [],
      page: 1
    };
  }
  componentDidMount() {
    this.LoadHistory(this.state.page);
  }
  LoadHistory = page => {
    let userId = isAuthenticated().direct._id;
    MyHistoryComplete(userId, page).then(data => {
      if (data.error) {
      } else {
        this.setState({ history: data });
      }
    });
  };
  loadMore = number => {
    this.setState({ page: this.state.page + number });
    this.LoadHistory(this.state.page + number);
  };
  loadLess = number => {
    this.setState({ page: this.state.page - number });
    this.LoadHistory(this.state.page - number);
  };
  render() {
    const { history, page } = this.state;
    return (
      <div className="postisitonRelativeSmeni">
        <Anchor style={{ backgroundColor: "#f0f2f5" }}>
          
        </Anchor>

        <div className="container">
        {(page > 1 &&  page.length > 50) ?(
             <>
             <Button
               onClick={() => this.loadLess(1)}
               className="ButtonPaginate"
               icon="left"
             ></Button>
           </>
          ):(
            ""
          )}
          {history.length === 50? (
            <>
              <Button
                onClick={() => this.loadMore(1)}
                className="ButtonPaginate"
                icon="right"
              ></Button>
            </>
          ) : (
            ""
          )}
          <div className="row">
            
            {history.map((oneDeal, i) => (
              <>
              <div className="deal-phone-green">
                <Card className="deal-purpur">
                  <div style={{ color: "#FEFEFE" }}>{oneDeal.price}</div>
                  <div style={{ color: "#FEFEFE" }}>{oneDeal.name}</div>
                  <Moment style={{ color: "#FEFEFE" }} locale="ru" format="D MMM YYYY">
                    {oneDeal.Date}
                  </Moment>
                  <div style={{ padding: "5px" }}>
                    {" "}
                    <Rate disabled defaultValue={oneDeal.rate} />
                  </div>
                </Card>
                </div>
              </>
            ))}
          </div>
          
        </div>
      </div>
    );
  }
}
