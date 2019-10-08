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
            <div className="row">
            
            {todos.map((tod, i) => (
            <>
            <div className="card col-md-4" style={{ width: "18rem"}}key={i}>
            
            <h3>{tod.title}</h3>
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
