import React, { Component } from 'react'
import { Modal, Button,Comment, Tooltip, List,Spin,Card  } from 'antd'
import { 
    MyHistoryComplete,
    MyHistoryBeginer,
    MyHistoryActive,
    OneHistoryGet,
    ChangeHistory } from "../Api/Http"
import {isAuthenticated} from '../Api/Auth'
import {Link} from 'react-router-dom'

export default class DealHistory extends Component {
    constructor(){
        super()
        this.state = {
            open:true,
            modal2Visible: false,
            items: [],
            selected:[],
            user:"",
            active:[],

            agentByid: "",
            price: "",
            status: "",
            id: "",
            Date:"",
            postedBy: "",

            body:"",
            name:"",
            workerId:""
        }
    }

    setModal2Visible(modal2Visible) {
        this.setState({ modal2Visible });
    }
    clickSubmit(){

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
                this.setState({ items:  data})
            }
        })
        MyHistoryActive(userId).then(data =>{
            if(data.error){
               console.log(data.error) // this.setState({redirectToSignin: true})
            }else{
                this.setState({ selected:  data})
            }
        })
        setTimeout(   function() {
            this.setState({open:false})
        }
        .bind(this),
        1)
    }
    handleClick(itemId) {
        console.log(itemId)
        this.setModal2Visible(true)
        // this.setState({open:true})

        let  HistoryById = itemId
        OneHistoryGet(HistoryById).then(data =>{
            if(data.error){
               console.log(data.error) // this.setState({redirectToSignin: true})
            }else{
                this.setState({ 
                
                    agentByid: data.agentByid,
                    price: data.price,
                    status: data.status,
                    id: data._id,
                    Date:data.Date,
                    postedBy: data.postedBy
                
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
                this.setState({ items:  data})
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
    render() {

        const { agentByid,price,status,id,Date,postedBy, items,body,open } = this.state

        return (
            <div>
                
                 <div className="postisitonRelativeSmeni">
                 {open ?(
            <Spin size="large" />
        ):(
    <>
    <Card title="Активные сделки">
    {/* <p
      style={{
        fontSize: 14,
        color: 'rgba(0, 0, 0, 0.85)',
        marginBottom: 16,
        fontWeight: 500,
      }}
    >
      Group title
    </p> */}
    {items.map((agn, i) => (
            <>
            <Card className="col-md-6" size="small"  title="Контр Агент">
      <p>Еще какая то инфа</p>
      Имя: <p>{agn.name}</p>
      <Button ><Link to={`/agent/${agn._id}`} >Посмотреть профиль</Link></Button>
    </Card>
           
            <hr/>
            </>
            ))}

    }
    {/* <Card type="inner" title="Inner Card title" extra={<a href="#">More</a>}>
      Inner Card content
    </Card>
    <Card
      style={{ marginTop: 16 }}
      type="inner"
      title="Inner Card title"
      extra={<a href="#">More</a>}
    >
      Inner Card content
    </Card> */}
  </Card>
    </>
        )}
                
            <Modal
          title="Инофрмация о сделке"
          centered
          visible={this.state.modal2Visible}
          onOk={() => this.setModal2Visible(false)}
          onCancel={() => this.setModal2Visible(false)}
        >
          <p>{agentByid}</p>
          <p>{price}</p>
          <p>{status}</p>
        <form>
        <label for="exampleFormControlTextarea1">Новый Коментарий</label>
                <textarea value={body} onChange={this.handleAction("body")} class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                <button onClick={this.clickSubmit } className="btn btn-primary">Отправить</button>
        </form>
        </Modal>
                 </div>
            </div>
        )
    }
}
