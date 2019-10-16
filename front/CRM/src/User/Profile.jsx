import React, { Component } from 'react'
import {isAuthenticated} from '../Api/Auth'
import {Redirect, Link } from 'react-router-dom'
import {notification,Icon} from 'antd'
import {read} from '../Api/Http'
import DefaultProfile from '../Assets/default.png'


class Profile extends Component {
    constructor(){
        super()
        this.state = {
            user: {},
            
            error: ""
        }
    }
    init = userId =>{
    const token = isAuthenticated().token  
        read(userId, token)
        .then(data =>{
            if(data.error){
                this. openNotificationError()
            }else{
                this.setState({ user: data})
            }
        })
    }
  
    componentDidMount(){
        const userId = this.props.match.params.userId
        this.init(userId)
    }
   
    componentWillReceiveProps(props){
        const userId = props.match.params.userId
        this.init(userId)

    }
    openNotificationError(){
        notification.open({
          message: 'Ой что то пошло не так, мне жаль',
          icon: <Icon type="frown" style={{ color: '#108ee9' }} />,
        })
    }
    render() {
        const  {redirectToSignin, user} = this.state
        const photoUrl = user._id
        ? `http://localhost:8080/user/photo/${user._id}?${new Date().getTime()}` 
        : DefaultProfile
        return(
            
            <div className="postisitonRelativeSmeni">
            <div className="">
            <div class="">

                <div class=""></div>
                </div>
                <div className="">  
                </div>
                <h2 className="">Профиль сотрудника </h2>
                <div className="">
                <div className="">
                <img 
                style={{height: "200px", width:"auto"}}
                className="img-thumbnail"
                onError={i => (i.target.src = `${DefaultProfile}`)}
                src={photoUrl} />

                <div className="">

                <p>Имя: {user.name}</p>
                <p>Должность: {user.role}</p>
                <p>Дата рождения: {user.Date_of_Birth}</p>
                <p>Телефон: {user.phone}</p>
                <p>Email: {user.email}</p>
              
                <p>Последний визит: {`${new Date(user.created).toDateString()}`}</p>
                </div>  
                </div>
                </div>
            </div>
            </div>    
        )
    }
  
}
export default Profile
