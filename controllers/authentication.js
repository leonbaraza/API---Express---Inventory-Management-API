const User = require('../models/Users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, function(err, hashedPass) {
        if (err) {
            res.json({
                error:err
            })
        }

        let user = new User({
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            password: hashedPass
        })

        user.save()
        .then(user =>{
            res.json(user)
        })
        .catch(err => {
            res.status(500).json({message:err.message})
        }) 
    })    
}

const login = (req, res, next) =>{
    const userDetails = req.body.username
    const password = req.body.password

    User.findOne({$or: [{email:userDetails}, {phone:userDetails}]})
    .then(user => {
        if(user){
            bcrypt.compare(password, user.password, function(err, result) {
                if (err) {
                    res.json({
                        error:err
                    })
                }
                if (result) {
                    let token = jwt.sign({name:user.name}, 'verySecretValue', {expiresIn:'1hr'})
                    res.json({
                        message:'Login successful',
                        token
                    })
                }else{
                    res.json({
                        message:'Password does not match!'
                    })
                }
            })
        }else{
            res.status(400).json({
                message:'No user found!'
            })
        }
    })
    .catch(err => {
        res.status(400).json({
            message:err.message
        })
    })
}

module.exports = {
    register,
    login
}