import React, { Component } from 'react'
import { Modal, Button,Comment, Tooltip, List,Spin,Card,Icon, Drawer, Form, Input,Rate } from 'antd'
import dateFormat from 'dateformat'
import { 
    MyHistoryComplete,
    MyHistoryBeginer,
    MyHistoryActive,
    OneHistoryGet,
    ChangeHistory,
    GetAgentProfile,
    AllAgentHistory } from "../Api/Http"
import {isAuthenticated} from '../Api/Auth'
import {Link} from 'react-router-dom'
import Moment from 'react-moment';
import DealForm from './DealForm'
export default class DealHistory extends Component {
    constructor(){
        super()
        this.state = {
            open:true,
            visible: false, 
            childrenDrawer: false,
            visibleLeft:false,
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
            commentResult:"",
            commentAverage:"",
            commentStart:"",
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
            comentDeal:""
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
                    OnePrice:data.price,
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
        console.log(AgentId)
        this.showChildrenDrawer()
        console.log(AgentId)
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
    // AllAgentHistory
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
               console.log(data.error) // this.setState({redirectToSignin: true})
            }else{
                this.setState({ beginer:  data})
            }
        })
        MyHistoryActive(user).then(data =>{
            if(data.error){
               console.log(data.error) // this.setState({redirectToSignin: true})
            }else{
                this.setState({ selected:  data})
            }
        })
    }

    handleCancel = () => {
        console.log('Clicked cancel button');
     this.setState({
        visibleEdit: false,
        })
    }
    handleOk = () => {
        this.setState({
          ModalText: 'The modal will be closed after two seconds',
          confirmLoading: true,
        });
        setTimeout(() => {
          this.setState({
            visibleEdit: false,
            confirmLoading: false,
          })
        }, 2000)
    }
    showModal = () => {
        this.setState({
            visibleEdit: true,
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
            commentResult,
            commentAverage,
            commentStart,
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
            rate
        
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
                               
                                      
                               
                                <div class="col-sm">
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
                                            <Icon type="right-circle" theme="twoTone" />
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

                                
                                <div class="col-sm">
                                {beginer.map((oneDeal, i) => (
                                    <>
                                          <Card

style={{width:"20em"}}
actions={[
<Icon type="setting" key="setting" theme="twoTone" twoToneColor="#eb2f96"   onClick={this.showDrawer}/>,
<Icon type="edit" key="edit" theme="twoTone" twoToneColor="#37CBC1"  />,
<Icon type="right-circle" theme="twoTone" />
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
          <Button type="primary" onClick={(agent) => this.helperAgent(AgentId, agent)}>
          Посмотреть профиль контр-агента
          </Button>
          <Button type="primary" onClick={(agent) => this.helperAgentHystory(AgentId, agent)}>
           Все сделки
          </Button>
          <Moment format="D MMM YYYY" >{DateCrated}</Moment>
            <div>Счет:<b>{OnePrice}</b></div>
            <div>Статус сделки: <b>{StatusOne}</b> </div>
            <div>Названиие сделки: <b>{OneName}</b> </div>  
            <div>{commentResult}</div>
            <div>{commentAverage}</div>  
            <div>{commentStart}</div>
            <div>Предмет сделки: <b>{ItemOne}</b> </div>
            </div>
           
          <Drawer
          
            width={320}
            closable={false}
            onClose={this.onChildrenDrawerClose}
            visible={this.state.childrenDrawer}
          >
                 {company[0] !== undefined ? (
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
                                                <div>Предмет сделки:  {oneHistory.name}</div>
                                                <div>Названиие:  {oneHistory._id}</div>
                                                <hr/>
                                                <Moment filter={toUpperCaseFilter}>{oneHistory.Date}</Moment>

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
            <Button
              style={{
                marginRight: 8,
              }}
              onClick={this.onClose}
            >
              Cancel
            </Button>
            <Button onClick={this.onClose} type="primary">
              Submit
            </Button>
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
        >
       <DealForm/>
       
        </Modal>
            </div>
        )
    }
}
