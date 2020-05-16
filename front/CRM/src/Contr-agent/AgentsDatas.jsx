import React, { Component } from 'react';
import None from '../Components/None.jsx';
import { Typography, Collapse } from 'antd';
const { Title, Paragraph, Text } = Typography;
const { Panel } = Collapse;

export default class AgentsDatas extends Component {
	renderFucking(PropsLags) {
		if (Array.isArray(PropsLags)) {
			return PropsLags.map((any) => {
				return <None tag={any} />;
			});
		}
	}

	render() {
		let { profile, tech } = this.props;
		return (
			<span>
				<Typography>
					<Title>{profile.full_name}</Title>
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
									<None tag={profile.full_name} />
								</p>
								<p className="flex">
									<b>Имя:</b>
									<None tag={profile.name} />
								</p>
								<p className="flex">
									<b>ИНН:</b>
									<None tagMode={false} tag={profile.INN} />
								</p>
								<p className="flex">
									<b>ОГРН:</b>
									<None tagMode={false} tag={profile.OGRN} />
								</p>
								<p className="flex">
									<b>Партнеры:</b>
									<None tagMode={false} tag={profile.partners} />
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
								<p className="flex pBmagin">
									<b>Описание компании:</b>
									<None tag={profile.company_desription} />
								</p>
								<p className="flex pBmagin">
									<b>Техника:</b>
									{this.renderFucking(tech)}
								</p>
								<p className="flex pBmagin">
									<b>Специализация:</b>
									{this.renderFucking(profile.specialications)}
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
								<p className="flex pBmagin">
									<b>Юридический адрес:</b>
									<None tag={profile.legal_address} />
								</p>
								<p className="flex pBmagin">
									<b>Фактический адрес:</b>
									<None tag={profile.actual_address} />
								</p>
								<p className="flex pBmagin">
									<b>Сайт:</b>
									<None tag={profile.site} />
								</p>
								<p className="flex pBmagin">
									<b>Инстаграм:</b>
									<None tag={profile.Instagram} />
								</p>
								<p className="flex pBmagin">
									<b>Общая почта:</b>
									<None tag={profile.email} />
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
							<div style={{ display: 'contents' }}>
								<p className="flex pBmagin">
									<b>Откуда пришел клиент:</b>
									<None tag={profile.WhereFromClient} />
								</p>
								<p className="flex pBmagin">
									<b>Как начиналась с ним работа:</b>
									<None tag={profile.work_begin_with_him} />
								</p>
								<p className="flex pBmagin">
									<b>Это переданный клиент или нет:</b>
									<None tag={profile.Customer_Submitted} />
								</p>
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
								<p className="flex pBmagin">
									<b>Индивидуальные условия работы с клиентом:</b>
									<None tag={profile.individual_conditions_job} />
								</p>
								<p className="flex pBmagin">
									<b>Характер предлагаемой цены для клиента:</b>
									<None tag={profile.pay_character} />
								</p>
							</div>
						</Panel>
					</Collapse>
				</Typography>
			</span>
		);
	}
}
