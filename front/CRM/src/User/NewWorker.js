import React, { Component } from 'react'
import {NewPeopel} from '../Api/Http'
class NewWorker extends Component{
    constructor(){
        super()//состояние компонента
        this.state = {
            name: "",
            nam:"",
            email: "",
            surname:"",
            patronymic:"",
            role:"",
            password: "",
            error: "",
            open: false,
            Date_of_Birth:""
            
        }
    }
    //handleChange изменяняет состояние 
    handleChange = name => event => {
        this.setState({ error: "" })
        this.setState({ [name]: event.target.value })
    }
    //clickSubmit меняет состояние вызывает функцию signup принимает обьект user
    clickSubmit =  event =>{
        event.preventDefault()
        const { name, email, password, phone,surname,patronymic,role,Date_of_Birth,nam }  = this.state
        const user ={
            name,
            nam,
            email,
            password,
            phone,
            surname,
            patronymic,
            role,
            Date_of_Birth
        }
        NewPeopel(user).then(data => {
            if (data.error) this.setState({ error: data.error })
                else this.setState({
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
    SignUpForm = (name,email,password, phone,patronymic,surname,role,Date_of_Birth,nam) =>(  
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
                <label className="text-muted">Имя</label>
                <input
                onChange={this.handleChange("nam")}
                type="text"
                className="form-control"
                value={nam}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Фамилия</label>
                <input
                onChange={this.handleChange("surname")}
                type="text"
                className="form-control"
                />
            </div>
            <div className="form-group">
            <label className="text-muted">Отчество</label>
            <input
            onChange={this.handleChange("patronymic")}
            type="text"
            className="form-control"
            />
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
                // date 
            </div>
            <div className="form-group">
            <label for="exampleFormControlSelect1">Роль</label>
            <select className="form-control" id="exampleFormControlSelect1" onChange={this.handleChange("role")}>
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
        const { name,email,password,error, open,phone,patronymic,surname,nam } = this.state 
        return(
            <div className="container">

                <h2 className="mt-5 mb-5">Новый пользователь</h2>
                <div className="alert alert-danger" style={{ display: error ? "" : "none"}}>
                    {error}
                </div>
                <div className="alert alert-info" style={{ display: open ? "" : "none"}}>
                    Новый пользователь успешно создан.
                </div>
                {this.SignUpForm(name,email,password,phone,surname,patronymic,nam)}
                {/*SignUpForm функции для формы авторизации вставляет*/}
            </div>
        )
    }
}
export default NewWorker