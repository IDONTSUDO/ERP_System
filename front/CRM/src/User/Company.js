import React, { Component } from 'react'
import {list,DeleteUser} from "../Api/Http"
import {isAuthenticated} from "../Api/Auth"
import DefaultProfile from '../Assets/default.png' 
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import { Button } from 'antd';

const RealetivPositionComponent = styled.div`
.postisitonRelative{
    left:15em;
    top: 2em;
    bottom: 20em;
    position: absolute;
    display: flex; 
}
.message{
    border-radius: 5px 20px 5px;
    background: #BADA55;
    padding:10px;
}
.news{
    border-color:#2196F3!important;
    width: "500px";
    height:"20px";
    border-left: 6px solid red;
    background-color: lightgrey;
    margin:15px;
}  
`;

export default class Company extends Component {
    constructor(){
        super()
        this.state={
            worker: [],
        }
    }
    handleClick(userId) {
        const token = isAuthenticated().token  
        DeleteUser(userId,token).then(data => {
            if(data.error){
                console.log(data.error)
            }else{
                this.forceUpdate()
            }
        })
    }
    componentDidMount() {
        list().then(data =>{
            if(data.error){
                console.log(data.error)
            }else{
                this.setState({worker:data})
            }
        })
    }
    handleChange = name => event => {
      this.setState({ error: "" })
      this.setState({ [name]: event.target.value })
    }
    forceUpdate(){
        list().then(data =>{
            if(data.error){
                console.log(data.error)
            }else{
                this.setState({worker:data})
            }
        })
    }
    render() {
        const {worker} = this.state
        return (
            <RealetivPositionComponent>
            <div className="postisitonRelative">
            <div className="container">
            <div className="row">
            {worker.map((user, i) => (
            <>
            <div className="card col-md-4" style={{ width: "18rem"}}key={i}>
            <img className="card-img-top" src={`http://localhost:8080/user/photo/${user._id}?`}
                         onError={i => (i.target.src = `${DefaultProfile}`)}
                         alt={user.name}
                         style={{height: "50px", width:"50px"}}
                         />
                         <div className="card-body">
                         <h5 className="card-title">{user.name}</h5>
                         <p className="card-text">{user.email}</p>
                         <Button ><Link to={`/user/${user._id}`} >Посмотреть профиль</Link></Button>
                         
                         <Button  type="danger" onClick={(userId) => this.handleClick(user._id, userId)}>Удалить Пользователя</Button>    
                         </div>
            </div>
            </>
            ))}
            </div>
            </div>
            </div>
            </RealetivPositionComponent>
        )
    }
}
