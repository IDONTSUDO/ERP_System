import React, { Component } from 'react'
import {MyAgentList,GetAgentProfile,ChangeAgent} from '../Api/Http.js'
import { Button,Drawer,  Divider, Col, Row,Spin,Card,Icon,notification } from 'antd'
import {Link} from 'react-router-dom'


const pStyle = {
    fontSize: 16,
    color: 'rgba(0,0,0,0.85)',
    lineHeight: '24px',
    display: 'block',
    marginBottom: 16,
}
const DescriptionItem = ({ title, content }) => (
    <div
      style={{
        fontSize: 14,
        lineHeight: '22px',
        marginBottom: 7,
        color: 'rgba(0,0,0,0.65)',
      }}
    >
      <p
        style={{
          marginRight: 8,
          display: 'inline-block',
          color: 'rgba(0,0,0,0.85)',
        }}
      >
        {title}:
      </p>
      {content}
    </div>
  );
  
export default class MyAgent extends Component {
    constructor(){
        super()
        this.state = {
            user:"",
            agentList:[],
            visible: false,
            activeProfile:"",
            open:false,
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
            status:""
        }
    }
    componentDidMount(){
        const userId = this.props.match.params.userId
        this.setState({user:userId})
        let workerId = userId
        
        MyAgentList(workerId).then(data =>{
            if(data.error){
                console.log(data.error)
            }else{
                this.setState({agentList:data})
            }
        })
    }
    showDrawer = () => {
        this.setState({
          visible: true,
          open: true
        })
    }
    
    onClose = () => {
        this.setState({
          visible: false,
        })
    }
    
