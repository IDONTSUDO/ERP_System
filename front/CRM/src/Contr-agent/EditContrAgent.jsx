 
import React, { Component } from 'react';
import RUSSIAN_MAP from '../helper/RUSSIAN_MAP.js';

export default class EditContrAgent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      popupDisplay: false,
      id: 0
    }
  }

  getCursor(e, id){
    let x = document.body.scrollLeft;
    let y = document.body.scrollTop;

    this.setState({
      x: (e.pageX - x) + 10,
      y: (e.pageY - y) + 10,
      popupDisplay: true,
      id: id
    })
  }

  render() {
    const popupStyle = {
      display: (this.state.popupDisplay)?("block"):("none"),
      top: this.state.y,
      left: this.state.x,
      position: "fixed"
    };

    return (
      <div className="russian-map-wrap">
        <div className="map-popup" style={popupStyle}>
          {RUSSIAN_MAP[this.state.id].value}
        </div>

        <svg
          width="100%"
          height="689"
          className="russian-map"
          viewBox="-365 196 1188 689"
          x="0px"
          y="0px"
          version="1.1" >

          {RUSSIAN_MAP.map((item, id) =>
            <path
              key={id}
              id={`${item.code}`}
              className={"russian-map-region"}
              d={item.path}
              fill="#D9D9D9"
              stroke="#A6BECE"
              onMouseMove={(e)=>{this.getCursor(e, id)}}
              onMouseOut={(e)=>{this.setState({popupDisplay: false})}}/>
          )}
        </svg>
      </div>
    );
  }
}
