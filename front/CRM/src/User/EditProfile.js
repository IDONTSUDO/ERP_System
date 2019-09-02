import React, { Component } from 'react'
import {isAuthenticated} from '../Api/Auth'
import {read,update,updateUser} from '../Api/Http'
import {Redirect} from  'react-router-dom'
import DefaultProfile from '../Assets/default.png'


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
                <div className="form-group">
                    <label className="text-muted">Profile photo</label>
                    <input
                    onChange={this.handleChange("photo")}
                    type="file"
                    accept="image/*"
                    className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label className="text-muted">About</label>
                    <textarea
                    onChange={this.handleChange("about")}
                    type="text"
                    className="form-control"
                    value={about}/>
                </div>
                <div className="form-group">
                    <label  className="text-muted">Email</label>
                    <input  onChange={this.handleChange("email")} type="email" className="form-control" value={email} />
                </div>
                <div className="form-group">
                    <label className="text-muted">Password</label>
                    <input onChange={this.handleChange("password")} type="password" className="form-control" value={password} />
                </div>
                <div className="form-group">
                    <label className="text-muted">Name</label>
                    <input
                    onChange={this.handleChange("name")}
                    type="text"
                    className="form-control"
                    value={name}/>
                </div>
                <button onClick={this.clickSubmit } className="btn btn-raised btn-primary">Updated</button>
            </form>
    )
    render() {
        const { id,password,name,email,redirectToProfile, error, loading,about} = this.state 
        if(redirectToProfile){
           return <Redirect to={`/user/${id}`}/>
        }
        const photoUrl = id 
        ? `${process.env.REACT_APP_API_URL}/user/photo/${id}?${new Date().getTime()}` 
        : DefaultProfile

        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Profile</h2>
                <div className="alert alert-danger" style={{ display: error ? "" : "none"}} > 
                    {error}
                </div>
                {loading ?(
                    <div className="jumbotron text-center">
                    <h2>loading...</h2>
                    </div>
                ):(
                    ""
                )}
                {this.SignUpForm(name,email,password, about)}
                <img 
                style={{height: "200px", width:"auto"}}
                className="img-thumbnail"
                src={photoUrl} alt={name}
                onError={i => (i.target.src = `${DefaultProfile}`)}
                />

            </div>
        )
    }
}
export default EditProfile