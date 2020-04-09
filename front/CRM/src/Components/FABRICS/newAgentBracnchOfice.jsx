import React, { Component } from 'react'
import { debounce } from "debounce";
import {GetRussiaOblastHelper,GetRussiaCitiFind} from "../../Api/Http"
import {
  Input,
  Select,
} from "antd";
export default class NewAgentBracnchOfice extends Component {
    constructor(props){
      super()
      this.state = {
        number_phone:"",
        adress:"",
        branch_officeGeo:[],
        branch_office:"",
        russiaCity:[],
        oblast:[],
        branch_office_sity:[]
      }
    }
    componentDidMount(){
      let {CommonProps} = this.props
      if(CommonProps !== undefined){
        if(CommonProps[0] !== undefined){
          this.setState({branch_office:CommonProps[0].name})
        }
        if(CommonProps[1] !== undefined){
          this.setState({branch_officeGeo:[CommonProps[1].region]})
        }
        if(CommonProps[2] !== undefined){
          this.setState({branch_office_sity:[CommonProps[2].sity]})
        }
        if(CommonProps[3] !== undefined){
          this.setState({number_phone:CommonProps[3].number_phone})
        }
        if(CommonProps[4] !== undefined){
          this.setState({adress:CommonProps[4].adress})
        }
      }
    }

    handleSelectOblastbranch_officeGeo = (branch_officeGeo) => {
      this.setState({ branch_officeGeo });
    };
    handleChange = name => event => {
      this.setState({ error: "" });
      this.setState({ [name]: event.target.value });
    };
    RussiaOblastHelper = oblast => {
      GetRussiaOblastHelper(oblast).then(data => {
        this.setState({ oblast: data });
      });
    };
    RussiaSityHelper = sity => {
      GetRussiaCitiFind(sity).then(data => {
        this.setState({ russiaCity: data });
      });
    };
  
    sitiBranchAgentHelper = value => {
      this.setState({ branch_office_sity: value });
    };
    render() {
      let {fabricState} = this.props
        return (
            <div>
                  <p className="input_new_agent agentnew_front">
                      Подразделениe
                    </p>
                    <Input
                      id={`branch_office${fabricState}`}
                      className="input_new_agent "
                      placeholder="Подразделения (филиалы)"
                      value={this.state.branch_office}
                      onChange={this.handleChange("branch_office")}
                    />
                     <p className="input_new_agent agentnew_front">
                     Область
                    </p>
                    <Select
                      style={{ width: "auto" }}
                      id={`branch_officeGeo${fabricState}`}
                      className={`input_new_agent branch_officeGeo${fabricState} `}
                      mode="multiple"
                      placeholder="Выберите область"
                      notFoundContent="Введите название области"
                      value={this.state.branch_officeGeo}
                      onChange={this.handleSelectOblastbranch_officeGeo}
                      onSearch={debounce(this.RussiaOblastHelper, 700)}
                    >
                      {this.state.oblast.map(map => (
                        <Select.Option key={map.oblast} value={map.oblast}>
                          {map.oblast}
                        </Select.Option>
                      ))}
                    </Select>
                    <p className="input_new_agent agentnew_front">
                    Город
                    </p>
                    <Select
                      style={{ width: "auto" }}
                      className="input_new_agent"
                      mode="multiple"
                      className={`input_new_agent branch_office_sity${fabricState}`}
                      id={`branch_office_sity${fabricState}`}
                      placeholder="Выберите город"
                      notFoundContent="Введите название города"
                      value={this.state.branch_office_sity}
                      onChange={this.sitiBranchAgentHelper}
                      onSearch={debounce(this.RussiaSityHelper, 450)}
                    >
                      {this.state.russiaCity.map(map => (
                        <Select.Option key={map.city} value={map.city}>
                          {map.city}
                        </Select.Option>
                      ))}
                    </Select>
                    <p className="input_new_agent agentnew_front">
                    Номер телефона
                    </p>
                    <Input
                      id={`number_phone${fabricState}`}
                      className="input_new_agent "
                      placeholder="Номер телефона"
                      value={this.state.number_phone}
                      onChange={this.handleChange("number_phone")}
                    />
                    <p className="input_new_agent agentnew_front">
                      Адрес
                    </p>
                    <Input
                      id={`adress${fabricState}`}
                      className="input_new_agent "
                      placeholder="Адрес (филиала)"
                      value={this.state.adress}
                      onChange={this.handleChange("adress")}
                    />
            </div>
        )
    }
}

