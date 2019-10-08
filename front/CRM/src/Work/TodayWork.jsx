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
                    console.log(data.todos)
                    this.setState({todos: data.todos})
                }
            }).catch(data =>{
                console.log(data)
            })
    }
    ReturnItems = () =>{
        const token = isAuthenticated().token  
        const user = isAuthenticated().direct._id  
        TodayWorkHTTP(user)
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
        const {todos,user} = this.state

        return (

            <div className="postisitonRelativeSmeni">
            <div className="container">
            <div  className="col-md-4">
            <div style={{padding:"5px"}}>
            <Button onClick={this.ReturnItems} className="square-return"></Button>
            <Button onClick={this.SortedRed} className="square-red"></Button>
            <Button onClick={this.SortedYellow} className="square-yellow"></Button>
            <Button onClick={this.SortedGreen}  className="square-green"></Button>
            </div>
           </div>
            <div className="row">
            {
                todos.map((tod, i) => (
            <>
            <div  className="col-md-4">
                    {tod.importance === "Очень важное" ? (  
                        <div className="square-red"></div>):(<></>)}
                    {tod.importance === "Средней важности" ? (  
                        <div className="square-yellow"></div>):(<></>)}
                    {tod.importance === "Не очень важное" ? (  
                        <div className="square-green"></div>):(<></>)}
                
            <h3>{tod.title}</h3>
            <div>{tod.status}</div>
            <div>{tod.time}</div>
            <Button ><Link to={`/job/${tod._id}`}>Посмотреть дело</Link></Button>
            </div>
            </>
            ))}
           
            </div>
            
                        
            
            </div>
            </div>
        )
    }
}
