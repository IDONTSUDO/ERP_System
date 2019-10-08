import React, { Component } from 'react'
import {MyAgentList} from '../Api/Http.js'
import { Button,notification } from 'antd';
import ReactTags from 'react-tag-autocomplete'

export default class NewDeal extends Component {
    constructor(){
        super()
        this.state = {
            user:"",
            agentList:[],
            tags:[],
            id:"",
            loading: false,
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

       
      }
      
    render() {
        let {agentList,price,name,loading} = this.state
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
                    <label  >Прайс</label>
                    <input className="form-control" onChange={this.handleAction("price")} type="text"  value={price} />
                </div>
                <div >
                    <label  >Название</label>
                    <input className="form-control" onChange={this.handleAction("name")} type="text"  value={name} />
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
               
                </div>
                </div>
                
                </div>
            </div>
        )
    }
}
