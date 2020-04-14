import React, { Component } from "react";
import { Input, Icon, notification } from "antd";
export default class StructurTabel extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {}

  validatorErr(err) {
    notification.open({
      message: `${err}`,
      icon: <Icon type="frown" style={{ color: "#108ee9" }} />,
    });
  }
  render() {
    return <div></div>;
  }
}
