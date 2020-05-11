import React, { Component } from 'react';
import None from '../Components/None.jsx';
import { GetAgentProfile, list, AddManageForAgent, PricedAtManage } from '../Api/Http';
import { Button, Descriptions, Icon, notification, Tabs, Tag, Select, Switch, Typography, Collapse } from 'antd';
import ChartAgent from '../Components/ChartAgent';
import AgentBranch from '../AgentHelper/AgentBranch.jsx';
import AgentHuman from '../AgentHelper/Agent-Human.jsx';

import { isAuthenticated } from '../Api/Auth';
import { Link } from 'react-router-dom';
const { TabPane } = Tabs;
const { Title, Paragraph, Text } = Typography;
const { Option, OptGroup } = Select;
const { Panel } = Collapse;
export default class AgentProfile extends Component {
	constructor() {
		super();
		this.state = {
			worker: [],
			tags: [],
			INN: '',
			OGRN: '',
			Tech: [],
			WhereFromClient: '',
			id: '',
			active: undefined,
			actual_address: '',
			any: '',
			company: '',
			company_desription: '',
			email: '',
			full_name: '',
			general_director: '',
			hill: [],
			Date: '',
			individual_conditions_job: '',
			legal_address: '',
			name: '',
			partners: [],
			pay_character: '',
			payment_account: '',
			phone: '',
			production: '',
			region: [],
			site: '',
			specialications: '',
			agentGeo: [],
			status: '',
			work_begin_with_him: ''
		};
	}

