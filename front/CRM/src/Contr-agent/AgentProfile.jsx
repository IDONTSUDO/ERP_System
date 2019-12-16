import React, { Component } from "react";
import ReactTags from "react-tag-autocomplete";
import { GetAgentProfile, list, AddManageForAgent,PricedAtManage  } from "../Api/Http";
import { Button, Descriptions, Icon, notification,Tabs } from "antd";
import { isAuthenticated } from "../Api/Auth";
import {Link} from "react-router-dom"
const { TabPane } = Tabs;

export default class AgentProfile extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      tags: [],
      user: "",
      company: "",
      name: "",
      full_name: "",
      phone: "",
      INN: "",
      general_director: "",
      OGRN: "",
      email: "",
      worker: [],
      any: "",
      legal_address: "",
      actual_address: "",
      payment_account: "",
      redirectTo: false
    };
  }

  componentDidMount() {
    const agentId = this.props.match.params.agentId;
    GetAgentProfile(agentId).then(data => {
      if (data.error) {
        this.setState({ redirectToProfile: true });
      } else {
        this.setState({
          id: data._id,
          name: data.name,
          email: data.email,
          company: data.company,
          full_name: data.full_name,
          phone: data.phone,
          INN: data.INN,
          general_director: data.general_director,
          OGRN: data.OGRN,
          tags: data.tags,
          any: data.any,
          legal_address: data.legal_address,
          actual_address: data.actual_address,
          payment_account: data.payment_account
        });
      }
    });
    list().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ worker: data });
      }
    });
  }
  handleDelete(i) {
    const tags = this.state.tags.slice(0);
    tags.splice(i, 1);
    this.setState({ tags });
  }

  handleAddition(tag) {
    const tags = [].concat(this.state.tags, tag);
    this.setState({ tags });
  }
  handleChange = date => {
    this.setState({
      startDate: date
    });
  };
  handleAction = name => event => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };
  clickSubmit = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const { tags, id } = this.state;
    const token = isAuthenticated().token;
    AddManageForAgent(tags, id, token).then(data => {
      if (data.error) {
        this.openNotificationError();
      } else {
        this.openNotificationNewUserList();
        this.forceUpdate();
      }
    });
  };

  forceUpdate() {
    const agentId = this.props.match.params.agentId;
    GetAgentProfile(agentId).then(data => {
      if (data.error) {
        this.setState({ redirectToProfile: true });
      } else {
        this.setState({
          id: data._id,
          name: data.name,
          email: data.email,
          company: data.company,
          full_name: data.full_name,
          phone: data.phone,
          INN: data.INN,
          general_director: data.general_director,
          OGRN: data.OGRN,
          tags: data.tags,
          any: data.any,
          legal_address: data.legal_address,
          actual_address: data.actual_address,
          payment_account: data.payment_account,
          result:[]
        });
      }
    });
    list().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ worker: data });
      }
    });
  }

  openNotificationError() {
    notification.open({
      message: "Ой что то пошло не так, мне жаль",
      icon: <Icon type="frown" style={{ color: "#108ee9" }} />
    });
  }
  openNotificationNewUserList() {
    notification.open({
      message: "Назначено",
      icon: <Icon type="smile" style={{ color: "#108ee9" }} />
    });
  }
  render() {
    const {
      email,
      OGRN,
      general_director,
      INN,
      phone,
      full_name,
      name,
      company,
      worker,
      any,
      legal_address,
      actual_address,
      payment_account,
      id
    } = this.state;
    return (
      <div>
        <div className="postisitonRelativeSmeni">
          <div className="">
            <Descriptions title="Корпаративная  информация" layout="vertical">
              <Descriptions.Item label="Имя компании">
                <p>{name}</p>
              </Descriptions.Item>
              <Descriptions.Item label="Телефон">{phone}</Descriptions.Item>
              <Descriptions.Item label="Компания">{company}</Descriptions.Item>
              <Descriptions.Item label="Адрес" span={2}>
                {legal_address}
              </Descriptions.Item>
              <Descriptions.Item label="Генеральный директор">
                {general_director}
              </Descriptions.Item>
            </Descriptions>
            {/* <Tabs defaultActiveKey="2">
    <TabPane
      tab={
        <span>
        <h6>Закрепеленные работники</h6>
         
        </span>
      }
      key="1"
    > */}
      <div className="Tags">
              <ReactTags
                placeholder={"Добавте менеджера"}
                tags={this.state.tags}
                suggestions={worker}
                handleDelete={this.handleDelete.bind(this)}
                handleAddition={this.handleAddition.bind(this)}
              />
            </div>
            <div style={{ padding: "5px" }}></div>
            <Button onClick={this.clickSubmit}>Назначить</Button>
    {/* </TabPane> */}
    {/* <TabPane
      tab={
        <span>
            <h6>Доля от %</h6>
        </span>
      }
      key="2"
    >
    </TabPane> */}
  {/* </Tabs> */}

            
          </div>
        </div>
      </div>
    );
  }
}

