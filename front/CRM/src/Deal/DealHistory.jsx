import React, { Component } from 'react'
import { Modal, Button,Comment, Tooltip, List,Spin,Card,Icon, Drawer, Form, Input,Rate,BackTop } from 'antd'
import dateFormat from 'dateformat'
import { 
    MyHistoryComplete,
    MyHistoryBeginer,
    MyHistoryActive,
    OneHistoryGet,
    ChangeHistory,
    GetAgentProfile,
    AllAgentHistory,
    ChangeHistoryItem } from "../Api/Http"
import {isAuthenticated} from '../Api/Auth'
import {Link} from 'react-router-dom'
import Moment from 'react-moment'

export default class DealHistory extends Component {
    constructor(){
        super()
        this.state = {
            open:true,
            visible: false, 
            childrenDrawer: false,
            visibleLeft:false,
            modal2Visible: false,
            beginer: [],
            selected:[],
            user:"",
            active:[],
            HistoryAll:[],


            agentByid: "",
            price: "",
            status: "",
            id: "",
            Date:"",
            postedBy: "",

            body:"",
            name:"",
            workerId:"",

            DateCrated:"",
            AgentId:"",
            OnePrice:"",
            StatusOne:"",
            OneName:"",
            postedBy:"",
            comment:"",
            ItemOne:"",



            company:"",
            name:"",
            full_name:"",
            phone:"",
            INN:"",
            general_director:"",
            OGRN:"",
            email:"",
            worker: [],
            any:"",
            legal_address:"",
            actual_address:"",
            payment_account:"",

            ModalText: 'Content of the modal',
            visibleEdit: false,
            confirmLoading: false,

            rate: Number,
            comentDeal:"",


            manageList:[]
        }
    }
    showDrawer = () => {
        this.setState({
          visible: true,
        })
    }
    
    onClose = () => {
        this.setState({
          visible: false,
        })
    }
    
    showChildrenDrawer = () => {
        this.setState({
          childrenDrawer: true,
        })
    }
    setModal2Visible(modal2Visible) {
        this.setState({ modal2Visible });
    }
    onChildrenDrawerClose = () => {
        this.setState({
          childrenDrawer: false,
        })
        this.setState({
            company:"",
            name:"",
            full_name:"",
            phone:"",
            INN:"",
            general_director:"",
            OGRN:"",
            email:"",
            worker: [],
            any:"",
            legal_address:"",
            actual_address:"",
            payment_account:"",
            HistoryAll:[]
        })
    }

    
    onChange = e => {
        this.setState({
          placement: e.target.value,
        })
    }
    handleAction = name => event => {
        this.setState({ error: "" })
        this.setState({ [name]: event.target.value })
    }
    componentDidMount(){
        const userId = this.props.match.params.userId
        this.setState({user:userId})
        MyHistoryBeginer(userId).then(data =>{
            if(data.error){
               console.log(data.error) // this.setState({redirectToSignin: true})
            }else{
                this.setState({ beginer:  data})
            }
        })
        MyHistoryActive(userId).then(data =>{
            if(data.error){
               console.log(data.error) // this.setState({redirectToSignin: true})
            }else{
                this.setState({ selected:  data})
                this.setState({open:false})
            }
        })
    }
    
    helperDeal = (DealId) =>{
        console.log(DealId)
        OneHistoryGet(DealId).then(data =>{
            if(data.error){
                console.log(data.error) 
             }else{
                 this.setState({ 
                    DateCrated:data.Date,
                    AgentId:data.agentByid,
                    price:data.price,
                    StatusOne:data.status,
                    OneName:data.name,
                    postedBy:data.postedBy,
                    commentResult:data.commentResult,
                    commentAverage:data.commentAverage,
                    commentStart:data.commentStart,
                    ItemOne:data.item
                        
                 })
                 this.setState({open:false})
             }
        })
        this.showDrawer()
        
    }
    
    helperAgentHystory = (agentId) =>{
        AllAgentHistory(agentId).then(data =>{
            if(data.error){
                console.log(data.error)
            }else{
                console.log(data)
                this.setState({
                    HistoryAll: data
                })
                this.showChildrenDrawer()
        }
    })
    }
    