	componentDidMount() {
		const agentId = this.props.match.params.agentId;
		let TagsArray = [];
		this.setState({ agentId });
		GetAgentProfile(agentId).then((data) => {
			if (data.error) {
				this.setState({ redirectToProfile: true });
			} else {
				let TagsArray = [];
				let {
					INN,
					OGRN,
					TechAgent,
					UUID,
					WhereFromClient,
					_id,
					active,
					actual_address,
					any,
					company,
					company_desription,
					email,
					full_name,
					general_director,
					hill,
					Date,
					individual_conditions_job,
					legal_address,
					name,
					partners,
					pay_character,
					payment_account,
					phone,
					production,
					region,
					site,
					specialications,
					status,
					tags,
					agentGeo,
					work_begin_with_him
				} = data;
				this.setState({
					INN: INN,
					OGRN: OGRN,
					Tech: TechAgent,
					WhereFromClient: WhereFromClient,
					id: _id,
					active: active,
					actual_address: actual_address,
					any: any,
					company: company,
					company_desription: company_desription,
					email: email,
					full_name: full_name,
					general_director: general_director,
					hill: hill,
					Date: Date,
					individual_conditions_job: individual_conditions_job,
					legal_address: legal_address,
					name: name,
					partners: partners,
					pay_character: pay_character,
					payment_account: payment_account,
					phone: phone,
					production: production,
					region: region,
					site: site,
					specialications: specialications,
					status: status,
					work_begin_with_him: work_begin_with_him,
					agentGeo: agentGeo,
					TagsStart: TagsArray
				});

				if (data.tags === 'none') {
					this.setState({ tags: undefined });
				} else {
					data.tags.map((tag) => {
						TagsArray.push(tag.name);
					});

					this.setState({ tags: TagsArray, TagsStart: TagsArray });
				}
			}
		});
		list().then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				let workerList = [];
				for (let us of data) {
					let ItsWorkerAtValid = [ 'Директор', 'Управляющий', 'Менеджер' ].includes(us.role);
					if (ItsWorkerAtValid) {
						workerList.push(us);
					}
				}
				this.setState({ worker: workerList });
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
	handleChange = (date) => {
		this.setState({
			startDate: date
		});
	};
	handleAction = (name) => (event) => {
		this.setState({ error: '' });
		this.setState({ [name]: event.target.value });
	};
	clickSubmit = (event) => {
		event.preventDefault();
		this.setState({ loading: true });
		let msg;
		const { tags, id, worker, TagsStart } = this.state;
		if (tags.length > 1) {
			msg = 'Нельзя назначить больше одного менеджера агенту';
			return this.openNotificationValid(msg);
		} else {
			let UserExit = [];
			let FinalySortUser = [];
			const token = isAuthenticated().token;
			let userArray = [];

			for (let i = 0; tags.length > i; i++) {
				for (let user of worker) {
					if (user.name === tags[i]) {
						userArray.push({ name: user.name, _id: user._id });
					}
				}
			}
			for (let i = 0; TagsStart.length > i; i++) {
				for (let user of worker) {
					if (user.name === TagsStart[i]) {
						UserExit.push({ name: user.name, _id: user._id });
					}
				}
			}

			let posted_by = isAuthenticated().direct._id;
			let body = {
				UserExit,
				userArray,
				posted_by
			};
			AddManageForAgent(body, id).then((data) => {
				if (data.error) {
					this.openNotificationError();
				} else {
					this.openNotificationNewUserList();
					this.forceUpdate();
				}
			});
		}
	};
	forceUpdate() {
		const agentId = this.props.match.params.agentId;
		GetAgentProfile(agentId).then((data) => {
			if (data.error) {
				this.setState({ redirectToProfile: true });
			} else {
				let TagsArray = [];
				let {
					INN,
					OGRN,
					TechAgent,
					UUID,
					WhereFromClient,
					_id,
					active,
					actual_address,
					any,
					company,
					company_desription,
					email,
					full_name,
					general_director,
					hill,
					Date,
					individual_conditions_job,
					legal_address,
					name,
					partners,
					pay_character,
					payment_account,
					phone,
					production,
					region,
					site,
					specialications,
					status,
					tags,
					work_begin_with_him,
					agentGeo
				} = data;
				this.setState({
					INN: INN,
					OGRN: OGRN,
					Tech: TechAgent,
					WhereFromClient: WhereFromClient,
					id: _id,
					active: active,
					actual_address: actual_address,
					any: any,
					company: company,
					company_desription: company_desription,
					email: email,
					full_name: full_name,
					general_director: general_director,
					hill: hill,
					Date: Date,
					individual_conditions_job: individual_conditions_job,
					legal_address: legal_address,
					name: name,
					partners: partners,
					pay_character: pay_character,
					payment_account: payment_account,
					phone: phone,
					production: production,
					region: region,
					site: site,
					specialications: specialications,
					status: status,
					work_begin_with_him: work_begin_with_him,
					agentGeo: agentGeo
				});
				if (data.tags === 'none') {
					this.setState({ tags: undefined });
				} else {
					data.tags.map((tag) => {
						TagsArray.push(tag.name);
					});

					this.setState({ tags: TagsArray });
				}
			}
		});
	}

	openNotificationError() {
		notification.open({
			message: 'Ой что то пошло не так, мне жаль',
			icon: <Icon type="frown" style={{ color: '#108ee9' }} />
		});
	}
	openNotificationValid(msg) {
		notification.open({
			message: `${msg}`,
			icon: <Icon type="frown" style={{ color: '#108ee9' }} />
		});
	}
	openNotificationNewUserList() {
		notification.open({
			message: 'Назначено',
			icon: <Icon type="smile" style={{ color: '#108ee9' }} />
		});
	}
	ChangeSelect = (inputData) => {
		this.setState({ tags: inputData });
	};
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
			tags,
			id
		} = this.state;
		return (
			<div>
				<div className="postisitonRelativeSmeni">
					<div className="">
						<Tabs type="card">
							<TabPane tab="Общая информация" key="1">
								<div
									className="container"
									style={{
										justifyContent: 'space-between',
										marginTop: '50px',
										alignItems: 'baseline',
										flexDirection: 'column'
									}}
								>
									<Typography>
										<Title>{this.state.full_name}</Title>
										<Collapse style={{ width: '70vw' }} defaultActiveKey={[ '1' ]}>
											<Panel
												header={
													<span>
														<b>Компания</b>
													</span>
												}
											>
												<div style={{ display: 'contents' }}>
													<p className="flex pBmagin">
														<b>Полное имя:</b>
														<None tag={this.state.full_name} />
													</p>
													<p className="flex">
														<b>ОГРН:</b>
														<None tag={this.state.OGRN} />
													</p>
													<p className="flex">
														<b>ИНН:</b>
														<None tagMode={false} tag={this.state.INN} />
													</p>
													<p className="flex">
														<b>Генеральный директор:</b>
														<None tag={this.state.general_director} />
													</p>
													<p className="flex">
														<b>Общий телефон</b>
														<None tag={this.state.phone} />
													</p>
													<p className="flex">
														<b>Партнеры</b>
														{this.state.partners.map((el, i) => (
															<span>
																<None tag={el} />
															</span>
														))}
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
												<div>
													<p style={{ display: 'contents' }} className="flex">
														<div className="flex">
															<b>Описание компани:</b>
															{this.state.hill.map((region, i) => (
																<span>
																	<None tag={this.state.company_desription} />
																</span>
															))}
														</div>
														<div className="flex">
															<b>Техника:</b>
															{this.state.Tech.map((tech, i) => (
																<span>
																	<None tag={tech} />
																</span>
															))}
														</div>
														<div className="flex">
															<b>Специальзации: </b>

															<span>
																{' '}
																<None tag={this.state.specialications} />{' '}
															</span>
														</div>
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
												<div>
													<p style={{ display: 'contents' }} className="flex">
														<div className="flex">
															<b>Юридический адрес:</b>
															{this.state.hill.map((region, i) => (
																<span>
																	<None tag={this.state.legal_address} />
																</span>
															))}
														</div>
														<div className="flex">
															<b>Фактический адрес:</b>
															{this.state.hill.map((region, i) => (
																<span>
																	<None tag={this.state.actual_address} />
																</span>
															))}
														</div>
														<div className="flex">
															<b>Сайт:</b>
															{this.state.hill.map((region, i) => (
																<span>
																	<None tag={this.state.site} />
																</span>
															))}
														</div>
														<div className="flex">
															<b>Инстаграм:</b>
															{this.state.hill.map((region, i) => (
																<span>
																	<None tag={this.state.instagram} />
																</span>
															))}
														</div>
														<div className="flex">
															<b>Общая почта:</b>
															{this.state.hill.map((region, i) => (
																<span>
																	<None tag={this.state.email} />
																</span>
															))}
														</div>
														<div className="flex">
															<b>Общий тел:</b>
															{this.state.hill.map((region, i) => (
																<span>
																	<None tag={this.state.phone} />
																</span>
															))}
														</div>
														<div className="flex">
															<b>Город:</b>
															{this.state.hill.map((region, i) => (
																<span>
																	<None tag={region} />
																</span>
															))}
														</div>
														<div className="flex">
															<b>Область:</b>
															<div>
																{this.state.agentGeo.map((region, i) => (
																	<span>
																		<None tag={region} />
																	</span>
																))}
															</div>
														</div>
													</p>
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
												<div style={{ display: 'flex', flexDirection: 'column' }}>
													<div className="flex">
														<p>
															<b> Как начиналась с ним работа:</b>
															{this.state.work_begin_with_him}
														</p>
													</div>
													<div className="flex">
														<p>
															<b>Откуда пришел клиент</b>
															{this.state.WhereFromClient}
														</p>
													</div>
													<div className="flex">
														<p>
															<b>Описанание компании: </b>
															{this.state.company_desription}
														</p>
													</div>
													<div className="flex">
														<p>
															<b>Индивидуальные условия: </b>
															{this.state.individual_conditions_job}
														</p>
													</div>
													<div className="flex">
														<p>
															<b>Характер предлагаемой цены: </b>
															{this.state.pay_character}
														</p>
													</div>
												</div>
											</Panel>
										</Collapse>
									</Typography>
									<div style={{ display: 'flex' }}>
										<Select
											mode="multiple"
											style={{ width: 'max-content' }}
											placeholder="Выберете исполнителей"
											onChange={this.ChangeSelect}
											optionLabelProp="label"
											value={tags}
											defaultActiveFirstOption={false}
											allowClear={true}
										>
											{worker.map((workerOne, i = 1) => (
												<Option value={workerOne.name} label={workerOne.name}>
													<span>{workerOne.name}</span>
												</Option>
											))}
										</Select>

										<Button onClick={this.clickSubmit}>Назначить</Button>
										<Button>
											<Link to={`/agent/tasks/${id}`}>Дела по контр агенту</Link>
										</Button>
										<Button>
											<Link to={`/agent/edit/${id}`}>Изменить агента</Link>
										</Button>
									</div>
								</div>
							</TabPane>
							<TabPane tab="Статистика" key="2">
								<ChartAgent agentId={id} />
							</TabPane>
							<TabPane tab="Офисы" key="3">
								<AgentBranch classNameRoot={false} agentId={this.state.id} />
							</TabPane>
							<TabPane tab="Люди" key="4">
								<AgentHuman classNameRoot={false} agentId={this.state.id} />
							</TabPane>
						</Tabs>
					</div>
				</div>
			</div>
		);
	}
}
