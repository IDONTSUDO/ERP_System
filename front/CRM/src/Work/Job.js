import React, { Component } from 'react'
import {
    soloJob,
    readComentList,
    NewComent,
    DeleteComment,
    NewNews,
    SetStatusJob,
    TodoChangeExperienseAtHTTP
} from '../Api/Http'
import {isAuthenticated} from '../Api/Auth'
import {Redirect} from  'react-router-dom'
import DefaultProfile from '../Assets/default.png' 
import {Link} from 'react-router-dom'
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
        }
    }
    clickSetStatusCompleteJob = event =>{
        event.preventDefault()
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
    clickSetStatusMoreInfoJob = event =>{
        event.preventDefault()
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
                console.log(payload)
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

    clickSubmit =  event =>{
        event.preventDefault()
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
                console.log(payload)
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
    deleteComment = comment => {
        
        const {todo,worker} = this.state
        DeleteComment(comment).then(data => {
            if(data.error){
                console.log(data.error)
            }else{
                this.forceUpdate()
                
                
                
            }
        })
    }
    forceUpdate(){
        const todoId = this.props.match.params.todoId

        this.init(todoId)
        this.setState({ID:todoId})
        this.setState({body:""})
    }
    
    render() {
        const  {redirectToSignin, todo,comments,body,status} = this.state
       

        return(
            <div className="container">
            
            <div class="row">
                <div class="col-sm-8"></div>
                <h3 className="text-primary">{comments.length} Коментарии</h3>
                <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
                            <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-1">{todo.titel}</h5>
                            <small class="text-muted">{todo.status}</small>
                        </div>
                        <p class="mb-1">{todo.description}</p>
                        <small class="text-muted"></small>
                        </a>
                        
                    </div>
                <div>
                
                <div class="btn-group dropup">
                            <button onChange={this.handleAction("weq")} value={status} style={{width:200, height:50}}  type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Статус
                            </button>
                            <div class="dropdown-menu">
                            <button onClick={this.clickSetStatusCompleteJob}  class="dropdown-item" type="button">Выполнено</button>
                            <button onClick={this.clickSetStatusMoreInfoJob} value={status} class="dropdown-item" type="button">Требуется уточнение</button>
                            <button onClick={this.clickSetStatusMoreInfoJob } value={status} class="dropdown-item" type="button">Что то еще</button>
                        </div>
                        
                {todo.tags.map((tod, i) => (
                    <>
                    <div className="card" key={i}>
                    
                    <Link  to={`/user/${tod._id}`}>
                    <img className="card-img-top" src={`http://localhost:8080/user/photo/${tod._id}?`}
                         onError={i => (i.target.src = `${DefaultProfile}`)}
                         alt={tod.name}
                         style={{height: "50px", width:"50px"}}
                         />      
                    </Link>
                         <small class="text-muted">{tod.email}</small>
                         <small class="text-muted">{tod.name}</small>
                         <small class="text-muted">{tod.role}</small>
                         
                    </div>
                    </>
                    ))}    
                </div>
                <div>
                {comments.map((comment, i) => (
                    <>
                    <div className="card" key={i}>
                    <Link  to={`/user/${comment.worker}`}>
                    <img className="card-img-top" src={`http://localhost:8080/user/photo/${comment.worker}`}
                         onError={i => (i.target.src = `${DefaultProfile}`)}
                         alt={comment.name}
                         style={{height: "50px", width:"50px"}}
                         />      
                    </Link>
                    <h5>{comment.body}</h5>
                         <small class="text-muted">{comment.name}</small>
                         <small class="text-muted">{comment.created}</small>
                    </div>
                    {isAuthenticated().direct._id ===
                        comment.worker && (
                            <>
                                <span
                                    onClick={() =>
                                        this.deleteConfirmed(
                                            comment._id
                                        )
                                    }
                                    className="text-danger float-right mr-1"
                                >
                                    Удалить
                                </span>
                            </>
                        )}
                    </>
                    ))}    
                </div>
                <>
                <div class="form-group">
                <label for="exampleFormControlTextarea1">Новый Коментарий</label>
                <textarea value={body} onChange={this.handleAction("body")} class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                <button onClick={this.clickSubmit } className="btn btn-primary">Отправить</button>
                </div>
                </>
                </div>
            </div>
        
        )
    }
}
