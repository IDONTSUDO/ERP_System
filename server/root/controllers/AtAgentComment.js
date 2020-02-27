let Todo = require('../database/UserTodo.js')
let AgentComent = require('../database/Comments.js')
let TodoAgents = require('../database/AgentTasks.js')
let AgentStatistic = require('../database/AgentStatistic')
exports.newCommentAtAgent = async (req, res, next) => {
    let { value, rate, agentID, workerId, taskId } = req.body
   
    try {
        let agnCmt = new AgentComent(req.body)
        agnCmt.body = value
        agnCmt.rate = rate 
        agnCmt.workerId = workerId
        agnCmt.agentID = agentID
        Todo.findById(taskId).then(data =>{
            
    
            data.remove()
    
    
            let {status,agentByTodo,tags,created,title,description,time,mounth,year} = data
            
            let newAgntTodoCoolect = {status,agentByTodo,tags,created,title,description,time,mounth,year}
            let todagnt = new TodoAgents(newAgntTodoCoolect)
            let agentTodoById = []
    
            agentTodoById.push(data.agent.name,data.agent._id)
            
            todagnt.agentByTodo = agentTodoById
          
           
            todagnt.save().then((result) =>{
                    agnCmt.save().then(result =>{
                        res.status(200).json({"ok":"ok"})
                        next()
                    })
            })
        })
    } catch{
        return res.status(400).json({"bad":"bad"})
    } 
}

exports.agentUpdateStatistic = async (req, res) => {

    let todoDestr = req.todo;

    let mounth = todoDestr.mounth;
    let agentIdByFind = todoDestr.agentByTodo[1];

    if (mounth === "01") {
        AgentStatistic.findOneAndUpdate({ agentBy: agentIdByFind }, { $inc: { 1: +1 } }, function (error, success) {
            if (error) {
                return console.log(error);
            } else {
                return console.log(success);
            }
        })
    }
    else if (mounth === "02") {
        AgentStatistic.findOneAndUpdate({ agentBy: agentIdByFind }, { $inc: { 2: +1 } }, function (error, success) {
            if (error) {
                return console.log(error);
            } else {
                return console.log(success);
            }
        })
    }
    else if (mounth === "03") {
        AgentStatistic.findOneAndUpdate({ agentBy: agentIdByFind }, { $inc: { 3: +1 } }, function (error, success) {
            if (error) {
                return console.log(error);
            } else {
                return console.log(success);
            }
        })
    }
    else if (mounth === "04") {
        AgentStatistic.findOneAndUpdate({ agentBy: agentIdByFind }, { $inc: { 4: +1 } }, function (error, success) {
            if (error) {
                return console.log(error);
            } else {
                return console.log(success);
            }
        })
    }
    else if (mounth === "05") {
        AgentStatistic.findOneAndUpdate({ agentBy: agentIdByFind }, { $inc: { 5: +1 } }, function (error, success) {
            if (error) {
                return console.log(error);
            } else {
                return console.log(success);
            }
        })
    }
    else if (mounth === "06") {
        AgentStatistic.findOneAndUpdate({ agentBy: agentIdByFind }, { $inc: { 6: +1 } }, function (error, success) {
            if (error) {
                return console.log(error);
            } else {
                return console.log(success);
            }
        })
    }
    else if (mounth === "07") {
        AgentStatistic.findOneAndUpdate({ agentBy: agentIdByFind }, { $inc: { 7: +1 } }, function (error, success) {
            if (error) {
                return console.log(error);
            } else {
                return console.log(success);
            }
        })
    }
    else if (mounth === "08") {
        AgentStatistic.findOneAndUpdate({ agentBy: agentIdByFind }, { $inc: { 8: +1 } }, function (error, success) {
            if (error) {
                return console.log(error);
            } else {
                return console.log(success);
            }
        })
    }
    else if (mounth === "09") {
        AgentStatistic.findOneAndUpdate({ agentBy: agentIdByFind }, { $inc: { 9: +1 } }, function (error, success) {
            if (error) {
                return console.log(error);
            } else {
                return console.log(success);
            }
        })
    }
    else if (mounth === "10") {
        AgentStatistic.findOneAndUpdate({ agentBy: agentIdByFind }, { $inc: { 10: +1 } }, function (error, success) {
            if (error) {
                return console.log(error);
            } else {
                return console.log(success);
            }
        })
    }
    else if (mounth === "11") {
        AgentStatistic.findOneAndUpdate({ agentBy: agentIdByFind }, { $inc: { 11: +1 } }, function (error, success) {
            if (error) {
                return console.log(error);
            } else {
                return console.log(success);
            }
        })
    }
    else if (mounth === "12") {
        AgentStatistic.findOneAndUpdate({ agentBy: agentIdByFind }, { $inc: { 12: +1 } }, function (error, success) {
            if (error) {
                return console.log(error);
            } else {
                return console.log(success);
            }
        })
    }


}