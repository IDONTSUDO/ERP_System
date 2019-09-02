const Product = require('../database/search')

exports.searchTest = (req,res) =>{

    Product.find({description: new RegExp(req.body.search, 'i')}) 
    .then(products => res.json(products))
    .catch(e => console.error(e))
}