    helperAgent = (AgentId) =>{
        
        this.showChildrenDrawer()
        GetAgentProfile(AgentId).then(data =>{
            if(data.error){

            }else{
                this.setState({
                    company:data.company,
                    name:data.name,
                    full_name:data.full_name,
                    phone:data.phone,
                    INN:data.INN,
                    general_director:data.general_director,
                    OGRN:data.OGRN,
                    email:data.email,
                    any:data.any,
                    legal_address:data.legal_address,
                    actual_address:data.actual_address,
                    payment_account:data.payment_account,
                })
            }
        })
    }

    helperAgentHistory = (AgentId) =>{
    
        GetAgentProfile(AgentId).then(data =>{
            if(data.error){
                console.log(data.error) 
            }else{
                this.setState({
                    company:data.company,
                    name:data.name,
                    full_name:data.full_name,
                    phone:data.phone,
                    INN:data.INN,
                    general_director:data.general_director,
                    OGRN:data.OGRN,
                    email:data.email,
                    any:data.any,
                    legal_address:data.legal_address,
                    actual_address:data.actual_address,
                    payment_account:data.payment_account,
                })
            }
        })
    }
    forceUpdate(){
        let {user} =  this.state
        MyHistoryBeginer(user).then(data =>{
            if(data.error){
               console.log(data.error) 
            }else{
                this.setState({ beginer:  data})
            }
        })
        MyHistoryActive(user).then(data =>{
            if(data.error){
               console.log(data.error)
            }else{
                this.setState({ selected:  data})
            }
        })
    }

    handleCancel = () => {
    this.setState({
        comentDeal:"",
        price:"",
        ItemOne:"",
        rate: Number
    })   
    this.setState({
        visibleEdit: false,
    })
    }
    handleOk = () => {
        this.setState({
          confirmLoading: true,
        })
        let {dealAcctive,ItemOne,comment,price,rate } = this.state
        const payload ={
            ItemOne,
            comment,
            price,
            rate,
            comment
        }
        ChangeHistoryItem(dealAcctive,payload).then(data => {
            if(data.error){
                console.log(data.error)
            }else{
                console.log(data)
            }
        })
    
        setTimeout(() => {
          this.setState({
            visibleEdit: false,
            confirmLoading: false,
          })
        }, 2000)

    }
    showModal(oneDeal){
        
        OneHistoryGet(oneDeal).then(data =>{

            console.log(data)
            if(data.error){
                console.log(data.error)
            }  
            else{
                this.setState({
                    price:data.price,
                    StatusOne:data.status,
                    OneName:data.name,
                    ItemOne:data.item,
                    rate:data.rate,
                    DateCrated: data.Date,
                    comment:data.comment
                })
            }
        })

























        this.setState({ 
            dealAcctive:oneDeal,
            visibleEdit: true
        })
    }
    handleChangeRate = rate => {
        this.setState({ rate });
    }
    handleChange = name => event => {
        this.setState({ [name]: event.target.value })
    }
    handleChangePrice = price => event => {
        this.setState({ price })
    }
    // set Status
    handelSetStatus = AgentId =>{
        const payload = this.state 
        ChangeHistory()

    }
    // ChangeHistoryHelper(oneDeal){
    //     let stastus = "Активно" 
    //     console.log(oneDeal)
    //     // ChangeHistory(DealId).then(data =>{

