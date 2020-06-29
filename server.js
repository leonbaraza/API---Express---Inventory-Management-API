if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const mongoose = require('mongoose')
const swaggerJsDocs = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')

const app = express()

const PORT = process.env.PORT || 3000
const swaggerOptions = {
    swaggerDefinition:{
        info: {
            title: "Inventory Management API",
            description: "Inventory Management Description",
            contacts:{
                name: "Wakoli Leon"
            },
            servers:["http://127.0.0.1:3000"],
        }
    },
    // apis: ['.routes/*.js']
    apis: ['server.js']
}

const swaggerDocs = swaggerJsDocs(swaggerOptions)
// app.use('/', swaggerUI.serve, swaggerUI.setup(swaggerDocs))


// ------------------- mongoose connection -------------------------
mongoose.connect(process.env.DATABASE_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected to db'))
// ------------------- mongoose connection -------------------------

// Routes registration
const inventoryRouter = require('./routes/inventory')

// Routes

app.get('/customers', (req, res) => {
    res.json({ message: 'Welcome to swagger'})
})

app.use('/inventory', inventoryRouter)


app.listen(PORT, ()=>console.log(`Server started on ${PORT}`))