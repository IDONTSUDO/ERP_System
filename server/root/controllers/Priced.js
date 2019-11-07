const PriceManageAtAgent = require('../database/PriceManageAtAgent.js')
const ManagePriced = require('../database/ManagePrice.js')
exports.ManageGetAgent = async (req, res) =>{

}
exports.GetPriceByManage = async (req, res,id) =>{
    let userId = req.body.userId
    let agentId = req.body.AgentId
    PriceManageAtAgent.findOne({AgentBy:agentId,userBy:userId}).then((result,err) =>{
        if(err){
            console.log(err)
        }else{
            return res.status(200).json({result:"adsads"})
        }
    })
} 
exports.DeletePriceAtManageToAgent  = async (req, res) =>{

}
exports.ManageAllAgent = async (req, res) =>{

}
exports.PutManagePrice = async (req, res) =>{

}
exports.NewPriceAtAgent = async (req, res) =>{

}
exports.MyPriced = async (req, res) =>{

}
exports.PutToMyPriced = async (req, res) =>{

}
