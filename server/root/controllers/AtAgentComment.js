let Todo = require('../database/UserTodo.js')
let AgentComent = require('../database/Comments.js')
let TodoAgents = require('../database/AgentTasks.js')

exports.newCommentAtAgent = async (req, res) =>{
    let {value,rate,agentID,workerId,taskId} = req.body
    // console.log(value,rate,agentID,workerId,taskId)

    let agnCmt = new AgentComent(req.body)
    agnCmt.body = value
    agnCmt.rate = rate 
    agnCmt.workerId = workerId
    agnCmt.agentID = agentID
    console.log(agnCmt)
}