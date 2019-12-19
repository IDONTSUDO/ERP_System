 
import React, { Component } from 'react';
import RUSSIAN_MAP from '../helper/RUSSIAN_MAP.js';
import { GetAgentProfile } from "../Api/Http";
import Erorr from "../Error/Error.jsx" 
export default class EditContrAgent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      popupDisplay: false,
      id: 0,
      error:false,
      agentId:"",
      agentName:"",
      agentGeo:"",
    }
  }
  init(id) {
    GetAgentProfile(id).then( data =>{
      if(data.error){
        this.setState({error:true})
      }else{
        console.log(data)
        this.setState({
          agentName:data.full_name,
          agentGeo:data.agentGeo
        })
      }
    })
  }

  componentDidMount(){
    const agentID = this.props.match.params.agentId
    this.setState({agentId:agentID})
    this.init(agentID)
  }
  getCursor(e, id){
    let x = document.body.scrollLeft;
    let y = document.body.scrollTop;

    this.setState({
      x: (e.pageX - x) + 10,
      y: (e.pageY - y) + 10,
      popupDisplay: true,
      id: id,
    })
  }
  handleClick(region){
    this.setState({agentGeo:region})

    
  }
  render() {
    const popupStyle = {
      display: (this.state.popupDisplay)?("block"):("none"),
      top: this.state.y,
      left: this.state.x,
      position: "fixed"
    };
    let { error,agentGeo,agentName } = this.state
    return (
      <div className="russian-map-wrap">
        {error ? (<Erorr/>):(
          <>
           <div className="map-popup" style={popupStyle}>
           {RUSSIAN_MAP[this.state.id].value}
         </div>
          <h1>{agentName}</h1>
         <svg
           width="100%"
           height="689"
           className="russian-map"
           viewBox="-365 196 1188 689"
           x="0px"
           y="0px"
           version="1.1" >
 
           {RUSSIAN_MAP.map((item, id) =>
          <>
         

          {item.value == agentGeo  ? (
 <path
 key={id}
 id={`${item.code}`}
 className={"russian-map-region"}
 d={item.path}
 onClick={region => this.handleClick(item.value, region)}
 fill="#349eeb"
 stroke="#A6BECE"
 onMouseMove={(e)=>{this.getCursor(e, id)}}
 onMouseOut={(e)=>{this.setState({popupDisplay: false})}}/>
          ):(
            <path
            key={id}
            id={`${item.code}`}
            className={"russian-map-region"}
            d={item.path}
            onClick={region => this.handleClick(item.value, region)}
            fill="#126cc7"
            stroke="#A6BECE"
            onMouseMove={(e)=>{this.getCursor(e, id)}}
            onMouseOut={(e)=>{this.setState({popupDisplay: false})}}/>
          )}
          </>
           )}
         </svg>
         </>
        )}
      </div>
    );
  }
}

 
 