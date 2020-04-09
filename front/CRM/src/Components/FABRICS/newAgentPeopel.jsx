import React, { Component } from 'react';
import {
	Input,
  } from "antd";
  
const { TextArea } = Input;
 

export default class NewAgentPeopel extends Component {
	constructor(props){
		super()
		this.state = {
			bio:"",
			phone:"",
			email:"",
			position:"",
			HumanFeatures_job:"",
			HumanCommon:"",
		}
	  }
	componentDidMount() {
		let {CommonProps} = this.props
		if(CommonProps != undefined){
			if(CommonProps[0] != undefined){
				this.setState({number_phone:CommonProps[0].phoneAt_peopel})
			}
			if(CommonProps[1] != undefined){
				this.setState({bio:CommonProps[1].bio})
			}
			if(CommonProps[2] != undefined){
				this.setState({email:CommonProps[2].mail_at_peopel})
			}
			if(CommonProps[3] != undefined){
				this.setState({HumanCommon:CommonProps[3].common})
			}
			if(CommonProps[4] != undefined){
				this.setState({position:CommonProps[4].position})

			}
			if(CommonProps[5] != undefined){
				this.setState({HumanFeatures_job:CommonProps[5].features_job})

			}
		}
	}
	handleChange = name => event => {
		this.setState({ error: "" });
		this.setState({ [name]: event.target.value });
	  };
	render() {
        let {fabricState} = this.props

		return (
			<div>
				<p className="input_new_agent agentnew_front">ФИО</p>
				<Input value={this.state.bio} onChange={this.handleChange("bio")} id={`Humanbio${fabricState}`} size="large" className="input_new_agent " placeholder="ФИО:" />
				<p className="input_new_agent agentnew_front">Телефон</p>
				<Input value={this.state.phone} onChange={this.handleChange("phone")}  size="large" id={`HumanPhone${fabricState}`} className="input_new_agent " placeholder="телефон:" />
				<p className="input_new_agent agentnew_front">Email</p>
				<Input value={this.state.email} onChange={this.handleChange("email")}  size="large" id={`HumanEmail${fabricState}`} className="input_new_agent " placeholder="почта:" />
				<p className="input_new_agent agentnew_front">Должность</p>
				<Input value={this.state.position} onChange={this.handleChange("position")}  size="large" id={`HumanPosition${fabricState}`} className="input_new_agent " placeholder="Должность:" />
				<p className="input_new_agent agentnew_front">Особености работы</p>
				<TextArea
				value={this.state.HumanFeatures_job} onChange={this.handleChange("HumanFeatures_job")} 
					id={`HumanFeatures_job${fabricState}`}
					size="large"
					className="input_new_agent "
					placeholder="Особености работы:"
				/>
				<p className="input_new_agent agentnew_front">Описание</p>
				<TextArea value={this.state.HumanCommon} onChange={this.handleChange("HumanCommon")}  size="large" id={`HumanCommon${fabricState}`} className="input_new_agent " placeholder="почта:" />
			</div>
		);
	}
}
