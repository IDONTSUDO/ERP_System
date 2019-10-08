import React, { Component } from 'react'
import {isAuthenticated} from '../Api/Auth'
import {Redirect, Link } from 'react-router-dom'
import {read} from '../Api/Http'
import DefaultProfile from '../Assets/default.png'
import styled from 'styled-components'

const RealetivPositionComponent = styled.div`
.postisitonRelative{
    left:15em;
    top: 2em;
    bottom: 20em;
    position: absolute;
    display: flex; 
}

`;

class Profile extends Component {
    constructor(){
        super()
        this.state = {
            user: {},
            redirectToSignin: false,
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
        //  TODO: Change CSS and loading and ERRORS
        const photoUrl = user._id
        ? `http://localhost:8080/user/photo/${user._id}?${new Date().getTime()}` 
        : DefaultProfile
        return(
            <RealetivPositionComponent>
            <div className="postisitonRelative">
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
            </RealetivPositionComponent>
        )
    }
  
}
export default Profile
