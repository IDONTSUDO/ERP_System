import React, { Component } from 'react'
import {isAuthenticated} from '../Api/Auth'
import {Redirect, Link } from 'react-router-dom'
import {read} from '../Api/Http'
import DefaultProfile from '../Assets/default.png'
// import DeleteUser from './DeleteUser'
// import FollowButton from './FlowProfile'
// import ProfileTabs from './ProfileTabs'

class Profile extends Component {
    constructor(){
        super()
        this.state = {
            user: { following: [], followers: [] },
            redirectToSignin: false,
            following: false,
            error: ""
        }
    }
    init = userId =>{
    const token = isAuthenticated().token  
        read(userId, token)
        .then(data =>{
            if(data.error){
                this.setState({redirectToSignin: true})
            }else{
                
                this.setState({ user: data})
            }
        })
    }
    //componentDidMount()  хук жизненого цикла
    componentDidMount(){
        const userId = this.props.match.params.userId
        this.init(userId)
    }
    //изменяет компонент componentWillReceiveProps()
    componentWillReceiveProps(props){
        const userId = props.match.params.userId
        this.init(userId)

    }
    render() {
        const  {redirectToSignin, user} = this.state
        if(redirectToSignin) return <Redirect to="/signin"/>
        const photoUrl = user._id
        ? `http://localhost:8080/user/photo/${user._id}?${new Date().getTime()}` 
        : DefaultProfile
        return(
            <div className="container">
            <div class="row">
                <div class="col-sm-8"></div>
                    <div class="col-sm-4"><h1>Новости</h1></div>
                    <div class="col-sm-8"></div>
                    <div class="col-sm-4">{user.news}</div>
                </div>
                <div className="d-inline-block mt-5">
                        <Link className="btn btn-raised btn-success mr-6" to={`/user/edit/${user._id}`}>
                            Edit Profile
                        </Link>
                </div>
                <h2 className="mt-5 mb-5">Profile</h2>
                <div className="row">
                <div className="col-md-6">
                <img 
                style={{height: "200px", width:"auto"}}
                className="img-thumbnail"
                onError={i => (i.target.src = `${DefaultProfile}`)}
                src={photoUrl} />


                {/* Вывводит аватар пользователя */}
                <div className="lead mt-5 ml-5">
                {/* Выводит имя пользователя и email */}
                <p>Имя: {user.name}</p>
                <p>Фамилия: {user.surname}</p>
                <p>Отчество: {user.patronymic}</p>
                <p>Должность: {user.role}</p>
                <p>Дата рождения: {user.Date_of_Birth}</p>
                <p>Телефон: {user.phone}</p>
                <p>Email: {user.email}</p>
                {/* Выводит статус пользователя */}
                <p>Последний визит: {`${new Date(user.created).toDateString()}`}</p>
                </div>  
                </div>
                </div>
            </div>
        
        )
    }
  
}
export default Profile
