import React, { Component } from 'react'
import {isAuthenticated} from "../Api/Auth"
import {TodayWorkHTTP} from '../Api/Http'
import {Link} from 'react-router-dom'
import { Button } from 'antd'

export default class TodayWork extends Component {
    constructor(){
        super()
        this.state = {
            userId:"",
            todos:[]
        }
    }
    componentDidMount(){
        const user = this.props.match.params.userId
        this.setState({userId:user})
        this.init(user)
    }
    
    init = user =>{
        const token = isAuthenticated().token  
        TodayWorkHTTP(user)
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
    returnSort = () => {
        const {userId} = this.state
        const token = isAuthenticated().token  
        TodayWorkHTTP(userId)
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
        const {todos,user} = this.state
           //  TODO: Change CSS and loading
        return (

            <div className="postisitonRelativeSmeni">
           
            <div>
           
            <ul>
            <div className="container">
                <Button onClick={this.returnSort}className="square-return"></Button>
                <Button onClick={this.yellowSort} className="square-yellow"></Button>
                <Button onClick={this.greenSort} className="square-green"></Button>
                <Button onClick={this.redSort} className="square-red"></Button>
            <div className="row">
            {
                todos.map((tod, i) => (
            <>
            <div  className="col-md-4"key={i}>
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
            <div>{tod.time}</div>
            
            <Button ><Link to={`/job/${tod._id}`}>Посмотреть дело</Link></Button>
            </div>
            </>
            ))}
           
            </div>
            </div>
            </ul>
            
            
            </div>
            </div>
        )
    }
}
