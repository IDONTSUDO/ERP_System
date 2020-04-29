import React, { Component } from 'react';
import { GetTodoByAgent, GetAgentYearStatistic, GetAgentMountAndYear } from '../Api/Http.js';
import moment from 'moment';
import { ResponsivePieCanvas } from '@nivo/pie';

export default class ChartAgent extends Component {
	constructor(props) {
		super();
		this.state = {
			yearStatistic: {},
			open: true
		};
	}
	componentDidMount(props) {
		let { agentId } = this.props;

		let Year = moment().locale('ru').format('YY');
		GetAgentYearStatistic(agentId, Year).then((data) => {
			if (data.err) {
				console.log(data.err);
			} else {
				console.log(data);
				this.setState({ yearStatistic: data, YearAt: Year });
			}
		});
	}
	clickCalendar = (value) => {
		// TODO CALENDAR JOB AT AGENT
		console.log(value.value);
	};
	render() {
		let { yearStatistic } = this.state;
		let data = [
			{
				id: 'Январь',
				label: 'Январь',
				value: yearStatistic['1'],
				color: 'hsl(167, 70%, 50%)'
			},
			{
				id: 'Февраль',
				label: 'Февраль',
				value: yearStatistic['2'],
				color: 'hsl(213, 70%, 50%)'
			},
			{
				id: 'Март',
				label: 'Март',
				value: yearStatistic['3'],
				color: 'hsl(260, 70%, 50%)'
			},
			{
				id: 'Апрель',
				label: 'Апрель',
				value: yearStatistic['4'],
				color: 'hsl(217, 70%, 50%)'
			},
			{
				id: 'Май',
				label: 'Май',
				value: yearStatistic['5'],
				color: 'hsl(297, 70%, 50%)'
			},
			{
				id: 'Июнь',
				label: 'Июнь',
				value: yearStatistic['6'],
				color: 'hsl(297, 70%, 50%)'
			},
			{
				id: 'Июль',
				label: 'Июль',
				value: yearStatistic['7'],
				color: 'hsl(297, 70%, 50%)'
			},
			{
				id: 'Август',
				label: 'Август',
				value: yearStatistic['8'],
				color: 'hsl(297, 70%, 50%)'
			},
			{
				id: 'Сентябрь',
				label: 'Август',
				value: yearStatistic['9'],
				color: 'hsl(297, 70%, 50%)'
			},
			{
				id: 'Октябрь',
				label: 'Октябрь',
				value: yearStatistic['10'],
				color: 'hsl(297, 70%, 50%)'
			},
			{
				id: 'Ноябрь',
				label: 'Ноябрь',
				value: yearStatistic['11'],
				color: 'hsl(297, 70%, 50%)'
			},
			{
				id: 'Декабрь	',
				label: 'Декабрь',
				value: yearStatistic['12'],
				color: 'hsl(297, 70%, 50%)'
			}
		];
		return (
			<div>
				<div style={{ width: '500px', height: '500px' }}>
					<ResponsivePieCanvas
						data={data}
						margin={{ top: 40, right: 200, bottom: 40, left: 80 }}
						pixelRatio={1}
						innerRadius={0.5}
						padAngle={0.7}
						cornerRadius={3}
						colors={{ scheme: 'paired' }}
						borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.6 ] ] }}
						radialLabelsSkipAngle={10}
						radialLabelsTextXOffset={6}
						radialLabelsTextColor="#333333"
						radialLabelsLinkOffset={0}
						radialLabelsLinkDiagonalLength={16}
						radialLabelsLinkHorizontalLength={24}
						radialLabelsLinkStrokeWidth={1}
						radialLabelsLinkColor={{ from: 'color' }}
						slicesLabelsSkipAngle={10}
						slicesLabelsTextColor="#333333"
						animate={true}
						motionStiffness={90}
						motionDamping={15}
						onClick={(val) => this.clickCalendar(val)}
						defs={[
							{
								id: 'dots',
								type: 'patternDots',
								background: 'inherit',
								color: 'rgba(255, 255, 255, 0.3)',
								size: 4,
								padding: 1,
								stagger: true
							},
							{
								id: 'lines',
								type: 'patternLines',
								background: 'inherit',
								color: 'rgba(255, 255, 255, 0.3)',
								rotation: -45,
								lineWidth: 6,
								spacing: 10
							}
						]}
						legends={[
							{
								anchor: 'right',
								direction: 'column',
								translateX: 140,
								itemWidth: 60,
								itemHeight: 14,
								itemsSpacing: 2,
								symbolSize: 14,
								symbolShape: 'circle'
							}
						]}
					/>
				</div>
			</div>
		);
	}
}
