import React, { Component } from 'react'
import {isOnline} from '../Soket/soket.js'
import io from "socket.io-client";

export default class Online extends Component {
   constructor(props) {
       super(props)
       this.state = {
            userId:props
        }
   }
    componentDidMount(props) {
        console.log(this.state.userId)
        isOnline(this.state.userId)
        
    }
    render() {
       
        return (
            <div>
                <div>21321</div>
               
            </div>
        )
    }
}
