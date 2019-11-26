import React, { Component } from "react";
import { Menu, Dropdown, Button, Icon, Affix } from "antd";
import { Link } from "react-router-dom";
import { isAuthenticated, signout } from "../Api/Auth";
export default class MobileMenu extends Component {
  render() {
    return (
      <div>
        <Affix offsetTop={0} onChange={affixed => console.log(affixed)}>
          <>
            <div className="pos-f-t">
              <div className="collapse" id="navbarToggleExternalContent">
                <div className="bg-dark p-4">
                  <div className="Mobile_menu_row"></div>

                  <Icon
                    className="IconMobile"
                    style={{ fontSize: "25px", color: "#08c" }}
                    theme="outlined"
                    type="fire"
                  />
                   <Link to={`/news`}>
                    <h5 className="text-white bg-dark">Новости</h5>
                  </Link>
                  <Icon
                    style={{ fontSize: "25px", color: "#08c" }}
                    theme="outlined"
                    type="clock-circle"
                  />
                 

                  <Link to={`/today/${isAuthenticated().direct._id}`}>
                    <h5 className="text-white ">Дела на сегодня</h5>
                  </Link>

                  <Link to={`/user/work/${isAuthenticated().direct._id}`}>
                    <h5 className="text-white bg-dark">Мои дела</h5>
                  </Link>

                  <Link to={`/create/work`}>
                    <h5 className="text-white bg-dark">Новое дело</h5>
                  </Link>
                  <Icon
                    style={{ fontSize: "25px", color: "#08c" }}
                    theme="outlined"
                    type="dollar"
                  />

                  <Link to={`/new/deal/${isAuthenticated().direct._id}"`}>
                    <h5 className="text-white ">Новая сделка</h5>
                  </Link>

                  <Link to={`/my/deal/history/${isAuthenticated().direct._id}`}>
                    <h5 className="text-white bg-dark">История сделок</h5>
                  </Link>

                  <Link to={`/`}>
                    <h5 className="text-white bg-dark">Завершенные сделки</h5>
                  </Link>
                  <Icon
                    style={{ fontSize: "25px", color: "#08c" }}
                    theme="outlined"
                    type="team"
                  />

                  <Link to={`/company`}>
                    <h5 className="text-white ">Компания</h5>
                  </Link>

                  <Link to={`/`}>
                    <h5 className="text-white bg-dark">Новый работник</h5>
                  </Link>
                  <Icon
                    style={{ fontSize: "25px", color: "#08c" }}
                    theme="outlined"
                    type="user"
                  />

                  <Link to={`/user/${isAuthenticated().direct._id}`}>
                    <h5 className="text-white ">Мой профиль</h5>
                  </Link>

                  <Link to={`/user/edit/${isAuthenticated().direct._id}`}>
                    <h5 className="text-white bg-dark">Настройки</h5>
                  </Link>

                  <Link to={`/`}>
                    <h5 className="text-white bg-dark">Выйти</h5>
                  </Link>
                  <Icon
                    style={{ fontSize: "25px", color: "#08c" }}
                    theme="outlined"
                    type="rocket"
                  />

                  <Link to={`/all/agent`}>
                    <h5 className="text-white bg-dark">Все контр-агенты</h5>
                  </Link>

                  <Link to={`/my/agent/${isAuthenticated().direct._id}`}>
                    <h5 className="text-white bg-dark">Мои контр-агенты</h5>
                  </Link>

                  <Link to={`/new/agent`}>
                    <h5 className="text-white bg-dark">
                      Создать нового контр-агента
                    </h5>
                  </Link>
                </div>
              </div>
              <nav className="navbar navbar-dark  bg-dark">
                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarToggleExternalContent"
                  aria-controls="navbarToggleExternalContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
              </nav>
            </div>
          </>
        </Affix>
      </div>
    );
  }
}









// <PrivateRoute exact path="/new/deal/:userId" component={NewDeal} />
// <PrivateRoute exact path="/my/deal/:userId" component={DealHistory} />
// <PrivateRoute exact path="/company/statistic" component={CompanyStatistic} />
// <PrivateRoute exact path="/my/deal/history/:userId" component={MyDealHistory} />
// <PrivateRoute exact path="/agent/history/:agentId" component={AgentHistory} /> 

