import React, { Component } from 'react';
import { CompanyAllRole, CompanyNewRole,CompanyDeleteRole } from '../Api/Http';
import { notification, Icon, Button, message, Input, Checkbox, Drawer, Modal, Switch,Spin } from 'antd';
import { FrownOutlined,DeleteOutlined } from '@ant-design/icons';
export default class CompanyPermission extends Component {
	constructor() {
		super();
		this.state = {
			CompanyRole: [],
            posts_name: '',
            loading:true
		};
	}
	componentDidMount() {
		CompanyAllRole().then((CompanyRole) => this.setState({ CompanyRole,loading:false }));
	}
	newRole = () => {
		let errs;
		let { posts_name, CompanyRole } = this.state;
		console.log(posts_name);
		if (posts_name.length === 0) {
			errs = 'Мало букв';
			return this.err(errs);
		} else {
			let payload = {
				posts_name: posts_name
			};
			CompanyNewRole(payload).then((data) => {
				CompanyRole.push(data);
				this.setState({ CompanyRole });
			});
		}
	};
	handleChange = (name) => (event) => {
		this.setState({ error: '' });
		this.setState({ [name]: event.target.value });
	};
	err(err) {
		notification.open({
			message: `${err}`,
			icon: <Icon type="frown" style={{ color: '#108ee9' }} />
		});
    }
    deletRole = (id) =>{
        let payload = {
            id:id
        }
        let {CompanyRole } = this.state
        let filtersById = CompanyRole.filter((el) => el._id != id)
        this.setState({CompanyRole:filtersById})
        CompanyDeleteRole(payload).then(data=>console.log(data))
    }
	render() {
		return (
			<div className="">
				<div className="container" style={{ alignItems: 'baseline' }}>
                    {this.state.loading ? (<Spin/>):(
                    <>
                    <div style={{ marginRight: '20px', width: '100%' }} className="">
						<h1>Управление ролями</h1>
						<div className="col">
							<div>
								<Input
									value={this.state.posts_name}
									onChange={this.handleChange('posts_name')}
									placeholder="новая роль"
								/>
								<Button onClick={() => this.newRole()}>Создать</Button>
								{this.state.CompanyRole.length === 0 ? (
									<div style={{ marginTop: '20px' }}>
										<FrownOutlined style={{ fontSize: '32px' }} />{' '}
										<span style={{ marginLeft: '15px' }}>Только стандартные роли</span>
									</div>
								) : (
									<div>{this.state.CompanyRole.map((el, i) => <h2 className="centeredInline">{el.posts_name} <DeleteOutlined  className="input_new_agent" onClick={() =>this.deletRole(el._id)} style={{fontSize:"25px",color:"#e91e63c4"}}/></h2>)}</div>
								)}
							</div>
						</div>
					</div>
					<div style={{ marginLeft: '20px', width: '100%' }} className="">
						<h1>Управление работниками</h1>
						<div>
							<h1>Скоро...</h1>
						</div>
					</div>

                    </>    
                    )}
                    </div>
			</div>
		);
	}
}
