import React, { Component } from "react";
import NewAgentBracnchOfice from "../Components/FABRICS/newAgentBracnchOfice"
import NewAgentPeopel from "../Components/FABRICS/newAgentPeopel"
import { isAuthenticated } from "../Api/Auth";
import { debounce } from "debounce";
import { ObjHelperShape, infiniteCurry } from "../helper/common/type"
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
  manage_list,
  NewAgentAddRegulatoryPosition,
  NewAgentAddManager,
  GetRussiaCitiFind,
  GetRussiaOblastHelper
} from "../Api/Http";
import HillAndObl from "../helper/russia";
import Tree from "react-animated-tree";
import { EditOutlined, PlusCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import Localisation from "../helper/LocalisationCalendar.json";
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
      name: undefined,
      full_name: undefined,
      phone: undefined,
      INN: undefined,
      general_director: undefined,
      OGRN: undefined,
      email: undefined,
      any: undefined,
      legal_address: undefined,
      actual_address: undefined,
      payment_account: undefined,
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
      company_desription: "",
      phone: undefined,
      instagram: undefined,
      site: undefined,
      email: undefined,
      legal_address: undefined,
      company_desription: undefined,
      mail_at_peopel: undefined,
      phoneAt_peopel: undefined,
      bio: undefined,
      features_job: undefined,
      position: undefined,
      pay_character: undefined,
      individual_conditions_job: undefined,
      work_begin_with_him: undefined,
      tags: [],
      branch_officeGeo: [],
      time: undefined,
      mounth: undefined,
      branch_office: undefined,
      year: undefined,
      status: undefined,
      importance: undefined,
      description: undefined,
      diff: [],
      agentGeo: [],
      russiaCity: [],
      agentHill: [],
      oblast: [],
      oblastAgent: [],
      branch_office_sity: undefined,
      sity: undefined,
      number_phone: undefined,
      peopelResults: [],
      GeoOficeHelper: [],
      AgentOfficeFabrics: [],
      AgentPeopelFabrics: [],
      partners: undefined,
      Customer_Submitted: undefined,
      // ? todo
      Notes: undefined,
      booker_phone: undefined,
      booker_email: undefined,
      post_address: undefined,
      notes:undefined
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
  handelAddingToMager = managListTo => {
    let { manageList } = this.state;
    let tags = [];
    let msg;
    for (let i of manageList) {
      for (let im of managListTo) {
        if (im === i.name) {
          tags.push(i);
        }
      }
    }
    this.setState({ manageAdd: managListTo, tags: tags });
  };
  RussiaSityHelper = sity => {
    GetRussiaCitiFind(sity).then(data => {
      this.setState({ russiaCity: data });
    });
  };

  RussiaOblastHelper = oblast => {
    GetRussiaOblastHelper(oblast).then(data => {
      this.setState({ oblast: data });
    });
  };
  nextStepOne = () => {
    let { GeoOficeHelper, currentStep } = this.state

    /*@FABRIC
      ------------------ office -----------------
      @branch_office {id}
      @branch_officeGeo {id}
      @branch_office_sity {id}
      @number_phone {id}
      @adress {id}
      @dependence  {GeoOficeHelper} state
    */

    let structuresDOMfabric = []
    if (GeoOficeHelper.length != 0) {
      for (let i = 0; GeoOficeHelper.length > i; i++) {
        let name = document.getElementById(`branch_office${i}`).value
        let branch_officeGeoHTML = document.querySelector(`#branch_officeGeo${i} > div > div > ul > li.ant-select-selection__choice > div`)
        let sityHTML = document.querySelector(`#branch_office_sity0 > div > div > ul > li.ant-select-selection__choice > div`)
        let number_phone = document.getElementById(`number_phone${i}`).value
        let addres = document.getElementById(`adress${i}`).value
        let region = document.getElementById(`region${i}`)
        if (branch_officeGeoHTML != null && sityHTML != null) {
          structuresDOMfabric.push([

            ObjHelperShape(name, "name"),
            ObjHelperShape(branch_officeGeoHTML.innerText, "region"),
            ObjHelperShape(sityHTML.innerText, "sity"),
            ObjHelperShape(number_phone, "number_phone"),
            ObjHelperShape(addres, "adress"),
          ])
        }
      }
      structuresDOMfabric.lenght === 0 ? (this.setState({ currentStep: currentStep + 1 })) : (this.setState({ AgentOfficeFabrics: structuresDOMfabric, currentStep: currentStep + 1 }))

    }
    this.nextStep()

  }
  nextStepfour = () => {
    let { peopelResults, currentStep } = this.state
    /*@FABRIC
      ------------------ Human -------------------
      @HumanPhone {id}
      @Humanbio {id}
      @HumanEmail {id}
      @HumanPosition {id}
      @HumanFeatures_job {id}
      @HumanCommon {id}
      @dependence {peopelResults} state
    */
    let structuresDOMfabric = []

    if (peopelResults.length != 0) {
      for (let i = 0; peopelResults.length > i; i++) {
        let phoneAt_peopel = document.getElementById(`HumanPhone${i}`).value
        let bio = document.getElementById(`Humanbio${i}`).value
        let mail_at_peopel = document.getElementById(`HumanEmail${i}`).value
        let common = document.getElementById(`HumanCommon${i}`).value
        let position = document.getElementById(`HumanPosition${i}`).value
        let features_job = document.getElementById(`HumanFeatures_job${i}`).value
        if (bio.length != 0) {
          structuresDOMfabric.push([
            ObjHelperShape(phoneAt_peopel, "phoneAt_peopel"),
            ObjHelperShape(bio, "bio"),
            ObjHelperShape(mail_at_peopel, "mail_at_peopel"),
            ObjHelperShape(common, "common"),
            ObjHelperShape(position, "position"),
            ObjHelperShape(features_job, "features_job")
          ])
        }
      }
      structuresDOMfabric.lenght === 0 ? (this.setState({ currentStep: currentStep + 1 })) : (this.setState({ AgentPeopelFabrics: structuresDOMfabric, currentStep: currentStep + 1 }))

    }
    this.nextStep()
  }
  newAgentClick = () => {
    let whoAdd;
    let role = isAuthenticated().direct.role;
    let resultValid = ["Директор", "Управляющий"].includes(role);

    if (resultValid) {
      let {
        number_phone,
        position,
        features_job,
        bio,
        phoneAt_peopel,
        mail_at_peopel,
        checkedList,
        tags,
        branch_office,
        agentGeo,
        branch_officeGeo,
        OGRN,
        manageAdd,
        specialications,
        TechMap,
        name,
        full_name,
        INN,
        company_desription,
        legal_address,
        actual_address,
        email,
        site,
        instagram,
        phone,
        WhereFromClient,
        work_begin_with_him,
        individual_conditions_job,
        pay_character,
        branch_office_sity,
        agentHill,
        oblastAgent,
        AgentOfficeFabrics,
        AgentPeopelFabrics,
        partners,
        Customer_Submitted,
        TechAgent,
        Notes,
        booker_phone,
        booker_email,
        post_address,
        notes
      } = this.state;
      let FilteredOfice;
      let FilteredGeo = [];

      let msg;
      whoAdd = {
        name: isAuthenticated().direct.name,
        _id: isAuthenticated().direct._id
      };
      if (name === undefined) {
        msg = "Имя является обязатльным параметром";
        this.openNotificationValidationError(msg);
        this.setState({ currentStep: 0 });
      }
      if (full_name === undefined) {
        msg = "Полное имя является обязатльным параметром";
        this.openNotificationValidationError(msg);
        this.setState({ currentStep: 0 });
      }
      if (INN === undefined) {
        msg = "Введите ИНН ";
        this.openNotificationValidationError(msg);
        this.setState({ currentStep: 0 });
      }
      if (company_desription === undefined) {
        msg = "Описание компании не найдено, похоже вы забыли его добавить";
        this.openNotificationValidationError(msg);
      }
      if (WhereFromClient === undefined) {
        this.setState({ currentStep: 4 });
        msg = "Откуда пришел клиент, не заполненно";
        return this.openNotificationValidationError(msg);
      }
      if (work_begin_with_him === undefined) {
        this.setState({ currentStep: 4 });
        msg = "Как началась работа с клиентом, не заполненно";
        return this.openNotificationValidationError(msg);
      }
      let postedBy = isAuthenticated().direct._id;
      // branch_office_sity,
      // agentHill,
      // oblastAgent
      let newAgent = {
        OGRN,
        agentGeo,
        manageAdd,
        specialications,
        postedBy,
        TechAgent,
        name,
        tags,
        full_name,
        INN,
        company_desription,
        legal_address,
        actual_address,
        email,
        site,
        instagram,
        phone,
        WhereFromClient,
        work_begin_with_him,
        individual_conditions_job,
        pay_character,
        hill: agentHill,
        partners,
        Customer_Submitted,
        Notes,
        booker_phone,
        booker_email,
        post_address,
        notes
      };
      let AgentFeatus;
      FilteredGeo.push(branch_officeGeo);
      if (branch_office === undefined) {
        AgentFeatus = undefined;
      } else {
        AgentFeatus = {
          region: branch_officeGeo,
          sity: branch_office_sity,
          name: branch_office,
          number_phone: number_phone
        };
      }
      let AgentBranch
      let AgentPeopel
      // РАБОТАЕТ НЕ ТРОЖЬ БЛЯТЬ!!!111
      if (AgentOfficeFabrics.length != 0) {
        let normaliz = []
        let newItem

        for (let el of AgentOfficeFabrics) {
          newItem = {}
          for (let i of el)
            if (i != null) {

              for (let [key, value] of Object.entries(i)) {
                newItem[key] = value
              }
            }
          normaliz.push(newItem)
        }
        AgentBranch = normaliz
      }
      if (AgentPeopelFabrics.length != 0) {
        let normaliz = []
        let newItem

        for (let el of AgentPeopelFabrics) {
          newItem = {}
          for (let i of el)
            if (i != null) {

              for (let [key, value] of Object.entries(i)) {
                newItem[key] = value
              }
            }
          normaliz.push(newItem)
        }
        AgentPeopel = normaliz
      }
      let body = {
        AgentBranch,
        AgentPeopel,
        newAgent,
        whoAdd
      };
      NewAgentAddRegulatoryPosition(body).then(data => {
        message.success("Агент зарегестрирован!");
        this.setState({
          currentStep: 0,
          company: "",
          name: undefined,
          full_name: undefined,
          phone: undefined,
          INN: undefined,
          general_director: undefined,
          OGRN: undefined,
          email: undefined,
          any: undefined,
          legal_address: undefined,
          actual_address: undefined,
          payment_account: undefined,
          specialications: [],
          manageAdd: [],
          company_desription: "",
          phone: undefined,
          instagram: undefined,
          site: undefined,
          email: undefined,
          legal_address: undefined,
          company_desription: undefined,
          mail_at_peopel: undefined,
          phoneAt_peopel: undefined,
          bio: undefined,
          features_job: undefined,
          position: undefined,
          pay_character: undefined,
          individual_conditions_job: undefined,
          work_begin_with_him: undefined,
          tags: [],
          branch_officeGeo: [],
          branch_office: undefined,
          WhereFromClient: undefined,
          agentGeo: [],
          TechAgent: [],
          checkedList: defaultCheckedList,
          branch_office_sity: undefined,
          agentHill: undefined,
          oblastAgent: undefined,
          branch_officeGeo: undefined,
          number_phone: undefined,
          AgentPeopelFabrics: [],
          AgentOfficeFabrics: [],
          peopelResults: [],
          GeoOficeHelper: [],
          partners: undefined,
          Customer_Submitted: undefined
        });
      });
    } else {
      let managerId = isAuthenticated().direct._id;

      let {
        OGRN,
        agentGeo,
        manageAdd,
        specialications,
        postedBy,
        TechMap,
        name,
        full_name,
        INN,
        company_desription,
        legal_address,
        actual_address,
        email,
        site,
        instagram,
        phone,
        WhereFromClient,
        work_begin_with_him,
        individual_conditions_job,
        pay_character,
        branch_office_sity,
        agentHill,
        oblastAgent,
        branch_office,
        branch_officeGeo,
        number_phone,
        time,
        mounth,
        year,
        status,
        importance,
        description,
        tags,
        diff,
        position,
        features_job,
        bio,
        phoneAt_peopel,
        mail_at_peopel,
        checkedList,
        userRole,
        AgentOfficeFabrics,
        AgentPeopelFabrics,
        partners,
        Customer_Submitted,
        TechAgent
      } = this.state;
      let msg;
      if (name === undefined) {
        msg = "Имя является обязатльным параметром";
        return this.openNotificationValidationError(msg);
      }
      if (full_name === undefined) {
        msg = "Полное имя является обязатльным параметром";
        return this.openNotificationValidationError(msg);
      }
      if (INN === undefined) {
        msg = "Введите ИНН ";
        return this.openNotificationValidationError(msg);
      }
      if (company_desription === undefined) {
        msg = "Описание компании не найдено, похоже вы забыли его добавить";
        return this.openNotificationValidationError(msg);
      }
      if (WhereFromClient === undefined) {
        msg = "Откуда пришел клиент, не заполненно";
        return this.openNotificationValidationError(msg);
      }
      if (work_begin_with_him === undefined) {
        msg = "Как началась работа с клиентом, не заполненно";
        return this.openNotificationValidationError(msg);
      }
      let newAgent = {
        agentGeo,
        manageAdd,
        specialications,
        postedBy,
        TechMap,
        name,
        tags,
        full_name,
        INN,
        company_desription,
        legal_address,
        actual_address,
        email,
        site,
        instagram,
        phone,
        WhereFromClient,
        work_begin_with_him,
        individual_conditions_job,
        pay_character,
        agentHill,
        oblastAgent,
        partners,
        Customer_Submitted
      };
      let AgentBranch;
      let AgentPeopel;
      if (AgentOfficeFabrics.length != 0) {
        let normaliz = []
        let newItem

        for (let el of AgentOfficeFabrics) {
          newItem = {}
          for (let i of el)
            if (i != null) {

              for (let [key, value] of Object.entries(i)) {
                newItem[key] = value
              }
            }
          normaliz.push(newItem)
        }
        AgentBranch = normaliz
      }
      if (AgentPeopelFabrics.length != 0) {
        let normaliz = []
        let newItem

        for (let el of AgentPeopelFabrics) {
          newItem = {}
          for (let i of el)
            if (i != null) {

              for (let [key, value] of Object.entries(i)) {
                newItem[key] = value
              }
            }
          normaliz.push(newItem)
        }
        AgentPeopel = normaliz
      }
      let todo = {
        time,
        mounth,
        year,
        status,
        importance,
        description,
        tags,
        diff
      };
      whoAdd = {
        name: isAuthenticated().direct.name,
        _id: isAuthenticated().direct._id
      };
      let body = {
        newAgent,
        AgentPeopel,
        AgentBranch,
        todo,
        whoAdd
      };
      NewAgentAddManager(body).then(data => {
        message.success("Агент добавлен!");
        this.setState({
          currentStep: 0,
          company: "",
          name: undefined,
          full_name: undefined,
          phone: undefined,
          INN: undefined,
          general_director: undefined,
          OGRN: undefined,
          email: undefined,
          any: undefined,
          legal_address: undefined,
          actual_address: undefined,
          payment_account: undefined,
          inputQality: [],
          specialications: [],
          manageList: [],
          manageAdd: [],
          company_desription: "",
          phone: undefined,
          instagram: undefined,
          site: undefined,
          email: undefined,
          legal_address: undefined,
          company_desription: undefined,
          mail_at_peopel: undefined,
          phoneAt_peopel: undefined,
          bio: undefined,
          features_job: undefined,
          position: undefined,
          pay_character: undefined,
          individual_conditions_job: undefined,
          work_begin_with_him: undefined,
          tags: [],
          branch_officeGeo: [],
          branch_office: undefined,
          WhereFromClient: undefined,
          agentGeo: [],
          TechAgent: [],
          checkedList: defaultCheckedList,
          branch_office_sity: undefined,
          agentHill: undefined,
          oblastAgent: undefined,
          branch_officeGeo: undefined,
          number_phone: undefined,
          peopelResults: [],
          GeoOficeHelper: [],
          partners: undefined,
          Customer_Submitted: undefined
        });
      });
    }
  };

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
  handelChangeAgentHill = value => {
    this.setState({ agentHill: value });
  };
  openNotificationError() {
    notification.open({
      message: "Ой что то пошло не так, мне жаль",
      icon: <Icon type="frown" style={{ color: "#108ee9" }} />
    });
  }
  sitiBranchAgentHelper = value => {
    this.setState({ branch_office_sity: value });
  };
  onPanelChange = momentObj => {
    let time = moment(momentObj)
      .locale("ru")
      .format("LL");
    let mounth = moment(momentObj)
      .locale("ru")
      .format("MM");
    let year = moment(momentObj)
      .locale("ru")
      .format("YY");
    let diff = [];
    diff.push(moment(momentObj).toDate());
    let tags = [];
    let status = "system";
    let importance = "Очень важное";
    let description = "TESTING";
    let user = {
      _id: isAuthenticated().direct._id,
      name: isAuthenticated().direct.name
    };
    tags.push(user);
    this.setState({
      time: time,
      mounth: mounth,
      year: year,
      tags: tags,
      status: status,
      importance: importance,
      description: description,
      diff: diff
    });
  };
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
  onChangeGroup = checkedList => {
    this.setState({
      checkedList,
      indeterminate:
        !!checkedList.length && checkedList.length < plainOptions.length,
      checkAll: checkedList.length === plainOptions.length
    });
  };
  openNotificationValidationError(msg) {
    notification.open({
      message: `${msg}`,
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
  handleSelectOblastbranch_officeGeo = (branch_officeGeo, activeState) => {
    this.setState({ [activeState]: branch_officeGeo });
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
  addPeopel = () => {
    let { peopelResults } = this.state
    peopelResults.push({})
    this.setState({ peopelResults })
  }
  deleteInputNewPeopel = (elInc) => {
    let newSect = [];
    let { peopelResults } = this.state;
    peopelResults.map((serct, i) => (i === elInc ? null : newSect.push(serct)));
    this.setState({ peopelResults: newSect });

  }
  addbranch_office = () => {
    let { GeoOficeHelper } = this.state
    GeoOficeHelper.push({})
    this.setState({ GeoOficeHelper })
  }
  deletebranch_office = (elInc) => {
    let newSect = [];
    let { GeoOficeHelper } = this.state;
    GeoOficeHelper.map((serct, i) => (i === elInc ? null : newSect.push(serct)));
    this.setState({ GeoOficeHelper: newSect });
  }
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
            <div className="row boootstrap_helperColumn justify-content-between">

              <h1 className="input_new_agent agentnew_front">
                Компания
                    </h1>
              <p className="input_new_agent agentnew_front">Короткое имя</p>
              <Input
                addonBefore={<div className="required-start">*</div>}
                size="large"
                className="input_new_agent requre_input"
                placeholder="Короткое имя"
                value={this.state.name}
                onChange={this.handleChange("name")}
              />
              <p className="input_new_agent agentnew_front">Полное имя</p>
              <Input
                addonBefore={<div className="required-start">*</div>}
                size="large"
                className="input_new_agent requre_input"
                placeholder="Полное имя"
                value={this.state.full_name}
                onChange={this.handleChange("full_name")}
              />
              <p className="input_new_agent agentnew_front">Область</p>
              <Select
                style={{ width: "250px" }}
                className="input_new_agent"
                mode="multiple"
                // size="large"
                // dropdownClassName=""
                notFoundContent="Введите название области"
                placeholder="Выберите область котрагента"
                dropdownClassName="SelectHelper"
                value={this.state.agentGeo}
                onChange={this.handleSelectOblastChange}
                onSearch={debounce(this.RussiaOblastHelper, 450)}
              >

                {this.state.oblast.map(map => (
                  <Select.Option key={map.oblast} value={map.oblast}>
                    {map.oblast}
                  </Select.Option>
                ))}
              </Select>
              <p className="input_new_agent  agentnew_front">Город</p>
              <Select
                style={{ width: "250px" }}
                className="input_new_agent select_helper_render"
                dropdownClassName="select_helper_render"
                mode="multiple"
                size="large"
                dropdownStyle={true}
                placeholder="Выберите город  котрагента"
                notFoundContent="Введите название города"
                value={this.state.agentHill}
                onChange={this.handelChangeAgentHill}
                onSearch={debounce(this.RussiaSityHelper, 700)}
              >
                {this.state.russiaCity.map(map => (
                  <Select.Option key={map.city} value={map.city}>
                    {map.city}
                  </Select.Option>
                ))}
              </Select>
              <p className="input_new_agent agentnew_front">ИНН/КПП</p>
              <Input
                className="input_new_agent"
                addonBefore={<div className="required-start">*</div>}
                size="large"
                placeholder="ИНН/КПП"
                value={this.state.INN}
                onChange={this.handleChange("INN")}
              />{" "}
              <p className="input_new_agent agentnew_front">ОГРН</p>
              <Input
                className="input_new_agent"
                size="large"
                placeholder="ОГРН"
                value={this.state.OGRN}
                onChange={this.handleChange("OGRN")}
              />
              <p className="input_new_agent agentnew_front">Партнеры</p>
              <Input
                onChange={this.handleChange("partners")}
                value={this.state.partners}
                className="input_new_agent"
                size="large"
                placeholder="Партнеры"
              />
              <hr className="input_new_agent" />
              <div className="input_helper">
                <h1 className="input_new_agent agentnew_front">
                  Подразделения
                    </h1>
                <PlusCircleOutlined className="input_new_agent" onClick={() => this.addbranch_office()} style={{ fontSize: "32px", color: "#2196F3", marginTop: "5px", marginBottom: "5px" }} />

                {this.state.GeoOficeHelper.lenght === 0 ? (null) : (
                  <span>
                    {this.state.GeoOficeHelper.map((item, i) => (
                      <span>
                        <div>

                          <NewAgentBracnchOfice CommonProps={this.state.AgentOfficeFabrics[i]} fabricState={`${i}`} />
                          <DeleteOutlined className="input_new_agent" onClick={() => this.deletebranch_office(i)} style={{ fontSize: "25px", color: "#e91e63c4" }} />

                        </div>
                      </span>
                    ))}
                  </span>
                )}
              </div>
            </div>

          </div>
        )
      },
      {
        title: "Комментарии",
        content: (
          <div className="">
            <div className="row boootstrap_helperColumn justify-content-between">

              <h1 className="input_new_agent agentnew_front">
                Комментарии
                    </h1>
              <p className="input_new_agent agentnew_front">Описание</p>
              <TextArea
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
            </div>

          </div>
        )
      },
      {
        title: "Адрес/контакты",
        content: (
          <>
            <div className="row boootstrap_helperColumn justify-content-between">

              <h1 className="input_new_agent agentnew_front">
                Адрес/контакты
                    </h1>
              <p className="input_new_agent agentnew_front">
                Юридический адрес
                </p>
              <Input
                size="large"
                value={this.state.legal_address}
                onChange={this.handleChange("legal_address")}
                className="input_new_agent "
                placeholder=" Юридический адрес:"
              />
              <p className="input_new_agent agentnew_front">
                Фактический адрес
                </p>
              <Input
                size="large"
                value={this.state.actual_address}
                onChange={this.handleChange("actual_address")}
                className="input_new_agent "
                placeholder="Фактический адрес:"
              />
              <p className="input_new_agent agentnew_front">
                Почтовый адрес
                </p>
              <Input
                size="large"
                value={this.state.post_address}
                onChange={this.handleChange("post_address")}
                className="input_new_agent "
                placeholder="Почтовый адрес:"
              />
              <p className="input_new_agent agentnew_front">Email</p>
              <Input
                size="large"
                value={this.state.email}
                onChange={this.handleChange("email")}
                className="input_new_agent "
                placeholder="Email:"
              />
              <p className="input_new_agent agentnew_front">Сайт</p>
              <Input
                size="large"
                value={this.state.site}
                onChange={this.handleChange("site")}
                className="input_new_agent "
                placeholder="Сайт:"
              />
              <p className="input_new_agent agentnew_front">Инстаграм</p>
              <Input
                size="large"
                value={this.state.instagram}
                onChange={this.handleChange("instagram")}
                className="input_new_agent "
                placeholder="Инстаграм:"
              />{" "}
              <p className="input_new_agent agentnew_front">Общий телефон</p>
              <Input
                size="large"
                value={this.state.phone}
                onChange={this.handleChange("phone")}
                className="input_new_agent"
                placeholder="Общий тел:"
              />
              <p className="input_new_agent agentnew_front">Телефон бухгалтерии</p>
              <Input
                size="large"
                value={this.state.booker_phone}
                onChange={this.handleChange("booker_phone")}
                className="input_new_agent"
                placeholder="Тел. бухгалтерии"

              />
              <p className="input_new_agent agentnew_front">Почта бухгалтерии</p>
              <Input
                size="large"
                value={this.state.booker_email}
                onChange={this.handleChange("booker_email")}
                className="input_new_agent"
                placeholder="Почта бухгалтерии"

              />
            </div>

          </>
        )
      },
      {
        title: "Контактные лица",
        content: (
          <>
            <div className="row boootstrap_helperColumn justify-content-between">


              <h1 className="input_new_agent agentnew_front">Контактные Лица</h1>
              {this.state.peopelResults.length === 0 ? (<>  <div><PlusCircleOutlined onClick={() => this.addPeopel()} style={{ fontSize: "32px", color: "#2196F3", marginTop: "5px", marginBottom: "5px" }} /></div>
              </>) : (<div>{this.state.peopelResults.map((el, i) => (
                <div>
                  <div>
                    <NewAgentPeopel CommonProps={this.state.AgentPeopelFabrics[i]} fabricState={i} />
                    <DeleteOutlined className="input_new_agent" onClick={() => this.deleteInputNewPeopel(i)} style={{ fontSize: "25px", color: "#e91e63c4", marginTop: "5px", marginBottom: "5px" }} />
                  </div>

                </div>
              ))}
                <PlusCircleOutlined onClick={() => this.addPeopel()} style={{ fontSize: "32px", color: "#2196F3" }} />
              </div>)}
            </div>
          </>
        )
      },

      {
        title: "Начало работы",
        content: (
          <>
            <div className="row boootstrap_helperColumn justify-content-between">

              <h1 className="input_new_agent agentnew_front">
                Начало работы
                    </h1>
              <p className="input_new_agent agentnew_front">
                Откуда пришел клиент  <span className="requre_input">*</span>
              </p>
              <TextArea
                size="large"
                onChange={this.handleChange("WhereFromClient")}
                value={this.state.WhereFromClient}
                className="input_new_agent"
                addonBefore={<div className="required-start">*</div>}
                placeholder="Откуда пришел клиент :"
              />
              <p className="input_new_agent agentnew_front">
                Как начиналась с ним работа <span className="requre_input">*</span>
              </p>

              <TextArea
                size="large"
                className="input_new_agent"
                onChange={this.handleChange("work_begin_with_him")}
                value={this.state.work_begin_with_him}
                addonBefore={<div className="required-start">*</div>}
                placeholder=" Как начиналась с ним работа:"
              />
              <p className="input_new_agent agentnew_front">
                Это переданный (от кого передан) <span className="requre_input">*</span>
              </p>
              <TextArea
                size="large"
                className="input_new_agent"
                onChange={this.handleChange("Customer_Submitted")}
                value={this.state.Customer_Submitted}
                addonBefore={<div className="required-start">*</div>}
                placeholder="Это переданный (от кого передан)работа:"
              />
              {["Менеджер"].includes(userRole) ? (
                <>
                  <div className="input_new_agent site-calendar-demo-card">
                    <p className="input_new_agent agentnew_front">
                      Начать работу с ним с числа
                      </p>
                    <Calendar
                      mode="mounth"
                      locale={Localisation}
                      validRange={[
                        moment(Date.now()),
                        moment(Date.now()).add("days", 10)
                      ]}
                      locate={{}}
                      fullscreen={false}
                      onSelect={this.onPanelChange}
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

          </>
        )
      },
      {
        title: "Особые пометки",
        content: (
          <>
            <div className="row boootstrap_helperColumn justify-content-between">

              <h1 className="input_new_agent agentnew_front">
                Особые пометки
                    </h1>
                    <TextArea
                style={{ width: "100%" }}
                className="input_new_agent_helper"
                value={this.state.notes}
                onChange={this.handleChange("notes")}
                placeholder="Заметки:"
                allowClear
              />
              <TextArea
                style={{ width: "100%" }}
                className="input_new_agent_helper"
                value={this.state.individual_conditions_job}
                onChange={this.handleChange("individual_conditions_job")}
                placeholder=" Индивидуальные условия работы с клиентом:"
                allowClear
              />
              <TextArea
                size="large"
                className="input_new_agent_helper"
                value={this.state.pay_character}
                onChange={this.handleChange("pay_character")}
                placeholder="Характер предлагаемой цены для клиента:"
              />

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
              <>
                {this.state.currentStep === 0 ? (<Button type="primary" onClick={() => this.nextStepOne()}>
                  Следующий шаг
                </Button>) : (null)}
                {this.state.currentStep === 3 ? (<Button type="primary" onClick={() => this.nextStepfour()}>
                  Следующий шаг
                </Button>) : (null)}
                {this.state.currentStep === 1 ? (<Button type="primary" onClick={() => this.nextStep()}>
                  Следующий шаг
                </Button>) : (null)}
                {this.state.currentStep === 2 ? (<Button type="primary" onClick={() => this.nextStep()}>
                  Следующий шаг
                </Button>) : (null)}
                {this.state.currentStep === 4 ? (<Button type="primary" onClick={() => this.nextStep()}>
                  Следующий шаг
                </Button>) : (null)}
                {this.state.currentStep === 5 ? (<Button type="primary" onClick={() => this.nextStep()}>
                  Следующий шаг
                </Button>) : (null)}
                {this.state.currentStep === 6 ? (<Button type="primary" onClick={() => this.nextStep()}>
                  Следующий шаг
                </Button>) : (null)}
              </>

            )}
            {this.state.currentStep === steps.length - 1 && (
              <Button type="primary" onClick={this.newAgentClick}>
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
          width={window.innerWidth / 2}
          placement="right"
          closable={false}
          onClose={this.onCloseTechDriwer}
          visible={this.state.visibleTechDriwer}
        >
          <Switch
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
          width={window.innerWidth / 2}
          closable={false}
          onClose={this.onCloseSpecDriwer}
          visible={this.state.visibleSpecDriwer}
        >
          <div className="specListsEditor">
            <div className="drawer_flex">
              <Select
                // className="col-xs-12"
                mode="multiple"
                style={{ width: "100%" }}
                placeholder="Выберите специализацию"
                notFoundContent="Не найдено специализаций"
                value={this.state.specialications}
                onChange={this.handelChangeSpec}
              >
                {this.state.specialicationsToBase.map(map => (
                  <Select.Option key={map} value={map}>
                    {map}
                  </Select.Option>
                ))}
              </Select>
              <div>
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
              </div>
            </div>
            <div></div>
          </div>
          <div className="editor_regim">
            <div className="row boootstrap_helperColumn">

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
