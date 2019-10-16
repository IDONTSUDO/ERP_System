import React, { Component } from 'react'
import {MyAgentList,GetAgentProfile} from '../Api/Http.js'
import { Button,Drawer, List,  Divider, Col, Row,Spin,Card} from 'antd'
import {Link} from 'react-router-dom'
import {isAuthenticated} from '../Api/Auth'

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
                    open:false
                })
            }
        })
    }
    // status
    render() {
        let {agentList,open,email,OGRN,general_director,INN,phone,full_name,name,company,worker, any,legal_address,actual_address,payment_account} = this.state 
        return (
            <div className="postisitonRelativeSmeni">
              <div className="container">
                <div className="row">
                          {agentList.map((agent, i) => (
                            <>
                             <div >
                            <Card styles={{width:"auto",height:"autocomplete"}}> 
                           
                            <h5 class="text-muted">Имя {agent.name}</h5>
                            {/* /agent/history/:agentId */}
                            <Button  styles={{padding:"5em"}}><Link to={`/agent/history/${agent._id}`} >История сделок</Link></Button>
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
                <DescriptionItem title="Full Name" content="Lily" />{' '}
              </Col>
              <Col span={12}>
                <DescriptionItem title="Account" content="AntDesign@example.com" />
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
              <Col span={12}>
                <DescriptionItem title="Birthday" content="{Date}" />
              </Col>
              <Col span={12}>
                <DescriptionItem title="Website" content="-" />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <DescriptionItem
                  title="Message"
                  content="Make things as simple as possible but no simpler."
                />
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
                <DescriptionItem title="Department" content={full_name} />
              </Col>
              <Col span={12}>
                <DescriptionItem title="Supervisor" content={<a>Lin</a>} />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <DescriptionItem
                  title="Skills"
                  content="C / C + +, data structures, software engineering, operating systems, computer networks, databases, compiler theory, computer architecture, Microcomputer Principle and Interface Technology, Computer English, Java, ASP, etc."
                />
              </Col>
            </Row>
            <Divider />
            <p style={pStyle}>Контакты</p>
            <Row>
              <Col span={12}>
                <DescriptionItem title="Email" content="AntDesign@example.com" />
              </Col>
              <Col span={12}>
                <DescriptionItem title="Phone Number" content="+86 181 0000 0000" />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <DescriptionItem
                  title="Github"
                  content={
                    <a href="http://github.com/ant-design/ant-design/">
                      github.com/ant-design/ant-design/
                    </a>
                  }
                />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
              <Button>Сменить статус</Button>
              <Button><Link>Посмотреть историю работ</Link></Button>
              </Col>
            </Row>
            </>
        )}
         
        </Drawer>
            </div>
        )
    }
}
