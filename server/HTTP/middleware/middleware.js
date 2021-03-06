const jwt = require("jsonwebtoken")
require("dotenv").config()
const expressJwt = require("express-jwt")

exports.jwtTokenUserId = async (req, res, next) => {

    let head = req.headers
    if (head.authorization === undefined) {
        return res.status(400).json({ message: 'A you Russia hacker?' })
    }else{
        var token = head.authorization.replace('Bearer ', '')

        let j = jwt.decode(token)
    
        req.auth = j._id
        
        return next()
    }
    
}
exports.jwtTokenUserRole = async (req, res, next) => {

    let head = req.headers
    if (head.authorization === undefined) {
        return res.status(400).json({ message: 'A you Russia hacker?' })
    }else{
        var token = head.authorization.replace('Bearer ', '')
        let j = jwt.decode(token)
    
        req.auth = j.role
        return next()
    }
}

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: "auth"
})
