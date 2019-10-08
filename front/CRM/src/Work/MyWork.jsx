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
    SortedGreen = () =>{
        const {todos} = this.state
        var ArraySorterdGreen = []
        for (let i = 0; i < todos.length; i++) { 
            if(todos[i].importance === "Не очень важное"){
                ArraySorterdGreen.push(todos[i]) 
            }

        }
        this.setState({todos:ArraySorterdGreen})
    }
    ReturnItems = () =>{
        const token = isAuthenticated().token  
        const user = isAuthenticated().direct._id  
        readMyTodo(user)
            .then(data =>{
                if(data.error){
                    this.setState({redirectToSignin: true})
                }else{             
                    
                    Object.keys(data)
                    console.log(data.todos)
                    this.setState({todos: data.todos})
                }
            }).catch(data =>{
                console.log(data)
            })
    }
    SortedYellow = () =>{
        const {todos} = this.state
        var ArraySorterdYellow = []
        for (let i = 0; i < todos.length; i++) { 
            if(todos[i].importance === "Средней важности"){
                ArraySorterdYellow.push(todos[i]) 
            }

        }
        this.setState({todos:ArraySorterdYellow})
    }
    SortedRed = ()=>{
        const {todos} = this.state
        var ArraySorterdRed = []
        for (let i = 0; i < todos.length; i++) { 
            if(todos[i].importance === "Очень важное"){
                ArraySorterdRed.push(todos[i]) 
            }

        }
        this.setState({todos:ArraySorterdRed})
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
            <div className="container">
            <Button onClick={this.ReturnItems} className="square-return"></Button>
            <Button onClick={this.SortedRed} className="square-red"></Button>
            <Button onClick={this.SortedYellow} className="square-yellow"></Button>
            <Button onClick={this.SortedGreen}  className="square-green"></Button>
            <div className="row">
            {todos.map((tod, i) => (
            <>
            <div className="card col-md-4" style={{ width: "18rem"}}key={i}>
            
            <h3>{tod.title}</h3>
            <div>{tod.status}</div>
            <div><b>{tod.time}</b></div>
            {tod.importance === "Очень важное" ? (  
                        <div className="square-red"></div>):(<></>)}
                    {tod.importance === "Средней важности" ? (  
                        <div className="square-yellow"></div>):(<></>)}
                    {tod.importance === "Не очень важное" ? (  
                        <div className="square-green"></div>):(<></>)}
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
