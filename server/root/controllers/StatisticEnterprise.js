let ContrAgent = require("../database/ContrAgent")
let ContrAgentJob = require("../database/AgentTasks")


exports.StatisticManageAtAgent = async (req, res) =>{
    ContrAgent.find({tags:"none"}).count().exec((err, result) =>{
        return res.status(200).json({result})  
    }) 
}

exports.StatisticMailingAgent = async (req, res) =>{
    ContrAgent.find({email:""}).count().exec((err, result) =>{
        return res.status(200).json({result})  
    }) 
}

exports.StatisticSpecAgents = async (req, res) =>{
    ContrAgent.find({specialications:"none"}).count().exec((err, result) =>{
        return res.status(200).json({result})  
    }) 
}

exports.StatisticJobAtAgent = async (req, res) =>{
    ContrAgentJob.find().count().exec((err, result) =>{
        return res.status(200).json({result})  
    }) 
}

exports.StatisticAgentDatabase = async (req, res) =>{
    ContrAgent.find().count().exec((err, result) =>{
        return res.status(200).json({result})  
    }) 
}

exports.StatisticTechAgent = async (req, res) =>{
    ContrAgent.find({tech:"none"}).count().exec((err, result) =>{
        return res.status(200).json({result})  
    }) 
}


