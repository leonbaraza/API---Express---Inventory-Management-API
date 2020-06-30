const User = require('./../models/Users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, function(err, hashedPass) {
        if (error) {
            res.json({
                error:err
            })
        }
    })
    let user = new User({
        name:req.body.name,
        phone:req.body.phone,
        email:req.body.email,
        password:hashedPass
    })
    user.save()
    .then(user =>{
        res.json(user)
    })
    .catch(err => {
        res.status(500).json({message:err.message})
    })
}

module.exports = {
    register
}