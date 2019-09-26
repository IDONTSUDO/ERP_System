import React, { Component } from 'react'
import {isAuthenticated} from '../Api/Auth'
import {readMyTodo} from '../Api/Http'
import {Link} from 'react-router-dom'
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
        const {todos,user} = this.state
        return (
            <RealetivPositionComponent>
            <>
        
            <div className="postisitonRelative">
            <>

            </>
            
            <ul>
            <div className="container">
            <div className="row">
            
            {
                todos.map((tod, i) => (
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
            <Link to={`/job/${tod._id}`} className="btn btn-primary">Посмотреть дело</Link>
            </div>
            </>
            ))}
           
            </div>
            </div>
            
            </ul>
            
        
            </div>
            
            </>
            </RealetivPositionComponent>
        )
    }
}
