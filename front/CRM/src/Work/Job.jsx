import React, { Component } from 'react'
import {
    soloJob,
    readComentList,
    NewComent,
    DeleteComment,
    NewNews,
    SetStatusJob,
    TodoChangeExperienseAtHTTP,
    TodoUpTime,
    TodoDelete
} from '../Api/Http'
import {isAuthenticated} from '../Api/Auth'
import {Redirect} from  'react-router-dom'
import { Comment,Tooltip,Select,Button,Card,Typography,notification, Icon,Modal } from 'antd'
import dateFormat from 'dateformat'
import DatePicker from "react-datepicker"
import DefaultProfile from '../Assets/default.png' 
import ReactMarkdown from 'react-markdown'

import {Link} from 'react-router-dom'


const { Option } = Select;
const { Title } = Typography






export default class Job extends Component {
    constructor(){
        super()
        this.state = {
            name:"",
            todo: { tags: []},
            redirectToSignin: false,
            error: "",
            comments:[],
            body:"",
	        worker:"",
	        ID:"",
            name:"",
            event:"",
            startDate:"",
            loading: false,
            visible: false
        }
    }
    clickSetStatusCompleteJob = () =>{
        const  {ID} = this.state
        const todoId = ID
        let expireAt = new Date()
        let status =  "Выполнено"
        
        SetStatusJob(status,todoId).then(data => {
            if(data.error){
                console.log(data.error)
            }else{
                
                this.forceUpdate()
                
                TodoChangeExperienseAtHTTP(expireAt,todoId)
                
            }
        })
    }
    clickSetStatusMoreInfoJob = () =>{
       
        const  {ID,worker,todo} = this.state
        const todoId = ID

       
        let status =  "Требуется уточнение"
        
        SetStatusJob(status,todoId).then(data => {
            if(data.error){
                console.log(data.error)
            }else{
// TODO: 
                let tags = [todo.postedBy]


                this.forceUpdate()
                 
                let worker_by = worker
                let link = ID
                let event = "новый статус"
                let payload = {
                    link,
                    worker_by,
                    event,
                    tags
                }
                this.openNotificationNewStatus()
                NewNews(payload)

            }
        })
    }
    init = todoId =>{
    const token = isAuthenticated().token  
        soloJob(todoId, token)
        .then(data =>{
            if(data.error){
                this.setState({redirectToSignin: true})
            }else{
                Object.keys(data)
             
                this.setState({ todo: data })
                
            }
        })
        readComentList(todoId).then(data =>{
            if(data.error){
                this.setState({redirectToSignin: true})
            }else{
                Object.keys(data)
                this.setState({ comments: data })
            }
        })
    }
    // TODO: filter shouldComponentUpdate()
    componentDidMount(){
        const todoId = this.props.match.params.todoId
        const workerId = isAuthenticated().direct._id
        const nameWorker = isAuthenticated().direct.name
        this.init(todoId)
        this.setState({ID:todoId})
        this.setState({worker:workerId})
        this.setState({name:nameWorker})
      
    }

    componentWillReceiveProps(props){
        const todoId = props.match.params.todoId
        this.init(todoId)

    }
    handleChange = name => event => {
        this.setState({ error: "" })
        this.setState({ [name]: event.target.value })
    }
    handleAction = name => event => {
        this.setState({ error: "" })
        this.setState({ [name]: event.target.value })
    }

    clickSubmit =  () =>{
        
        const { body,worker,ID,name,todo }  = this.state
        let todoId = ID 
        let comment = JSON.stringify({body,worker,todoId,name})
        NewComent(comment).then(data => {
            if(data.error){
                console.log(data.error)
            }else{
                this.forceUpdate()

                let tagsArray = todo.tags
                let arr = new Array()
                for(let i = 0; i < tagsArray.length; i++){
                    if(tagsArray[i]._id != worker){
                        arr.push(tagsArray[i]._id)
                    }
                }
                
                let worker_by = worker
                let link = ID
                let tags = arr
                let event = "новый коментарий"
                let payload = {
                    tags,
                    link,
                    worker_by,
                    event
                }
                this.openNotificationNewComment()
                NewNews(payload)
            }
        })
    }
    deleteConfirmed = comment => {
        let answer = window.confirm(
            "Точно?"
        )
        if (answer) {
            this.deleteComment(comment);
        }
    }
    handleChange = date => {
        this.setState({
          startDate: date
        })
      }
    deleteComment = comment => {
        
        const {todo,worker} = this.state
        DeleteComment(comment).then(data => {
            if(data.error){
                console.log(data.error)
            }else{
                this.forceUpdate()
                this.openNotification()
                
                
            }
        })
    }
    forceUpdate(){
        const todoId = this.props.match.params.todoId

        this.init(todoId)
        this.setState({ID:todoId})
        this.setState({body:""})
    }
    NewDate = event =>{
        event.preventDefault()
        const {startDate,ID} = this.state
       
        let UpTime = dateFormat(startDate)
        TodoUpTime(ID,UpTime).then(data =>{
            if(data.error){
                console.log(data.error)

            }else{
               this.openNotificationNewDate()
            }
        })
    }
    
