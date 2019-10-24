import React, { Component } from 'react'
import {isAuthenticated} from '../Api/Auth'
import {listNews,UpdateNews} from '../Api/Http'

import {Link} from 'react-router-dom'
import { Button } from 'antd';
import { Row, Col } from 'antd';

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
        const token = isAuthenticated().token  
        this.setState({userId: Id})
        listNews(Id,token).then(data =>{
            if(data.error){
                console.log(data.error)
            }else{
                Object.keys(data)
                this.setState({newsList:data})
                console.log(data)
                var NewsArray = []
                for (var i = 0; data.length > i; i++) {
                    // console.log(data[i]._id)
                    NewsArray.push(data[i]._id);
                }
                UpdateNews(NewsArray)
            }
        })
        let {newsList} = this.state 
        
    }
    render() {
        const {newsList} = this.state
        return (

            <div className="postisitonRelativeSmeni">
            <div className="">
            <div style={{padding: '20px'}}>
            {newsList.map((news, i) => (
                <>
                <div style={{padding: '5px'}}>
                <div  className="alert-warning-yellow fade.show-yellow alert-dismissible-yellow alert-yellow"key={i}>
                <Link className="link" to={`/job/${news.link}`}><strong>{news.event}</strong></Link>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
                </div>
                </div>
                </>
                ))}
            </div>
            </div>
            </div>
        )
    }
}
