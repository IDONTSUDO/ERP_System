import React from 'react'
import ReactTags from 'react-tag-autocomplete'
import DatePicker from "react-datepicker";
import {list,NewTodo} from "../Api/Http"
import {isAuthenticated} from "../Api/Auth"

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
  handleAction = name => event => {
    this.setState({ error: "" })
    this.setState({ [name]: event.target.value })
  }
  clickSubmit =  event =>{
    event.preventDefault()
    const { tags,title,description,user,startDate }  = this.state

    let yyyy = startDate.getFullYear()
    let mm = startDate.getMonth()
    let dd = startDate.getDate()
    // 
    let FuckingDataPicker =  + mm + 1
    // 
    let ItsRealyFucking = "0" + FuckingDataPicker
    // 
    let time  = dd + '/' + ItsRealyFucking + '/' + yyyy
    // 
    const todo ={
        tags,
        title,
        description,
        time
    }
    // 
    NewTodo(todo,user)
  }
  
  render () {
    const { worker } = this.state 
    return (
    <>
    <form>
    <div class="form-group">
      <label for="exampleFormControlInput1">Название</label>
      <input onChange={this.handleAction("title")} type="email" class="form-control" id="exampleFormControlInput1"/>
    </div>
    <div class="form-group">
      <label for="exampleFormControlTextarea1">Описание</label>
      <textarea onChange={this.handleAction("description")} class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
    </div>
    
    
    </form>
    <DatePicker
        selected={this.state.startDate}
        onChange={this.handleChange}
        
      />
    <h3>Исполнители</h3>
    <ReactTags
        tags={this.state.tags}
        suggestions={worker}
        handleDelete={this.handleDelete.bind(this)}
        handleAddition={this.handleAddition.bind(this)} />
    <button onClick={this.clickSubmit } className="btn btn-primary">Отправить</button>
    </>
    )
  }
}
export default Work
