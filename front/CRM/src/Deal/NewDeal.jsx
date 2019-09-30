import React, { Component } from 'react'
import {MyAgentList} from '../Api/Http.js'
import { Button } from 'antd';
import ReactTags from 'react-tag-autocomplete'

export default class NewDeal extends Component {
    constructor(){
        super()
        this.state = {
            user:"",
            agentList:[],
            tags:[],
            id:""
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

    render() {
        let {agentList,price,id} = this.state
        return (
            <div>
                <div className="postisitonRelativeSmeni">
                    
                <div className="container">
                <div className="row">
                <ReactTags
                tags={this.state.tags}
                suggestions={agentList}
                handleDelete={this.handleDelete.bind(this)}
                handleAddition={this.handleAddition.bind(this)} />
                <form>
                <div >
                    <label  >Прайс</label>
                    <input className="form-control" onChange={this.handleAction("price")} type="text"  value={price} />
                </div>
                <div >
                    <label  >Название</label>
                    <input className="form-control" onChange={this.handleAction("id")} type="text"  value={price} />
                </div>
                </form>
                <button  className="btn btn-raised btn-primary" onClick={this.clickSubmit } >Новая сделка</button>    
                </div>
                </div>
                </div>
            </div>
        )
    }
}
