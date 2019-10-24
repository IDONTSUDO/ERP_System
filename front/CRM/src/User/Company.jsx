import React, { Component } from 'react'
import {list,DeleteUser} from "../Api/Http"
import {isAuthenticated} from "../Api/Auth"
import DefaultProfile from '../Assets/default.png' 
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import { Button,Card } from 'antd';

const RealetivPositionComponent = styled.div`
.postisitonRelative{
    left:15em;
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

export default class Company extends Component {
    constructor(){
        super()
        this.state={
            worker: [],
            page: 1
        }
    }
    handleClick(userId) {
        const token = isAuthenticated().token  
        DeleteUser(userId,token).then(data => {
            if(data.error){
                console.log(data.error)
            }else{
                this.forceUpdate()
            }
        })
    }
    componentDidMount(){
        this.LoadCompanyUser(this.state.page);
      }
    handleChange = name => event => {
      this.setState({ error: "" })
      this.setState({ [name]: event.target.value })
    }

    forceUpdate(){
        const {page} = this.state
        list(page).then(data =>{
            if(data.error){
                console.log(data.error)
            }else{
                this.setState({worker:data})
            }
        })
    }

    LoadCompanyUser = page => {
        list(page)
          .then(data =>{
          this.setState({worker:data})
        })
        .catch(data =>{
          console.log(data)
        })
    }

    loadMore = number => {
        this.setState({ page: this.state.page + number });
        this.LoadCompanyUser(this.state.page + number);
    }
  
    loadLess = number => {
        this.setState({ page: this.state.page - number });
        this.LoadCompanyUser(this.state.page - number);
    }

    render() {
        const {worker,page} = this.state
         //  TODO: Change CSS and loading and ERRORS
        return (
            <RealetivPositionComponent>
            <div className="postisitonRelative">

            <div style={{padding:"5px"}}>
            <div className="row">
            {worker.map((user, i) => (
            <>
            <div className="">
            </div>
            <Card  size="small"  title={user.role}>
            <img className="card-img-top" src={`http://localhost:8080/user/photo/${user._id}?`}
            onError={i => (i.target.src = `${DefaultProfile}`)}
            alt={user.name}
            style={{height: "50px", width:"50px"}}
            />
            
            <h5 className="card-title">{user.name}</h5>
            <p className="card-text">{user.email}</p>
            
            
            <Button ><Link to={`/user/${user._id}`} >Посмотреть профиль</Link></Button>
                         <div style={{padding:"5px"}} ></div>
                         <>
                         {/* {isAuthenticated().direct.role === "Директор" ? ( */}
                            <Button  type="danger" onClick={(userId) => this.handleClick(user._id, userId)}>Удалить Пользователя</Button>    
                         {/* ):("")} */}
                         </>

            </Card>
            </>
            ))}
        
            </div>
            {worker.length ? (
                <Button
                    className="ButtonPosition"
                    onClick={() => this.loadMore(1)}
                >
                    Вперед ({page + 1})
                </Button>
            ) : (
                ""
            )}
            {page > 1 ? (
                <Button
                    className="ButtonPosition"
                    onClick={() => this.loadLess(1)}
                >
                    Назад ({this.state.page - 1})
                </Button>
                
            ) : (
                ""
            )}
            </div>
            </div>
            </RealetivPositionComponent>
        )
    }
}
