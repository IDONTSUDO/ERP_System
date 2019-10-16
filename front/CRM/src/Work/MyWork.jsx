import React, { Component } from 'react'
import {isAuthenticated} from '../Api/Auth'
import {readMyTodo} from '../Api/Http'
import {Link} from 'react-router-dom'
import DefaultProfile from '../Assets/default.png' 

import { Button } from 'antd'
export default class MyWork extends Component {
    constructor(){
        super()
        this.state = {
            todos:[],
            redirectToSignin:"",
            user:""
        }
    }
    componentDidMount(){
        const userId = this.props.match.params.userId
        this.setState({user:userId})
        this.init(userId)
    }
    
    init = userId =>{
        const token = isAuthenticated().token  
        readMyTodo(userId, token)
            .then(data =>{
                if(data.error){
                    this.setState({redirectToSignin: true})
                }else{             
                    
                    Object.keys(data)
                    console.log(data.todos)
                    this.setState({todos: data.todos})
                }
            })
    }
    returnSort = () => {
        const {user} = this.state
        const token = isAuthenticated().token  
        readMyTodo(user)
            .then(data =>{
                if(data.error){
                    this.setState({redirectToSignin: true})
                }else{             
                    
                    Object.keys(data)
                    this.setState({todos: data.todos})
                }
            }).catch(data =>{
                console.log(data)
            })
    }
    yellowSort = ()=>{
      
        const {todos} = this.state
        var YellowSortArray = []
        for (let i = 0; todos.length > i; i++) { 
          if(todos[i].importance === "Средней важности"){
            console.log(todos[i].importance)
            YellowSortArray.push(todos[i])
          }

        }
        this.setState({todos:YellowSortArray})
      
    }
    greenSort = () => {

        const {todos} = this.state
        var GreenSortArray = []
        for (let i = 0; todos.length > i; i++) { 
          if(todos[i].importance === "Не очень важное"){
            GreenSortArray.push(todos[i])
          }

        }
        this.setState({todos:GreenSortArray})
    }
    redSort = () => {
        const {todos} = this.state
        var RedSortArray = []
        for (let i = 0; todos.length > i; i++) { 
          if(todos[i].importance === "Очень важное"){
            RedSortArray.push(todos[i])
          }

        }
        this.setState({todos:RedSortArray})
    }
    render() {
           //  TODO: Change CSS and loading and ERRORS
        const {todos,user} = this.state
        return (

            <>
        
            <div className="postisitonRelativeSmeni">
            <>

            </>
            
            <ul>
            <button onClick={this.returnSort}className="square-return-sort"></button>
            <button onClick={this.yellowSort} className="square-yellow-sort"></button>
            <button onClick={this.greenSort} className="square-green-sort"></button>
            <button onClick={this.redSort} className="square-red-sort"></button>
            <div className="container">
            <div className="row">
            
            {todos.map((tod, i) => (
            <>
            <div className="card col-md-4" style={{ width: "18rem"}}key={i}>
            
            <h3>{tod.title}</h3>
            {tod.importance === "Очень важное" ? (
                <>
                <div className="square-red"></div>
                </>
            ):("")}
            {tod.importance === "Средней важности" ? (
                <>
                <div className="square-yellow"></div>
                </>
            ):("")}
            {tod.importance === "Не очень важное" ? (
                <>
                <div className="square-green"></div>
                </>
            ):("")}
            <div>{tod.status}</div>
            <div><b>{tod.time}</b></div>

            <Link  to={`/user/${tod.postedBy}`}>
                        <img className="card-img-top" src={`http://localhost:8080/user/photo/${tod.postedBy}?`}
                             onError={i => (i.target.src = `${DefaultProfile}`)}
                             alt={tod.postedBy}
                             style={{height: "50px", width:"50px"}}
                             />      
                        </Link>
            <div style={{padding:"10px"}}>
            <Button><Link to={`/job/${tod._id}`} >Посмотреть дело</Link></Button>
            </div>
            </div>
            </>
            ))}
           
            </div>
            </div>
            
            </ul>
            
        
            </div>
            
            </>
        )
    }
}
