import React, { Component } from 'react'
import {list,DeleteUser} from "../Api/Http"
import {isAuthenticated} from "../Api/Auth"
import DefaultProfile from '../Assets/default.png' 
import {Link} from 'react-router-dom'



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
                console.log("200 ok")
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
    render() {
        const {worker} = this.state
        return (
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
                         <Link to={`/user/${user._id}`} className="btn btn-primary">Посмотреть профиль</Link>
                         <button type="button" className="btn btn-outline-danger"  onClick={(userId) => this.handleClick(user._id, userId)}>Удалить Пользователя</button>    
                         </div>
            </div>
            </>
            ))}
            </div>
            </div>
        )
    }
}
