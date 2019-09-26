import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {ContrAgentList} from "../Api/Http"
import { Button } from 'antd';
export default class AllAgent extends Component {
    constructor(){
        super()
        this.state = {
            agent:[]
        }
    }
    componentDidMount(){
        ContrAgentList()
        .then(data =>{
            this.setState({agent:data})
        })
        .catch(data =>{
            console.log(data)
        })
    }
    render() {
        let  {agent} = this.state 
        return (
            <div className="postisitonRelativeSmeni">
            <div>
            {agent.map((agn, i) => (
            <>

            <div>{agn.name}</div>
            <Button ><Link to={`/agent/${agn._id}`} >Посмотреть профиль</Link></Button>
            </>
            ))}
            </div>
            </div>
        )
    }
}
