import React, { Component } from 'react'
import { notification, Icon } from "antd";

export default class Erorr extends Component {
    openNotificationError() {
        notification.open({
          message: "Ой что то пошло не так, мне жаль",
          icon: <Icon type="frown" style={{ color: "#108ee9" }} />
        });
      }
    render() {
        return (
            <div>
                {this.openNotificationError()}
            </div>
        )
    }
}