    //     // })
    // }
    changeHistoryEdit(DealId){
        // const {} this.state
        console.log(DealId)
    }
    ChangeHistoryStatusActive(DealId) {
        console.log(DealId)
        let status =  "Активно"
        ChangeHistory(DealId,status).then(data =>{
            if(data.error){
                console.log(data.error)
            }
            this.forceUpdate()
        }) 
    }
    ChangeHistoryStatusComplete(DealId){
        console.log(DealId)
        let status =  "Завершено"
        ChangeHistory(DealId,status).then(data =>{
            if(data.error){
                console.log(data.error)
            }
            this.forceUpdate()
        }) 
    }
    render() {
        const toUpperCaseFilter = (d) => {
           
            return dateFormat(d, "fullDate")
        }
             
     
        const { 
            agentByid,
            price,
            status,
            id,
            Date,
            postedBy,
            beginer,
            body,
            open,
                 
            DateCrated,
            AgentId,
            OnePrice,
            StatusOne,
            OneName,
            comment,
            ItemOne,
        
            company,
            name,
            full_name,
            phone,
            INN,
            general_director,
            OGRN,
            email,
            any,
            legal_address,
            actual_address,
            payment_account,
        
            HistoryAll,

            visibleEdit,
            confirmLoading,
            ModalText,
            comentDeal,
            rate,

            selected
        
                        } = this.state
                       
        const desc = ['Памагите1!1', 'Плохо', 'Нормально', 'Хорошо', 'Самый лучший клиент!'];

        return (
            <div>
                
                <div className="postisitonRelativeSmeni">
                        <div className="container">
                                <div className="row">
                                {open ?(
                                    <Spin size="large" />
                                ):(
                                <>
                               
                                      
                {beginer.length > 0 ? (
                <>
                
                <div class="col-sm">
                                    <h1>Начатые</h1>
                                    {beginer.map((oneDeal, i) => (
                                    <>
                                        <Card

                                            style={{width:"20em"}}
                                            actions={[
                                            <Icon 
                                            type="setting"
                                            key="setting"
                                            theme="twoTone"
                                            twoToneColor="#eb2f96"
                                            onClick={(DealId) => this.helperDeal(oneDeal._id, DealId)}/>,
                                            <Icon type="edit" key="edit" 
                                            onClick={(DealId) => this.showModal(oneDeal._id, DealId)}
                                          
                                            theme="twoTone" twoToneColor="#37CBC1"  />,
                                            <Icon type="right-circle" theme="twoTone" onClick={(DealId) => this.ChangeHistoryStatusActive(oneDeal._id, DealId)}/>
                                            ]}
                                          
                                            onClick={this.clickSubmit}>
                                                <div>Предмет сделки:  {oneDeal.item}</div>
                                                <div>Названиие:  {oneDeal.name}</div>
                                                <hr/>
                                                <Moment filter={toUpperCaseFilter}>{oneDeal.Date}</Moment>

                                        </Card>
                                    </> 
                                    ))}
                                       
                                </div>
                </>
            ):("")}
            {selected.length+beginer.length === 0 ? (  
                <>
                <h1>У вас нет сделок</h1>
                </>
            ):("")}
            {selected.length > 0 ? (
                <>
                  <div class="col-sm">
                                <h1>Активные</h1>
                                {selected.map((oneDeal, i) => (
                                    <>
                                          <Card

style={{width:"20em"}}
actions={[
<Icon 
                                            type="setting"
                                            key="setting"
                                            theme="twoTone"
                                            twoToneColor="#eb2f96"
                                            onClick={(DealId) => this.helperDeal(oneDeal._id, DealId)}/>,
                                            <Icon type="edit" key="edit" 
                                            onClick={(DealId) => this.showModal(oneDeal._id, DealId)}
                                            theme="twoTone" twoToneColor="#37CBC1"  />,
                                            <Icon type="right-circle" theme="twoTone"onClick={(DealId) => this.ChangeHistoryStatusComplete(oneDeal._id, DealId)} />
                                                ]}
onClick={this.clickSubmit}>
    <div>Предмет сделки:  {oneDeal.item}</div>
    <div>Названиие:  {oneDeal.name}</div>
    <hr/>
    <Moment filter={toUpperCaseFilter}>{oneDeal.Date}</Moment>

</Card>
                                    </> 
                                    ))}
                                </div>
                </>
            ):("")}
                                
                              

                                    </>
                                )}  
                            {/* DRAWER */}
                            <Drawer
          title="Информация  о сделке"
          width={520}
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
        >
            <div className="col-md-4">
        <div className="">
        <div className="">
          <Moment className="" format="D MMM YYYY" >{DateCrated}</Moment>
            <div className=""> Счет:<b>{OnePrice}</b></div>
            <div className="">Статус сделки: <b>{StatusOne}</b> </div>
            <div className="">Названиие сделки: <b>{OneName}</b> </div>  
            <div className="">{comment}</div>
            <div className="">Предмет сделки: <b>{ItemOne}</b> </div>
            
            </div>
        </div>
        <div style={{padding:"10px"}}><Button type="primary" onClick={(agent) => this.helperAgent(AgentId, agent)}>
          Посмотреть профиль контр-агента
          </Button></div>
        <div style={{padding:"10px"}}><Button type="primary" onClick={(agent) => this.helperAgentHystory(AgentId, agent)}>
           Все сделки
          </Button></div>
        {/* <div style={{padding:"10px"}}><Button type="primary" onClick={() => this.setModal2Visible(true)}>
         
        </Button></div> */}
        </div>
          <Drawer
            width={320}
            closable={false}
            onClose={this.onChildrenDrawerClose}
            visible={this.state.childrenDrawer}
          >
                 {company != "" ? (
                <>
                 <div className="layer-list-agent">
                <div>Компания:<b>{company}</b></div>
                <div>Короткое имя компании:<b>{name}</b></div>
                <div>Полное имя:<b>{full_name}</b></div>
                <div>Телефон:<b>{phone}</b></div>
                <div>ИНН:<b>{INN}</b></div>
                <div>Генеральный директор:<b>{general_director}</b></div>
                <div>ОГРН:<b>{OGRN}</b></div>
                <div>Email:<b>{email}</b></div>
                <div>Полезная информация:<b>{any}</b></div>
                <div>Адрес:<b>{legal_address}</b></div>
                <div>Фактический адрес:<b>{actual_address}</b></div>
                <div>Расчетный счет:<b>{payment_account}</b></div>
              </div>
                </>
            ):("")}
             
           
            {HistoryAll.map((oneHistory, i) => (
                                    <>
                                        <Card

                                            style={{width:"20em"}}
                                        >
                                                <div>Предмет сделки:  {oneHistory.item}</div>
                                                <div>Названиие: {oneHistory.name}</div>
                                                <hr/>
                                                <Moment filter={toUpperCaseFilter}>{oneHistory.Date}</Moment>
                                                <Rate disabled defaultValue={oneHistory.rate} />
                                        </Card>
                                    </> 
                                    ))}
          </Drawer>
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              borderTop: '1px solid #e8e8e8',
              padding: '10px 16px',
              textAlign: 'right',
              left: 0,
              background: '#fff',
              borderRadius: '0 0 4px 4px',
            }}
          >
           
