import React, { Component } from 'react'
import {isAuthenticated} from '../Api/Auth'
import {listNews} from '../Api/Http'
import {Link} from 'react-router-dom'
import { Button } from 'antd';
import { Row, Col } from 'antd';
import styled from 'styled-components'

const RealetivPositionComponent = styled.div`
.postisitonRelative{
    left:1em;
    top: 2em;
    bottom: 20em;
    position: absolute;
    display: flex; 
}
.message{
    border-radius: 5px 20px 5px;
    background: #BADA55;
    padding:10px;
}
.news{
    border-color:#2196F3!important;
    width: "500px";
    height:"20px";
    border-left: 6px solid red;
    background-color: lightgrey;
    margin:15px;
}  
`;
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
            
            <>
            <RealetivPositionComponent>
            <div className="postisitonRelative">
            <div className="">
            <div style={{padding: '20px'}}>
            {newsList.map((news, i) => (
                <>
                <div style={{padding: '40px'}}>
                <div  className="news"key={i}>
                <Link to={`/job/${news.link}`}><h1>{news.event}</h1></Link>
                </div>
                </div>
                </>
                ))}
            </div>
            </div>
            </div>
            </RealetivPositionComponent>
            
            </>
        )
    }
}
