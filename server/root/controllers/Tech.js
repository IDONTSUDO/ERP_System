let TechAgent = require("../database/Tech/AgentTech")
let NodeProperty = require("../database/Tech/NodeProperty")
let TechNodes = require("../database/Tech/TechNodes")



exports.techId = async (req, res, next, id) => {

    TechAgent.findById(id).select(" _id ")
        .exec((err, tech) => {
            if (err || !tech) {
                return res.status(400).json({ error: "Tech Agent not found!" })
            }
            req.techAgent = tech
            next()
        })
}
exports.TechNodesID = async (req, res, next, id) => {
    TechNodes.findById(id).select(" _id ")
        .exec((err, tech) => {
            if (err || !tech) {
                return res.status(400).json({ error: "Tech Nodes not found" })
            }
            req.nodes = tech
            next()
        })
}
exports.SaveNodeAtNodeProperty = async (req, res) => {

    let TechNodeId = req.nodes._id


    let node_prop = new NodeProperty(req.body)
    await node_prop.save((err, result) => {
        if (err) {
            return res.status(400).json(err)
        } else {
            TechNodes.findByIdAndUpdate(
                TechNodeId,
                { $push: { tech: result._id } },
                { new: true }
            ).exec((err, result) => {
                if (err) {
                    return res.status(400).json({
                        error: err
                    });
                }
                return res.status(200).json(result)
            });
        }
    })
}
exports.SaveNodeAtTech = async (req, res) => {
    let TechAgentId = req.techAgent._id

    let SaveNodeTech = new TechNodes(req.body)
    await SaveNodeTech.save((err, result) => {
        if (err) {
            return res.status(400).json(err)
        } else {

            TechAgent.findByIdAndUpdate(
                TechAgentId,
                { $push: { techNode: result._id } },
                { new: true }
            ).exec((err, result) => {

                if (err) {
                    return res.status(400).json({
                        error: err
                    });
                }

                return res.status(200).json(result)
            });
        }
    })
}
exports.GetTechList = async (req, res) => {
    TechAgent.find({}).populate({
        path: 'techNode',
        populate: { path: 'tech' }
    })
        .then(function (dbProduct) {
            res.json(dbProduct);
        })
}
exports.SaveTechAtAgent = async (req, res) => {

    let SaveNodeTech = new TechAgent(req.body)
    await SaveNodeTech.save((err, result) => {
        if (err) {
            console.log(err)
            return res.status(400).json(err)
        } else {
            return res.status(200).json(result)
        }
    })

}
















