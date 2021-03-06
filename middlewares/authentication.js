if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const jwt = require('jsonwebtoken')

const authenticate = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, process.env.SECRET_KEY)

        req.user = decode
        next()
    } catch (error) {
        res.json({
            message: "Authentication failed!"
        })
    }
}

module.exports = authenticate