    handleClick(agentId) {
        
        this.showDrawer()
        this.setState({open:true})
        GetAgentProfile(agentId).then(data => {
            if(data.error){
                this.setState({redirectToProfile: true})
            }else{
                this.setState({ 
                    id: data._id,
                    name: data.name,
                    email: data.email,
                    company:data.company,
                    full_name: data.full_name,
                    phone: data.phone,
                    INN: data.INN,
                    general_director: data.general_director,
                    OGRN: data.OGRN,
                    tags:data.tags,
                    any:data.any,
                    legal_address:data.legal_address,
                    actual_address:data.actual_address,
                    payment_account:data.payment_account,
                    status:data.status,
                    open:false
                })
            }
        })
    }
    forceUpdate(){
      const userId = this.props.match.params.userId
      this.setState({user:userId})
      let workerId = userId
      
      MyAgentList(workerId).then(data =>{
          if(data.error){
              console.log(data.error)
          }else{
              this.setState({agentList:data})
          }
      })
    }
    ChangeAgentStatus1(AgentId){
     let status = "Друг"
     ChangeAgent(AgentId,status).then(data => {
       if(data.error){
        this.openNotificationError()
       }
       else{
        this.openNotificationSetAgentStatus()
        this.forceUpdate()
       }
     })
    }
    ChangeAgentStatus2(AgentId){
      let status = "Капризный"
      ChangeAgent(AgentId,status).then(data => {
        if(data.error){
         this.openNotificationError()
        }
        else{
         this.openNotificationSetAgentStatus()
         this.forceUpdate()
        }
      })
    }
    ChangeAgentStatus3(AgentId){
      let status = "Упертый"
      ChangeAgent(AgentId,status).then(data => {
        if(data.error){
         this.openNotificationError()
        }
        else{
         this.openNotificationSetAgentStatus()
         this.forceUpdate()
        }
      })
    }
    openNotificationError(){
      notification.open({
        message: 'Ой что то пошло не так, мне жаль',
        icon: <Icon type="frown" style={{ color: '#108ee9' }} />,
      })
    }
    openNotificationSetAgentStatus(){
      notification.open({
        message: 'Статус изменен',
        icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
      })
    }
    render() {
        let {id,agentList,open,email,OGRN,general_director,INN,phone,full_name,name, any,legal_address,actual_address,payment_account} = this.state 
        return (
            <div className="postisitonRelativeSmeni">
              <div className="container">
                <div className="row">
                          {agentList.map((agent, i) => (
                            <>
                            <div >
                            <Card styles={{width:"auto",height:"autocomplete"}}> 
                            
                            <h5 class="text-muted">Имя {agent.name}</h5>
                            {agent.status === "Друг" ? (
                    <>
                    <div><div style={{padding:"5px"}}><div className="square-green"></div></div></div>
                    </>
                    ):("")}
                    {agent.status === "Капризный" ? (
                    <>
                    <div><div style={{padding:"5px"}}><div className="square-red"></div></div></div>
                    </>
                    ):("")}
                    {agent.status === "Упертый" ? (
                    <>
                    <div><div style={{padding:"5px"}}><div className="square-yellow"></div></div></div>
                    </>
                    ):("")}
                    
                            <Button  onClick={(agentId) => this.handleClick(agent._id, agentId)}>Посмотреть профиль</Button>
                            <br/>
                            
                            </Card>
                            </div>
                           


                            </>
                         ))}
                    </div>
                    </div>
        <Drawer
     
          width={640}
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
        >

        {open ?(
            <Spin size="large" />
        ):(
            <>
            <p style={{ ...pStyle, marginBottom: 24 }}>Профиль Агента</p>
            <p style={pStyle}>Персональные данные</p>
            <Row>
              <Col span={12}>
                {/* <DescriptionItem title="Full Name" content="Lily" />{' '} */}
              </Col>
              <Col span={12}>
                {/* <DescriptionItem title="Account" content="AntDesign@example.com" /> */}
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <DescriptionItem title="Телефон" content={phone} />
              </Col>
              <Col span={12}>
                <DescriptionItem title="Email" content={email} />
              </Col>
            </Row>
            <Row>
             
            </Row>
            <Row>
              <Col span={24}>
                {/* <DescriptionItem
                  title="Message"
                  content="Make things as simple as possible but no simpler."
                /> */}
              </Col>
            </Row>
            <Divider />
            <p style={pStyle}>Данные о компании</p>
            <Row>
              <Col span={12}>
                <DescriptionItem title="ИНН" content={INN} />
              </Col>
              <Col span={12}>
                <DescriptionItem title="ОГРН" content={OGRN} />
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <DescriptionItem title="Расчетный счет" content={<a>{payment_account}</a>} />
              </Col>
              <Col span={12}>
                <DescriptionItem title="Актуальный адрес" content={<a>{actual_address}</a>} />
              </Col>
              <Col span={12}>
                <DescriptionItem title="Юридический адрес" content={<a>{legal_address}</a>} />
              </Col>
              <Col span={12}>
                <DescriptionItem title="Полное имя компании" content={full_name} />
              </Col>
              <Col span={12}>
                <DescriptionItem title="Юридический адрес" content={<a>{name}</a>} />
              </Col>
              <Col span={12}>
                <DescriptionItem title="Генеральный директор" content={<a>{general_director}</a>} />
              </Col>
            </Row>
            
            <Divider />
            <p style={pStyle}>Контактные данные</p>
            <Row>
              <Col span={12}>
                <DescriptionItem title="Email" content={email} />
              </Col>
              <Col span={12}>
                <DescriptionItem title="Номер телефона" content={phone} />
              </Col>
              <Col span={12}>
                <DescriptionItem title="Полезная информация" content={any} />
              </Col>
            </Row>
            <Row>
              {/* <Col span={24}>
                <DescriptionItem
                  title="Статус"
                  content={
                  
                    }
                />
                <div>

                </div>
              </Col> */}
            </Row>
            <Row>
              <Col span={24}>
                  
              <button onClick={(AgentId) => this.ChangeAgentStatus2(id, AgentId)}  className="square-red-sort"></button>
              <button  onClick={(AgentId) => this.ChangeAgentStatus1(id, AgentId)} className="square-green-sort"></button>
              <button onClick={(AgentId) => this.ChangeAgentStatus3(id, AgentId)} className="square-yellow-sort"></button>
              <div style={{padding:"5px"}}><Button><Link to={`/agent/history/${id}`} >История сделок</Link></Button></div>
              </Col>
            </Row>
            </>
        )}
         
        </Drawer>
            </div>
        )
    }
}
