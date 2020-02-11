import React, { Component } from "react";
import Rusmap from "../helper/RUSSIAN_MAP.js";

import {
  GetAgentProfile,
  ChangeAgentProfile,
  NewSpecialication,
  AllSpecList,
  deleteSpecialisations
} from "../Api/Http";
import {
  Select,
  Row,
  Col,
  Input,
  Button,
  Icon,
  notification,
  Modal,
  Spin
} from "antd";

import PhoneInput from "react-phone-number-input";
import Erorr from "../Error/Error.jsx";

const { Option } = Select;

export default class EditContrAgent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      popupDisplay: false,
      id: "",
      error: false,
      agentId: "",
      agentName: "",
      agentGeo: "",
      user: "",
      agentList: [],
      visible: false,
      activeProfile: "",
      open: false,
      name: "",
      full_name: "",
      phone: "",
      INN: "",
      general_director: "",
      agentGeo: [],
      OGRN: "",
      email: "",
      worker: [],
      any: "",
      legal_address: "",
      actual_address: "",
      payment_account: "",
      status: "",
      openSpec:false,
      specialications: [],
      specialicationsToBase: [],
      newSpecialication: undefined,
      specialicationsToBaseEditors:[]
    };
  }
  init(id) {
    AllSpecList().then(data => {
      if (data.err) {
        console.log(data.err);
      } else {
        let specArray = [];
        for (let i of data) {
          specArray.push(i.data);
        }

        this.setState({ specialicationsToBaseEditors: data });
        this.setState({ specialicationsToBase: specArray });
      }
    });

    GetAgentProfile(id).then(data => {
      if (data.error) {
        this.setState({ error: true });
      } else {
        if (data.agentGeo !== "none") {
          this.setState({
            agentGeo: data.agentGeo
          });
        }
        if (data.specialications[0] !== "none") {
          this.setState({ specialications: data.specialications });
        }
        this.setState({
          id: data._id,
          agentName: data.full_name,

          open: false,
          name: data.name,
          full_name: data.full_name,
          phone: data.phone,
          INN: data.INN,
          general_director: data.full_name,
          OGRN: data.OGRN,
          email: data.email,
          any: data.any,
          legal_address: data.legal_address,
          actual_address: data.actual_address,
          payment_account: data.payment_account
        });
      }
    });
  }

  componentDidMount() {
    const agentID = this.props.match.params.agentId;
    this.setState({ agentId: agentID });
    this.init(agentID);
  }
  forceUpdate() {

  }
  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    let { newSpecialication } = this.state;
    console.log(typeof openNotificationValidationError)
    if (newSpecialication === undefined) {
      this.openNotificationValidationError();
    } else {
      NewSpecialication(newSpecialication).then(data => {
        if (data.error) {
          this.setState({ error: true });
        } else {
          AllSpecList().then(payload => {
            if (payload.err) {
              this.setState({ error: true });
            } else {
              let specArray = [];
              for (let i of payload) {
                specArray.push(i.data);
              }
              this.setState({specialicationsToBaseEditors:payload,specialicationsToBase:specArray,visible:false,newSpecialication:undefined})
            }
          });
        }
      });
    }
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  handleSelectOblastChange = item => {
    this.setState({ agentGeo: item });
  };

  handelChangeSpec = item => {
    this.setState({ specialications: item });
  };
  handleClick(region) {
    this.setState({ agentGeo: region });
  }

  handelAnyChange = name => event => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };
  deleteSpec = (id)=> {
    this.setState({openSpec:true})
    deleteSpecialisations(id).then(data =>{
      AllSpecList().then(payload => {
        if (payload.err) {
          this.setState({ error: true });
        } else {
      
          let specArray = [];
          for (let i of payload) {
            specArray.push(i.data);
          }
          this.setState({specialicationsToBaseEditors:payload,specialicationsToBase:specArray,openSpec:false})
        }
      });
    })
  }
  handelClickChange = e => {
    e.preventDefault();
    let {
      id,
      agentGeo,
      email,
      phone,
      INN,
      OGRN,
      payment_account,
      actual_address,
      legal_address,
      full_name,
      name,
      general_director,
      specialications
    } = this.state;

    let payload = {
      agentGeo,
      email,
      phone,
      INN,
      OGRN,
      payment_account,
      actual_address,
      legal_address,
      full_name,
      name,
      general_director,
      specialications
    };
    ChangeAgentProfile(id, payload).then(data => {
      if (data.err) {
        this.setState({ error: true });
      } else {
        this.openNotificationAgentChange();
      }
    });
  };
  openNotificationAgentChange() {
    notification.open({
      message: "Агент изменен",
      icon: <Icon type="smile" style={{ color: "#108ee9" }} />
    });
  }
  openNotificationValidationError() {
    notification.open({
      message: "Ошибка валидации",
      icon: <Icon type="frown" style={{ color: "#108ee9" }} />
    });
  }
  render() {
    let { error } = this.state;
    return (
      <div className="postisitonRelativeSmeni">
        {error ? (
          <Erorr />
        ) : (
          <div>
            <h1 className="col">Редактирование контр агента </h1>
            <div className="container">
              <div className="row">
                <div class="row">
                  <div class="col-md-4">
                    <p><Icon className="ant-icon-pos" type="mail" />   Email</p>

                    <Input
                      onChange={this.handelAnyChange("email")}
                      value={this.state.email}
                      className="col-xs-12"
                      autoComplete="nope"
                      placeholder="Email ...."
                    />
                    <p><Icon className="ant-icon-pos" type="phone" />  Телефон</p>

                    <Input
                      onChange={this.handelAnyChange("phone")}
                      value={this.state.phone}
                      className="col-xs-12"
                      autoComplete="nope"
                      placeholder="Телефон ...."
                    />

                    <p><Icon className="ant-icon-pos" type="bank" />  ИНН</p>

                    <Input
                      onChange={this.handelAnyChange("INN")}
                      value={this.state.INN}
                      className="col-xs-12"
                      autoComplete="nope"
                      placeholder="ИНН ...."
                    />
                    <p><Icon className="ant-icon-pos" type="bank" />  ОГРН</p>

                    <Input
                      onChange={this.handelAnyChange("OGRN")}
                      value={this.state.OGRN}
                      className="col-xs-12"
                      autoComplete="nope"
                      placeholder="ОГРН ...."
                    />

                    <p><Icon className="ant-icon-pos" type="bank" /> Расчетный счет</p>
                    <Input
                      onChange={this.handelAnyChange("payment_account")}
                      value={this.state.payment_account}
                      className="col-xs-12"
                      autoComplete="nope"
                      placeholder="Расчетный счет ...."
                    />
                    <p><Icon className="ant-icon-pos" type="contacts" /> Актуальный адрес</p>

                    <Input
                      onChange={this.handelAnyChange("actual_address")}
                      value={this.state.actual_address}
                      className="col-xs-12"
                      autoComplete="nope"
                      placeholder="Актуальный адрес ...."
                    />
                  </div>
                  <div class="col">
                    <p><Icon className="ant-icon-pos" type="contacts" /> Юридический адрес</p>

                    <Input
                      onChange={this.handelAnyChange("legal_address")}
                      value={this.state.legal_address}
                      className="col-xs-12"
                      autoComplete="nope"
                      placeholder="Юридический адрес ...."
                    />
                    <p><Icon className="ant-icon-pos" type="contacts" /> Полное имя компании</p>

                    <Input
                      onChange={this.handelAnyChange("full_name")}
                      value={this.state.full_name}
                      className="col-xs-12"
                      autoComplete="nope"
                      placeholder="Полное имя компании"
                    />
                    <p><Icon className="ant-icon-pos" type="contacts" /> Сокращенное имя компании</p>

                    <Input
                      onChange={this.handelAnyChange("name")}
                      value={this.state.name}
                      className="col-xs-12"
                      autoComplete="nope"
                      placeholder="Сокращенное имя компании"
                    />
                    <p><Icon className="ant-icon-pos" type="contacts" />  Генеральный директор</p>

                    <Input
                      onChange={this.handelAnyChange("general_director")}
                      value={this.state.general_director}
                      className="col-xs-12"
                      autoComplete="nope"
                      placeholder="Генеральный директор"
                    />
                    <p><Icon className="ant-icon-pos" type="environment" />  Расположение</p>

                    <Select
                      style={{ width: "auto" }}
                      className="col-xs-12"
                      mode="multiple"
                      style={{ width: "100%" }}
                      placeholder="Выберите область"
                      value={this.state.agentGeo}
                      onChange={this.handleSelectOblastChange}
                    >
                      {Rusmap.map(map => (
                        <Select.Option key={map.value} value={map.value}>
                          {map.value}
                        </Select.Option>
                      ))}
                    </Select>
                  </div>
                </div>

                <div class="col-sm">
                  <p><Icon className="ant-icon-pos" type="experiment" /> Специализация</p>
                  <Select
                    className="col-xs-12"
                    mode="multiple"
                    style={{ width: "100%" }}
                    placeholder="Выберите область"
                    value={this.state.specialications}
                    onChange={this.handelChangeSpec}
                  >
                    {this.state.specialicationsToBase.map(map => (
                      <Select.Option key={map} value={map}>
                        {map}
                      </Select.Option>
                    ))}
                  </Select>
                  <div style={{ padding: "5px" }}>
                  <Button
                    onClick={this.showModal}
                    style={{ padding: "5px", backgroundColor: "#36a832",borderColor:"#36a832"}}
                    type="primary"
                  >
                    Добавить
                  </Button>
                  </div>
                </div>
                
              </div>
              
            </div>
            <div style={{ padding: "5px" }}>
{" "}
<Button onClick={this.handelClickChange} type="primary">
  Обновить
</Button>
</div>
          </div>
        )}

        <Modal
          title="Новая спеацилизация"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Вернуться
            </Button>,
            <Button key="submit" type="primary" onClick={this.handleOk}>
              Отправить
            </Button>
          ]}
        >
          <Input
            onChange={this.handelAnyChange("newSpecialication")}
            value={this.state.newSpecialication}
            className="col-xs-12"
            autoComplete="nope"
            placeholder="Специализация"
          />
          {this.state.openSpec ? (<> <Spin size="large" /></>):(<>
          
          {this.state.specialicationsToBaseEditors.map((spec, i) => (
            <div className="spec-border">{spec.data} <Button   onClick={() => this.deleteSpec(spec._id)} type="danger"><Icon className="delete_ant_icon" type="delete" /></Button></div>
          ))}
          </>)}
        
        </Modal>
      </div>
    );
  }
}

// company
// full_name
// name
// UUID
// phone
// status
// INN
// general_director
// OGRN
// email
// agentGeo
// region
// specialications
// tech
// any
// legal_address
// actual_address
// payment_account


{/* <div style={{ padding: "5px" }}>
{" "}
<Button onClick={this.handelClickChange} type="primary">
  Обновить
</Button>
</div> */}