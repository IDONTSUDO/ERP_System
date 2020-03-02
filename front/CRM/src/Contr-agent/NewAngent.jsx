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
  DeleteAtTech,
  manage_list
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
  Drawer,
  Calendar,
  Modal,
  Switch
} from "antd";
import Error from "../Error/Error.jsx";
import { TweenOneGroup } from "rc-tween-one";
import moment from "moment";

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
      specialications: [],
      loadNode: [],
      peopelQality: [],
      editorRegim: false,
      agentGeo0: [],
      agentGeo1: [],
      agentGeo2: [],
      agentGeo3: [],
      agentGeo4: [],
      visibleTreeDrawer: false,
      EditorRegim: "none",
      loadNode: [],
      lastLoadNode: [],
      visibleNodeList: false,
      visibleNodeListLoader: false,
      carModel: false,
      NodeModal: false,
      DetalModal: false,
      DetalName: "",
      NodeName: "",
      TechAgent: [],
      CarName: "",
      detalId: "",
      NodeId: "",
      newSpecialication: undefined,
      loaderTech: false,
      manageList: [],
      manageAdd: [],
      userRole: undefined,
      company_desription:"",
      common_phone:undefined,
      instagram:undefined,
      site:undefined,
      email_main:undefined,
      legal_address:undefined,
      company_desription:undefined,
      mail_at_peopel:undefined,
      phoneAt_peopel:undefined,
      bio:undefined,
      features_job:undefined,
      position:undefined,
      pay_character:undefined,
      individual_conditions_job:undefined
    };
  }
  componentDidMount() {
    const userId = isAuthenticated().direct._id;
    const userRole = isAuthenticated().direct.role;
    this.setState({ userRole: userRole });
    let resultValid = ["Директор", "Управляющий"].includes(userRole);

    if (resultValid) {
      manage_list().then(data => {
      
        this.setState({ manageList: data });
      });
    }

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

  forceUpdate() {
    this.setState({ loaderTech: true });
    GetTechList().then(responce => {
      this.setState({
        loadNode: responce,
        loaderTech: false
      });
    });
  }
  handelAddingToMager = (managListTo) =>{
    let {manageList} = this.state
    let tags = [] 
    for(let i of manageList){
      if(i.name === manageList){
        tags.push(i._id)
      }
    }
    this.setState({manageAdd:managListTo,tags:tags})

  }
  newAgentClick = () =>{
    let {position,features_job,bio,phoneAt_peopel,mail_at_peopel,checkedList} = this.state;
    let {branch_office,agentGeo,agentGeo0,agentGeo1,agentGeo2,agentGeo3,branch_office1,branch_office2,branch_office3} = this.state
    let FilteredOfice = []
    let FilteredGeo = []



    FilteredOfice.push(branch_office,branch_office1,branch_office2,branch_office3)
    FilteredGeo.push(agentGeo0,agentGeo,agentGeo1,agentGeo2,agentGeo3)
    


    console.log("its ofice",FilteredOfice)
    console.log("its geo",FilteredGeo)
  
    


    let AgentPeopel = {
      position,features_job,bio,phoneAt_peopel,mail_at_peopel,checkedList
    }


    message.success("Агент зарегестрирован!")
  }
 
  handleChange = name => event => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };

  
  NewCar = () => {
    this.setState({ carModel: true });
  };

  DetailNew = id => {
    this.setState({ DetalModal: true, detalId: id });
  };
  nextStep() {
    const currentStep = this.state.currentStep + 1;
    this.setState({ currentStep });
  }

  prevStep() {
    const currentStep = this.state.currentStep - 1;
    this.setState({ currentStep });
  }
 
  openNotificationError() {
    notification.open({
      message: "Ой что то пошло не так, мне жаль",
      icon: <Icon type="frown" style={{ color: "#108ee9" }} />
    });
  }
  onPanelChange = () => {};
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
  AddingAgentTech = tech => {
    let { TechAgent } = this.state;
    TechAgent.push(tech);
    this.setState({ TechAgent });
    message.info("Техника добавлена.");
  };
  handelChangeSpec = item => {
    this.setState({ specialications: item });
  };
  agentAddDetalList = name => {
    message.success("Добавлено, не забудь обновить!");
  };
  DetailNew = id => {
    this.setState({ DetalModal: true, detalId: id });
  };

  editRegim = RegimStatus => {
    if (RegimStatus === true) {
      this.setState({ EditorRegim: "" });
    } else {
      this.setState({ EditorRegim: "none" });
    }
  };
  deleteSpec = id => {
    this.setState({ openSpec: true });
    deleteSpecialisations(id).then(data => {
      AllSpecList().then(payload => {
        if (payload.err) {
          this.setState({ error: true });
        } else {
          let specArray = [];
          for (let i of payload) {
            specArray.push(i.data);
          }
          this.setState({
            specialicationsToBaseEditors: payload,
            specialicationsToBase: specArray,
            openSpec: false
          });
        }
      });
    });
  };

  NodeNew = id => {
    this.setState({ NodeModal: true, NodeId: id });
  };
  handleCancelCarModel = () => {
    this.setState({ carModel: false, CarName: "" });
  };
  handleOklNodeModal = () => {
    let { NodeId, NodeName } = this.state;
    if (NodeName.length === 0) {
      return this.openNotificationValidationError();
    } else {
      SaveNodeAtCar(NodeId, NodeName).then(data => {
        this.setState({
          NodeModal: false,
          NodeId: "",
          NodeName: "",
          loaderTech: true
        });
        this.forceUpdate();
      });
    }
  };

  handleCancelNodeModal = () => {
    this.setState({ NodeModal: false });
  };
  handleOklCarModel = () => {
    let { CarName } = this.state;
    if (CarName.length === 0) {
      this.openNotificationValidationError();
    } else {
      let name = CarName;
      SaveCarAgent(name).then(data => {
        this.setState({ carModel: false, loaderTech: true, CarName: "" });
        this.forceUpdate();
      });
    }
  };
  handleOkDetalModal = () => {
    let { DetalName, detalId } = this.state;
    if (DetalName.length === 0) {
      this.openNotificationValidationError();
    } else {
      SaveDetalAtNode(detalId, DetalName).then(data => {
        this.setState({
          DetalModal: false,
          detalId: "",
          loaderTech: true,
          DetalName: ""
        });
        this.forceUpdate();
      });
    }
  };
  handleChangeAnyInput = name => event => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };
  onChange = checkedList => {
    this.setState({
      checkedList,
      indeterminate:
        !!checkedList.length && checkedList.length < plainOptions.length,
      checkAll: checkedList.length === plainOptions.length
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
  handleSelectOblastChange = item => {
    this.setState({ agentGeo: item });
  };
  handleSelectOblastChange0 = item => {
    this.setState({ agentGeo0: item });
  };
  handleSelectOblastChange1 = item => {
    this.setState({ agentGeo1: item });
  };
  handleSelectOblastChange2 = item => {
    this.setState({ agentGeo2: item });
  };
  handleSelectOblastChange3 = item => {
    this.setState({ agentGeo3: item });
  };
  handleSelectOblastChange4 = item => {
    this.setState({ agentGeo4: item });
  };
  deleteDetal = id => {
    DeleteDetalAtNode(id).then(data => {
      this.forceUpdate();
    });
  };
  deletAtNode = id => {
    this.setState({});
    DeleteAtNode(id).then(data => {
      this.forceUpdate();
    });
  };
  deletedTech = id => {
    DeleteAtTech(id).then(data => {
      this.forceUpdate();
    });
  };
  deleteSpec = id => {
    this.setState({ openSpec: true });
    deleteSpecialisations(id).then(data => {
      AllSpecList().then(payload => {
        if (payload.err) {
          this.setState({ error: true });
        } else {
          let specArray = [];
          for (let i of payload) {
            specArray.push(i.data);
          }
          this.setState({
            specialicationsToBaseEditors: payload,
            specialicationsToBase: specArray,
            openSpec: false
          });
        }
      });
    });
  };
  handleOk = e => {
    let { newSpecialication } = this.state;

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
              this.setState({
                specialicationsToBaseEditors: payload,
                specialicationsToBase: specArray,
                visible: false,
                newSpecialication: undefined
              });
            }
          });
        }
      });
    }
  };
  onChangeGroup = (checkedList ) =>{
    this.setState({
      checkedList,
      indeterminate: !!checkedList.length && checkedList.length < plainOptions.length,
      checkAll: checkedList.length === plainOptions.length,
    });
  }
  openNotificationValidationError() {
    notification.open({
      message: "Ошибка валидации",
      icon: <Icon type="frown" style={{ color: "#108ee9" }} />
    });
  }
  openNotificationValidationErrorToAddTech() {
    notification.open({
      message: "Ошибка валидации вы пытайтесь добавить, не то поле.",
      icon: <Icon type="frown" style={{ color: "#108ee9" }} />
    });
  }
  handleClose = techRemove => {
    const TechAgent = this.state.TechAgent.filter(tech => tech !== techRemove);
    this.setState({ TechAgent });
  };

  
  TechMap = tech => {
    const tagElem = (
      <Tag
        color="geekblue"
        closable
        onClose={e => {
          e.preventDefault();
          this.handleClose(tech);
        }}
      >
        {tech}
      </Tag>
    );
    return (
      <span key={tech} style={{ display: "inline-block" }}>
        {tagElem}
      </span>
    );
  };
  onPanelChange = (value, mode) => {
    console.log(value, mode);
  };
  render() {
    let techChild = this.state.TechAgent.map(this.TechMap);

    const {
      company,
      userRole,
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
                  onChange={this.handleChange("name")}
                />
                 <Input
                  addonBefore={<div className="required-start">*</div>}
                  size="large"
                  className="input_new_agent requre_input"
                  placeholder="Полное имя"
                  onChange={this.handleChange("full_name")}
                />
                <Input
                  className="input_new_agent"
                  addonBefore={<div className="required-start">*</div>}
                  size="large"
                  placeholder="ИНН/КПП"
                  onChange={this.handleChange("INN")}
                />{" "}
                <div className="input_helper">
                  <div>
                    <Input
                      className="input_new_agent "
                      placeholder="Подразделения (филиалы)"
                      value={this.state.branches_ofice}
                      onChange={this.handleChange("branches_ofice")}
                    />
                    <Select
                      style={{ width: "auto" }}
                      className="input_new_agent"
                      mode="multiple"
                      placeholder="Выберите гео расположение"
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
                  value={this.state.company_desription}
                  onChange={this.handleChange("company_desription")}
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
                    <Button
                      onClick={this.showDrawerSpecDriwer}
                      className="input_new_agent "
                      size="large"
                    >
                      Специализация
                    </Button>
                    <div className="proizvostvo_pos"></div>
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
                  value={this.state.legal_address}
                  onChange={this.handleChange("legal_address")}
                  className="input_new_agent "
                  placeholder=" Юридический адрес:"
                />
                                                

                <Input
                  size="large"
                  value={this.state.actual_address}
                  onChange={this.handleChange("actual_address")}
                  className="input_new_agent "
                  placeholder="Фактический адрес:"
                />

                <Input
                  size="large"
                  value={this.state.email_main}
                  onChange={this.handleChange("email_main")}
                  className="input_new_agent "
                  placeholder="Email:"
                />
                <Input
                  size="large"
                  value={this.state.site}
                  onChange={this.handleChange("site")}
                  className="input_new_agent "
                  placeholder="Сайт:"
                />
                <Input
                  size="large"
                  value={this.state.instagram}
                  onChange={this.handleChange("instagram")}
                  className="input_new_agent "
                  placeholder="Инстаграм:"
                />{" "}
                <Input
                  size="large"
                  value={this.state.common_phone}
                  onChange={this.handleChange("common_phone")}
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
                  onChange={this.handleChange("position")}
                  value={this.state.position}
                  className="input_new_agent "
                  placeholder="Должность:"
                />
                <Input
                  size="large"
                  onChange={this.handleChange("features_job")}
                  value={this.state.features_job}
                  className="input_new_agent "
                  placeholder="Особености работы:"
                />
                <Input
                  onChange={this.handleChange("bio")}
                  value={this.state.bio}
                  size="large"
                  className="input_new_agent "
                  placeholder="ФИО:"
                />
                <Input
                  size="large"
                  onChange={this.handleChange("phoneAt_peopel")}
                  value={this.state.phoneAt_peopel}
                  className="input_new_agent "
                  placeholder="телефон:"
                />
                <Input
                  size="large"
                  onChange={this.handleChange("mail_at_peopel")}
                  value={this.state.mail_at_peopel}
                  className="input_new_agent "
                  placeholder="почта:"
                />
                <p className="input_new_agent "> Предпочитаемый способ связи</p>
                <CheckboxGroup
                  options={plainOptions}
                  onChange={this.onChangeGroup}
                  value={this.state.checkedList}
                />
              </div>
            </div>
          </>
        )
      },

      {
        title: "Начало работы",
        content: (
          <>
            <div className="row justify-content-between">
              <div className="col-8">
                <Input
                  size="large"
                  onChange={this.handleChange("WhereFromClient")}
                  value={this.state.WhereFromClient}
                  className="input_new_agent"
                  addonBefore={<div className="required-start">*</div>}
                  placeholder="Откуда пришел клиент :"
                />
                <Input
                  size="large"
                  className="input_new_agent"
                  onChange={this.handleChange("work_begin_with_him")}
                  value={this.state.work_begin_with_him}
                  addonBefore={<div className="required-start">*</div>}
                  placeholder=" Как начиналась с ним работа:"
                />
                {["Менеджер"].includes(userRole) ? (
                  <>
                    <div className="input_new_agent site-calendar-demo-card">
                      <p className="">Начать работу с ним с числа:</p>
                      <Calendar
                        validRange={[
                          moment(Date.now()),
                          moment(Date.now()).add("days", 10)
                        ]}
                        fullscreen={false}
                        onPanelChange={this.onPanelChange}
                      />
                    </div>
                  </>
                ) : null}

                {["Директор", "Управляющий"].includes(userRole) ? (
                  <>
                    <Select
                      style={{ width: "auto" }}
                      className="input_new_agent"
                      mode="multiple"
                      style={{ width: "100%" }}
                      placeholder="Назначить менеджера"
                      value={this.state.manageAdd}
                      onChange={this.handelAddingToMager}
                      size="large"
                    >
                      {this.state.manageList.map(map => (
                        <Select.Option key={map.name} value={map.name}>
                          {map.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </>
                ) : null}
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
                  value={this.state.individual_conditions_job}
                  onChange={this.handleChange("individual_conditions_job")}
                  placeholder=" Индивидуальные условия работы с клиентом:"
                  allowClear
                />
                <Input
                  size="large"
                  className="input_new_agent"
                  value={this.state.pay_character}
                  onChange={this.handleChange("pay_character")}
                  addonBefore={<div className="required-start">*</div>}
                  placeholder="Характер предлагаемой цены для клиента:"
                />
                {isAuthenticated().direct.role === "Менеджер" ? (
                  <Calendar
                    fullscreen={false}
                    onPanelChange={this.onPanelChange}
                  />
                ) : null}
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
                onClick={this.newAgentClick}
              >
               
                {/* message.success("Агент зарегестрирован!") */}
                Зарегестрировать
              </Button>
            )}
            {this.state.currentStep > 0 && (
              <Button style={{ marginLeft: 8 }} onClick={() => this.prevStep()}>
                Назад
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
          <Switch
            // defaultChecked={false}
            onChange={this.editRegim}
            checkedChildren={<Icon type="check" />}
            unCheckedChildren={<Icon type="close" />}
            defaultChecked={false}
          />
          <TweenOneGroup
            enter={{
              scale: 0.8,
              opacity: 0,
              type: "from",
              duration: 100,
              onComplete: e => {
                e.target.style = "";
              }
            }}
            leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
            appear={false}
          >
            {techChild}
          </TweenOneGroup>

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
          title={
            <>
              Специализация
              {editorRegim ? (
                <>
                  <Input
                    onChange={this.handleChange("newSpecialication")}
                    value={this.state.newSpecialication}
                    placeholder="Новая специализация"
                  ></Input>
                </>
              ) : null}
              {editorRegim ? (
                <>
                  <Button onClick={this.handleOk}>Добавить</Button>
                </>
              ) : null}
            </>
          }
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
            <div></div>
          </div>
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
                            <Icon
                              onClick={() => this.deleteSpec(editors._id)}
                              className="delete_ant_icon"
                              style={{ color: "red" }}
                              type="delete"
                            />
                          </div>
                        </>
                      )
                    )}
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </Drawer>
        <Modal
          title="Добавить деталь к машине"
          visible={this.state.DetalModal}
          onOk={this.handleOkDetalModal}
          onCancel={this.handleCancelDetalModal}
          footer={[
            <>
              <Button key="back" onClick={this.handleCancelDetalModal}>
                Вернуться
              </Button>
              <Button key="back" onClick={this.handleOkDetalModal}>
                Ок
              </Button>
            </>
          ]}
        >
          <Input
            onChange={this.handleChangeAnyInput("DetalName")}
            value={this.state.DetalName}
            size="large"
            placeholder="Введите текст"
          />
        </Modal>
        <Modal
          title="Добавить машину"
          visible={this.state.carModel}
          onOk={this.handleOklCarModel}
          onCancel={this.handleCancelCarModel}
          footer={[
            <>
              <Button key="back" onClick={this.handleCancelCarModel}>
                Вернуться
              </Button>
              <Button key="back" onClick={this.handleOklCarModel}>
                Ок
              </Button>
            </>
          ]}
        >
          <Input
            size="large"
            onChange={this.handleChangeAnyInput("CarName")}
            placeholder="Введите текст"
          />
        </Modal>
        <Modal
          title="Добавить узел к машине"
          visible={this.state.NodeModal}
          onOk={this.handleOklNodeModal}
          onCancel={this.handleCancelNodeModal}
          footer={[
            <>
              <Button key="back" onClick={this.handleCancelNodeModal}>
                Вернуться
              </Button>
              <Button key="back" onClick={this.handleOklNodeModal}>
                Ок
              </Button>
            </>
          ]}
        >
          <Input
            onChange={this.handleChangeAnyInput("NodeName")}
            size="large"
            placeholder="Введите текст"
          />
        </Modal>
      </div>
    );
  }
}
