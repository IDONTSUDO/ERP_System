import React, { Component } from "react";
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'
import { Card, Button } from "antd";
import { updateUser, isAuthenticated } from "../Api/Auth";
export default class PersonalizationUser extends Component {
  constructor() {
    super();
    this.state = {
      displayColorPicker: false,
      color: {
        r: '241',
        g: '112',
        b: '19',
        a: '1',
      },
      Awesome_todo: "",
      Awesome_todo_text: "",
      Awesome_Todo_Shadow: "",
      Midel_todo: "",
      Midel_Todo_Text: "",
      Midel_Todo_Shadow: "",
      Todo_NotVery_Important: "",
      Todo_NotVery_Important_text: "",
      Todo_NotVery_Important_shadow: ""
    };
  }
  componentDidMount() {
    let AwesomeTodo = isAuthenticated().direct.todo_avesome;
    let AwesomeTodoShadow = isAuthenticated().direct.todo_avesome_shadow;
    let AwesomeTodoText = isAuthenticated().direct.todo_avesome_text;
    let MidelTodo = isAuthenticated().direct.todo_middle;
    let MidelTodoText = isAuthenticated().direct.todo_middle_text;
    let MidelTodoShdow = isAuthenticated().direct.todo_middle_shadow;
    let TodoNotVeryImportant = isAuthenticated().direct.todo_not_very_important;
    let TodoNotVeryImportantText = isAuthenticated().direct
      .todo_not_very_important_text;
    let TodoNotVeryImportantShadow = isAuthenticated().direct
      .todo_not_very_important_shadow;
    this.setState({
      Awesome_todo: AwesomeTodo,
      Awesome_todo_text: AwesomeTodoText,
      Awesome_Todo_Shadow: AwesomeTodoShadow,
      Midel_todo: MidelTodo,
      Midel_Todo_Text: MidelTodoText,
      Midel_Todo_Shadow: MidelTodoShdow,
      Todo_NotVery_Important: TodoNotVeryImportant,
      Todo_NotVery_Important_text: TodoNotVeryImportantText,
      Todo_NotVery_Important_shadow: TodoNotVeryImportantShadow,
      background:""
    });
  }
  handleChangeComplete = (color) => {
    this.setState({ background: color.hex });
  };



  render() {
    return (
      <div className="postisitonRelativeSmeni">
        <div className="container">
          <div className="row">
            <div className="">
              <div style={{ padding: "3em" }}>
                <div
                  className="shadow-test"
                  style={{ backgroundColor: this.state.Awesome_Todo_Shadow }}
                >
                  <Card style={{ backgroundColor: this.state.Awesome_todo }}>
                  <SketchPicker
        color={ this.state.Awesome_todo }
        onChangeComplete={ this.handleChangeComplete }
      />
                    <h6 style={{ color: this.state.Awesome_todo_text }}>
                      Важное дело
                    </h6>
                  </Card>
                </div>
              </div>
              <div style={{ padding: "3em" }}>
                <div
                  className="shadow-test"
                  style={{ backgroundColor: this.state.Midel_Todo_Shadow }}
                >
                  <Card style={{ backgroundColor: this.state.Midel_todo }}>
                    <h6 style={{ color: this.state.Midel_Todo_Text }}>
                      Средней важности дело
                    </h6>
                  </Card>
                </div>
              </div>
              <div style={{ padding: "3em" }}>
                <div
                  className="shadow-test"
                  style={{
                    backgroundColor: this.state.Todo_NotVery_Important_shadow
                  }}
                >
                  <Card
                    style={{
                      backgroundColor: this.state.Todo_NotVery_Important
                    }}
                  >
                    <Button
                      style={{ padding: "5px" }}
                      onClick={this.handleClick}
                    >
                      Цвет текста
                    </Button>
                    <Button
                      style={{ padding: "5px" }}
                      onClick={this.handleClick}
                    >
                      Цвет  задачи
                    </Button>
                    <h6
                      style={{ color: this.state.Todo_NotVery_Important_text }}
                    >
                      Не очень важное дело
                    </h6>
                  </Card>
                </div>
                <Button style={{ padding: "5px" }} onClick={this.handleClick}>
                  Изменить
                </Button>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    );
  }
}
