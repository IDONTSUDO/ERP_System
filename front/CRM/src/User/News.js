import React, { Component } from 'react'
import {isAuthenticated} from '../Api/Auth'
import {listNews} from '../Api/Http'

export default class News extends Component {
    constructor(){
        super()
        this.state = {
            userId:"",
            newsList:""
        }
    }
    componentDidMount(){
        const Id = isAuthenticated().direct._id  
        this.setState({userId: Id})
        listNews(Id).then(data =>{
            if(data.error){
                console.log(data.error)
            }else{
                Object.keys(data)
                this.setState({newsList:data})
            }
        })
    }
    render() {
        return (
            <div>
                <h1>wqewqe</h1>
            </div>
        )
    }
}
