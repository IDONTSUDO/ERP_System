import React, { Component } from "react";
import { Tag } from "antd";
class None extends Component {
  render(props) {
    let {tag} = this.props; 
    return (
     <div>
       {tag === "none" ?(<>      <Tag className="tag_text" color="magenta">{tag}</Tag></>):(<><Tag className="tag_text" color="blue">{tag}</Tag></>)}
     </div>
    );
  }
}

export default None;