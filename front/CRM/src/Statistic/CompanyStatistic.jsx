import React, { Component } from "react"
import {listStatisticCompany} from "../Api/Http"
import {Statistic,Icon} from 'antd'
import Error from "../Error/Error.jsx"

class CompanyStatistic extends Component {
    constructor(){
        super()
        this.state = {
            worker_quality: "",
            create_todo: "",
            complete_todo: "",
            CompleteSeil: "",
            SeilAll: "",
            differenceSeil: ""
        }
    }
    componentDidMount(){
        listStatisticCompany().then(data=>{
            if(data.error){
                console.log(data.error)
            }else{
                this.setState({
                    worker_quality: data[0].worker_quality,
                    create_todo:data[0].create_todo,
                    complete_todo: data[0].complete_todo,
                    CompleteSeil: data[0].CompleteSeil,
                    SeilAll: data[0].SeilAll,
                    differenceSeil: data[0].differenceSeil
                })
            }
           
        })
    }
    render() {
        const { worker_quality,create_todo,complete_todo,CompleteSeil,SeilAll,differenceSeil} = this.state
        return (
            <div className="postisitonRelativeSmeni">
            <div className="container">
            
            <div class="row">
            <div className="col-md-8"styles={{width:"100em"}}>
            <Statistic title="Работников всего" value={worker_quality} prefix={<Icon type="team" />} />
            <hr/>
            <Statistic title="Создано дел" value={create_todo} prefix={<Icon type="like" />} />
            <hr/>
            <Statistic title="Выполенено дел" value={complete_todo} prefix={<Icon type="schedule" />} />
            <hr/>
            <Statistic title="Удачных сделок" value={CompleteSeil} prefix={<Icon type="rise" />} />
            <hr/>
            <Statistic title="Сделок заключено всего" value={SeilAll} prefix={<Icon type="dollar" />} />
            <hr/>
            <Statistic title="Диференция сделок" value={differenceSeil} prefix={<Icon type="calculator" />} />
            </div>
            </div>
            </div>    
            </div>
    )
  }
}



export default CompanyStatistic