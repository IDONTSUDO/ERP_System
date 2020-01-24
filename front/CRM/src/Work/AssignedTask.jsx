import React, { Component } from "react";
import Error from "../Error/Error.jsx";
import { Link } from "react-router-dom";
import { Icon, Button, Card } from "antd";
import { MyAssignedTodo } from "../Api/Http.js";
class AssignedTask extends Component {
  constructor() {
    super();
    this.state = {
      assigned: Object,
      error: false
    };
  }
  componentDidMount() {
    const userId = this.props.match.params.userId;
    this.init(userId);
  }
  init = userId => {
    MyAssignedTodo().then(data => {
      if (data.error) {
        this.setState({ error: true });
      } else {
        let arrayUsers = [];
        {
          Object.keys(data).map(obj =>
            data[obj].names_workers_list.map(i => arrayUsers.push(i))
          );
        }
        // var arr = [1, 3, 4, 1, 1, 3, 4, 5];
        var result = {};
        arrayUsers.forEach(function(a) {
          if (result[a] != undefined) ++result[a];
          else result[a] = 1;
        });
        this.setState({ assigned: result });
      }
    });
  };
  render() {
    let { assigned, error } = this.state;
    return (
      <div className="postisitonRelativeSmeni">
        <div className="container">
          {error ? <Error /> : null}
          <div className="row">
            <div className="col">
              {Object.keys(assigned).map(obj => (
                <div className="">
                  <Card style={{ padding: "5px" }}>
                    <h6>
                      {" "}
                      {obj} <b>Количество дел:</b> {assigned[obj]}{" "}
                      <Icon
                        type="book"
                        theme="twoTone"
                        twoToneColor="#52c41a"
                      />
                    </h6>
                    <Button>
                      <Link to={`/todo/assign/user/${obj}`}>Посмотреть</Link>
                    </Button>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AssignedTask;
