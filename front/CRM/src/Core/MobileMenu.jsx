import React, { Component } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated, signout } from "../Api/Auth";
import { Icon } from "antd";

class MobileMenu extends Component {
  constructor() {
    super();
    this.state = {
      role: ""
    };
  }
  componentDidMount() {
  
  
  if (isAuthenticated() == false) {
      return false;
    } else {
      let userRole = isAuthenticated().direct.role;
      this.setState({ role: userRole });
    }
  }
  closedMenu = () => {
    document.getElementById("input_menu").click();
  };

  render() {
    let { role } = this.state;
    return (
      <div>
        {isAuthenticated() ? (
          <nav role="navigation">
            <>
              {" "}
              <div id="menuToggle">
                <input type="checkbox" className="input_menu" id="input_menu" />
                <span></span>
                <span></span>
                <span></span>
                <ul id="menu">
                  <div className="menu_frame">
                  <Link onClick={this.closedMenu} to={`/news`}>
                    <h5 className="text-white bg-dark">Новости</h5>
                  </Link>

                  <Link
                    onClick={this.closedMenu}
                    to={`/today/${isAuthenticated().direct._id}`}
                  >
                    <h5 className="text-white bg-dark">Дела на сегодня</h5>
                  </Link>

                  <Link
                    onClick={this.closedMenu}
                    to={`/my/assign/task/${isAuthenticated().direct._id}`}
                  >
                    <h5 className="text-white bg-dark">Назначеные дела</h5>
                  </Link>
                  <Link
                    onClick={this.closedMenu}
                    to={`/user/work/${isAuthenticated().direct._id}`}
                  >
                    <h5 className="text-white bg-dark">Мои дела</h5>
                  </Link>

                  <Link onClick={this.closedMenu} to={`/create/work`}>
                    <h5 className="text-white bg-dark">Новое дело</h5>
                  </Link>
                  {["Директор", "Управляющий", "Менеджер"].includes(role) ? (
                    <>
                      <Link
                        onClick={this.closedMenu}
                        to={`/new/deal/${isAuthenticated().direct._id}"`}
                      >
                        <h5 className="text-white ">Новая сделка</h5>
                      </Link>

                      <Link
                        onClick={this.closedMenu}
                        to={`/my/deal/history/${isAuthenticated().direct._id}`}
                      >
                        <h5 className="text-white bg-dark">История сделок</h5>
                      </Link>

                      <Link onClick={this.closedMenu} to={`/`}>
                        <h5 className="text-white bg-dark">
                          Завершенные сделки
                        </h5>
                      </Link>
                    </>
                  ) : null}

                  <Link onClick={this.closedMenu} to={`/company`}>
                    <h5 className="text-white bg-dark">Компания</h5>
                  </Link>
                  {["Директор", "Управляющий", "Бухгалтер"].includes(role) ? (
                    <>
                      <Link onClick={this.closedMenu} to={`/`}>
                        <h5 className="text-white bg-dark">Новый работник</h5>
                      </Link>
                    </>
                  ) : null}
                  {["Директор", "Управляющий", "Бухгалтер"].includes(role) ? (
                    <>
                      <Link onClick={this.closedMenu} to={`/all/agent`}>
                        <h5 className="text-white bg-dark">Все контр-агенты</h5>
                      </Link>
                    </>
                  ) : null}
                  {["Директор", "Управляющий", "Менеджер"].includes(role) ? (
                    <>
                      <Link
                        onClick={this.closedMenu}
                        to={`/my/agent/${isAuthenticated().direct._id}`}
                      >
                        <h5 className="text-white bg-dark">Мои контр-агенты</h5>
                      </Link>
                    </>
                  ) : null}

                  {["Директор", "Управляющий"].includes(role) ? (
                    <>
                      <Link onClick={this.closedMenu} to={`/new/agent`}>
                        <h5 className="text-white bg-dark">
                          Создать нового контр-агента
                        </h5>
                      </Link>
                    </>
                  ) : null}

                  <Link
                    onClick={this.closedMenu}
                    to={`/user/${isAuthenticated().direct._id}`}
                  >
                    <h5 className="text-white bg-dark">Мой профиль</h5>
                  </Link>

                  <Link
                    onClick={this.closedMenu}
                    to={`/user/edit/${isAuthenticated().direct._id}`}
                  >
                    <h5 className="text-white bg-dark">Настройки</h5>
                  </Link>

                  <Link onClick={this.closedMenu} to={`/signout`}>
                    <h5 className="text-white bg-dark">Выйти</h5>
                  </Link>
                  </div>
                </ul>
              </div>
            </>
          </nav>
        ) : null}
      </div>
    );
  }
}

export default MobileMenu;
