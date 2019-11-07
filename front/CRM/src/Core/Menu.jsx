import { Layout, Menu, Breadcrumb, Icon, Badge, Anchor } from "antd";
import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { isAuthenticated, signout } from "../Api/Auth";
import {
  MyTodoComandQuality,
  MyTodoTodyQuality,
  MyNewsQuality
} from "../Api/Http.js";
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class MenuMain extends React.Component {
  state = {
    collapsed: true,
    window_width: "",
    getComandTodo: Number,
    SoloTodoToday: Number,
    NotReadNews: Number,
    role: String
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };
  componentDidMount() {
    if (isAuthenticated() == false) {
      return false;
    } else {
      var userId = isAuthenticated().direct._id;
      var userRole = isAuthenticated().direct.role;
      MyTodoComandQuality(userId).then(data => {
        if (data.error) {
        } else {
          this.setState({ getComandTodo: data, role: userRole });
          MyTodoTodyQuality(userId).then(data => {
            if (data.error) {
            } else {
              this.setState({ SoloTodoToday: data });
              // MyNewsQuality(userId).then(data=>{
              //   if(data.error){

              //   }else{
              //     this.setState({NotReadNews:data})
              //   }
              // })
            }
          });
        }
      });
    }
    this.setState({ window_width: window.innerHeight });
  }
  render() {
    const { window_width, SoloTodoToday, role } = this.state;
    return (
      <>
        {window_width > "20" ? (
          <>
            {isAuthenticated() && (
              <Anchor affix={false}>
                <div
                  className="mainMenu"
                  style={{ display: "flex", minHeight: "100em" }}
                >
                  <Layout style={{ minHeight: "100em" }}>
                    <Sider
                      collapsible
                      collapsed={this.state.collapsed}
                    >
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
                                {this.state.NotReadNews > 0 ? (
                                  <Badge
                                    style={{ padding: "0px" }}
                                    status="processing"
                                  />
                                ) : (
                                  ""
                                )}
                              </span>
                            </>
                          }
                        >
                          <Menu.Item key="9">
                            <Link to="/news">
                              <span>Новости</span>
                            </Link>
                          </Menu.Item>
                          <Menu.Item key="10">
                            <Link
                              to={`/user/edit/${isAuthenticated().direct._id}`}
                            >
                              <span>Личная статистика</span>
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

                                {this.state.SoloTodoToday > 0 ? (
                                  <Badge
                                    style={{ padding: "0px" }}
                                    color="#108ee9"
                                  />
                                ) : (
                                  ""
                                )}
                                {this.state.SoloTodoToday > 0 ? (
                                  <Badge status="warning" />
                                ) : (
                                  ""
                                )}
                              </span>
                            </>
                          }
                        >
                          <Menu.Item key="16">
                            <Link to={`/today/${isAuthenticated().direct._id}`}>
                              <span>Дела на сегодня</span>{" "}
                              <Badge
                                count={
                                  this.state.getComandTodo +
                                  this.state.SoloTodoToday
                                }
                                style={{ backgroundColor: "#52c41a" }}
                              />{" "}
                            </Link>
                          </Menu.Item>
                          <Menu.Item key="17">
                            <Link
                              to={`/user/work/${isAuthenticated().direct._id}`}
                            >
                              <span>Мои дела</span>
                            </Link>
                          </Menu.Item>
                          <Menu.Item key="18">
                            <Link to="/create/work">
                              <span>Новое дело</span>
                            </Link>
                          </Menu.Item>
                        </SubMenu>
                        {["Директор", "Управляющий", "Менеджер"].includes(
                          role
                        ) ? (
                          <SubMenu
                            key="sub6"
                            title={
                              <span>
                                <Icon type="dollar" />
                                <span>Сделка</span>
                                {this.state.NotReadNews > 0 ? (
                                  <Badge
                                    style={{ padding: "0px" }}
                                    status="processing"
                                  />
                                ) : (
                                  ""
                                )}
                              </span>
                            }
                          >
                            <Menu.Item key="13">
                              <Link
                                to={`/new/deal/${isAuthenticated().direct._id}`}
                              >
                                <span>Новая сделка</span>{" "}
                              </Link>
                            </Menu.Item>
                            <Menu.Item key="14">
                              <Link
                                to={`/my/deal/${isAuthenticated().direct._id}`}
                              >
                                <span>История сделок</span>{" "}
                                {/* <Badge
                                  count={
                                    this.state.getComandTodo +
                                    this.state.SoloTodoToday
                                  }
                                  style={{ backgroundColor: "#52c41a" }}
                                /> */}
                              </Link>
                            </Menu.Item>
                            <Menu.Item key="15">
                              <Link
                                to={`/my/deal/history/${
                                  isAuthenticated().direct._id
                                }`}
                              >
                                <span>Завершенные сделки</span>
                              </Link>
                            </Menu.Item>
                          </SubMenu>
                        ) : (
                          ""
                        )}
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
                          <Menu.Item key="3">
                            <Link to={`/company/statistic`}>
                              <span>Статистика</span>
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
                            <Link
                              onClick={() => signout(() => "/signin")}
                              to="/signin"
                            >
                              <span>Выход</span>
                            </Link>
                          </Menu.Item>
                        </SubMenu>
                        {["Директор", "Управляющий", "Менеджер","Бухгалтер"].includes(
                            role
                          ) ?(
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
                          ) ?(
                            <Menu.Item key="7">
                            <Link to={`/all/agent`}>
                              <span>Все контр-агенты</span>
                            </Link>
                          </Menu.Item>
                          ):("")}
                          <Menu.Item key="8">
                            <Link
                              to={`/my/agent/${isAuthenticated().direct._id}`}
                            >
                              <span>Мои контр агенты</span>
                            </Link>
                          </Menu.Item>
                          {["Директор", "Управляющий", "Бухгалтер"].includes(
                            role
                          ) ? (
                            <Menu.Item key="12">
                              <Link to="/new/agent">
                                <span>Создать нового </span>
                              </Link>
                            </Menu.Item>
                          ) : (
                            ""
                          )}
                        </SubMenu>
                          ):("")}
                      </Menu>
                    </Sider>
                  </Layout>
                </div>
              </Anchor>
            )}
          </>
        ) : (
          ""
        )}
        {!isAuthenticated() && <></>}
      </>
    );
  }
}

export default MenuMain;
// <PrivateRoute exact path="/new/deal/:agentId" component={NewDeal}/>
// <PrivateRoute exact path="/deal/history/:userId" component={DealHistory}/>
// "Директор""Управляющий""Менеджер" "Бухгалтер" "Кладовщик" "Логист"

// {['Директор', 'Управляющий' , 'Менеджер'].includes(role) ? () : ("")}
