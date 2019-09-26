import React, { Component } from 'react'
import {isAuthenticated} from "../Api/Auth"
import {TodayWorkHTTP} from '../Api/Http'
import {Link} from 'react-router-dom'
import { Button } from 'antd';

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
            <RealetivPositionComponent>
            <div className="postisitonRelative">
           
            <div>
           
            <ul>
            <div className="container">
            <div className="row">
            {
                todos.map((tod, i) => (
            <>
            <div  className="card col-md-4" style={{ width: "18rem"}}key={i}>
            
            <h3>{tod.title}</h3>
            <div>{tod.status}</div>
            <div>{tod.time}</div>
            <Button type="primary"><Link to={`/job/${tod._id}`}>Посмотреть дело</Link></Button>
            </div>
            </>
            ))}
           
            </div>
            </div>
            </ul>
            
            
            </div>
            </div>
            </RealetivPositionComponent>
        )
    }
}
