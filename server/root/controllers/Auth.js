
const Direct = require('../database/Company')
const jwt = require("jsonwebtoken")
require("dotenv").config()
const expressJwt = require("express-jwt")


exports.signup = async (req, res) => {
    const directExists = await Direct.findOne({ email: req.body.email })
    if (directExists) return res.status(403).json({
        error: "Email is taken"
    })
    const direct = await new Direct(req.body)
    await direct.save()
    res.status(200).json({ message: "Sign  up!" })
}
exports.signin = (req, res) => {
    const { email, password } = req.body
    Direct.findOne({ email }, (err, direct) => {
        if (err || !direct) {
            return res.status(401).json({
                error: "User with that email not exist"
            })
        }

        if (!direct.authenticate(password)) {
            return res.status(403).json({
                error: "Email or password do not match"
            })
        }
        const token = jwt.sign({ _id: direct._id }, process.env.JWT_SECRET)

        res.cookie("t", token, { expire: new Date() + 9999 })
        const { _id, name, email, role } = direct
        return res.json({ token, direct: { _id, name, email, role } })
    })
}
exports.signout = (req, res) => {
    res.clearCookie("t")
    return res.json({ message: "Sign Out Complite" })
}

