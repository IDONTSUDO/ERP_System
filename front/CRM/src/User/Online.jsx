import React, { Component } from 'react'
import {isAuthenticated}from "../Api/Auth" 
import Socket from "../WsSocket/ws-socket.js"


export default class Online extends Component {
   constructor(props) {
       super(props)
       this.state = {
            userId:props,
            status:""
        }
   }
    componentDidMount(props){
    this.userIsOnline()
          
    }
    userIsOnline = () => {
        // let jwt = isAuthenticated().direct._id


        // let wsUser = new WebSocket('ws:localhost:4041/user', `${jwt}`)
        // wsUser.onmessage  = (e) => {  this.setState({status:e.data}) }

        // // this.setState({status:e.data}
        // wsUser.onopen = () => wsUser.send(JSON.stringify(this.state.userId));   
        // wsUser.onclose = () => {
        //     console.log('disconnected')
        //     // automatically try to reconnect on connection loss
    
        //     }
    }
    componentWillUnmount(){
    
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
