import React, { Component } from 'react'
import {isAuthenticated} from '../Api/Auth'
import {listNews} from '../Api/Http'
import {Link} from 'react-router-dom'
export default class News extends Component {
    constructor(){
        super()
        this.state = {
            userId:"",
            newsList:[]
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
        const {newsList} = this.state
        return (
            <div className="container">
            <div className="row">

            {newsList.map((news, i) => (
                <>
                <div className="card col-md-4" style={{ width: "18rem"}}key={i}>
                <Link to={`/job/${news.link}`} className="btn btn-primary">Посмотреть</Link>
                <small>{news.event}</small>
                </div>
                </>
                ))}
            </div>
            </div>
        )
    }
}
