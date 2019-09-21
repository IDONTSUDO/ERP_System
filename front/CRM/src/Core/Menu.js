import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {Link,Redirect} from 'react-router-dom'
import {isAuthenticated} from '../Api/Auth'
import styled from 'styled-components'
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;




class SiderDemo extends React.Component {
  state = {
    collapsed: false
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  }
  
  render() {
    
    return (
      <>

      {!isAuthenticated() && (
        <>
          <h1>You a dont </h1>
        </>
      )}
      {isAuthenticated() && ( 
        <div style={{display: 'flex', minHeight: '100vh' }}>
        <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <SubMenu
          key="sub1"
          title={
            <span>
            <Icon type="fire" />
              <span>Лента</span>
            </span>
          }
        >
          <Menu.Item key="9"><Link to="/news" ><span>Новости</span></Link></Menu.Item>
          <Menu.Item key="10"><Link to={`/user/edit/${isAuthenticated().direct._id}`} ><span>Личная статистика</span></Link></Menu.Item>
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
              <Menu.Item key="2"><Link to={`/user/${isAuthenticated().direct._id}`} ><span>Предприятие</span></Link></Menu.Item>
              <Menu.Item key="3"><Link to={`/user/${isAuthenticated().direct._id}`} ><span>Статистика</span></Link></Menu.Item>
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
              <Menu.Item key="4"><Link to={`/user/${isAuthenticated().direct._id}`} ><span>Мой профиль</span></Link></Menu.Item>
              <Menu.Item key="5"><Link to={`/user/edit/${isAuthenticated().direct._id}`} ><span>Настройки</span></Link></Menu.Item>
              <Menu.Item key="6"><Link to="/signin"><span>Выход</span></Link></Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub4"
              title={
                <span>
                  <Icon type="clock-circle" />
                  <span>Дела</span>
                </span>
              }
            >
              <Menu.Item key="7"><Link to={`/user/${isAuthenticated().direct._id}`} ><span>Дела на сегодня</span></Link></Menu.Item>
              <Menu.Item key="8"><Link to="/company"><span>Все дела</span></Link></Menu.Item>
            </SubMenu>
            
          </Menu>
        </Sider>
        
      </Layout>
        </div>
      )}        
      </>
    );
  }
}

export default  SiderDemo
// <Route exact path="/signin" component={Signin}/>
// <PrivateRoute exact path="/news" component={News}/>
// <PrivateRoute exact path="/user/:userId" component={Profile}/>
// <PrivateRoute exact path="/user/:userId" component={Profile}/>
// <PrivateRoute exact path="/company" component={Company}/>
// <PrivateRoute exact path="/create/work" component={Work}/>
// <PrivateRoute exact path="/new/worker" component={NewWorker}/>
// <PrivateRoute exact path="/user/edit/:userId" component={EditProfile}/>
// <PrivateRoute exact path="/user/work/:userId" component={MyWork}/>
// <PrivateRoute exact path="/job/:todoId" component={Job}/>
// <PrivateRoute exact path="/today/:userId" component={TodayWork}/> 
// <Menu.Item key="9">
//               <Icon type="file" />
//               <span>File</span>
//             </Menu.Item>
// <Menu.Item key="1">
//             <Icon type="fire" />
//             <Link to="/news"><span styles={{color:'#fff'}}><p>Новости</p></span></Link>
            
//             </Menu.Item>