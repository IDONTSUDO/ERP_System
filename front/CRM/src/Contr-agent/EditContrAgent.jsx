import React, { Component } from "react";
import Rusmap from "../helper/RUSSIAN_MAP.js";
import Tree from "react-animated-tree";

import {
  GetAgentProfile,
  ChangeAgentProfile,
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
import {
  Select,
  Row,
  Col,
  Input,
  Button,
  Icon,
  notification,
  Modal,
  Spin,
  Drawer,
  message,
  Switch,
  Tag
} from "antd";
import { TweenOneGroup } from "rc-tween-one";
import Erorr from "../Error/Error.jsx";
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
      openSpec: false,
      specialications: [],
      specialicationsToBase: [],
      newSpecialication: undefined,
      specialicationsToBaseEditors: [],
      agentTechCollect: [],
      agentTechName: [],
      AgentTech: [],
      agentTechCollectValid: [],
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
      loaderTech: false
    };
  }
  handleClose = techRemove => {
    const TechAgent = this.state.TechAgent.filter(tech => tech !== techRemove);
    this.setState({ TechAgent });
  };
  handleCancelDetalModal = () => {
    this.setState({ DetalModal: false });
  };

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
          TechAgent:data.TechAgent,
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
    GetTechList().then(responce => {
      this.setState({
        loadNode: responce
      });
    });
  }

  componentDidMount() {
    const agentID = this.props.match.params.agentId;
    this.setState({ agentId: agentID });
    this.init(agentID);
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
  showModal = () => {
    this.setState({
      visible: true
    });
  };
  showDrawer = () => {
    this.setState({
      visibleTreeDrawer: true
    });
  };
  handleCancelCarModel = () => {
    this.setState({ carModel: false, CarName: "" });
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
  onClose = () => {
    this.setState({
      visibleTreeDrawer: false
    });
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

  handleCancel = e => {
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
  AddingAgentTech = tech => {
    let { TechAgent } = this.state;
    TechAgent.push(tech);
    this.setState({ TechAgent });
    message.info("Техника добавлена.");
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
  editRegim = RegimStatus => {
    if (RegimStatus === true) {
      this.setState({ EditorRegim: "" });
    } else {
      this.setState({ EditorRegim: "none" });
    }
  };
  ChildrenTree = data => {
    let sort;
    sort = data.map((dat, i) =>
      dat.data.map((d, i) => ({
        label: `${d.name}`,
        index: `${i}`
        // key: `0-0-${i}`,
      }))
    );
    return sort[0];
  };
  agentAddDetalList = name => {
    message.success("Добавлено, не забудь обновить!");
  };
  DetailNew = id => {
    this.setState({ DetalModal: true, detalId: id });
  };

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
      specialications,
      TechAgent
    } = this.state;

    let payload = {
      TechAgent,
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
  NewCar = () => {
    this.setState({ carModel: true });
  };

  NodeNew = id => {
    this.setState({ NodeModal: true, NodeId: id });
  };
  handleChangeAnyInput = name => event => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
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
  openNotificationValidationErrorToAddTech() {
    notification.open({
      message: "Ошибка валидации вы пытайтесь добавить, не то поле.",
      icon: <Icon type="frown" style={{ color: "#108ee9" }} />
    });
  }
  handleCancelNodeChildList = () => {
    this.setState({ visibleNodeList: false });
  };

  nodLoader = id => {
    GetNode(id).then(data => {
      if (data.err) {
        console.log(data.err);
      } else {
        this.setState({ visibleNodeList: true, lastLoadNode: data });
      }
    });
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
  TechMap = tech => {
    const tagElem = (
      <Tag
      color="red"
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
  render() {
    let { error, agentTechCollect } = this.state;
    let techChild = this.state.TechAgent.map(this.TechMap);
   


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
                    <p>
                      <Icon className="ant-icon-pos" type="mail" /> Email
                    </p>

                    <Input
                      onChange={this.handelAnyChange("email")}
                      value={this.state.email}
                      className="col-xs-12"
                      autoComplete="nope"
                      placeholder="Email ...."
                    />
                    <p>
                      <Icon className="ant-icon-pos" type="phone" /> Телефон
                    </p>

                    <Input
                      onChange={this.handelAnyChange("phone")}
                      value={this.state.phone}
                      className="col-xs-12"
                      autoComplete="nope"
                      placeholder="Телефон ...."
                    />

                    <p>
                      <Icon className="ant-icon-pos" type="bank" /> ИНН
                    </p>

                    <Input
                      onChange={this.handelAnyChange("INN")}
                      value={this.state.INN}
                      className="col-xs-12"
                      autoComplete="nope"
                      placeholder="ИНН ...."
                    />
                    <p>
                      <Icon className="ant-icon-pos" type="bank" /> ОГРН
                    </p>

                    <Input
                      onChange={this.handelAnyChange("OGRN")}
                      value={this.state.OGRN}
                      className="col-xs-12"
                      autoComplete="nope"
                      placeholder="ОГРН ...."
                    />

                    <p>
                      <Icon className="ant-icon-pos" type="bank" /> Расчетный
                      счет
                    </p>
                    <Input
                      onChange={this.handelAnyChange("payment_account")}
                      value={this.state.payment_account}
                      className="col-xs-12"
                      autoComplete="nope"
                      placeholder="Расчетный счет ...."
                    />
                    <p>
                      <Icon className="ant-icon-pos" type="contacts" />{" "}
                      Актуальный адрес
                    </p>

                    <Input
                      onChange={this.handelAnyChange("actual_address")}
                      value={this.state.actual_address}
                      className="col-xs-12"
                      autoComplete="nope"
                      placeholder="Актуальный адрес ...."
                    />
                  </div>
                  <div class="col">
                    <p>
                      <Icon className="ant-icon-pos" type="contacts" />{" "}
                      Юридический адрес
                    </p>

                    <Input
                      onChange={this.handelAnyChange("legal_address")}
                      value={this.state.legal_address}
                      className="col-xs-12"
                      autoComplete="nope"
                      placeholder="Юридический адрес ...."
                    />
                    <p>
                      <Icon className="ant-icon-pos" type="contacts" /> Полное
                      имя компании
                    </p>

                    <Input
                      onChange={this.handelAnyChange("full_name")}
                      value={this.state.full_name}
                      className="col-xs-12"
                      autoComplete="nope"
                      placeholder="Полное имя компании"
                    />
                    <p>
                      <Icon className="ant-icon-pos" type="contacts" />{" "}
                      Сокращенное имя компании
                    </p>

                    <Input
                      onChange={this.handelAnyChange("name")}
                      value={this.state.name}
                      className="col-xs-12"
                      autoComplete="nope"
                      placeholder="Сокращенное имя компании"
                    />
                    <p>
                      <Icon className="ant-icon-pos" type="contacts" />{" "}
                      Генеральный директор
                    </p>

                    <Input
                      onChange={this.handelAnyChange("general_director")}
                      value={this.state.general_director}
                      className="col-xs-12"
                      autoComplete="nope"
                      placeholder="Генеральный директор"
                    />
                    <p>
                      <Icon className="ant-icon-pos" type="environment" />{" "}
                      Расположение
                    </p>

                    <Select
                      style={{ width: "auto" }}
                      className="col-xs-12"
                      mode="multiple"
                      style={{ width: "100%" }}
                      placeholder="Выберите область"
                      value={this.state.agentGeo}
                      onChange={this.handleSelectOblastChange}
                      size="large"
                    >
                      {Rusmap.map(map => (
                        <Select.Option key={map.value} value={map.value}>
                          {map.value}
                        </Select.Option>
                      ))}
                    </Select>
                  </div>
                </div>

                <div
                  style={{ left: "92px", top: "-14px", position: "relative" }}
                  class="col-sm"
                >
                  <p></p>
                  <p>
                    <Icon className="ant-icon-pos" type="experiment" />{" "}
                    Специализация
                  </p>
                  <Select
                    size="large"
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
                  <div style={{ margin: "10px" }}>
                    <Icon className="ant-icon-pos" type="bank" /> Техника
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
                  </div>

                  <Button type="primary" onClick={this.showDrawer}>
                    Open
                  </Button>
                  <Drawer
                    placement="right"
                    closable={false}
                    width="500"
                    onClose={this.onClose}
                    visible={this.state.visibleTreeDrawer}
                  >
                    <Switch
                      // defaultChecked={false}
                      onChange={this.editRegim}
                      checkedChildren={<Icon type="check" />}
                      unCheckedChildren={<Icon type="close" />}
                      defaultChecked={false}
                    />
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
                                        onClick={id =>
                                          this.deletAtNode(nod._id, id)
                                        }
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
                                                  display: this.state
                                                    .EditorRegim,
                                                  fontSize: "23px",
                                                  color: "#f0112b"
                                                }}
                                              />
                                              <div
                                                onClick={name =>
                                                  this.AddingAgentTech(
                                                    n.name,
                                                    name
                                                  )
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
                                      onClick={id =>
                                        this.DetailNew(nod._id, id)
                                      }
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
                  <div style={{ padding: "5px" }}>
                    <Button
                      onClick={this.showModal}
                      style={{
                        padding: "5px",
                        backgroundColor: "#36a832",
                        borderColor: "#36a832"
                      }}
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
          {this.state.openSpec ? (
            <>
              {" "}
              <Spin size="large" />
            </>
          ) : (
            <>
              {this.state.specialicationsToBaseEditors.map((spec, i) => (
                <div className="spec-border">
                  {spec.data}{" "}
                  <Button
                    onClick={() => this.deleteSpec(spec._id)}
                    type="danger"
                  >
                    <Icon className="delete_ant_icon" type="delete" />
                  </Button>
                </div>
              ))}
            </>
          )}
        </Modal>

        <Modal
          title="Каталог товаров"
          visible={this.state.visibleNodeList}
          onOk={this.handleCancelNodeChildList}
          onCancel={this.handleCancelNodeChildList}
          footer={[
            <Button key="back" onClick={this.handleCancelNodeChildList}>
              Вернуться
            </Button>
          ]}
        >
          {this.state.lastLoadNode.map((node, i) => (
            <>{node.name}</>
          ))}
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
