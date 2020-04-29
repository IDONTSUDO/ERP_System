import React, { Component } from 'react';
import { getAgentBranch, NewAgentBranch, GetRussiaCitiFind, GetRussiaOblastHelper } from '../Api/Http';
import { Skeleton, Pagination, Button, Affix, Modal, Input, Checkbox, notification, message, Select } from 'antd';
import { EditOutlined, FrownOutlined } from '@ant-design/icons';
import { debounce } from 'debounce';
import WorkBranch from '../Components/agent/WorkBranch.jsx';
const { TextArea } = Input;

export default class AgentBranch extends Component {
	constructor(agentId) {
		super(agentId);
		this.state = {
			branch: [],
			agentId: agentId || this.props.match.params.agentId,
			loading: true,
			name: undefined,
			sity: [],
			region: [],
			number_phone: undefined,
			adress: undefined,
			oblast: [],
			sity: [],
			region: [],
			russiaCity: [],
			visible: false
		};
	}
	componentDidMount() {
		let agentId = this.props.agentId || this.props.match.params.agentId;

		getAgentBranch(agentId).then((branch) => {
			this.setState({ branch, loading: false, agentId: agentId });
		});
	}
	showModal = () => {
		this.setState({
			visible: true
		});
	};
	handleCancel = (e) => {
		this.setState({
			visible: false,
			number_phone: undefined,
			adress: undefined,
			sity: [],
			name: undefined,
			region: []
		});
	};
	handleSelect = (stateName, temp) => {
		this.setState({ [stateName]: temp });
	};
	handleChange = (name) => (event) => {
		this.setState({ error: '' });
		this.setState({ [name]: event.target.value });
	};
	RussiaOblastHelper = (oblast) => {
		GetRussiaOblastHelper(oblast).then((data) => {
			this.setState({ oblast: data });
		});
	};
	RussiaSityHelper = (sity) => {
		GetRussiaCitiFind(sity).then((data) => {
			this.setState({ russiaCity: data });
		});
	};
	sitiBranchAgentHelper = (value) => {
		this.setState({ branch_office_sity: value });
	};
	handelNewBranch = () => {
		let { name, sity, region, number_phone, adress, agentId } = this.state;
		let payload = {
			name,
			sity: sity[0],
			region: region[0],
			number_phone,
			adress
		};
		let err;
		if (name === undefined) {
			err = 'Укажите имя';
			return this.validErr(err);
		}
		NewAgentBranch(payload, agentId.agentId || agentId).then((data) => {
			if (data.error) {
				console.log(data);
			} else {
				console.log(data);
				let { branch } = this.state;
				branch.push(data);

				this.setState({
					name: undefined,
					sity: [],
					number_phone: undefined,
					adress: undefined,
					branch: branch,
					visible: false
				});
			}
		});
	};
	validErr = (err) => {
		notification.open({
			message: `${err}`,
			icon: <FrownOutlined type="frown" style={{ color: '#108ee9' }} />
		});
	};
	render() {
		return (
			<div
				style={this.props.classNameRoot ? { width: '90%' } : {}}
				className={this.props.classNameRoot ? 'email_main_pos' : ''}
			>
				<div className="flex-rev mr5px">
					<Affix offsetTop={30}>
						<Button onClick={this.showModal} type="primary">
							Добавить
						</Button>
					</Affix>
				</div>
				<Skeleton paragraph={{ rows: 26 }} active loading={this.state.loading}>
					{this.state.branch.map((office, i) => <WorkBranch office={office} />)}
				</Skeleton>
				<Modal
					okText="Добавить"
					cancelText="Отменить"
					title="Добавление Подразделения"
					visible={this.state.visible}
					onOk={this.handelNewBranch}
					onCancel={this.handleCancel}
				>
					<p>Подразделениe</p>
					<Input
						value={this.state.name}
						placeholder="Подразделения (филиалы)"
						onChange={this.handleChange('name')}
					/>
					<p>Область</p>
					<Select
						mode="multiple"
						placeholder="Выберите область"
						notFoundContent="Введите название области"
						value={this.state.region}
						onChange={(value) => this.handleSelect('region', value)}
						onSearch={debounce(this.RussiaOblastHelper, 700)}
					>
						{this.state.oblast.map((map) => (
							<Select.Option key={map.oblast} value={map.oblast}>
								{map.oblast}
							</Select.Option>
						))}
					</Select>
					<p>Город</p>
					<Select
						mode="multiple"
						placeholder="Выберите город"
						notFoundContent="Введите название города"
						value={this.state.sity}
						onChange={(value) => this.handleSelect('sity', value)}
						onSearch={debounce(this.RussiaSityHelper, 450)}
					>
						{this.state.russiaCity.map((map) => (
							<Select.Option key={map.city} value={map.city}>
								{map.city}
							</Select.Option>
						))}
					</Select>
					<p>Номер телефона</p>
					<Input
						placeholder="Номер телефона"
						value={this.state.number_phone}
						onChange={this.handleChange('number_phone')}
					/>
					<p>Адрес</p>
					<Input
						placeholder="Адрес (филиала)"
						value={this.state.adress}
						onChange={this.handleChange('adress')}
					/>
				</Modal>
			</div>
		);
	}
}
AgentBranch.defaultProps = {
	classNameRoot: true
};
