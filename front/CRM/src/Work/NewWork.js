import React from 'react'
import ReactTags from 'react-tag-autocomplete'
import DatePicker from "react-datepicker";
import {list,NewTodo} from "../Api/Http"
import {isAuthenticated} from "../Api/Auth"
import styled from 'styled-components'
import { Row, Col } from 'antd';

import "react-datepicker/dist/react-datepicker.css";
const RealetivPositionComponent = styled.div`
.postisitonRelative{
    left:15em;
    top: 2em;
    bottom: 20em;
    position: absolute;
    display: flex; 
}
.piker{
    left:-33em;
    right: 2em;
    top: 12em;
    bottom: 20em;
    position: absolute;
    display: flex; 
}
.Ispolnitely{
    left:-33em;
    right: 2em;
    top: 18em;
    bottom: 20em;
    position: absolute;
    display: flex;
}
.Tags{
  left: 0px;
    right: 2em;
    top: 3em;
    bottom: 0p;
    position: absolute;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
}
.buttonR{
    left: 0px;
    right: 2em;
    top: 11em;
    bottom: 0p;
    position: absolute;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
}
.label_position{
    left:0px;
    right: 2em;
    top: -2em;
    bottom: 0p;
    position: absolute;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
}
`;

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
      open: false
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
    this.setState({loading: true})
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
          open: true
    })
    })
  }
  
  render () {
    const { worker,loading,open } = this.state 
    return (
      
     

      <RealetivPositionComponent>
      <div className="postisitonRelative">
      
    <>
    <div style={{width:"15em"}} className="alert alert-info" style={{ display: open ? "" : "none"}}>
      Новое дело создано
    </div>
    <Row gutter={16}>
    {loading ?(
      <div className="jumbotron text-center">
      <h2>Загрузка...</h2>
      </div>
  ):(
      ""
  )}

    <form>
    <Col  className="gutter-row" span={12}>
    <div >
      <label  className="text-muted" for="exampleFormControlInput1">Название</label>
      <input onChange={this.handleAction("title")} type="email" class="form-control" id="exampleFormControlInput1"/>
    </div>
    </Col>
    <Col span={12}>
    <div>
   
      <label className="text-muted" for="exampleFormControlTextarea1">Описание</label>
      <textarea onChange={this.handleAction("description")} class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>

    </div>
    </Col>
    </form>
    </Row>
    <Row>

    <Col span={12} offset={6}>
    <div className="piker">
    <label className="label_position text-muted" for="exampleFormControlTextarea1">Сроки Выполнения</label>
    <DatePicker
    className="form-control" 
        selected={this.state.startDate}
        onChange={this.handleChange}
        
      />
    </div>
    </Col>
    </Row>
    <Row>

    
    <div className="Ispolnitely">
    <h3>Исполнители</h3>
    <div className="Tags">
    <ReactTags
        tags={this.state.tags}
        suggestions={worker}
        handleDelete={this.handleDelete.bind(this)}
        handleAddition={this.handleAddition.bind(this)} />
    </div>
    <div className="buttonR">
    <button onClick={this.clickSubmit } className="btn btn-primary">Отправить</button>
    </div> 
    </div>

    </Row>
    
    </>
   
    </div>
    
    </RealetivPositionComponent>
    )
  }
}
export default Work
// Full name
// position
