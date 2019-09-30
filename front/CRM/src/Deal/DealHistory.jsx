import React, { Component } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { Modal, Button,Comment, Tooltip, List,Spin  } from 'antd'
import { 
    MyHistoryComplete,
    MyHistoryBeginer,
    MyHistoryActive,
    OneHistoryGet,
    ChangeHistory } from "../Api/Http"
import {isAuthenticated} from '../Api/Auth'
// fake data generator
const getItems = (count, offset = 0) =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k + offset}`,
        content: `item ${k + offset}`
    }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

/**_id
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);
    let {_id,status} = destination[0]

    let historyId = _id
    if(status == "Начато"){

       let SeTstatus = status
       status = "Активно"
       let changeHisitoryPayload = {
           status
       }
       ChangeHistory(historyId,changeHisitoryPayload).then(data =>{
        if(data.error){
           console.log(data.error) // this.setState({redirectToSignin: true})
        }else{
            console.log(200)
            this.forceUpdate()
        }})
    }
    if(status == "Активно"){
        console.log(status)
    }
  
  
    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? 'red' : 'grey',
    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? '#BFA130' : '#FFD640',
    padding: grid,
    width: "auto",
    height:"auto"
});


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
    id2List = {
        droppable: 'items',
        droppable2: 'selected'
    }
    getList = _id => this.state[this.id2List[_id]];

    onDragEnd = result => {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const items = reorder(
                this.getList(source.droppableId),
                source.index,
                destination.index
            );

            let state = { items };

            if (source.droppableId === 'droppable2') {
                state = { selected: items };
            }

            this.setState(state);
        } else {
            const result = move(
                this.getList(source.droppableId),
                this.getList(destination.droppableId),
                source,
                destination
            );

            this.setState({
                items: result.droppable,
                selected: result.droppable2
            });
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
            <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}>
                        {this.state.items.map((item, index) => (
                            <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={getItemStyle(
                                            snapshot.isDragging,
                                            provided.draggableProps.style
                                        )}>
                                        <h5 style={{padding:"5px"}}>Начатая</h5>
                                        {item.id}

    <Button  onClick={(itemId) => this.handleClick(item._id, itemId)}> Инофрмация о сделке</Button>
                                    </div>
                                    
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>

            <Droppable droppableId="droppable2">
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}>
                        {this.state.selected.map((item, index) => (
                           
                            <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}>
                                {(provided, snapshot) => (
                                    
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={getItemStyle(
                                            snapshot.isDragging,
                                            provided.draggableProps.style
                                        )}>
                                             <h1>Активная</h1>
                                        {item.id}
                                        <Button  onClick={(itemId) => this.handleClick(item._id, itemId)}> Инофрмация о сделке</Button>
                                    </div>
                                    
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
            
        </DragDropContext>
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
