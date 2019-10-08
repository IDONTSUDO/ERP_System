import React, { Component } from 'react'
import {isAuthenticated} from '../Api/Auth'
import {read,update,updateUser} from '../Api/Http'
import {Redirect} from  'react-router-dom'
import DefaultProfile from '../Assets/default.png'
import {Button} from 'antd'
class EditProfile extends Component {

    constructor(){
        super()
        this.state = {
            redirectToProfile: false,
            id: "",
            name: "",
            email: "",
            password: "",
            error:"",
            fileSize: 0,
            loading: false,
            about: ""
        }
    }
    // init функция принимающая userId and token в последствии передает даннные в функцию read 
    init = userId =>{
        const token = isAuthenticated().token  
            read(userId, token).then(data => {
                if(data.error){
                    this.setState({redirectToProfile: true})
                }else{
                    this.setState({ 
                        id: data._id,
                        name: data.name,
                        email: data.email,
                        error: "",
                        about: data.about
                    })
                }
            })
        }
        componentDidMount(){
            this.userData = new FormData()
            const userId = this.props.match.params.userId
            this.init(userId)
    
        }
        // isValid функция валидации берет данные из стейта и валидирует
        isValid = () =>{
            const {name, email, password, fileSize } = this.state
            if(fileSize > 100000){
                this.setState({error: "File size should be less than 100 kb", loading: false})
                return false
            }
            if(name.length == 0){
                this.setState({error: "Name is requred", loading: false})
                return false
            }
            if(!/^\w+([\.-]?\w+)*@\w([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) { 
                this.setState({error: "Email is not valid", loading: false})
                return false
            }
            if(password.length <= 1){
                this.setState({error: "password is requred" , loading: false})
                return false
            }
            return true
        }
        handleChange = name => event => {
            const value = name === "photo" ? event.target.files[0] : event.target.value
            const fileSize = name === "photo" ? event.target.files[0].size : 0
            this.userData.set(name, value)
            this.setState({ [name]: value, fileSize })
        }
        clickSubmit =  event =>{
            event.preventDefault()

            this.setState({loading: true })

            if(this.isValid()){
                

                const userId = this.props.match.params.userId
                const token = isAuthenticated().token  
                update(userId, token, this.userData).then(data => {
                if (data.error){ 
                    this.setState({ error: data.error })
                }
                    else 
                    updateUser(data, () =>{
                        this.setState({
                            name: data.name,
                            redirectToProfile: true
                    })
                        
                })
            })
            }
            //console.log(user)
        }
        SignUpForm = (name,email,password, about) =>(  
            <form>
                <div>
                    <label className="text-muted">Ваше фото</label>
                    <input
                    className="form-control"
                    onChange={this.handleChange("photo")}
                    type="file"
                    accept="image/*"
                   
                    />
                </div>
                <div >
                    <label  >Email</label>
                    <input className="form-control" onChange={this.handleChange("email")} type="email"  value={email} />
                </div>
                <div >
                    <label >Пароль</label>
                    <input className="form-control" onChange={this.handleChange("password")} type="password"  value={password} />
                </div>
                <div >
                    <label className="text-muted">Имя</label>
                    <input
                    className="form-control"
                    onChange={this.handleChange("name")}
                    type="text"
                  
                    value={name}/>
                </div>
                <div style={{padding:"10px"}}></div>
                <Button   onClick={this.clickSubmit } >Обновить</Button>
            </form>
    )
    render() {
        const { id,password,name,email,redirectToProfile, error, loading,about} = this.state 
 //  TODO: Change CSS and loading and ERRORS
        const photoUrl = id 
        ? `${process.env.REACT_APP_API_URL}/user/photo/${id}?${new Date().getTime()}` 
        : DefaultProfile

        return (
          
            <div  className="postisitonRelativeSmeni">
            <div className="container">
                <h2> Редактирование профиля</h2>
                <div className="alert alert-danger" style={{ display: error ? "" : "none"}} > 
                    {error}
                </div>
                {loading ?(
                    <div className="jumbotron text-center">
                    <h2>Загрузка...</h2>
                    </div>
                ):(
                    ""
                )}
                {this.SignUpForm(name,email,password, about)}
                <div style={{padding:"10px"}}></div>    
                <img 
                style={{height: "200px", width:"auto"}}
               
                src={photoUrl} alt={name}
                onError={i => (i.target.src = `${DefaultProfile}`)}
                />

            </div>
            </div>

        )
    }
}
export default EditProfile