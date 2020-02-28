import React, { Component } from "react";
import { isAuthenticated } from "../Api/Auth";
import { NewContrAgent } from "../Api/Http";

import { notification, Icon, Steps, Button, message, Input } from "antd";
import Error from "../Error/Error.jsx";

const { Step } = Steps;

export default class NewAgent extends Component {
  constructor() {
    super();
    this.state = {
      currentStep: 0,
      open: false,
      user: "",
      company: "",
      name: "",
      full_name: "",
      phone: "",
      INN: "",
      general_director: "",
      OGRN: "",
      email: "",
      any: "",
      legal_address: "",
      actual_address: "",
      payment_account: "",
      loading: false,
      error: "",
      requre_input:"#ff1100",
      inputQality:[]
    };
  }
  componentDidMount() {
    const userId = isAuthenticated().direct._id;
    this.setState({ user: userId });
  }
  handleChange = name => event => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };
  clickSubmit = event => {
    if (this.isValid()) {
      let {
        user,
        company,
        full_name,
        name,
        phone,
        INN,
        general_director,
        OGRN,
        email,
        any,
        legal_address,
        actual_address,
        payment_account
      } = this.state;
      let NewAgent = {
        company,
        full_name,
        name,
        phone,
        INN,
        general_director,
        OGRN,
        email,
        any,
        legal_address,
        actual_address,
        payment_account
      };
      //    isAuthenticated().token
      NewContrAgent(NewAgent, user).then(data => {
        if (data.error) this.setState({ error: data.error });
        else this.openNotificationAgentNew();
        this.setState({
          company: "",
          full_name: "",
          name: "",
          phone: "",
          INN: "",
          general_director: "",
          OGRN: "",
          email: "",
          any: "",
          legal_address: "",
          actual_address: "",
          payment_account: ""
        });
      });
    }
  };
  nextStep() {
    const currentStep = this.state.currentStep + 1;
    this.setState({ currentStep });
  }

  prevStep() {
    const currentStep = this.state.currentStep - 1;
    this.setState({ currentStep });
  }
  isValid = () => {
    const {
      name,
      company,
      full_name,
      phone,
      INN,
      general_director,
      OGRN,
      email,
      legal_address,
      actual_address,
      payment_account
    } = this.state;
    if (name.length === 0) {
      this.setState({
        error: "Короткое имя компании является обязательным параметром",
        loading: false
      });
      return false;
    }
    if (!/^\w+([\.-]?\w+)*@\w([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      this.setState({ error: "Email не валиден", loading: false });
      return false;
    }
    if (company.length === 0) {
      this.setState({
        error: "Название компании является обязательным параметром",
        loading: false
      });
      return false;
    }
    if (full_name.length === 0) {
      this.setState({
        error: "Полное имя компании является обязательным параметром",
        loading: false
      });
      return false;
    }
    if (phone.length === 0) {
      this.setState({
        error: "номер телефона является обязательным параметром",
        loading: false
      });
      return false;
    }
    if (INN.length === 0) {
      this.setState({
        error: "Инн является обязательным параметром",
        loading: false
      });
      return false;
    }
    if (general_director.length === 0) {
      this.setState({
        error: "генеральный директор является обязательным параметром",
        loading: false
      });
      return false;
    }
    if (OGRN.length === 0) {
      this.setState({
        error: "ОГРН является обязательным параметром",
        loading: false
      });
      return false;
    }
    if (legal_address.length === 0) {
      this.setState({
        error: "Фактический адрес является обязательным параметром",
        loading: false
      });
      return false;
    }
    if (actual_address.length === 0) {
      this.setState({
        error: "Актуальный адрес является обязательным параметром",
        loading: false
      });
      return false;
    }
    if (payment_account.length === 0) {
      this.setState({
        error: "Рассчетный счет является обязательным параметром",
        loading: false
      });
      return false;
    }
    return true;
  };
  openNotificationError() {
    notification.open({
      message: "Ой что то пошло не так, мне жаль",
      icon: <Icon type="frown" style={{ color: "#108ee9" }} />
    });
  }
  openNotificationAgentNew() {
    notification.open({
      message: "Новый контр агент создан",
      icon: <Icon type="frown" style={{ color: "#108ee9" }} />
    });
  }
  openNotificationErrorValidation() {
    const { error } = this.state;
    notification.open({
      message: `${error}`,
      icon: <Icon type="frown" style={{ color: "#108ee9" }} />
    });
  }
  inputQalityPlus = ()=>{
    let inputQality = this.state.inputQality
    inputQality.push("1")
    this.setState({inputQality})
  }
  render() {
    const {
      company,
      full_name,
      name,
      phone,
      INN,
      general_director,
      OGRN,
      email,
      any,
      legal_address,
      actual_address,
      payment_account,
      error
    } = this.state;

    const steps = [
      {
        title: "Компания",
        content: (
          <div className="">
            <div className="row justify-content-between">
              <div className="col-8">
                {" "}
                <Input
                  size="large"
                  className="input_new_agent requre_input"
                  placeholder="Название"
                />
                <Input
                  className="input_new_agent"
                  style={{borderColor:this.state.requre_input}}
                  size="large"
                  placeholder="ИНН/КПП"
                />{" "}
                <div className="input_helper">

               <div>
               <Input
                 className="input_new_agent "
                  size="large"
                  placeholder="Подразделения (филиалы)"
                />
                <Input
                 className="input_new_agent"
                  size="large"
                  placeholder="Геолокация филиала"
                />
               </div>
              {this.state.inputQality.map((qa,i) =>(
                <>
                <Input
                 className="input_new_agent"
                  size="large"
                  placeholder="Подразделения (филиалы)"
                />
                 <Input
                 id={i}
                 className="input_new_agent"
                  size="large"
                  placeholder="Геолокация филиала"
                />
                </>
        ))}
                
                <Icon
                                                onClick={inputQality =>
                                                  this.inputQalityPlus(this.state.inputQality,inputQality )
                                                }
                                                className="input_new_agent"
                                                type="plus"
                                                style={{
                                                  fontSize: "23px",
                                                  color: "#f0112b"
                                                }}
                                              />
                
                </div>
              </div>{" "}
            </div>
          </div>
        )
      },
      {
        title: "Комментарии",
        content: (
          <div className="">
            <div className="row justify-content-between">
              <div className="col-8">
                {" "}
                <Input
                  size="large"
                  className="input_new_agent requre_input"
                  placeholder=" Описание компании:"
                />
                <Input
                  className="input_new_agent"
                  style={{borderColor:this.state.requre_input}}
                  size="large"
                  placeholder=" Какая техника, станки, производство:"
                />{" "}
                <div className="input_helper">

               <div>
               <Input
                 className="input_new_agent "
                  size="large"
                  placeholder="Какая техника, станки, производство:"
                />
               
               </div>
              {/* {this.state.inputQality.map((qa,i) =>(
                <>
                <Input
                 className="input_new_agent"
                  size="large"
                  placeholder="Подразделения (филиалы)"
                />
                 <Input
                 id={i}
                 className="input_new_agent"
                  size="large"
                  placeholder="Геолокация филиала"
                />
                </>
        ))} */}
                
                <Icon
                                                onClick={inputQality =>
                                                  this.inputQalityPlus(this.state.inputQality,inputQality )
                                                }
                                                className="input_new_agent"
                                                type="plus"
                                                style={{
                                                  fontSize: "23px",
                                                  color: "#f0112b"
                                                }}
                                              />
                
                </div>
              </div>{" "}
            </div>
          </div>
        )
      },
      {
        title: "Адрес, контакты",
        content: "Last-content"
      },
      {
        title: "Контактные лица",
        content: "Last-content"
      },
      {
        title: "Начало работы с клиентом",
        content: "Last-content"
      },
      {
        title: "Особые пометки",
        content: "Last-content"
      }
    ];
    return (
      <div className="postisitonRelativeSmeni">
        <div>
          <Steps current={this.state.currentStep}>
            {steps.map(item => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
          <div className="steps-content">
            {steps[this.state.currentStep].content}
          </div>
          <div className="steps-action">
            {this.state.currentStep < steps.length - 1 && (
              <Button type="primary" onClick={() => this.nextStep()}>
                Следующий шаг
              </Button>
            )}
            {this.state.currentStep === steps.length - 1 && (
              <Button
                type="primary"
                onClick={() => message.success("Processing complete!")}
              >
                Done
              </Button>
            )}
            {this.state.currentStep > 0 && (
              <Button style={{ marginLeft: 8 }} onClick={() => this.prevStep()}>
                Previous
              </Button>
            )}
          </div>
        </div>
        {/* {error.length !== 0 ? this.openNotificationErrorValidation() : ""}
        <div className="container">
          <div className="row">
            <form>
              <div>
                <label className="text-muted">Название компании</label>
                <input
                  className="form-control"
                  onChange={this.handleChange("company")}
                  type="text"
                  value={company}
                />
              </div>
              <div>
                <label className="text-muted">Полное имя компании</label>
                <input
                  className="form-control"
                  onChange={this.handleChange("full_name")}
                  type="text"
                  value={full_name}
                />
              </div>
              <div>
                <label className="text-muted">Телефон</label>
                <input
                  className="form-control"
                  onChange={this.handleChange("phone")}
                  type="number"
                  value={phone}
                />
              </div>
              <div>
                <label className="text-muted">Короткое имя компании</label>
                <input
                  className="form-control"
                  onChange={this.handleChange("name")}
                  type="text"
                  value={name}
                />
              </div>
              <div>
                <label className="text-muted">Генеральный директор</label>
                <input
                  className="form-control"
                  onChange={this.handleChange("general_director")}
                  type="text"
                  value={general_director}
                />
              </div>
              <div>
                <label className="text-muted">ИНН компании</label>
                <input
                  className="form-control"
                  onChange={this.handleChange("INN")}
                  type="text"
                  value={INN}
                />
              </div>
              <div>
                <label className="text-muted">Email</label>
                <input
                  className="form-control"
                  onChange={this.handleChange("email")}
                  type="text"
                  value={email}
                />
              </div>
              <div>
                <label className="text-muted">ОГРН компании</label>
                <input
                  className="form-control"
                  onChange={this.handleChange("OGRN")}
                  type="text"
                  style={{ width: "15em" }}
                  value={OGRN}
                />
              </div>
              <div>
                <label className="text-muted">
                  Любая другая полезная информация
                </label>
                <textarea
                  value={any}
                  onChange={this.handleChange("any")}
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                ></textarea>
              </div>
              <div>
                <label className="text-muted">Юридический адрес</label>
                <input
                  className="form-control"
                  onChange={this.handleChange("legal_address")}
                  type="text"
                  value={legal_address}
                />
              </div>
              <div>
                <label className="text-muted">Фактический адрес</label>
                <input
                  className="form-control"
                  onChange={this.handleChange("actual_address")}
                  type="text"
                  value={actual_address}
                />
              </div>

              <div>
                <label className="text-muted">Расчетный счет</label>
                <input
                  className="form-control"
                  onChange={this.handleChange("payment_account")}
                  type="text"
                  value={payment_account}
                />
              </div>
              <div style={{ padding: "10px" }}></div>
              <button
                className="btn btn-raised btn-primary"
                onClick={this.clickSubmit}
              >
                Создать
              </button>
            </form>
          </div>
        </div> */}
      </div>
    );
  }
}
