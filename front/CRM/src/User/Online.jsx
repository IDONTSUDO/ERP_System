import React, { Component } from 'react'
import {isAuthenticated}from "../Api/Auth" 

export default class Online extends Component {
   constructor(props) {
       super(props)
       this.state = {
            userId:props,
            status:""
        }
   }
    componentDidMount(props){
        let jwt = isAuthenticated().direct._id


        let wsUser = new WebSocket('ws:localhost:4041/user', `${jwt}`)
        wsUser.onmessage  = (e) => {  this.setState({status:e.data}) }

        // this.setState({status:e.data}
        wsUser.onopen = () => wsUser.send(JSON.stringify(this.state.userId));
    }
    render() {
    //   this.stata.status === "null"
        return (
            <div>
               {this.state.status === "null" ? (<div className="user-ofline"></div>):(<div className="user-online"></div>)}  
            </div>
        )
    }
}
