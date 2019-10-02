import React, { Component } from 'react'
import {NewPeopel} from '../Api/Http'
import DatePicker from "react-datepicker"
import { Form, Icon, Input, Button } from 'antd';
import styled from 'styled-components'



const RealetivPositionComponent = styled.div`
.postisitonRelative{
    left:15em;
    top: -3em;
    bottom: 20em;
    position: absolute;
    display: flex; 
} 
`;
class NewWorker extends Component{
    constructor(){
        super()//состояние компонента
        this.state = {
            startDate: new Date(),
            name: "",
            email: "",
            role:"",
            password: "",
            error: "",
            open: false,
            Date_of_Birth:"",
            phone:""
        }
    }
    //handleChange изменяняет состояние 
    handleChange = name => event => {
        this.setState({ error: "" })
        this.setState({ [name]: event.target.value })
    }
    handleChangeDate = date => {
        this.setState({
          startDate: date
        })
    }
    clickSubmit =  event =>{
        event.preventDefault()
        const { name, email, password, phone,role,startDate }  = this.state
        let yyyy = startDate.getFullYear()
        let mm = startDate.getMonth()
        let dd = startDate.getDate()
        // 
        let FuckingDataPicker =  + mm + 1
        // 
        let ItsRealyFucking = "0" + FuckingDataPicker
        // 
        let Date_of_Birth  = dd + '/' + ItsRealyFucking + '/' + yyyy

        const user ={
            name,
            email,
            password,
            phone,
            role,
            Date_of_Birth
        }
        
        NewPeopel(user).then(data => {
            if (data.error) this.setState({ error: data.error })
                else 
                this.setState({
                    error:"",
                    name: "",
                    email:"",
                    password:"",
                    phone: "",
                    open: true
            })
        })
    }
    //SignUpForm форма 
    SignUpForm = (name,email,password,phone,startDate,role) =>(  
        <form>
            <div className="form-group">
                <label className="text-muted">Полное имя</label>
                <input
                onChange={this.handleChange("name")}
                type="text"
                className="form-control"
                value={name}/>
            </div>
            <div className="form-group">
                <label  className="text-muted">Email</label>
                <input  onChange={this.handleChange("email")} type="email" className="form-control" value={email} />
            </div>
            <div className="form-group">
                <label className="text-muted">Пароль</label>
                <input onChange={this.handleChange("password")} type="password" className="form-control" value={password} />
            </div>
            <div className="form-group">
                <label className="text-muted">Номер телефона</label>
                <input onChange={this.handleChange("phone")} type="number" className="form-control" value={phone} />
            </div>
            <div className="form-group">
            <label className="text-muted">Дата рождения</label>
            <div style={{padding:"10px"}}></div>
            <DatePicker
                className="input"
                selected={this.state.startDate}
                onChange={this.handleChangeDate}
            />
            </div>
            <div className="form-group">
            <label for="exampleFormControlSelect1">Роль</label>
            <select className="form-control" id="exampleFormControlSelect1" onChange={this.handleChange("role")} >
              <option>Директор</option>
              <option>Менеджер</option>
              <option>Бугалтер</option>
              <option>Склад</option>
            </select>
          </div>
            <button onClick={this.clickSubmit } className="btn btn-raised btn-primary">Отправить</button>
        </form>
)
    render(){
        const { name,email,password,error, open,phone,startDate,role} = this.state 
        return(
            <RealetivPositionComponent>
            <div className="postisitonRelative">
            
            <div className="container">

                <h2 className="mt-5 mb-5">Новый пользователь</h2>
                <div className="alert alert-danger" style={{ display: error ? "" : "none"}}>
                    {error}
                </div>
                <div className="alert alert-info" style={{ display: open ? "" : "none"}}>
                    Новый пользователь успешно создан.
                </div>
                {this.SignUpForm(name,email,password,phone,startDate,role)}

            </div>
            </div>
            </RealetivPositionComponent>
        )
    }
}
export default NewWorker