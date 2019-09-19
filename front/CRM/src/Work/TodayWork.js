import React, { Component } from 'react'
import {isAuthenticated} from "../Api/Auth"
import {TodayWorkHTTP} from '../Api/Http'
import {Link} from 'react-router-dom'
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
    render() {
        const {todos,user} = this.state
        return (
            <div>
           
            <ul>
            <div className="container">
            <div className="row">
            {
                todos.map((tod, i) => (
            <>
            <div className="card col-md-4" style={{ width: "18rem"}}key={i}>
            
            <h3>{tod.title}</h3>
            <div>{tod.status}</div>
            <div style={{ backgroundColor: "red"}}>{tod.time}</div>
            <Link to={`/job/${tod._id}`} className="btn btn-primary">Посмотреть дело</Link>
            </div>
            </>
            ))}
           
            </div>
            </div>
            </ul>
            
            
            </div>
        )
    }
}