    DeleteTodo = event => {
        event.preventDefault()
        const {ID} = this.state
        let todoId = ID
        let expireAt = new Date()
        TodoChangeExperienseAtHTTP(expireAt,todoId)
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
        this.setState({ visible: false })
    }
    openNotification(){
        notification.open({
          message: 'Коментарий удален',
          icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
        })
    }
    openNotificationNewDate(){
        notification.open({
          message: 'Новая дата выставлена',
          icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
        })
    }
    openNotificationNewStatus(){
        notification.open({
          message: 'Статус дела изменен',
          icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
        })
    }
    openNotificationNewComment(){
        notification.open({
          message: 'Новый коментарий создан',
          icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
        })
    }
    openNotificationError(){
        notification.open({
          message: 'Ой что то пошло не так, мне жаль',
          icon: <Icon type="frown" style={{ color: '#108ee9' }} />,
        })
    }
    handleChange = (value) => {
       
        if(value == "Выполнено"){
            console.log(200)
            this.clickSetStatusCompleteJob()
        }if(value == "Требуется уточнение"){
            this.clickSetStatusMoreInfoJob()
        }else{
            return
        }
    }
    render() {
        const  {redirectToSignin, todo,comments,body,status,postedBy,visible, loading } = this.state

        
          
        return(
           
            <div className="postisitonRelativeSmeni">
            <div className="container">
            
            <div class="row">
                <div class="col-md-4">
            <Card> 
            
                <a>
                        <div class="d-flex w-100 justify-content-between">
                         
                        <small class="text-muted">{todo.status}</small>
                           
                        </div>
                        <ReactMarkdown 
                                source={todo.description} />
                        <small class="text-muted"></small>
                        </a>
                        <div class="btn-group dropup">
                            
                            <Select defaultValue="Статус" style={{ width: 120 }} onChange={this.handleChange}>
                              <Option value="Выполнено">Выполнено</Option>
                              <Option value="Требуется уточнение">Требуется уточнение</Option>
                            </Select>
                          
  
                    </div>
            </Card>
            </div>
                <div>
                {isAuthenticated().direct._id ===
                        todo.postedBy && (
                            <>
                                <Button type="primary" onClick={this.showModal}>
                                Редактировать
                                </Button>
                            </>
                        )}                
              
                                   
                {todo.tags.map((tod, i) => (
                    <>
                    <Card key={i}>
                    
                    <Link  to={`/user/${tod._id}`}>
                    <img className="card-img-top" src={`http://localhost:8080/user/photo/${tod._id}?`}
                         onError={i => (i.target.src = `${DefaultProfile}`)}
                         alt={tod.name}
                         style={{height: "5em", width:"5em"}}
                         />      
                    </Link>
                         <small class="text-muted">{tod.email}</small>
                         <small class="text-muted">{tod.name}</small>
                         <small class="text-muted">{tod.role}</small>
                         
                    </Card>
                    </>
                    ))}    
                </div>
                <div>

                </div>
                </div>
                <hr style={{width:"75em"}} />
                <div className="container">
                <div class="row">
                <div >
                {comments.map((comment, i) => (
                    <>

                    <Card style={{width:"75em"}} >
                    <Comment key={i}>
                    <Tooltip>
                    <Link  to={`/user/${comment.worker}`}>
                    <img className="card-img-top" src={`http://localhost:8080/user/photo/${comment.worker}`}
                         onError={i => (i.target.src = `${DefaultProfile}`)}
                         alt={comment.name}
                         style={{height: "50px", width:"50px"}}
                         />      
                    </Link>
                    <h5>{comment.body}</h5>
                         <h5 class="text-muted">{comment.name}</h5>
                         <small class="text-muted">{comment.created}</small>
                    </Tooltip>
                    </Comment>
                    {isAuthenticated().direct._id ===
                        comment.worker && (
                            <>
                                <Button
                                    onClick={() =>
                                        this.deleteConfirmed(
                                            comment._id
                                        )
                                    }
                                    className="text-danger float-right mr-1"
                                >
                                    Удалить
                                </Button>
                            </>
                        )}
                    </Card>
                    </>
                    
                    ))}    
                </div>
                <>
                <div style={{padding:"5px"}}>
                </div>
                <div class="form-group col-sm-8 ">
                <label for="exampleFormControlTextarea1">Новый Коментарий</label>
                <textarea value={body} onChange={this.handleAction("body")} class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                <div style={{padding:"10px"}}>
                <Button onClick={this.clickSubmit } className="btn btn-primary">Отправить</Button>
                </div>
                </div>
               
                </>

                </div>
                </div>
                </div>
                <Modal
          visible={visible}
          title="Редактировать дело"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          
        >

                                <DatePicker
                                  className="form-control" 
                                  selected={this.state.startDate}
                                  onChange={this.handleChange}
                                />
                                <Button onClick={this.NewDate}>Новая дата</Button>
                                <Button onClick={this.DeleteTodo}>Удалить досрочно</Button>
                          
        </Modal>
            </div>
        )
    }
}
