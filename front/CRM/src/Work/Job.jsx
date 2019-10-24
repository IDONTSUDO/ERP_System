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
    TodoDelete,
    WorkerList,
    TodoChangeComandList
} from '../Api/Http'
import {isAuthenticated} from '../Api/Auth'
import {Redirect} from  'react-router-dom'
import { Comment,Tooltip,Select,Button,Card,Typography,notification, Icon,Modal,Popconfirm, message,Popover } from 'antd'
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
            todo: [],
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
            visible: false,
            tags:[],
            JobArray:[],
            description:""
            
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
        const token = isAuthenticated().token  
        const  {ID,worker,todo} = this.state
        const todoId = ID

       
        let status =  "Требуется уточнение"
        
        SetStatusJob(status,todoId,token).then(data => {
            if(data.error){
                console.log(data.error)
            }else{

                let tags = [todo.postedBy]


                this.forceUpdate(token)
                 
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
                
                NewNews(payload,token)

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
                this.setState({ 
                    status:data.status,
                    tags: data.tags, 
                    importance:data.importance,
                    JobArray: data.JobArray,
                    comand:data.comand,
                    description:data.description,
                    postedBy:data.postedBy
                })
            }
        })
        readComentList(todoId,token).then(data =>{
            if(data.error){
                this.setState({redirectToSignin: true})
            }else{
              
                this.setState({ comments: data })
            }
        })
        
    }
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
        const token = isAuthenticated().token  
        const { body,worker,ID,name,todo }  = this.state
        let todoId = ID 
        let comment = JSON.stringify({body,worker,todoId,name})
        NewComent(comment,token).then(data => {
            if(data.error){
                console.log(data.error)
            }else{
                this.forceUpdate(token)

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
    forceUpdate(token){
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
    clickSetStatusCompleteJobWorker = () =>{
        let {JobArray,worker,ID,todo} = this.state
        
        const todoId = ID

        let userId = isAuthenticated().direct._id
        let usersArray = []
        let dateArray = []
        let actionArray = []
        let UsersLsatArray = []
        let news 
        let i = 0
        while(JobArray.length > i){
            dateArray.push(JobArray[i].date)
            actionArray.push(JobArray[i].action)
            usersArray.push(JobArray[i].user)
            i++
        }
        let str1 
        let el1 
        let El3 
        let str2 = 0
        while(usersArray.length > str2){
 
            if(usersArray[str2] != userId + "IAMWORKED"){
              UsersLsatArray.push(usersArray[str2])
            }
            if(usersArray[str2] == userId + "IAMWORKED"){
              str1 = str2
                if(usersArray[str1+1] != undefined){
                    el1 = usersArray[str2].slice(0,-9)
                    UsersLsatArray.push(el1)
                    UsersLsatArray.push(usersArray[str1+1]+ "IAMWORKED")
                    El3 = usersArray[str1+1]

                }else{
                    this.clickSetStatusCompleteJob()
                }
            }
            str2++
        }
        var filteredTime = UsersLsatArray.filter(function (el) {
                      return el != El3
        })

       
        let LastArray = filteredTime.map((user, index) => {
            return {
              user: user,
              date: dateArray[index],
              action: actionArray[index]
            }
        })
        news = El3 
        JobArray = LastArray
        let status =  "Требуется уточнение"
        let payload = {
            JobArray
        }
        TodoChangeComandList(todoId,payload).then(data => {
            if(data.error){
                console.log(data.error)
            }else{
                this.forceUpdate()
              
                let link = ID
                let event = "вам пришло новое дело"
                let payload = {
                    event,
                    link,
                    news
                }
                this.openNotificationNewStatus()
                
                 NewNews(payload)
            }
        })

        
    }
    handleChangeComandWork = (value) => {
       
        if(value == "Выполнено"){
            this.clickSetStatusCompleteJobWorker()
        }if(value == "Требуется уточнение"){
            this.clickSetStatusMoreInfoJob()
        }else{
            return
        }
    }
    handleChange = (value) => {
       
        if(value == "Выполнено"){
           
            this.clickSetStatusCompleteJob()
        }if(value == "Требуется уточнение"){
            this.clickSetStatusMoreInfoJob()
        }else{
            return
        }
    }
    content = (JobArray,worker) =>(  
        <form>
          
            <div className="form-group">
                <h4>Жизненый цикл дела</h4>
               {JobArray.map((job, i) =>(
                   <>
                   <div className="TodoListOneJob" style={{padding:"10px"}}>
                       <div>
                        <>
                        {console.log(job.user[25])}
                        {job.user[25] != "A" ? (<>
                        <>
                        <Link to={`/user/${job.user}`} >
                        <img className="card-img-top" src={`http://localhost:8080/user/photo/${job.user}`}
            onError={i => (i.target.src = `${DefaultProfile}`)}
            alt={job.user}
            style={{height: "3em", width:"3em"}}
            /></Link>
                   </>
                    </>):("") }
                        </>
                       </div>
                       <div>{job.date}</div>
                       <div><p></p><div className="TodoListBorder"><ReactMarkdown 
                            source={job.action}/></div></div></div>
                  <hr/>
                   </>
               ))}
            </div>
        </form>
)
    render() {
        const  {
            redirectToSignin,
            todo,
            comments,
            body,
            status,
            postedBy,
            visible,
            loading,
            tags,
            worker,
            comand,            
            importance,
            JobArray,
            description } = this.state
        const HeartSvg = () => (
            <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
        <path d="M824.2 699.9a301.55 301.55 0 0 0-86.4-60.4C783.1 602.8 812 546.8 812 484c0-110.8-92.4-201.7-203.2-200-109.1 1.7-197 90.6-197 200 0 62.8 29 118.8 74.2 155.5a300.95 300.95 0 0 0-86.4 60.4C345 754.6 314 826.8 312 903.8a8 8 0 0 0 8 8.2h56c4.3 0 7.9-3.4 8-7.7 1.9-58 25.4-112.3 66.7-153.5A226.62 226.62 0 0 1 612 684c60.9 0 118.2 23.7 161.3 66.8C814.5 792 838 846.3 840 904.3c.1 4.3 3.7 7.7 8 7.7h56a8 8 0 0 0 8-8.2c-2-77-33-149.2-87.8-203.9zM612 612c-34.2 0-66.4-13.3-90.5-37.5a126.86 126.86 0 0 1-37.5-91.8c.3-32.8 13.4-64.5 36.3-88 24-24.6 56.1-38.3 90.4-38.7 33.9-.3 66.8 12.9 91 36.6 24.8 24.3 38.4 56.8 38.4 91.4 0 34.2-13.3 66.3-37.5 90.5A127.3 127.3 0 0 1 612 612zM361.5 510.4c-.9-8.7-1.4-17.5-1.4-26.4 0-15.9 1.5-31.4 4.3-46.5.7-3.6-1.2-7.3-4.5-8.8-13.6-6.1-26.1-14.5-36.9-25.1a127.54 127.54 0 0 1-38.7-95.4c.9-32.1 13.8-62.6 36.3-85.6 24.7-25.3 57.9-39.1 93.2-38.7 31.9.3 62.7 12.6 86 34.4 7.9 7.4 14.7 15.6 20.4 24.4 2 3.1 5.9 4.4 9.3 3.2 17.6-6.1 36.2-10.4 55.3-12.4 5.6-.6 8.8-6.6 6.3-11.6-32.5-64.3-98.9-108.7-175.7-109.9-110.9-1.7-203.3 89.2-203.3 199.9 0 62.8 28.9 118.8 74.2 155.5-31.8 14.7-61.1 35-86.5 60.4-54.8 54.7-85.8 126.9-87.8 204a8 8 0 0 0 8 8.2h56.1c4.3 0 7.9-3.4 8-7.7 1.9-58 25.4-112.3 66.7-153.5 29.4-29.4 65.4-49.8 104.7-59.7 3.9-1 6.5-4.7 6-8.7z"></path>    </svg>
        )
        const HeartIcon = props => <Icon component={HeartSvg} {...props} />;
        return(
            <div className="postisitonRelativeSmeni">
                {comand  ? (
                    <>
                     <div className="container">
                        <div class="row">
                        <div class="col-md-4"> 
                        <Card style={{width:"55em"}}> 
            
            <a>
                    <div class="d-flex w-100 justify-content-between">
                     
                    <small class="text-muted">{todo.status}</small>
                       
                    </div>
                  
                   
                    </a>
                    <div class="btn-group dropup">
                  
                       
                        
                </div>
                <div  style={{padding:"10px"}}>  </div>

                {JobArray.map((job, i) =>(
                    <>
                    {isAuthenticated().direct._id+"IAMWORKED" == job.user  ? (<>
                        <>
                        <Select defaultValue="Статус" style={{ width: 120 }} onChange={this.handleChangeComandWork}>
                          <Option value="Выполнено">Выполнено</Option>
                          <Option value="Требуется уточнение">Требуется уточнение</Option>
                        </Select>
                        <ReactMarkdown 
                            source={job.action} />
                          <small class="text-muted">{job.date}</small>
                        
                        </>
                    </>):("") }
                    </>
                ))}
                 
                        <div style={{padding:"1px"}}>
                        <Popover content={this.content(JobArray,worker)}  trigger="hover" placement="bottom">
                       <Button  type="dashed">Посмотреть дело  </Button>
                        </Popover>  
                        </div>
        </Card>
         
                        </div>
                        </div>
                       

                        <hr style={{width:"35em"}} />
                        
                        <div className="container">
                <div class="row">
                <div>
                {comments.map((comment, i) => (
                    <>

                    <Card style={{width:"55em"}} >
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
                    </>
                ):(
                    <>
                      <div className="container">
                        <div class="row">
                        <div class="col-md-4">
                        <Card style={{width:"55em"}}> 
            
            <a>
                    <div class="d-flex w-100 justify-content-between">
                     
                    <small class="text-muted">{status}</small>
                       
                    </div>
                    <ReactMarkdown 
                            source={description} />
                    <small class="text-muted"></small>
                    </a>
                    <div class="btn-group dropup">
                        
                        <Select defaultValue="Статус" style={{ width: 120 }} onChange={this.handleChange}>
                          <Option value="Выполнено">Выполнено</Option>
                          <Option value="Требуется уточнение">Требуется уточнение</Option>
                        </Select>
                      

                </div>
                <div  style={{padding:"10px"}}>
                <Popconfirm
                style={{backgroundColor:"black"}}
                okText="Ок"
                cancelText="Отменить"
    title={
        tags.map((tod, i) => (
            <>
            <Link  to={`/user/${tod}`}>
            <img className="card-img-top" src={`http://localhost:8080/user/photo/${tod}?`}
                 onError={i => (i.target.src = `${DefaultProfile}`)}
                 style={{height: "2em", width:"2em"}}
                 />      
            </Link> 
            </>
            ))} 
  >
    <h6 style={{color:"#266DCA"}}>Исполнителей {tags.length}</h6>
                    <HeartIcon  style={{ fontSize: '32px' }}>
            
                    

  </HeartIcon>
  </Popconfirm>
                    </div>
                    
        </Card>
                        </div>
                        </div>
                        <hr style={{width:"35em"}} />
                        
                        <div className="container">
                <div class="row">
                <div>
{/* 

КОМЕНТАРИИ





                     */}
                {comments.map((comment, i) => (
                    <>

                    <Card style={{width:"55em"}} >
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
                    </>
                )

                }
                 {isAuthenticated().direct._id ===
                        postedBy && (
                            <>
                            <div classname="positionLeft">
                                <Button type="primary" onClick={this.showModal}>
                                Редактировать
                                </Button>
                            </div>
                            </>
                        )}     
           
            
                    <div>        
               
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
