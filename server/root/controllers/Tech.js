let TechCollection = require("../database/TechCollection")
let Tech = require("../database/TechAgent")
let TechNode = require("../database/TechNode.js")







exports.TechColId = async (req, res, next, id) => {
    
    TechCollection.findById(id).select(" _id ")
        .exec((err, tech) => {

            if (err || !tech) {
              
                return res.status(400).json({
                    error: "tech colllection not found"
                })
            }
            req.tech = tech
           
            next()
        })
}
exports.Techid = async (req, res, next, id) =>{
  
    Tech.findById(id).select(" _id ")
    .exec((err,tech) =>{
        console.log(err)
        if(err || !tech){
            return res.status(400).json({error:"Tech Agent not found"})
        }
        req.techAgent = tech
        next()
    })
}
// 


exports.SaveAtTechNode = async (req, res) =>{
    let tech = req.techAgent
    
    let SaveNodeTech = new TechNode(req.body)
    SaveNodeTech.tech = tech._id
    await SaveNodeTech.save((err, result) =>{
        if(err){
            console.log(err)
            return res.status(400).json(err)
        }else{
            return res.status(200).json(result)
        }
    })

}
exports.getTechNode = async (req, res,id) =>{
    let tech = req.techAgent
    
    TechNode.find({tech:tech._id})
    .exec((err,tech) =>{
        if(err || !tech){
            return res.status(400).json({error:"Tech Agent not found"})
        }else{
            return res.status(200).json(tech)
        }
    })
}
exports.getTestPopulate = async(req,res) =>{
    TechCollection.find({})
    // ..and populate all of the notes associated with it
    // .populate("_id")
    .populate({
        path: '_id',
        // TODO https://mongoosejs.com/docs/populate.html
        // Get friends of friends - populate the 'friends' array for every friend
        // populate: { path: '_id' }
    })
    .then(function(dbProduct) {
      // If we were able to successfully find an Product with the given id, send it back to the client
      res.json(dbProduct);
    })
}

exports.getAll = async (req, res)=>{

    const currentPage = req.query.page || 1
    const perPage = 50
    var totalItems
    const tech = await TechCollection.find({})
        .countDocuments()
        .then(count => {
            totalItems = count;
            return TechCollection.find({})
                .skip((currentPage - 1) * perPage)
                .limit(perPage)
        })
        .then(data => {
              let specList = data
              let requests = data.map(one => Tech.find({type_tech:one._id})
              .then(data =>{ return ({data})}));
              Promise.all(requests)
                .then(responses => 
                {   
                  



                    let responceObj = []
                    var i = 0;
                    while(specList.length > i){
                        responceObj.push({_id:specList[i]._id,name:  specList[i].name,payload:[responses[i]]})
                        i++
                    }
                    res.status(200).json(responceObj)
                })
        })
        .catch(err => console.log(err))
}
exports.saveTechCollection = async (req, res) =>{
    let techCol = new TechCollection(req.body)
    await techCol.save((err,result) => {
        if(err){
            return res.status(400).json({err})
        }else{
            return res.status(200).json(result)
        }
    })

}
exports.SaveTechOntheBasisOfSpec = async (req, res) =>{
    let techcolId = req.tech
    

    let techByColSaved = new Tech(req.body)
    techByColSaved.type_tech = techcolId._id

    await techByColSaved.save((err, result) => {
        if(err){
            return res.status(400).json({err})
        }else{
            return res.status(200).json(result)
        }
    })


}