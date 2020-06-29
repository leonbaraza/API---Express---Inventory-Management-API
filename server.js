if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const mongoose = require('mongoose')
const swaggerJsDocs = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')

const app = express()

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

// Parse json
app.use(express.json());

// -------------------- Routes registration ------------------------
const inventoryRouter = require('./routes/inventory')
const stockRouter = require('./routes/stock')

// Routes
app.get('/customers', (req, res) => {
    res.json({ message: 'Welcome to swagger'})
})
app.use('/inventory', inventoryRouter)
app.use('/stock', stockRouter)
// -------------------- Routes registration ------------------------

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>console.log(`Server started on ${PORT}`))