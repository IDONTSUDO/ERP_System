import React, { Component } from 'react';
import { Card, Input, Checkbox, Button, Popover, Modal, notification, message, Select } from 'antd';
import { debounce } from 'debounce';

import { isAuthenticated } from '../../Api/Auth';
import { NewNewsFeatursPosition, GetRussiaCitiFind, RussiaOblastHelper, DeleteBranchAgent } from '../../Api/Http.js';
import { EditOutlined, DeleteOutlined, FrownOutlined } from '@ant-design/icons';
const { TextArea } = Input;

export default class WorkBranch extends Component {
	constructor(props) {
		let { name, number_phone, region, sity, _id } = props.office;
		super();
		this.state = {
			branchId: _id,
			name: name,
			region: region,
			sity: sity,
			number_phone: number_phone,
			editOffice: 'editHumDefault',
			editBool: false,
			TwoEditBool: true,
			visibleData: 'block',
			regionSearch: [],
			oblast: []
		};
	}
	componentDidMount() {}
	editorRigim = () => {
		let st = this.state.editOffice;
		if (st === 'editHuman') {
			this.setState({
				editOffice: 'editHumDefault',
				editBool: false,
				TwoEditBool: true
			});
		} else {
			this.setState({
				editOffice: 'editHuman',
				editBool: true,
				TwoEditBool: false
			});
		}
	};
	handelAnyChange = (name) => (event) => {
		this.setState({ error: '' });
		this.setState({ [name]: event.target.value });
	};
	showModal = () => {
		this.setState({
			visible: true
		});
	};

	handleOk = (e) => {
		let { comment } = this.state;
		let err;
		if (comment.length === 0) {
			err = 'Введите коментарий';
			this.validatorErr(err);
		} else {
			let news = {
				eventNews: 'Пометили на удаление',
				link: window.location.pathname,
				description: comment,
				posted_by: isAuthenticated().direct._id,
				deletItem: this.props.human
			};
			NewNewsFeatursPosition(news).then((data) => {
				this.setState({
					visible: false,
					comment: ''
				});
				message.success('Помечен на удаление');
			});
		}
	};
	handelAddingRegion = () => {};
	RussiaSityHelper = (sity) => {
		GetRussiaCitiFind(sity).then((data) => {
			this.setState({ regionSearch: data });
		});
	};

	handleCancel = (e) => {
		this.setState({
			visible: false
		});
	};

	handleSelect = (stateName, value) => {
		this.setState({ [stateName]: value });
	};

	deletHelper = () => {
		let { branchId } = this.state;
		DeleteBranchAgent(branchId).then((data) => {
			this.setState({ visibleData: 'none' });
		});
	};
	render() {
		return (
			<span>
				<Card style={{ display: this.state.visibleData }}>
					<EditOutlined className={this.state.editOffice} onClick={this.editorRigim} />
					<Popover
						content={
							<span>
								{[ 'Директор', 'Управляющий' ].includes() === this.state.role ? (
									<Button onClick={this.showModal}>Пометить на удаление</Button>
								) : (
									<Button onClick={this.deletHelper}>Удалить</Button>
								)}
							</span>
						}
					>
						<DeleteOutlined onClick={this.deletHelper} style={{ marginLeft: '100%', color: 'red' }} />
					</Popover>
					<div>
						<b>Имя:</b>
						{this.state.name}
						{this.state.editBool ? (
							<span>
								<Input onChange={this.handelAnyChange('name')} placeholder="Имя:" />
							</span>
						) : null}
					</div>
					<div>
						<b>Город:</b>
						<span style={{ margin: '2px' }}>{this.state.sity}</span>
						{this.state.editBool ? (
							<span>
								<Select
									mode="multiple"
									placeholder="Введите имя региона"
									value={this.state.sity}
									notFoundContent="Введите название региона"
									onChange={(value) => this.handleSelect('sity', value)}
									onSearch={debounce(this.RussiaSityHelper, 700)}
								>
									{this.state.regionSearch.map((map) => (
										<Select.Option key={map.city} value={map.city}>
											{map.city}
										</Select.Option>
									))}
								</Select>
							</span>
						) : null}
					</div>
					<div>
						<b>Область:</b>
						<div>{this.state.region}</div>
						{this.state.editBool ? (
							<span>
								<Select
									mode="multiple"
									size="large"
									notFoundContent="Введите название области"
									placeholder="Выберите область котрагента"
									value={this.state.region}
									onChange={(value) => this.handleSelect('region', value)}
									onSearch={debounce(this.RussiaOblastHelper, 450)}
								>
									{this.state.oblast.map((map) => (
										<Select.Option key={map.oblast} value={map.oblast}>
											{map.oblast}
										</Select.Option>
									))}
								</Select>
							</span>
						) : null}
					</div>
					<div>
						<b>Телфон:</b>
						{this.state.number_phone}
						{this.state.editBool ? (
							<span>
								<Input onChange={this.handelAnyChange('number_phone')} placeholder="Телфон:" />
							</span>
						) : null}
					</div>
				</Card>
				<hr style={{ display: this.state.visibleData }} />{' '}
				<Modal
					title="Коментарий на удаление"
					visible={this.state.visible}
					okText="Удалить"
					cancelText="Отменить"
					onOk={this.handleOk}
					onCancel={this.handleCancel}
				>
					<span>
						<TextArea
							onChange={this.handelAnyChange('comment')}
							value={this.state.comment}
							placeholder="Глаголом жги сердца людей..."
						/>
					</span>
				</Modal>
			</span>
		);
	}
}