// import React, { Component } from "react";
// import ReactTags from "react-tag-autocomplete";
// import {
//   GetAgentProfile,
//   list,
//   AddManageForAgent,
//   PricedAtManage,
//   NewPricedAtAgent,
//   DeleteManageAtAgent
// } from "../Api/Http";
// import {
//   Button,
//   Descriptions,
//   Icon,
//   notification,
//   Tabs,
//   InputNumber,
//   Select
// } from "antd";
// import { isAuthenticated } from "../Api/Auth";
// import { Link } from "react-router-dom";
// import Error from "../Error/Error.jsx";

// const { Option, OptGroup } = Select;
// const { TabPane } = Tabs;

// export default class AgentProfile extends Component {
//   constructor() {
//     super();
//     this.state = {
//       id: "",
//       tags: [],
//       user: "",
//       company: "",
//       name: "",
//       full_name: "",
//       phone: "",
//       INN: "",
//       general_director: "",
//       OGRN: "",
//       email: "",
//       worker: [],
//       any: "",
//       legal_address: "",
//       actual_address: "",
//       payment_account: "",
//       redirectTo: false,
//       percent: 2,
//       NewManage: "",
//       manageList: [],
//       error: false
//     };
//   }
//   handleClick(collectionId) {
//     console.log(collectionId);
//     // DeleteManageAtAgent
//   }
//   componentDidMount() {
//     const agentId = this.props.match.params.agentId;
//     GetAgentProfile(agentId).then(data => {
//       if (data.error) {
//         this.setState({ redirectToProfile: true });
//       } else {
//         this.setState({
//           id: data._id,
//           name: data.name,
//           email: data.email,
//           company: data.company,
//           full_name: data.full_name,
//           phone: data.phone,
//           INN: data.INN,
//           general_director: data.general_director,
//           OGRN: data.OGRN,
//           tags: data.tags,
//           any: data.any,
//           legal_address: data.legal_address,
//           actual_address: data.actual_address,
//           payment_account: data.payment_account
//         });
//       }
//     });
//     list().then(data => {
//       if (data.error) {
//         console.log(data.error);
//       } else {
//         this.setState({ worker: data });
//         PricedAtManage(agentId).then(data => {
//           if (data.error) {
//             this.setState({ error: true });
//           } else {
//             console.log(data);
//             this.setState({ manageList: data });
//           }
//         });
//       }
//     });
//   }
//   handleChange = value => {
//     this.setState({ NewManage: value });
//   };
//   handleChangePercent = value => {
//     this.setState({ percent: value });
//   };
//   handleAction = name => event => {
//     this.setState({ error: "" });
//     this.setState({ [name]: event.target.value });
//   };
//   clickSubmit = event => {
//     event.preventDefault();
//     const agentId = this.props.match.params.agentId;
//     let { percent, NewManage } = this.state;
//     this.setState({ loading: true });

//     let Name = NewManage.slice(24);
//     let idmanage = NewManage.slice(0, -6);
//     let userBy = { name: Name, id: idmanage };

