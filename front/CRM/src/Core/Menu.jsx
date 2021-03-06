import { Layout, Menu, Breadcrumb, Icon, Badge, Anchor } from "antd";
import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import MobileMenu from "./MobileMenu.jsx";
import { isAuthenticated, signout } from "../Api/Auth";
import {
  MyTodoComandQuality,
  MyTodoTodyQuality,
  MyNewsQuality
} from "../Api/Http.js";

import { isOnline } from "../WsSocket/ws-socket.js";
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class MenuMain extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: true,
      window_width: "",
      getComandTodo: Number,
      SoloTodoToday: Number,
      NotReadNews: Number,
      role: String
    };
  }
  onCollapse = collapsed => {
    this.setState({ collapsed });
  };
  componentDidMount(props) {
    console.log("MENUPROPS",props)
    if (isAuthenticated() == false) {
      return false;
    } else {
      var userId = isAuthenticated().direct._id;
      var userRole = isAuthenticated().direct.role;
      this.setState({ role: userRole });
    }
    this.setState({ window_width: window.innerWidth });
  }
  render() {
    const { window_width, SoloTodoToday, role } = this.state;
    return (
      <>
        {window_width > "665" ? (
          <>
            {isAuthenticated() && (
              <Anchor affix={false}>
                <div
                  className="mainMenu"
                  style={{ display: "flex", minHeight: "100em" }}
                >
                  <Layout style={{ minHeight: "100em" }}>
                    <Sider collapsible collapsed={this.state.collapsed}>
                      <div className="logo" />
                      <Menu
                        theme="dark"
                        defaultSelectedKeys={["1"]}
                        mode="inline"
                      >
                        <SubMenu
                          key="sub1"
                          title={
                            <>
                              <span>
                                <Icon type="fire" />

                                <span>Новости</span>
                              </span>
                            </>
                          }
                        >
                          <Menu.Item key="9">
                            <Link to="/news">
                              <span>Новости</span>
                            </Link>
                          </Menu.Item>
                        </SubMenu>
                        <SubMenu
                          key="sub4"
                          title={
                            <>
                              <span>
                                <Icon type="clock-circle" />

                                <span>Дела</span>
                              </span>
                            </>
                          }
                        >
                          <Menu.Item key="17">
                            <Link
                              to={`/user/work/${isAuthenticated().direct._id}`}
                            >
                              <span>Мои дела</span>
                            </Link>
                          </Menu.Item>
                          <Menu.Item key="20">
                            <Link
                              to={`/my/assign/task/${
                                isAuthenticated().direct._id
                              }`}
                            >
                              <span>Назначеные дела</span>
                            </Link>
                          </Menu.Item>
                          <Menu.Item key="18">
                            <Link to="/create/work">
                              <span>Новое дело</span>
                            </Link>
                          </Menu.Item>
                        </SubMenu>
                        <SubMenu
                          key="sub2"
                          title={
                            <span>
                              <Icon type="team" />
                              <span>Компания</span>
                            </span>
                          }
                        >
                          <Menu.Item key="2">
                            <Link to={`/company`}>
                              <span>Предприятие</span>
                            </Link>
                          </Menu.Item>
                          <Menu.Item key="209">
                              <Link to={`/comapany/structur`}>
                                <span>Структура компании</span>
                              </Link>
                          </Menu.Item>
                    
                          {["Директор", "Управляющий", "Бухгалтер"].includes(
                            role
                          ) ? (
                            <Menu.Item key="11">
                              <Link to={`/new/worker`}>
                                <span>Новый работник</span>
                              </Link>
                            </Menu.Item>
                          ) : (
                            ""
                          )}
                        </SubMenu>
                        <SubMenu
                          key="sub3"
                          title={
                            <span>
                              <Icon type="user" />
                              <span>Ваш профиль</span>
                            </span>
                          }
                        >
                          <Menu.Item key="4">
                            <Link to={`/user/${isAuthenticated().direct._id}`}>
                              <span>Мой профиль</span>
                            </Link>
                          </Menu.Item>
                          <Menu.Item key="5">
                            <Link
                              to={`/user/edit/${isAuthenticated().direct._id}`}
                            >
                              <span>Настройки</span>
                            </Link>
                          </Menu.Item>
                          <Menu.Item key="6">
                            <Link onClick={() => signout(() => "/")} to="/">
                              <span>Выход</span>
                            </Link>
                          </Menu.Item>
                        </SubMenu>
                        {[
                          "Директор",
                          "Управляющий",
                          "Менеджер",
                          "Бухгалтер"
                        ].includes(role) ? (
                          <SubMenu
                            key="sub5"
                            title={
                              <span>
                                <Icon type="rocket" />
                                <span>Контр Агенты</span>
                              </span>
                            }
                          >
                            {["Директор", "Управляющий", "Бухгалтер"].includes(
                              role
                            ) ? (
                              <Menu.Item key="7">
                                <Link to={`/all/agent`}>
                                  <span>Все контр-агенты</span>
                                </Link>
                              </Menu.Item>
                            ) : (
                              ""
                            )}
                            {/* /control/agent */}
                            <Menu.Item key="8">
                              <Link
                                to={`/my/agent/${isAuthenticated().direct._id}`}
                              >
                                <span>Мои контр агенты</span>
                              </Link>
                            </Menu.Item>
                            {[
                              "Директор",
                              "Управляющий",
                              "Бухгалтер",
                              "Менеджер"
                            ].includes(role) ? (
                              <Menu.Item key="12">
                                <Link to="/new/agent">
                                  <span>Добавить нового</span>
                                </Link>
                              </Menu.Item>
                            ) : (
                              ""
                            )}
                            {["Директор", "Управляющий"].includes(role) ? (
                              <Menu.Item key="92">
                                <Link to="/control/agent">
                                  <span>Управление контр-агентами</span>
                                </Link>
                              </Menu.Item>
                            ) : (
                              ""
                            )}
                          </SubMenu>
                        ) : (
                          ""
                        )}
                        {["Директор", "Управляющий"].includes(role) ? (
                          <SubMenu
                            key="sub9"
                            title={
                              <>
                                <span>
                                  <Icon type="mail" />
                                  <span>Mail рассылка</span>
                                </span>
                              </>
                            }
                          >
                            <Menu.Item key="92">
                              <Link to="/mailing">
                                <span>Email рассылки</span>
                              </Link>
                            </Menu.Item>
                          </SubMenu>
                        ) : (
                          ""
                        )}

                        {["Директор", "Управляющий"].includes(role) ? (
                          <SubMenu
                            key="sub123"
                            title={
                              <>
                                <span>
                                  <Icon type="bar-chart" />
                                  <span>Mail</span>
                                </span>
                              </>
                            }
                          >
                            <Menu.Item key="99">
                              <Link to="/contr/agent/statistic">
                                <span>Статистика контр агентов</span>
                              </Link>
                            </Menu.Item>
                            <Menu.Item key="41">
                              <Link to="/enterprise/statistic">
                                <span>Статистика предпрития</span>
                              </Link>
                            </Menu.Item>
                            <Menu.Item key="42">
                              <Link to="/manage/at/agent">
                                <span>Менеджеры</span>
                              </Link>
                            </Menu.Item>
                            <Menu.Item key="96">
                              <Link to="/company/permission">
                                <span>Управление компанией</span>
                              </Link>
                            </Menu.Item>
                          </SubMenu>
                        ) : (
                          ""
                        )}
                      </Menu>
                    </Sider>
                  </Layout>
                </div>
              </Anchor>
            )}
          </>
        ) : (
          <MobileMenu />
        )}
        {!isAuthenticated() && <></>}
      </>
    );
  }
}

export default MenuMain;
