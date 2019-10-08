import React, { Component } from 'react'
import {isAuthenticated} from "../Api/Auth"
import {NewContrAgent} from "../Api/Http"
export default class NewAgent extends Component {
    constructor(){
        super()
        this.state = {
            open: false,
            user:"",
            company:"",
            name:"",
            full_name:"",
            phone:"",
            INN:"",
            general_director:"",
            OGRN:"",
            email:"",
            any:"",
            legal_address:"",
            actual_address:"",
            payment_account:"",
            loading: false
        }
    }
    componentDidMount(){
        const userId = isAuthenticated().direct._id
        this.setState({user:userId})
    }
    handleChange = name => event => {
        this.setState({ error: "" })
        this.setState({ [name]: event.target.value })
    }
    clickSubmit =  event =>{
       let { user,company, full_name,name,phone,INN,general_director,OGRN,email,any,legal_address,actual_address,payment_account } = this.state
       let NewAgent = {
        company, 
        full_name,
        name,
        phone,
        INN,
        general_director,
        OGRN,
        email,
        any,
        legal_address,
        actual_address,
        payment_account
       }
       
       NewContrAgent(NewAgent,user).then(data => {
        if (data.error) this.setState({ error: data.error })
            else 
            this.setState({
                company:"",
                full_name:"",
                name:"",
                phone:"",
                INN:"",
                general_director:"",
                OGRN:"",
                email:"",
                any:"",
                legal_address:"",
                actual_address:"",
                payment_account:"",
        })
    })
    
    }

    render() {
        const {company, full_name,name,phone,INN,general_director,OGRN,email,any,legal_address,actual_address,payment_account,loading} =  this.state
        return (
            <div className="postisitonRelativeSmeni">

                    <div className="container">
                    <div className="row">
                    <form>
                   <div >
                       <label  className="text-muted">Название компании</label>
                       <input className="form-control" onChange={this.handleChange("company")} type="text"  value={company} />
                   </div>
                   <div >
                       <label  className="text-muted">Полное имя компании</label>
                       <input className="form-control" onChange={this.handleChange("full_name")} type="text"  value={full_name} />
                   </div>
                   <div >
                       <label className="text-muted">Телефон</label>
                       <input
                       className="form-control"
                       onChange={this.handleChange("phone")}
                       type="number"
                     
                       value={phone}/>
                   </div>
                   <div >
                       <label className="text-muted">Короткое имя компании</label>
                       <input
                       className="form-control"
                       onChange={this.handleChange("name")}
                       type="text"
                       value={name}/>
                   </div>
                   <div >
                       <label className="text-muted">Генеральный директор</label>
                       <input
                       className="form-control"
                       onChange={this.handleChange("general_director")}
                       type="text"
                     
                       value={general_director}/>
                   </div>
                   <div >
                       <label className="text-muted">ИНН компании</label>
                       <input
                       className="form-control"
                       onChange={this.handleChange("INN")}
                       type="text"
                     
                       value={INN}/>
                   </div>
                   <div >
                       <label className="text-muted">Email</label>
                       <input
                       className="form-control"
                       onChange={this.handleChange("email")}
                       type="text"
                     
                       value={email}/>
                   </div>
                   </form>
                   </div>
                   <div className="part2">
                   <div>
                    <div className="row">
                    <form>
                    <div >
                       <label className="text-muted">ОГРН компании</label>
                       <input
                       className="form-control"
                       onChange={this.handleChange("OGRN")}
                       type="text"
                       style={{width:"15em"}}
                       value={OGRN}/>
                   </div>
                   <div >
                       <label className="text-muted">Любая другая полезная информация</label>
                       <textarea value={any}  onChange={this.handleChange("any")} class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                   </div>
                   <div >
                       <label className="text-muted">Юридический адрес</label>
                       <input
                       className="form-control"
                       onChange={this.handleChange("legal_address")}
                       type="text"
                       value={legal_address}/>
                   </div>
                   <div >
                       <label className="text-muted">Фактический адрес</label>
                       <input
                       className="form-control"
                       onChange={this.handleChange("actual_address")}
                       type="text"
                       value={actual_address}/>
                   </div>
   
                   <div>
                       <label className="text-muted">Расчетный счет</label>
                       <input
                       className="form-control"
                       onChange={this.handleChange("payment_account")}
                       type="text"
                       value={payment_account}/>
                   </div>
                        </form>
                        </div>
                        </div>
                   </div>
                   <div style={{padding:"10px"}}></div>
                   <button  className="btn btn-raised btn-primary" onClick={this.clickSubmit } >Создать</button>
                    </div>

           
        </div>
        )
    }
}

