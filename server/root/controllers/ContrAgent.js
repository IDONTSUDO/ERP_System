const ContrAgent = require('../database/ContrAgent')
const _  = require('lodash')
exports.agentId = async (req, res , next , id) =>{
    ContrAgent.findById(id)
    .exec((err, agent)=>{
        if(err || !agent){
            return res.status(400).json({
                error: "Agent not found"
            })
        }
        req.agent  = agent 
        next()
    })
}
exports.getMyListAgent = (req,res) =>{
    console.log(req.body.workerId)
    ContrAgent.find({ tags: { $elemMatch :{"_id":`${req.body.workerId}`}} })  
  
    .exec((err, agent) =>{
        if(err){
            return res.status(400).json({
                error: err
            })
        }

        res.json(agent)
    })
}
exports.getAgentProfile = (req,res) =>{
    res.status(200).json(req.agent)
}
exports.SearchAgent = (req,res) =>{
    let searchItemCollection  = req.body.search
    ContrAgent.find({searchItemCollection: new RegExp(req.body.item, 'i')}) 
    .then(result => res.json(result))
    .catch(e => console.error(e))
}
exports.AllAgent = (req,res) =>{
    const agent = ContrAgent.find()
    .then((agent) =>{
        res.status(200).json(agent)
    })
    .catch(err => console.log(err))
}
exports.ChangeAgent = (req,res) =>{
    let agent = req.agent
    
    agent = _.extend(agent, req.body)
    
   
    agent.save((err, result) => {
        
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        
        res.json(result)
    })
}
exports.ManageAddAgent = (req,res) =>{
    let agent = req.agent 
    agent.tags =  req.body.tags
    console.log(agent.tags)
    console.log(req.body.tags)
    agent = _.extend(agent,req.body)
    
   
    agent.save((err, result) => {
        
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        
        res.json(result)
    })
}
exports.DeleteManagerForAgent = (req,res) =>{
    ContrAgent.findByIdAndUpdate(req.body.agentId, { $pull: { tags: req.body.workerId } }, { new: true }).exec(
        (err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            } else {
                res.json(result);
            }
        }
    );
}
exports.ManageAddAgentA = (req,res) =>{
    ContrAgent.findByIdAndUpdate(req.body.agentId, { $push: { tags: req.body.workerId } }, { new: true }).exec(
        (err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            } else {
                res.json(result);
            }
        }
    );
}

exports.NewAgent = (req,res) =>{
    const agent = new ContrAgent(req.body)
    agent.postedBy = req.worker 

    agent.save().then(result =>{
        res.status(200).json({
            result
        })
    })
}