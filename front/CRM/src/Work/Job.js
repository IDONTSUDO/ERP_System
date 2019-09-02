import React, { Component } from 'react'
import {soloJob,readComentList} from '../Api/Http'
import {isAuthenticated} from '../Api/Auth'
import {Redirect} from  'react-router-dom'
import DefaultProfile from '../Assets/default.png' 
import {Link} from 'react-router-dom'
import Comment from './Comment'
export default class Job extends Component {
    constructor(){
        super()
        this.state = {
            todo: { tags: []},
            redirectToSignin: false,
            following: false,
            error: "",
            comments:[],
            body:"",
	        worker:"",
	        todoId:"",
	        name:""
        }
    }
    init = todoId =>{
    const token = isAuthenticated().token  
        soloJob(todoId, token)
        .then(data =>{
            if(data.error){
                this.setState({redirectToSignin: true})
            }else{
                Object.keys(data)
                console.log(data)
                this.setState({ todo: data })
            }
        })
        readComentList(todoId).then(data =>{
            if(data.error){
                this.setState({redirectToSignin: true})
            }else{
                Object.keys(data)
                console.log(data)
                this.setState({ comments: data })
            }
        })
    }
    //componentDidMount()  хук жизненого цикла
    componentDidMount(){
        const todoId = this.props.match.params.todoId
        this.init(todoId)
    }
    //изменяет компонент componentWillReceiveProps()
    componentWillReceiveProps(props){
        const todoId = props.match.params.todoId
        this.init(todoId)

    }
    handleChange = name => event => {
        this.setState({ error: "" })
        this.setState({ [name]: event.target.value })
    }
    render() {
        const  {redirectToSignin, todo,comments,body} = this.state
       

        return(
            <div className="container">
            
            <div class="row">
                <div class="col-sm-8"></div>
                
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
                            <button  style={{width:200, height:50}}  type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Статус
                            </button>
                            <div class="dropdown-menu">
                            <button class="dropdown-item" type="button">Выполнено</button>
                            <button class="dropdown-item" type="button">Требуется уточнение</button>
                            <button class="dropdown-item" type="button">Что то еще</button>
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
                    <Link  to={`/user/${comment._id}`}>
                    <img className="card-img-top" src={`http://localhost:8080/user/photo/${comment._id}?`}
                         onError={i => (i.target.src = `${DefaultProfile}`)}
                         alt={comment.name}
                         style={{height: "50px", width:"50px"}}
                         />      
                    </Link>
                    <h5>{comment.body}</h5>
                         <small class="text-muted">{comment.name}</small>
                         <small class="text-muted">{comment.created}</small>
                    </div>
                    </>
                    ))}    
                </div>
                <>
                <Comment></Comment>
                </>
                </div>
            </div>
        
        )
    }
}
