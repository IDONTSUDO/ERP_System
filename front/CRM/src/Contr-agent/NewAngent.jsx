import React, { Component } from "react";
import { isAuthenticated } from "../Api/Auth";
import {
  NewContrAgent,
  NewSpecialication,
  AllSpecList,
  deleteSpecialisations,
  GetTechList,
  GetNode,
  SaveCarAgent,
  SaveDetalAtNode,
  SaveNodeAtCar,
  DeleteDetalAtNode,
  DeleteAtNode,
  DeleteAtTech
} from "../Api/Http";
import Rusmap from "../helper/RUSSIAN_MAP.js";
import Tree from "react-animated-tree";
import { EditOutlined } from "@ant-design/icons";

import {
  notification,
  Icon,
  Steps,
  Button,
  message,
  Input,
  Select,
  Tag,
  Checkbox,
  Drawer
} from "antd";
import Error from "../Error/Error.jsx";
const { TextArea } = Input;
const CheckboxGroup = Checkbox.Group;

const { Step } = Steps;

const plainOptions = ["Viber", "WhatsAp", "Почта", "Telegram", "Звонки"];
const defaultCheckedList = [];
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
      requre_input: "#ff1100",
      inputQality: [],
      checkedList: defaultCheckedList,
      visibleSpecDriwer: false,
      visibleTechDriwer: false,
      specialicationsToBase: [],
      specialicationsToBaseEditors: [],
      loadNode: [],
      peopelQality: [],
      editorRegim: false
    };
  }
  componentDidMount() {
    const userId = isAuthenticated().direct._id;
    AllSpecList().then(data => {
      if (data.err) {
        console.log(data.err);
      } else {
        let specArray = [];
        for (let i of data) {
          specArray.push(i.data);
        }
        this.setState({ specialicationsToBaseEditors: data });
        this.setState({ specialicationsToBase: specArray, user: userId });
      }
    });
    GetTechList().then(responce => {
      this.setState({
        loadNode: responce
      });
    });
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

  peopelQalityPlus = () => {
    let peopelQality = this.state.peopelQality;
    peopelQality.push("1");
    this.setState({ peopelQality });
  };

  editorRegimSwitcher = () => {
    let { editorRegim } = this.state;
    if (editorRegim === true) {
      this.setState({ editorRegim: false });
    } else {
      this.setState({ editorRegim: true });
    }
  };

  showDrawerTechDriwer = () => {
    this.setState({
      visibleTechDriwer: true
    });
  };

  onCloseTechDriwer = () => {
    this.setState({
      visibleTechDriwer: false
    });
  };
  showDrawerSpecDriwer = () => {
    this.setState({
      visibleSpecDriwer: true
    });
  };

  onCloseSpecDriwer = () => {
    this.setState({
      visibleSpecDriwer: false
    });
  };

  inputQalityPlus = () => {
    let inputQality = this.state.inputQality;
    inputQality.push("1");
    this.setState({ inputQality });
  };
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
                  addonBefore={<div className="required-start">*</div>}
                  size="large"
                  className="input_new_agent requre_input"
                  placeholder="Название"
                />
                <Input
                  className="input_new_agent"
                  addonBefore={<div className="required-start">*</div>}
                  size="large"
                  placeholder="ИНН/КПП"
                />{" "}
                <div className="input_helper">
                  <div>
                    <Input
                      className="input_new_agent "
                      placeholder="Подразделения (филиалы)"
                    />
                    <Select
                      style={{ width: "auto" }}
                      className="input_new_agent"
                      mode="multiple"
                      // style={{ width: "100%" }}
                      placeholder="Выберите гео расположение"
                      value={this.state.agentGeo}
                      // onChange={this.handleSelectOblastChange}
                    >
                      {Rusmap.map(map => (
                        <Select.Option key={map.value} value={map.value}>
                          {map.value}
                        </Select.Option>
                      ))}
                    </Select>
                  </div>
                  {this.state.inputQality.map((qa, i) => (
                    <>
                      <Input
                        className="input_new_agent"
                        size="large"
                        placeholder="Подразделения (филиалы)"
                      />
                      <Select
                        style={{ width: "auto" }}
                        className="input_new_agent"
                        mode="multiple"
                        style={{ width: "100%" }}
                        placeholder="Выберите гео расположение"
                        value={this.state.agentGeo}
                        // onChange={this.handleSelectOblastChange}
                        size="large"
                      >
                        {Rusmap.map(map => (
                          <Select.Option key={map.value} value={map.value}>
                            {map.value}
                          </Select.Option>
                        ))}
                      </Select>
                    </>
                  ))}

                  <Icon
                    onClick={inputQality =>
                      this.inputQalityPlus(this.state.inputQality, inputQality)
                    }
                    className="input_new_agent"
                    type="plus"
                    style={{
                      fontSize: "31px",
                      color: "#8BC34A"
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
                  className="input_new_agent"
                  addonBefore={<div className="required-start">*</div>}
                  placeholder=" Описание компании:"
                />
                <div className="input_helper">
                  <div>
                    <Button
                      onClick={this.showDrawerTechDriwer}
                      className="input_new_agent "
                      size="large"
                    >
                      техника
                    </Button>
                    <div className="proizvostvo_pos">
                      <Tag>TagTagTagTagTagTag</Tag>
                    </div>
                    <Button
                      onClick={this.showDrawerSpecDriwer}
                      className="input_new_agent "
                      size="large"
                    >
                      Специализация
                    </Button>
                    <div className="proizvostvo_pos">
                      <Tag>Tag 1</Tag>
                    </div>
                  </div>
                </div>
              </div>{" "}
            </div>
          </div>
        )
      },
      {
        title: "Адрес/контакты",
        content: (
          <>
            <div className="row justify-content-between">
              <div className="col-8">
                <Input
                  size="large"
                  className="input_new_agent "
                  placeholder=" Юридический адрес:"
                />
                <Input
                  size="large"
                  className="input_new_agent "
                  placeholder="Фактический адрес:"
                />
                <Input
                  size="large"
                  className="input_new_agent "
                  placeholder="Почтовый адрес:"
                />
                <Input
                  size="large"
                  className="input_new_agent "
                  placeholder="Сайт:"
                />
                <Input
                  size="large"
                  className="input_new_agent "
                  placeholder="Инстаграм:"
                />{" "}
                <Input
                  size="large"
                  className="input_new_agent"
                  placeholder="Общий тел:"
                />
              </div>
            </div>
          </>
        )
      },
      {
        title: "Контактные лица",
        content: (
          <>
            {/* Должность, ФИО, контакты (телефон, почта). Комментарий с описанием особенности работы с данным человеком */}

            <div className="row justify-content-between">
              <div className="col-8">
                <Input
                  size="large"
                  className="input_new_agent "
                  placeholder="Должность:"
                />
                <Input
                  size="large"
                  className="input_new_agent "
                  placeholder="ФИО:"
                />
                <Input
                  size="large"
                  className="input_new_agent "
                  placeholder="телефон:"
                />

                <CheckboxGroup
                  options={plainOptions}
                  value={this.state.checkedList}
                  // onChange={this.onChange}
                />
                {this.state.peopelQality.map((prop, i) => (
                  <>
                    <Input
                      size="large"
                      className="input_new_agent "
                      placeholder="Должность:"
                    />
                    <Input
                      size="large"
                      className="input_new_agent "
                      placeholder="ФИО:"
                    />
                    <Input
                      size="large"
                      className="input_new_agent "
                      placeholder="телефон:"
                    />

                    <CheckboxGroup
                      options={plainOptions}
                      value={this.state.checkedList}
                    />
                  </>
                ))}

                <TextArea
                  className="input_new_agent "
                  placeholder="Особенности работы"
                  allowClear
                />
                <Icon
                  onClick={peopelQality =>
                    this.peopelQalityPlus(this.state.peopelQality, peopelQality)
                  }
                  className="input_new_agent"
                  type="plus"
                  style={{
                    fontSize: "31px",
                    color: "#8BC34A"
                  }}
                />
              </div>
            </div>
          </>
        )
      },
      {
        title: "Начало работ",
        content: (
          <>
            <div className="row justify-content-between">
              <div className="col-8">
                <Input
                  size="large"
                  className="input_new_agent"
                  addonBefore={<div className="required-start">*</div>}
                  placeholder="Откуда пришел клиент :"
                />
                <Input
                  size="large"
                  className="input_new_agent"
                  addonBefore={<div className="required-start">*</div>}
                  placeholder=" Как начиналась с ним работа:"
                />
              </div>
            </div>
          </>
        )
      },
      {
        title: "Особые пометки",
        content: (
          <>
            <div className="row justify-content-between">
              <div className="col-8">
                <TextArea
                  className="input_new_agent"
                  placeholder=" Индивидуальные условия работы с клиентом:"
                  allowClear
                />
                <Input
                  size="large"
                  className="input_new_agent"
                  addonBefore={<div className="required-start">*</div>}
                  placeholder="Индивидуальные условия работы с клиентом:"
                />
                <Input
                  size="large"
                  className="input_new_agent"
                  addonBefore={<div className="required-start">*</div>}
                  placeholder="Характер предлагаемой цены для клиента:"
                />
              </div>
            </div>
          </>
        )
      }
    ];
    let { editorRegim } = this.state;

    return (
      <div className="email_main_pos">
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
        <Drawer
          title="Техника"
          width="900"
          placement="right"
          closable={false}
          onClose={this.onCloseTechDriwer}
          visible={this.state.visibleTechDriwer}
        >
          <Tree content="Марки" type="Бренды">
            {this.state.loadNode.map((node, i) => (
              <>
                <Tree
                  content={
                    <>
                      <Icon
                        type="delete"
                        onClick={id => this.deletedTech(node._id, id)}
                        style={{
                          display: this.state.EditorRegim,
                          fontSize: "23px",
                          color: "#f0112b"
                        }}
                      />
                      {node.name}
                    </>
                  }
                  type="Машины"
                >
                  {node.techNode.map((nod, i) => (
                    <>
                      <Tree
                        content={
                          <>
                            <Icon
                              onClick={id => this.deletAtNode(nod._id, id)}
                              type="delete"
                              style={{
                                display: this.state.EditorRegim,
                                fontSize: "23px",
                                color: "#f0112b"
                              }}
                            />
                            {nod.name}
                          </>
                        }
                        type="Узел"
                      >
                        <>
                          {nod.tech.map((n, i) => (
                            <>
                              <Tree
                                content={
                                  <>
                                    <Icon
                                      onClick={id =>
                                        this.deleteDetal(n._id, id)
                                      }
                                      type="delete"
                                      style={{
                                        display: this.state.EditorRegim,
                                        fontSize: "23px",
                                        color: "#f0112b"
                                      }}
                                    />
                                    <div
                                      onClick={name =>
                                        this.AddingAgentTech(n.name, name)
                                      }
                                      className="detail"
                                    >
                                      {n.name}
                                    </div>
                                  </>
                                }
                                type="Деталь"
                              ></Tree>
                            </>
                          ))}

                          <Icon
                            onClick={id => this.DetailNew(nod._id, id)}
                            style={{ color: "#13fc03" }}
                            type="plus"
                          />
                        </>
                      </Tree>
                    </>
                  ))}
                  <Icon
                    onClick={id => this.NodeNew(node._id, id)}
                    style={{ color: "#13fc03" }}
                    type="plus"
                  />
                </Tree>
              </>
            ))}
            <Icon
              onClick={() => this.NewCar()}
              style={{ color: "rgb(27, 125, 3)" }}
              type="plus"
            />
          </Tree>
        </Drawer>
        <Drawer
          title={     <>
          
          Специализация
          {editorRegim ? (
            <>
              <Input
                placeholder="Новая специализация"
              ></Input>
            </>
          ) : null}
          {editorRegim ? (
            <>
              <Button>Добавить</Button>
            </>
          ) : null}</>}
          placement="right"
          width="900"
          closable={false}
          onClose={this.onCloseSpecDriwer}
          visible={this.state.visibleSpecDriwer}
        >
          <div className="specListsEditor">
            <Select
              className="col-xs-12"
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="Выберите специализацию"
              value={this.state.specialications}
              onChange={this.handelChangeSpec}
            >
              {this.state.specialicationsToBase.map(map => (
                <Select.Option key={map} value={map}>
                  {map}
                </Select.Option>
              ))}
            </Select>
            <Button
              onClick={regim =>
                this.editorRegimSwitcher(this.state.editorRegim, regim)
              }
              style={
                this.state.editorRegim ? { color: "red" } : { color: "blue" }
              }
            >
              Редактировать
              <EditOutlined />
            </Button>
            <div>
              <div className="editor_regim">
                <div className="row">
                  <div className="col">
                    {editorRegim ? (
                      <>
                        {this.state.specialicationsToBaseEditors.map(
                          (editors, i) => (
                            <>
                            <div className="editor_list">
                            <div>{editors.data}</div>
                              <Icon className="delete_ant_icon" style={{color:"red"}} type="delete" />
                            </div>
                            </>
                          )
                        )}
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Drawer>
      </div>
    );
  }
}