          </div>
        </Drawer>
        
                    
                        </div>
                        </div> 
                </div>
                <Modal
          title="Редактирование сделки"
          visible={visibleEdit}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
          okText="отправить"
          cancelText="отменить"
        >
           <form>
            <div className="form-group">
                <label  className="text-muted">Выставить счет</label>
                <input  onChange={this.handleChange("price")} type="text" className="form-control" value={price} />
            </div>
            <div className="form-group">
                <label  className="text-muted">Предметы сделки</label>
                <input  onChange={this.handleChange("ItemOne")} type="text" className="form-control" value={ItemOne} />
            </div>
            <div className="form-group">
                <label  className="text-muted">Коментарии</label>
                <textarea class="form-control rounded-0" id="exampleFormControlTextarea2" rows="3" onChange={this.handleChange("comment")}  value={comment}></textarea>
            </div>
            <span>
           <div className="form-group">Поставте оценку</div>
           <Rate tooltips={desc} onChange={this.handleChangeRate} value={rate} />
           {rate ? <span className="ant-rate-text">{desc[rate - 1]}</span> : ''}
           </span>
        </form>
        </Modal>
        <Modal
          title="Vertically centered modal dialog"
          centered
          visible={this.state.modal2Visible}
          onOk={() => this.setModal2Visible(false)}
          onCancel={() => this.setModal2Visible(false)}
        >
          <p>some contents...</p>
          <p>some contents...</p>
          <p>some contents...</p>
        </Modal>
            </div>
        )
    }
}
