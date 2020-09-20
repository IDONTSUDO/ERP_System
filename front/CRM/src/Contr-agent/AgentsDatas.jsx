import React, { Component } from 'react';
import None from '../Components/None.jsx';
import {
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
import { TweenOneGroup } from "rc-tween-one";
import Tree from "react-animated-tree";
import { isAuthenticated } from "../Api/Auth";
import { Typography, Collapse, Switch, Input, Button, notification, Icon, Modal, Drawer, message, Tag, Select } from 'antd';
import { EditOutlined, PlusCircleOutlined, DeleteOutlined } from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;
const { Panel } = Collapse;
const { TextArea } = Input;

export default class AgentsDatas extends Component {
	constructor(props) {
		super(props)
		this.state = {
			agentId: "",
			checkedEdit: false,
			Customer_Submitted: "",
			INN: "",
			OGRN: "",
			TechAgent: [],
			WhereFromClient: "",
			active: true,
			actual_address: "",
			agentGeo: [],
			any: "",
			booker_email: "",
			booker_phone: "",
			company: "",
			company_desription: "",
			email: "",
			full_name: "",
			general_director: "",
			hill: [],
			individual_conditions_job: "",
			legal_address: "",
			name: "",
			notes: "",
			partners: [],
			pay_character: "",
			payment_account: "",
			phone: "",
			post_address: "",
			production: [],
			region: [],
			site: "",
			sity: [],
			specialications: [],
			status: "",
			work_begin_with_him: "",
			newSpecialication: "",
			DetalModal: "",
			openSpec: false,
			specialicationsToBaseEditors: [],
			specialicationsToBase: [],
			editorRegim: false,
			visibleTreeDrawer: false,
			EditorRegim: "none",
			loadNode: [],
			REGIM: false
		};
	}

	componentDidMount() {
		const { profile, REGIM } = this.props
		if (REGIM) {
			this.setState({ REGIM: "PREV" })
		}
		console.log(JSON.stringify(profile))
		if (profile._id) {
			this.setState({
				agentId: profile._id,
				Customer_Submitted: profile.Customer_Submitted,
				INN: profile.INN,
				OGRN: profile.OGRN,
				TechAgent: profile.TechAgent,
				WhereFromClient: profile.WhereFromClient,
				actual_address: profile.actual_address,
				agentGeo: profile.agentGeo,
				any: profile.any,
				company: profile.company,
				company_desription: profile.company_desription,
				email: profile.email,
				full_name: profile.full_name,
				general_director: profile.general_director,
				hill: profile.hill,
				individual_conditions_job: profile.individual_conditions_job,
				legal_address: profile.legal_address,
				name: profile.name,
				partners: profile.partners,
				pay_character: profile.pay_character,
				payment_account: profile.payment_account,
				phone: profile.phone,
				production: profile.production,
				region: profile.region,
				site: profile.site,
				sity: profile.sity,
				specialications: profile.specialications,
				work_begin_with_him: profile.work_begin_with_him,
			})
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
				this.setState({ specialicationsToBase: specArray });
			}
		});
		GetTechList().then(responce => {
			this.setState({
				loadNode: responce
			});
		});
	}
	componentWillUpdate(prev) {
		if (JSON.stringify(prev) !== JSON.stringify(this.props)) {
			this.setState({
				agentId: prev.profile._id,
				Customer_Submitted: prev.profile.Customer_Submitted,
				INN: prev.profile.INN,
				OGRN: prev.profile.OGRN,
				TechAgent: [],
				WhereFromClient: prev.profile.WhereFromClient,
				active: prev.profile.active,
				actual_address: prev.profile.actual_address,
				agentGeo: prev.profile.agentGeo,
				any: prev.profile.any,
				booker_email: prev.profile.booker_email,
				booker_phone: prev.profile.booker_phone,
				company: prev.profile.company,
				company_desription: prev.profile.company_desription,
				email: prev.profile.email,
				full_name: prev.profile.full_name,
				general_director: prev.profile.general_director,
				hill: prev.profile.hill,
				individual_conditions_job: prev.profile.individual_conditions_job,
				legal_address: prev.profile.legal_address,
				name: prev.profile.name,
				notes: prev.profile.notes,
				partners: prev.profile.partners,
				pay_character: prev.profile.pay_character,
				payment_account: prev.profile.payment_account,
				phone: prev.profile.phone,
				post_address: prev.profile.post_address,
				production: prev.profile.production,
				region: prev.profile.region,
				site: prev.profile.site,
				sity: prev.profile.sity,
				specialications: prev.profile.specialications,
				work_begin_with_him: prev.profile.work_begin_with_him
			})
		}
	}
	renderFucking(PropsLags) {
		if (Array.isArray(PropsLags)) {
			return PropsLags.map((any) => {
				return <None tag={any} />;
			});
		}
	}
	onChangeEditor(stateValue) {

		if (stateValue) {
			this.setState({ checkedEdit: false })
		} else {
			this.setState({ checkedEdit: true })
		}

	}
	handelAnyChange = name => event => {
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
	onCloseSpecDriwer = () => {
		this.setState({
			visibleSpecDriwer: false
		});
	};

	saveAgent = () => {
		let {
			Customer_Submitted,
			INN,
			OGRN,
			TechAgent,
			WhereFromClient,
			active,
			actual_address,
			agentGeo,
			any,
			booker_email,
			booker_phone,
			company,
			company_desription,
			email,
			full_name,
			general_director,
			hill,
			individual_conditions_job,
			legal_address,
			name,
			notes,
			partners,
			pay_character,
			payment_account,
			phone,
			post_address,
			production,
			region,
			site,
			sity,
			specialications,
			status,
			work_begin_with_him,
			agentId
		} = this.state

		let payload = {
			agent: {
				Customer_Submitted,
				INN,
				OGRN,
				TechAgent,
				WhereFromClient,
				active,
				actual_address,
				agentGeo,
				any,
				booker_email,
				booker_phone,
				company,
				company_desription,
				email,
				full_name,
				general_director,
				hill,
				individual_conditions_job,
				legal_address,
				name,
				notes,
				partners,
				pay_character,
				payment_account,
				phone,
				post_address,
				production,
				region,
				site,
				sity,
				specialications,
				status,
				work_begin_with_him,
			},
			userBy: isAuthenticated().direct
		}
		// export const ChangeAgentProfile = (AgentId, payload) => {
		ChangeAgentProfile(agentId, payload).then((data) => {
			this.openNotificationAgentChange()
		})
		this.openNotificationAgentChange()
	}
	handleClose = techRemove => {
		const TechAgent = this.state.TechAgent.filter(tech => tech !== techRemove);
		this.setState({ TechAgent });
	};
	handleCancelDetalModal = () => {
		this.setState({ DetalModal: false });
	};
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
	onCloseTechDriwer = () => {
		this.setState({
			visibleTechDriwer: false
		});
	};
	addSpecAgent = (SpecId) => {
		let { specialicationsToBaseEditors } = this.state
		specialicationsToBaseEditors.forEach(element => {
			if (element.id === SpecId) {
				this.setState({ specialications: element.data })
			}
		});
	}
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
	editorRegimSwitcher = () => {
		let { editorRegim } = this.state;
		if (editorRegim === true) {
			this.setState({ editorRegim: false });
		} else {
			this.setState({ editorRegim: true });
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

	NewCar = () => {
		this.setState({ carModel: true });
	};
	DetailNew = id => {
		this.setState({ DetalModal: true, detalId: id });
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
		let { checkedEdit, REGIM } = this.state;
		let { profile, tech } = this.props;
		let techChild = this.state.TechAgent.map(this.TechMap);

		let {
			editorRegim,
		} = this.state;

		return (
			<span>
				<>
					{REGIM === "PREV" ? (<></>) : (<>
					<Switch onChange={() => this.onChangeEditor(checkedEdit)} checked={checkedEdit} />
					</>)}
				</>
				<div className="" >
					<Typography>
						<Title>{profile.full_name}</Title>
						<Collapse style={{ width: '70vw' }} defaultActiveKey={['1']}>
							<Panel
								header={
									<span>
										<b>Компания</b>
									</span>
								}
							>
								<div style={{ display: 'contents' }}>
									<p className="flex pBmagin">
										{checkedEdit ? (<>
											<clan className="" >
												<span className="mr5px" > Полное имя:</span>
												<span>
													<Input
														onChange={this.handelAnyChange("full_name")}
														value={this.state.full_name}
														autoComplete="nope"
														placeholder="Полное имя"
														className="" />
												</span>
											</clan>
										</>) : (<>

											<b>Полное имя:</b>
											<None tag={profile.full_name} /></>)}
									</p>
									<p className="flex">
										{checkedEdit ? (<>
											<clan className="" >
												<span className="mr5px" >Имя:</span>
												<span>
													<Input
														onChange={this.handelAnyChange("name")}
														value={this.state.name}
														className="col-xs-12"
														autoComplete="nope"
														placeholder="Имя"
														className="" />
												</span>
											</clan>
										</>) : (<><b>Имя:</b>
											<None tag={profile.name} /></>)}
									</p>
									<p className="flex">

										{checkedEdit ? (<>
											<clan className="" >
												<span className="mr5px" >ИНН:</span>
												<span>
													<Input
														onChange={this.handelAnyChange("INN")}
														value={this.state.INN}
														className="col-xs-12"
														autoComplete="nope"
														placeholder="ИНН"
														className="" />
												</span>
											</clan>
										</>) : (<>
											<b>ИНН:</b>
											<None tagMode={false} tag={profile.INN} />
										</>)}

									</p>
									<p className="flex">
										{checkedEdit ? (<>
											<clan className="" >
												<span className="mr5px" >ОГРН:</span>
												<span>
													<Input
														onChange={this.handelAnyChange("OGRN")}
														value={this.state.OGRN}
														className="col-xs-12"
														autoComplete="nope"
														placeholder="ОГРН"
														className="" />
												</span>
											</clan>
										</>) : (<>
											<b>ОГРН:</b>
											<None tagMode={false} tag={profile.OGRN} />
										</>)}

									</p>


									<p className="flex">
										{checkedEdit ? (<>
											<clan className="" >
												<span className="mr5px" >Партнеры:</span>
												<span>
													<Input
														onChange={this.handelAnyChange("partners")}
														value={this.state.partners}
														className="col-xs-12"
														autoComplete="nope"
														placeholder="Партнеры"
														className="" />
												</span>
											</clan>
										</>) : (<>
											<b>Партнеры:</b>
											<None tagMode={false} tag={profile.partners} />
										</>)}
									</p>
								</div>
							</Panel>
							<Panel
								header={
									<span>
										<b>Комментарии:</b>
									</span>
								}
								key="28"
							>
								<div style={{ display: 'contents' }}>
									{checkedEdit ? (<>
										<p className="flex pBmagin">
											<clan className="" >
												<span className="mr5px" >Описание компании:</span>
												<span>
													<Input
														onChange={this.handelAnyChange("company_desription")}
														value={this.state.company_desription}
														className="col-xs-12"
														autoComplete="nope"
														placeholder="ОГРН"
														className="" />
												</span>
											</clan>
										</p>
									</>) : (<>
										<p className="flex pBmagin">
											<b>Описание компании:</b>
											<None tag={profile.company_desription} />
										</p>
									</>)}

									<p className="flex pBmagin">
										{checkedEdit ? (<>
											<Button onClick={() => this.setState({ visibleTechDriwer: true })} type="primary" >Техника</Button>
										</>) : (<>
											<b>Техника:</b>
											{this.renderFucking(tech)}

										</>)}
									</p>
									<p className="flex pBmagin">
										{checkedEdit ? (<>
											<Button onClick={() => this.setState({ visibleSpecDriwer: true })} type="primary" >Специализация</Button>
										</>) : (<>
											<b>Специализация:</b>
											{this.renderFucking(profile.specialications)}
										</>)}
									</p>
								</div>
							</Panel>
							<Panel
								header={
									<span>
										<b>Адрес, контакты</b>
									</span>
								}
								key="2"
							>
								<div style={{ display: 'contents' }}>
									{checkedEdit ? (<>
										<p className="flex pBmagin">
											<clan className="" >
												<span className="mr5px" >Юридический адрес:</span>
												<span>
													<Input
														onChange={this.handelAnyChange("legal_address")}
														value={this.state.legal_address}
														className="col-xs-12"
														autoComplete="nope"
														placeholder="ОГРН"
														className="" />
												</span>
											</clan>
										</p>
									</>) : (<>
										<p className="flex pBmagin">
											<b>Юридический адрес:</b>
											<None tag={profile.legal_address} />
										</p>
									</>)}

									{checkedEdit ? (<>
										<p className="flex pBmagin">
											<clan className="" >
												<span className="mr5px" >Фактический адрес:</span>
												<span>
													<Input
														onChange={this.handelAnyChange("actual_address")}
														value={this.state.actual_address}
														className="col-xs-12"
														autoComplete="nope"
														placeholder="Фактический адрес"
														className="" />
												</span>
											</clan>
										</p>
									</>) : (<>
										<p className="flex pBmagin">
											<b>Фактический адрес:</b>
											<None tag={profile.actual_address} />
										</p>
									</>)}


									{checkedEdit ? (<>
										<p className="flex pBmagin">
											<clan className="" >
												<span className="mr5px" >Телефон бухгалтерии:</span>
												<span>
													<Input
														onChange={this.handelAnyChange("booker_phone")}
														value={this.state.booker_phone}
														className="col-xs-12"
														autoComplete="nope"
														placeholder="Телефон бухгалтерии"
														className="" />
												</span>
											</clan>
										</p>
									</>) : (<>
										<p className="flex pBmagin">
											<b>Телефон бухгалтерии:</b>
											<None tag={profile.booker_phone} />
										</p>
									</>)}

									{checkedEdit ? (<>
										<p className="flex pBmagin">
											<clan className="" >
												<span className="mr5px" >Email бухгалтерии:</span>
												<span>
													<Input
														onChange={this.handelAnyChange("booker_email")}
														value={this.state.booker_email}
														className="col-xs-12"
														autoComplete="nope"
														placeholder="Email бухгалтерии"
														className="" />
												</span>
											</clan>
										</p>
									</>) : (<>
										<p className="flex pBmagin">
											<b>Email бухгалтерии:</b>
											<None tag={profile.booker_email} />
										</p>
									</>)}

									{checkedEdit ? (<>
										<p className="flex pBmagin">
											<clan className="" >
												<span className="mr5px" >Почтовый адрес:</span>
												<span>
													<Input
														onChange={this.handelAnyChange("post_address")}
														value={this.state.post_address}
														className="col-xs-12"
														autoComplete="nope"
														placeholder="Почтовый адрес"
														className="" />
												</span>
											</clan>
										</p>
									</>) : (<>
										<p className="flex pBmagin">
											<b>Почтовый адрес:</b>
											<None tag={profile.post_address} />
										</p>
									</>)}

									{checkedEdit ? (<>
										<p className="flex pBmagin">
											<clan className="" >
												<span className="mr5px" >Сайт:</span>
												<span>
													<Input
														onChange={this.handelAnyChange("site")}
														value={this.state.site}
														className="col-xs-12"
														autoComplete="nope"
														placeholder="Сайт"
														className="" />
												</span>
											</clan>
										</p>
									</>) : (<>
										<p className="flex pBmagin">
											<b>Сайт:</b>
											<None tag={profile.site} />
										</p>
									</>)}

									{checkedEdit ? (<>
										<p className="flex pBmagin">
											<clan className="" >
												<span className="mr5px" >Инстаграм:</span>
												<span>
													<Input
														onChange={this.handelAnyChange("Instagram")}
														value={this.state.Instagram}
														className="col-xs-12"
														autoComplete="nope"
														placeholder="Инстаграм"
														className="" />
												</span>
											</clan>
										</p>
									</>) : (<>
										<p className="flex pBmagin">
											<b>Инстаграм:</b>
											<None tag={profile.Instagram} />
										</p>
									</>)}


									{checkedEdit ? (<>
										<p className="flex pBmagin">
											<clan className="" >
												<span className="mr5px" >Общая почта:</span>
												<span>
													<Input
														onChange={this.handelAnyChange("email")}
														value={this.state.email}
														className="col-xs-12"
														autoComplete="nope"
														placeholder="Общая почта:"
														className="" />
												</span>
											</clan>
										</p>
									</>) : (<>
										<p className="flex pBmagin">
											<b>Общая почта:</b>
											<None tag={profile.email} />
										</p>
									</>)}
								</div>
							</Panel>
							<Panel
								header={
									<span>
										<b>Начало работы с клиентом:</b>
									</span>
								}
								key="3"
							>
								<div style={{ display: 'contents' }}>

									{checkedEdit ? (<>
										<p className="flex pBmagin">
											<clan className="" >
												<span className="mr5px" >Откуда пришел клиент:</span>
												<span>
													<TextArea
														onChange={this.handelAnyChange("WhereFromClient")}
														value={this.state.WhereFromClient}
														className="col-xs-12"
														autoComplete="nope"
														placeholder="Откуда пришел клиент"
														className="" />
												</span>
											</clan>
										</p>
									</>) : (<>
										<p className="flex pBmagin">
											<b>Откуда пришел клиент:</b>
											<None tag={profile.WhereFromClient} />
										</p>
									</>)}

									{checkedEdit ? (<>
										<p className="flex pBmagin">
											<clan className="" >
												<span className="mr5px" >Как начиналась с ним работа:</span>
												<span>
													<TextArea
														onChange={this.handelAnyChange("work_begin_with_him")}
														value={this.state.work_begin_with_him}
														className="col-xs-12"
														autoComplete="nope"
														placeholder="Как начиналась с ним работа"
														className="" />
												</span>
											</clan>
										</p>
									</>) : (<>
										<p className="flex pBmagin">
											<b>Как начиналась с ним работа:</b>
											<None tag={profile.work_begin_with_him} />
										</p>
									</>)}


									{checkedEdit ? (<>
										<p className="flex pBmagin">
											<clan className="" >
												<span className="mr5px" >Это переданный клиент или нет:</span>
												<span>
													<Input
														onChange={this.handelAnyChange("Customer_Submitted")}
														value={this.state.Customer_Submitted}
														className="col-xs-12"
														autoComplete="nope"
														placeholder="Как начиналась с ним работа"
														className="" />
												</span>
											</clan>
										</p>
									</>) : (<>

										<p className="flex pBmagin">
											<b>Это переданный клиент или нет:</b>
											<None tag={profile.Customer_Submitted} />
										</p>
									</>)}
								</div>
							</Panel>
							<Panel
								header={
									<span>
										<b>Особые пометки</b>
									</span>
								}
							>
								<div style={{ display: 'contents' }}>
									{checkedEdit ? (<>
										<p className="flex pBmagin">
											<clan className="" >
												<span className="mr5px" >Индивидуальные условия работы с клиентом:</span>
												<span>
													<TextArea
														onChange={this.handelAnyChange("individual_conditions_job")}
														value={this.state.individual_conditions_job}
														className="col-xs-12"
														autoComplete="nope"
														placeholder="Как начиналась с ним работа"
														className="" />
												</span>
											</clan>
										</p>
									</>) : (<>

										<p className="flex pBmagin">
											<b>Индивидуальные условия работы с клиентом:</b>
											<None tag={profile.individual_conditions_job} />
										</p>
									</>)}

									{checkedEdit ? (<>
										<p className="flex pBmagin">
											<clan className="" >
												<span className="mr5px" >Характер предлагаемой цены для клиента:</span>
												<span>
													<TextArea
														onChange={this.handelAnyChange("pay_character")}
														value={this.state.pay_character}
														className="col-xs-12"
														autoComplete="nope"
														placeholder="Как начиналась с ним работа"
														className="" />
												</span>
											</clan>
										</p>
									</>) : (<>
										<p className="flex pBmagin">
											<b>Характер предлагаемой цены для клиента:</b>
											<None tag={profile.pay_character} />
										</p>
									</>)}
								</div>
							</Panel>
						</Collapse>
						{checkedEdit ? (<>
							<Button onClick={() => this.saveAgent()} type="dashed" className="btn_save">Изменить	</Button>
						</>) : (null)}
					</Typography>
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
					<div style={{ margin: "10px" }}>
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
							leave={{ opacity: 0, width: 0, scale: 0, duration: 200, margin: '2px' }}
							appear={false}
						>
							{techChild}
						</TweenOneGroup>
					</div>

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
										onChange={this.handelAnyChange("newSpecialication")}
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
			</span>
		);
	}
}
