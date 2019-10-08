import React from 'react'
import ReactTags from 'react-tag-autocomplete'
import DatePicker from "react-datepicker";
import dateFormat from 'dateformat'

import {list,NewTodo} from "../Api/Http"
import {isAuthenticated} from "../Api/Auth"

import { Button,Spin } from 'antd'

import "react-datepicker/dist/react-datepicker.css";

class Work extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      startDate: new Date(),
      tags: [],
      worker: [],
      title:'',
      description:'',
      user:'',
      loading: false,
      open: false,
      importance:""
    }
  }
  componentDidMount(){
    this.setState({user: isAuthenticated().direct})
    list().then(data =>{
        if(data.error){
            console.log(data.error)
        }else{
            this.setState({worker:data})
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
  handleChange = date => {
    this.setState({
      startDate: date
    })
  }
  handleChangeForm = name => event => {
    this.setState({ error: "" })
    this.setState({ [name]: event.target.value })
  }
  handleAction = name => event => {
    this.setState({ error: "" })
    this.setState({ [name]: event.target.value })
  }
  clickSubmit =  event =>{
    event.preventDefault()
    this.setState({loading: true})
    const { tags,title,description,user,startDate,importance }  = this.state
    let  time_now = startDate
    let time = dateFormat(time_now, "dddd, mmmm, yyyy")
  
    const todo ={
        tags,
        title,
        description,
        time,
        importance
    }
    
    NewTodo(todo,user).then(data => {
      if (data.error){
        console.log(data.error)
      }
      else this.setState({
          loading: false,
          error:"",
          name: "",
          email:"",
          password:"",
          open: true,
          error:""
    })
    })
  }
  
  render () {
    const { worker,loading,open } = this.state 
    return (
      

         <div className="postisitonRelativeSmeni">
        <div className="container">
                    <div className="row">

    <>
    <div style={{width:"15em"}} className="alert alert-info" style={{ display: open ? "" : "none"}}>
      Новое дело создано
    </div>
    {loading ?(
     <>
     <Spin></Spin>
     </>
  ):(
      ""
  )}

    <form className="col-md-6">
   
    <div >
      <label  className="text-muted" for="exampleFormControlInput1">Название</label>
      <input onChange={this.handleAction("title")} type="email" class="form-control" id="exampleFormControlInput1"/>
    </div>

    <div>
   
      <label className="text-muted" for="exampleFormControlTextarea1">Описание</label>
      <textarea onChange={this.handleAction("description")} class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>

    </div>

    </form>



    <div className="col-md-4" >
    <label className="label_position text-muted" for="exampleFormControlTextarea1">Сроки Выполнения</label>
    <DatePicker
    className="form-control" 
        selected={this.state.startDate}
        onChange={this.handleChange}
      />
        <div class="form-group">
    <label for="exampleFormControlSelect1">Приоретет задачи</label>
    <select  onChange={this.handleChangeForm("importance")} class="form-control" >
      <option>Выберите приоретет</option>
      <option>Очень важное</option>
      <option>Средней важности</option>
      <option>Не очень важное</option>
    </select>
  </div>
    </div>
    
    <div className="col-md-4">
    <h3>Исполнители</h3>
    <div className="Tags">
    <ReactTags
        tags={this.state.tags}
        placeholder={("Добавить исполнителя")}
        suggestions={worker}
        handleDelete={this.handleDelete.bind(this)}
        handleAddition={this.handleAddition.bind(this)} />
    </div>
    </div>

    <div ></div>
    <div style={{padding:"50px"}} className="col-md-4" >
    <Button onClick={this.clickSubmit }>Отправить</Button>
    </div>
    {/* </div> */}

   
    
    </>
   
    </div>
    </div>
    </div>
    
    )
  }
}
export default Work
// Full name
// position
