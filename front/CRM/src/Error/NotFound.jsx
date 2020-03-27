import React, { Component } from "react";
import { Result } from "antd";
export default class NotFoundContent extends Component {
  render() {
    return (
      <div>
        <Result
          status="404"
          title="404"
          subTitle="Простите ничего не найдено"
        />
      </div>
    );
  }
}
