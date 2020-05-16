import React, { Component } from 'react';
import { Input, Icon, notification, Button, Modal, Drawer } from 'antd';
import CompanySetting from './CompanySetting';
import { GetCompanySturctures, NewCompanyStructures } from '../Api/Http';
import { isAuthenticated } from '../Api/Auth';

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;
let regExpW = /width=...../;
let regExpH = /height=..../;

function structureHelper(str) {
	let modifWidth = str.replace(regExpW, `width="${windowWidth}"`);
	let mofifHeight = modifWidth.replace(regExpH, `height="${windowHeight}"`);
	return mofifHeight;
}

export default class StructurTabel extends Component {
	constructor() {
		super();
		this.state = {
			structure: '',
			err: undefined,
			role: '',
			visible: false,
			structureNew: '',
			visibleDrawer: false
		};
	}
	componentDidMount() {
		this.setState({ role: isAuthenticated().direct.role });
		GetCompanySturctures().then((data) => {
			if (data[0].hasOwnProperty('structures')) {
				this.setState({ structure: structureHelper(data[0].structures) });
			} else {
				this.setState({ err: 'никто не добавил структуру компании' });
			}
		});
	}
	showModal = () => {
		this.setState({
			visible: true
		});
	};
	showDrawer = () => {
		this.setState({
			visibleDrawer: true
		});
	};

	onClose = () => {
		this.setState({
			visibleDrawer: false
		});
	};
	handleOk = (e) => {
		this.setState({
			visible: false
		});
		let { structureNew } = this.state;

		if (structureNew.length != 0) {
			NewCompanyStructures(structureNew).then((data) => {
				this.setState({ structure: data.structures, err: undefined });
				this.openNotification();
			});
		}
	};

	handleCancel = (e) => {
		this.setState({
			visible: false
		});
	};
	openNotification() {
		notification.open({
			message: 'Новая структура успешно добавлена в систему!',
			icon: <Icon type="smile" style={{ color: '#108ee9' }} />
		});
	}
	validatorErr(err) {
		notification.open({
			message: `${err}`,
			icon: <Icon type="frown" style={{ color: '#108ee9' }} />
		});
	}
	handleChange = (e, name) => {
		this.setState({ [name]: e });
	};
	render() {
		return (
			<div className="human_pos">
				{[ 'Директор', 'Управляющий' ].includes(this.state.role) ? (
					<span>
						<Button onClick={this.showModal}>
							<h5>Изменить</h5>
						</Button>
						<Button onClick={this.showDrawer}>
							<h5>Добавить роль</h5>
						</Button>
					</span>
				) : null}
				{this.state.err === undefined ? (
					<div
						dangerouslySetInnerHTML={{
							__html: this.state.structure
						}}
					/>
				) : (
					<span>
						<h1>Никто не добавил структуру компании </h1>
						{[ 'Директор', 'Управляющий' ].includes(this.state.role) ? (
							<span>
								<Button onClick={this.showModal}>
									<h5>Добавить структуру?</h5>
								</Button>
							</span>
						) : null}
					</span>
				)}
				<Modal
					cancelText="Отменить"
					okText="Новый адрес структуры"
					visible={this.state.visible}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
				>
					<Input
						placeholder="Адрес структуры"
						value={this.state.structureNew}
						onChange={(e) => this.handleChange(e.target.value, 'structureNew')}
					/>
				</Modal>
				<Drawer
					title="Basic Drawer"
					placement="right"
					width={windowWidth / 2}
					closable={false}
					onClose={this.onClose}
					visible={this.state.visibleDrawer}
				>
					<CompanySetting />
				</Drawer>
			</div>
		);
	}
}