//     NewPricedAtAgent(userBy, agentId, percent).then(data => {
//       if (data.error) {
//       } else {
//         this.forceUpdate();
//         this.openNotificationNewUserList();
//       }
//     });
//   };

//   forceUpdate() {
//     const agentId = this.props.match.params.agentId;
//     GetAgentProfile(agentId).then(data => {
//       if (data.error) {
//         this.setState({ redirectToProfile: true });
//       } else {
//         this.setState({
//           id: data._id,
//           name: data.name,
//           email: data.email,
//           company: data.company,
//           full_name: data.full_name,
//           phone: data.phone,
//           INN: data.INN,
//           general_director: data.general_director,
//           OGRN: data.OGRN,
//           tags: data.tags,
//           any: data.any,
//           legal_address: data.legal_address,
//           actual_address: data.actual_address,
//           payment_account: data.payment_account,
//           result: []
//         });
//       }
//     });
//     list().then(data => {
//       if (data.error) {
//         console.log(data.error);
//       } else {
//         this.setState({ worker: data });
//       }
//     });
//     PricedAtManage(agentId).then(data => {
//       if (data.error) {
//         this.setState({ error: true });
//       } else {
//         console.log(data);
//         this.setState({ manageList: data });
//       }
//     });
//   }

//   openNotificationNewUserList() {
//     notification.open({
//       message: "Назначено",
//       icon: <Icon type="smile" style={{ color: "#108ee9" }} />
//     });
//   }
//   render() {
//     const {
//       email,
//       OGRN,
//       general_director,
//       INN,
//       phone,
//       full_name,
//       name,
//       company,
//       worker,
//       any,
//       legal_address,
//       actual_address,
//       payment_account,
//       id,
//       tags,
//       NewManage,
//       manageList
//     } = this.state;
//     const dataSource = ["Burns Bay Road", "Downing Street", "Wall Street"];

//     return (
//       <div>
//         <div className="postisitonRelativeSmeni">
//           {this.state.error ? (
//             <Error />
//           ) : (
//             <>
//               <div className="">
//                 <Descriptions
//                   title="Корпаративная  информация"
//                   layout="vertical"
//                 >
//                   <Descriptions.Item label="Имя компании">
//                     <p>{name}</p>
//                   </Descriptions.Item>
//                   <Descriptions.Item label="Телефон">{phone}</Descriptions.Item>
//                   <Descriptions.Item label="Компания">
//                     {company}
//                   </Descriptions.Item>
//                   <Descriptions.Item label="Адрес" span={2}>
//                     {legal_address}
//                   </Descriptions.Item>
//                   <Descriptions.Item label="Генеральный директор">
//                     {general_director}
//                   </Descriptions.Item>
//                 </Descriptions>
//                 <Select
//                   onChange={this.handleChange}
//                   defaultValue="Новый менеджер"
//                   style={{ width: 200 }}
//                 >
//                   <OptGroup label="Менеджеры">
//                     {worker.map((manage, i) => (
//                       <Option value={[manage._id] + [manage.name]}>
//                         {manage.name}
//                       </Option>
//                     ))}
//                   </OptGroup>
//                 </Select>
//                 <InputNumber
//                   min={1}
//                   max={100}
//                   formatter={value => `${value}%`}
//                   parser={value => value.replace("%", "")}
//                   onChange={this.handleChangePercent}
//                   defaultValue={this.state.percent}
//                 ></InputNumber>
//                 <Button onClick={this.clickSubmit}>Назначить</Button>
//                 <hr />

//                 {manageList.map((manage, i) => (
//                   <>
//                     <div>
//                       {Object.entries(manage.UserBy).map(([key, value]) =>
//                         key == "id" ? null : (
//                           <div>
//                             {value} {manage.price}%
//                           </div>
//                         )
//                       )}
//                       <Button
//                         type="danger"
//                         onClick={collectionId =>
//                           this.handleClick(manage._id, collectionId)
//                         }
//                       >
//                         Удалить
//                       </Button>
//                     </div>
//                   </>
//                 ))}
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     );
//   }
// }
