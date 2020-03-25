import React, { Component } from "react";
import { list } from "../Api/Http";
export default class CompanySetting extends Component {
  constructor() {
    super();
    this.state = {
      workers: [],
      roleSt: {}
    };
  }
  componentDidMount() {
    list().then(data => {
      var result = {};
      data.forEach(function(a) {
        if (result[a.role] != undefined) ++result[a.role];
        else result[a.role] = 1;
      });
      this.setState({ workers: data, roleSt: result });
    });
  }

  render() {
    return <></>;
  }
}
