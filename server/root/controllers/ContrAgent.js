const ContrAgent = require('../database/ContrAgent')
const TodoAgent = require('../database/AgentTasks')
const AgentStatistic = require('../database/AgentStatistic')
const _ = require('lodash')
exports.agentId = async (req, res, next, id) => {
    ContrAgent.findById(id)
        .exec((err, agent) => {
            if (err || !agent) {
                return res.status(400).json({
                    error: "Agent not found"
                })
            }
            req.agent = agent
            next()
        })
}
exports.getMyListAgent = async (req, res) => {

    ContrAgent.find({ tags: { $elemMatch: { "_id": `${req.body.workerId}` } } })
        .exec((err, agent) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }

            res.json(agent)
        })
}
exports.getAgentProfile = async (req, res) => {
    res.status(200).json(req.agent)
}
exports.SearchAgent = async (req, res) => {
    ContrAgent.find({ name: new RegExp(req.body.item, 'i') })
        .select("_id name")
        .then(result => res.json(result))
        .catch(e => console.error(e))
}

exports.SearchAgentEmail = async (req, res) => {

    ContrAgent.find({ email: new RegExp(req.body.item, 'i') })
        .select("_id name full_name email")
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({ err })
            } else {
                return res.status(200).json(result)
            }
        })
}

exports.AllAgent = async (req, res) => {

    const currentPage = req.query.page || 1
    const perPage = 6
    var totalItems

    const agents = await ContrAgent.find()

        .countDocuments()
        .then(count => {
            totalItems = count;
            return ContrAgent.find()
                .skip((currentPage - 1) * perPage)
                .select('_id name')
                .limit(perPage)

        })
        .then(agents => {
            res.status(200).json(agents)
        })
        .catch(err => console.log(err))
}
exports.ChangeAgent = async (req, res) => {
    let agent = req.agent

    agent = _.extend(agent, req.body)


    await agent.save((err, result) => {

        if (err) {
            return res.status(400).json({
                error: err
            })
        }

        res.json(result)
    })
}
exports.ManageAddAgent = async (req, res) => {
    let agent = req.agent
    agent.tags = req.body.tags

    agent = _.extend(agent, req.body)


    await agent.save((err, result) => {

        if (err) {
            return res.status(400).json({
                error: err
            })
        }

        res.json(result)
    })
}
exports.DeleteManagerForAgent = async (req, res) => {
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
exports.ManageAddAgentA = async (req, res) => {
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

exports.NewAgent = async (req, res) => {
    const agent = new ContrAgent(req.body)
    agent.postedBy = req.worker

    agent.save().then(result => {
        res.status(200).json({
            result
        })
    })
}

exports.AgentStates = async (req, res) => {
    let AgentStat = {}
    function ContrAgentAll() {
        return new Promise(function (resolve, reject) {
            ContrAgent.countDocuments()
                .exec((err, agent) => {
                    if (err) {
                        throw new Error(reject)
                    }

                    AgentStat.all = agent
                    return resolve()
                })
        })
    }
    function ContrAgentGeo() {
        return new Promise(function (resolve, reject) {
            ContrAgent.countDocuments({ region: "none" })
                .exec((err, agent) => {
                    if (err) {
                        throw new Error(reject)
                    }

                    AgentStat.region = agent
                    return resolve()
                })
        })
    }
    function ContrAgentEmail() {
        return new Promise(function (resolve, reject) {
            ContrAgent.countDocuments({ email: "none" })
                .exec((err, agent) => {
                    if (err) {
                        throw new Error(reject)
                    }
                    AgentStat.email = agent
                    return resolve()
                })
        })
    }
    function ContrAgentRegion() {
        return new Promise(function (resolve, reject) {
            return resolve()
        })
    }
    function ContrAgentSpecialications() {
        return new Promise(function (resolve, reject) {
            ContrAgent.countDocuments({ specialications: "none" })
                .exec((err, agent) => {
                    if (err) {
                        throw new Error(reject)
                    }
                    AgentStat.specialications = agent
                    return resolve()
                })
        })
    }
    Promise.all([
        ContrAgentSpecialications,
        ContrAgentRegion,
        ContrAgentEmail,
        ContrAgentGeo,
        ContrAgentAll
    ]).then(results => {
        console.log(results);
        console.log(AgentStat)
    });
}
exports.TodoAgentFind = (req, res, id) => {
    let agentId = req.agent._id

    TodoAgent.find({ agentByTodo: { $all: [`${agentId}`] } }).exec((err, result) => {
        if (err) {
            return res.status(400).json({ err })
        } else {
            return res.status(200).json(result)
        }
    })
}
exports.TodoAgentQuality = async (req, res, id) => {
    let agentId = req.agent._id

    TodoAgent.count({ agentByTodo: { $all: [`${agentId}}`] } }).exec((err, result) => {
        if (err) {
            return res.status(400).json({ err })
        } else {
            return res.status(200).json(result)
        }
    })
}


exports.agentUpdateStatistic = async (req, res) => {
    // тодо рефакторнуть
    let todoDestr = req.todo;

    let mounth = todoDestr.mounth;
    let agentIdByFind = todoDestr.agentByTodo[1];

    switch (mounth) {
        case "01":
            AgentStatistic.findOneAndUpdate({ agentBy: agentIdByFind }, { $inc: { 1: +1 } }, function (error, success) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(success);
                }
            })
        case "02":

            AgentStatistic.findOneAndUpdate({ agentBy: agentIdByFind }, { $inc: { 2: +1 } }, function (error, success) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(success);
                }
            })
        case "03":
            AgentStatistic.findOneAndUpdate({ agentBy: agentIdByFind }, { $inc: { 3: +1 } }, function (error, success) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(success);
                }
            })
        case "04":
            AgentStatistic.findOneAndUpdate({ agentBy: agentIdByFind }, { $inc: { 4: +1 } }, function (error, success) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(success);
                }
            })
        case "05":
            AgentStatistic.findOneAndUpdate({ agentBy: agentIdByFind }, { $inc: { 5: +1 } }, function (error, success) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(success);
                }
            })
        case "06":
            AgentStatistic.findOneAndUpdate({ agentBy: agentIdByFind }, { $inc: { 6: +1 } }, function (error, success) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(success);
                }
            })
        case "07":
            AgentStatistic.findOneAndUpdate({ agentBy: agentIdByFind }, { $inc: { 7: +1 } }, function (error, success) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(success);
                }
            })
        case "08":
            AgentStatistic.findOneAndUpdate({ agentBy: agentIdByFind }, { $inc: { 8: +1 } }, function (error, success) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(success);
                }
            })
        case "09":
            AgentStatistic.findOneAndUpdate({ agentBy: agentIdByFind }, { $inc: { 9: +1 } }, function (error, success) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(success);
                }
            })
        case "10":
            AgentStatistic.findOneAndUpdate({ agentBy: agentIdByFind }, { $inc: { 10: +1 } }, function (error, success) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(success);
                }
            })
        case "11":
            AgentStatistic.findOneAndUpdate({ agentBy: agentIdByFind }, { $inc: { 11: +1 } }, function (error, success) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(success);
                }
            })
        case "12":
            AgentStatistic.findOneAndUpdate({ agentBy: agentIdByFind }, { $inc: { 12: +1 } }, function (error, success) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(success);
                }
            })
    }
}