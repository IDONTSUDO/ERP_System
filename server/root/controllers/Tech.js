let TechCollection = require("../database/TechCollection")
let Tech = require("../database/TechAgent")


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
// 
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
              let requests = data.map(one => Tech.find({type_tech:one._id})
              .then(data =>{ return ({data})}));
              
        
              Promise.all(requests)
                .then(responses =>  res.status(200).json(responses))

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