import React, { Component } from 'react'
import {MyAgentList,NewDealHistory} from '../Api/Http.js'
import { Button,notification,Card,Icon } from 'antd'
import ReactTags from 'react-tag-autocomplete'
import {Link} from 'react-router-dom'
import {isAuthenticated} from '../Api/Auth'


export default class NewDeal extends Component {
    constructor(){
        super()
        this.state = {
            user:"",
            agentList:[],
            tags:[],
            id:"",
            loading: false,
            item:"",
            error:"",
            name:""
        }
    }
    componentDidMount(){
        const userId = this.props.match.params.userId
        this.setState({user:userId})
        let workerId = userId
        MyAgentList(workerId).then(data =>{
            if(data.error){
                console.log(data.error)
            }else{
                this.setState({agentList:data})
            }
        })
    }
    handleDelete (i) {
        const tags = this.state.tags.slice(0)
        tags.splice(i, 1)
        this.setState({ tags })
    }
    
    handleAddition (tag) {
        const tags = [].concat(this.state.tags, tag)
        this.setState({ tags })
    }

    handleAction = name => event => {
        this.setState({ error: "" })
        this.setState({ [name]: event.target.value })
    }
    isValid = () =>{
        const {tags,item,name} = this.state
        if(name.length == 0){
            this.setState({error: "Название сделки обязательно"})
            return false
        }
        if(tags.length == 0){
            this.setState({error: "Контр агент и предмет сделки являются обязательным параметрами"})
            return false
        }
        if(item.length == 0){
            this.setState({error:"Предмет сделки обязателен"})
        }
        if(tags.length >= 2) { 
            this.setState({error: "Нельзя заключить сделку с несколькими контр-агентами"})
            return false
        }
        return true
    }
    clickSubmit =  event =>{
        event.preventDefault()
        if(this.isValid()){
            this.setState({loading: true})
            let {tags,item,name,user} = this.state
            let agentByid 
            let userId = user
            let status = "Начато"
            
            agentByid = tags[0]._id
     
            
            
            let payload = {
                status,
                name,
                agentByid,
                item,
                userId
            }
           
            NewDealHistory(payload).then(data =>{
                if(data.error){
                    console.log(data.error)
                }else{
                    this.openNotificationNewDeal()
                }
            })
        }
     
    }
    openNotificationErrorValidation(){
        const {error} = this.state
        notification.open({
          message: `${error}`,
          icon: <Icon type="frown" style={{ color: '#108ee9' }} />,
        })
        this.setState({error:""})
    }
    openNotificationNewDeal(){
        notification.open({
          message: 'Новая сделка заключена',
          icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
        })
      }
    render() {
        let {agentList,item,name,loading,error} = this.state
    
        return (
            <div>
                
                <div className="postisitonRelativeSmeni">
                <div className="container">
                <div className="row">
                <form>
                <div >
                    <label  >Название</label>
                    <input className="form-control" onChange={this.handleAction("name")} type="text"  value={name} />
                    <label  >Предмет сделки</label>
                    <input className="form-control" onChange={this.handleAction("item")} type="text"  value={item} />
                </div>
                
                <div style={{padding:"10px"}}>
                <ReactTags
                tags={this.state.tags}
                placeholder={("Добавить контр-агента")}
                suggestions={agentList}
                handleDelete={this.handleDelete.bind(this)}
                handleAddition={this.handleAddition.bind(this)} />
                  <div style={{padding:"10px"}}></div>
                <Button  className="btn btn-raised btn-primary" onClick={this.clickSubmit } >Новая сделка</Button>    
                </div>
                
                </form>
                <div style={{padding:"2em"}}>
                <Card title="Мои контр-агенты" bordered={true} >
                   
                {agentList.map((agent, i) => (
                            <>
                             <div >
                            

                            <div><Link to={`/agent/${agent._id}`} class="text-muted"> {agent.name}</Link></div>
                         
                            <br/>
                            
                            </div>
                            </>)
                )}
         
                </Card>
                </div>
                </div>
                </div>
                
                </div>
                {error.length > 2 ? (
                this.openNotificationErrorValidation()
                ):("")}
            </div>
        )
    }
}
