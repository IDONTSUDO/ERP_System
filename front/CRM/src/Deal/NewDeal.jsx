import React, { Component } from 'react'
import {MyAgentList,NewDealHistory} from '../Api/Http.js'
import { Button,notification,Card } from 'antd';
import ReactTags from 'react-tag-autocomplete'
import {Link} from 'react-router-dom'
export default class NewDeal extends Component {
    constructor(){
        super()
        this.state = {
            user:"",
            agentList:[],
            tags:[],
            id:"",
            loading: false,
            item:""
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
    clickSubmit =  event =>{
        event.preventDefault()
        this.setState({loading: true})
        let {tags,item,name,user} = this.state
        let agentByid 
        let userId = user
        let status = "Начато"
        console.log(name)
        
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
                this.setState({loading: false})
            }
        })
    }
      
    render() {
        let {agentList,item,name,loading} = this.state
        return (
            <div>
                
                <div className="postisitonRelativeSmeni">
                {loading ?(
                <div className="jumbotron text-center">
                <h2>Загрузка...</h2>
                </div>
                ):(
                ""
                )}
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
            </div>
        )
    }
}
