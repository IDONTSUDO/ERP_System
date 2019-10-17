import React from 'react'
import ReactTags from 'react-tag-autocomplete'
import DatePickerReact from "react-datepicker"
import dateFormat from 'dateformat'
import ReactMarkdown from 'react-markdown'
import {list,NewTodo} from "../Api/Http"
import {isAuthenticated} from "../Api/Auth"
import { Button,Spin,Tabs,notification, Icon,DatePicker,Input,Select } from 'antd'
import "react-datepicker/dist/react-datepicker.css";


const { Option } = Select;
const { TabPane } = Tabs

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
      importance:"",
      visible:false,
      error:"",
      workerJob0:"",
      workerJob1:"",
      workerJob2:"",
      workerJob3:"",
      workerJob4:"",
      workerJob5:"",
      workerJob6:"",
      workerJob7:"",
      workerJob8:"",
      workerJob9:"",
      workerJob10:"",
      workerTime0:"",
      workerTime1:"",
      workerTime2:"",
      workerTime3:"",
      workerTime4:"",
      workerTime5:"",
      workerTime6:"",
      workerTime7:"",
      workerTime8:"",
      workerTime9:"",
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
  showModal = () => {
    this.setState({
      visible: true,
    })
  }

  handleOk = () => {
    this.setState({ loading: true })
    setTimeout(() => {
      this.setState({ loading: false, visible: false })
    }, 3000)
  }

  handleCancel = () => {
    this.setState({ visible: false });
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
 
  handleChangeForm = name => event => {
    this.setState({ error: "" })
    this.setState({ [name]: event.target.value })
  }
  handleAction = name => event => {
    console.log(name)
    this.setState({ error: "" })
    this.setState({ [name]: event.target.value })
  }
  isValid = () =>{
        
    const { tags,title,description} = this.state
    if(title.length == 0){
        this.setState({error: "Заголовок является обязательным"})
        return false
    }
    if(tags.length == 0) { 
        this.setState({error: "Вы должны добавить хоть одного исполнителя"})
        return false
    }
    if(description.length == 0){
        this.setState({error: "Описание задачи является обязательным параметром" })
        return false
    }
    return true
  }
  onChangeworkerTime0 = (date, dateString) => {  
      this.setState({workerTime0:date})
  }
  onChangeworkerTime1 = (date, dateString) => {  
    this.setState({workerTime1:date})
  }
  onChangeworkerTime2= (date, dateString) => {  
    this.setState({workerTime2:date})
  }
  onChangeworkerTime3= (date, dateString) => {  
    this.setState({workerTime3:date})
  }
  onChangeworkerTime4= (date, dateString) => {  
    this.setState({workerTime4:date}) 
  }
  onChangeworkerTime5= (date, dateString) => {  
    this.setState({workerTime5:date}) 
  }
  onChangeworkerTime6 = (date, dateString) => {  
    this.setState({workerTime6:date})
  }
  onChangeworkerTime7 = (date, dateString) => {  
    this.setState({workerTime7:date})
  }
  onChangeworkerTime8 = (date, dateString) => {  
    this.setState({workerTime8:date})
  }
  onChangeworkerTime9 = (date, dateString) => {  
    this.setState({workerTime9:date})
  }
  onChangeDate = (date, dateString) =>{
    this.setState({startDate:date})
  }
  handleChange = (value) => {
    
    this.setState({tags:value})
  }
  
  
  clickSubmit =  event =>{
    event.preventDefault()
    if(this.isValid()){
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
         this.openNotificationError()
        }
        else this.setState({
          title:"",
          description:"",
          workerJob0:"",
          workerJob1:"",
          workerJob2:"",
          workerJob3:"",
          workerJob4:"",
          workerJob5:"",
          workerJob6:"",
          workerJob7:"",
          workerJob8:"",
          workerJob9:"",
          workerJob10:"",
          workerTime0:"",
          workerTime1:"",
          workerTime2:"",
          workerTime3:"",
          workerTime4:"",
          workerTime5:"",
          workerTime6:"",
          workerTime7:"",
          workerTime8:"",
          workerTime9:"",
          tags:[] 
        })
        let value = ""
        // this.handleChange(value)
        this.openNotificationNewWork()
      })
  
    }
    }
    callback = (key) => {
  
      let fucking_react = ""
      if(key === "3"){
        this.setState({
          title:fucking_react,
          description:fucking_react,
          workerJob0:fucking_react,
          workerJob1:fucking_react,
          workerJob2:fucking_react,
          workerJob3:fucking_react,
          workerJob4:fucking_react,
          workerJob5:fucking_react,
          workerJob6:fucking_react,
          workerJob7:fucking_react,
          workerJob8:fucking_react,
          workerJob9:fucking_react,
          workerJob10:fucking_react,
          workerTime0:fucking_react,
          workerTime1:fucking_react,
          workerTime2:fucking_react,
          workerTime3:fucking_react,
          workerTime4:fucking_react,
          workerTime5:fucking_react,
          workerTime6:fucking_react,
          workerTime7:fucking_react,
          workerTime8:fucking_react,
          workerTime9:fucking_react,
        })
      }else{
        return
      }
     
    }
    clickSubmitExtedensJob =  event =>{
      event.preventDefault()
      const { tags,
        workerJob0,
        workerJob1,
        workerJob2,
        workerJob3,
        workerJob4,
        workerJob5,
        workerJob6,
        workerJob7,
        workerJob8,
        workerJob9,
        workerTime0,
        workerTime1,
        workerTime2,
        workerTime3,
        workerTime4,
        workerTime5,
        workerTime6,
        workerTime7,
        workerTime8,
        workerTime9 }  = this.state
        let newArray = []
        newArray.push(workerJob0,workerJob1,workerJob2,workerJob3,workerJob4,workerJob5,workerJob6,workerJob7,workerJob8,workerJob9)        
        var filtered = newArray.filter(function (el) {
          return el != ""
        })

       
        for(let i = 0; tags.length > i; i++){
          // console.log(tags[i]._id)
          console.log(filtered[i])
          if(tags[0] == tags[i]){
            console.log(tags[0]._id + 1111)
          }
        }
    }

  openNotificationError(){
    notification.open({
      message: 'Ой что то пошло не так, мне жаль',
      icon: <Icon type="frown" style={{ color: '#108ee9' }} />,
    })
  }
  openNotificationNewWork(){
    notification.open({
      message: 'Новое дело создано',
      icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
    })
  }
  openNotificationErrorValidation(){
    const {error} = this.state
    notification.open({
      message: `${error}`,
      icon: <Icon type="frown" style={{ color: '#108ee9' }} />,
    })
  }
  render () {
   
    const { worker,loading,open,description,error,tags,title,
    workerJob0,
    workerJob1,
    workerJob2,
    workerJob3,
    workerJob4,
    workerJob5,
    workerJob6,
    workerJob7,
    workerJob8,
    workerJob9,
    workerTime0,
    workerTime1,
    workerTime2,
    workerTime3,
    workerTime4,
    workerTime5,
    workerTime6,
    workerTime7,
    workerTime8,
    workerTime9} = this.state 

    function onChange(date, dateString) {
      
    }
    return (
      

         <div className="postisitonRelativeSmeni">
        <div className="container">
                    <div className="row">
                    <Tabs onChange={this.callback}  defaultActiveKey="1"  style={{width:"100em"}}>
    <TabPane tab="Редактировать" key="1">
    <form className="col-md-6">
   
   <div >
     <label  className="text-muted" for="exampleFormControlInput1">Название</label>
     <input value={title} onChange={this.handleAction("title")} type="email" class="form-control" id="exampleFormControlInput1"/>
   </div>

   <div>
  
     <label className="text-muted" for="exampleFormControlTextarea1">Описание</label>
     <textarea value={description} onChange={this.handleAction("description")} class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>

   </div>
 
   </form>



   <div className="col-md-4" >
   <label className="label_position text-muted" for="exampleFormControlTextarea1">Сроки Выполнения</label>
   <DatePicker onChange={this.onChangeworkerTime1} />
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
   
   {/* <div style={{padding:"5px"}}> */}
   <div className="col-md-4">
   <h3>Исполнители</h3>
   <div className="Tags">
   <Select
    mode="multiple"
    style={{ width: '100%' }}
    placeholder="Выберете исполнителей"
    onChange={this.handleChange}
    optionLabelProp="label"
  >
   {worker.map((workerOne, i = 1) => (
           <Option value={workerOne._id} label={workerOne.name}>
           <span role="img" aria-label="China">
           {workerOne.name}
           </span>
           
         </Option>    
    ))

    }
  </Select>
   </div>
   </div>

   <div ></div>
   <div style={{padding:"50px"}} className="col-md-4" >
   <Button onClick={this.clickSubmit }>Отправить</Button>
   </div>
    </TabPane>
    <TabPane tab="Посмотреть" key="2">
    <ReactMarkdown 
    source={description} />
    <ReactMarkdown 
    source={workerJob0} />
      <ReactMarkdown 
    source={workerJob1} />
      <ReactMarkdown 
    source={workerJob2} />
      <ReactMarkdown 
    source={workerJob3} />
      <ReactMarkdown 
    source={workerJob4} />
      <ReactMarkdown 
    source={workerJob5} />
      <ReactMarkdown 
    source={workerJob6} />
      <ReactMarkdown 
    source={workerJob7} />
    <ReactMarkdown 
    source={workerJob8} />
    
    </TabPane>
    <TabPane tab="Расширенная настройка" key="3">
    <div className="col-md-4">
   <h3>Исполнители</h3>
   <div className="Tags">
   <Select
    mode="multiple"
    style={{ width: '100%' }}
    placeholder="Выберете исполнителей"
    onChange={this.handleChange}
    optionLabelProp="label"
  >
   {worker.map((workerOne, i = 1) => (
           <Option value={workerOne._id} label={workerOne.name}>
           <span role="img" aria-label="China">
           {workerOne.name}
           </span>
           
         </Option>    
    ))

    }
  </Select>,
   </div>
   </div>
   <h1 style={{padding:"0.5em"}}></h1>

   <div>
   {tags.length > 0 ? (
                <>
                 <Input placeholder="Заголовок дела..." />
                </>
            ):("")}
   {tags.map((tod, i = 1) => (
     <>
     <label className="text-muted" for="exampleFormControlTextarea1">Описание дела №{i} для {tod.name}</label>
     <textarea onChange={this.handleAction(`workerJob${i}`)} class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
      {i === 0 ? (
                <>
                  <DatePicker onChange={this.onChangeworkerTime0} />
                </>
            ):("")}
      {i === 1 ? (
                <>
                  <DatePicker onChange={this.onChangeworkerTime1} />
                </>
            ):("")}
        {i === 2 ? (
                <>
                 <DatePicker onChange={this.onChangeworkerTime2} />
                </>
            ):("")}
        {i === 3 ? (
                <>
                 <DatePicker onChange={this.onChangeworkerTime3} />
                </>
            ):("")}
        {i === 4 ? (
                <>
                 <DatePicker onChange={this.onChangeworkerTime4} />
                </>
            ):("")}
        {i === 5 ? (
                <>
                 <DatePicker onChange={this.onChangeworkerTime5} />
                </>
            ):("")}
        {i === 6 ? (
                <>
                 <DatePicker onChange={this.onChangeworkerTime6} />
                </>
            ):("")}
        {i === 7 ? (
                <>
                 <DatePicker onChange={this.onChangeworkerTime7} />
                </>
            ):("")}
        {i === 8 ? (
                <>
                 <DatePicker onChange={this.onChangeworkerTime8} />
                </>
            ):("")}
        {i === 9 ? (
                <>
                 <DatePicker onChange={this.onChangeworkerTime9} />
                </>
            ):("")}
     </>
    ))}   

      {tags.length >= 1 ? (
               <Button onClick={this.clickSubmitExtedensJob}> Создать</Button>
            ):("")}
   </div>
  

    </TabPane>
  </Tabs>  
    </div>
    </div>
    {error.length > 2 ? (
                this.openNotificationErrorValidation()
            ):("")}
    </div>
    
    )
  }
}
export default Work
// Full name
// position
