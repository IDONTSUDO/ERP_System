import React, { Component } from 'react'
import {AllAgentHistory} from '../Api/Http.js'
import { Button,Card} from 'antd'
import Moment from 'react-moment'
import dateFormat from 'dateformat'
import {isAuthenticated} from '../Api/Auth'
class AgentHistory extends Component {
    constructor(){
        super()
        this.state = {
            agentHistoryRes:[]
        }
    }
    init(agentId){
        AllAgentHistory(agentId).then(data =>{
            if(data.error){
                console.log(data.error)
            }else{
                console.log(data)
                this.setState({
                    agentHistoryRes: data
                })
               
        }
    })
    }
    componentDidMount(){
        const agentId = this.props.match.params.agentId
        this.init(agentId)
    }

  render() {
    const {agentHistoryRes} = this.state
    const toUpperCaseFilter = (d) => {
           
        return dateFormat(d, "fullDate")
    }
         
    return (
     <div  className="postisitonRelativeSmeni">
       <div>
        {agentHistoryRes.map((agentHistoryOne, i) => (
            < >
            <div>
           <Card>
           <div>{agentHistoryOne.name}</div> 
           <div>{agentHistoryOne.name}</div> 
           <Moment filter={toUpperCaseFilter}>{agentHistoryOne.Date}</Moment> 
           </Card>
                 
            
            </div>
            </>
            ))}
       </div>
     </div>
    );
  }
}

export default AgentHistory