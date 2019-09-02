import React, { Component } from 'react'
import {isAuthenticated} from '../Api/Auth'
import {readMyTodo} from '../Api/Http'
import {Link} from 'react-router-dom'
export default class MyWork extends Component {
    constructor(){
        super()
        this.state = {
            todos:[],
            redirectToSignin:""
        }
    }
    componentDidMount(){
        const userId = this.props.match.params.userId
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
    render() {
        const {todos} = this.state
        return (
            <ul>
            <div className="container">
            <div className="row">
            {
                todos.map((tod, i) => (
            <>
            <div className="card col-md-4" style={{ width: "18rem"}}key={i}>
            
            <h3>{tod.titel}</h3>
            <div>{tod.status}</div>

            <Link to={`/job/${tod._id}`} className="btn btn-primary">Посмотреть дело</Link>
            </div>
            </>
            ))}
           
            </div>
            </div>
            </ul>
        )
    }
}
