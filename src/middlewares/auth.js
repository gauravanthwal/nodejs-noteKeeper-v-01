const jwt = require('jsonwebtoken')
const User = require('../models/user')

module.exports = async(req,res,next) =>{
    const token = req.cookies.jwt;
    const verifyToken = await jwt.verify(token, process.env.SECRET_KEY)
    const user = await User.findOne({_id: verifyToken._id})

    req.user = user;
    req.token = token;
    next()
}