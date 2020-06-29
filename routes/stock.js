const express = require('express')
const router = express.Router()

const Stock = require('./../models/Stock')

router.get('/', async (req, res) => {
    try {
        const stock = await Stock.find()
        res.json(stock)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/:id', findStock, (req, res) => {
    res.json(res.stock)
})

router.post('/', (req, res, next) => {
    req.stock = new Stock()
    next()
}, saveStock())

router.put('/:id', findStock, (req, res, next) => {
    req.stock = res.stock
    next()
}, saveStock())

router.delete('/:id', findStock, async (req, res) => {
    try {
        await res.stock.remove()
        res.json({ message: "Stock removed" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

function saveStock(){
    return async (req, res) => {
        let stock = req.stock
        stock.stockQuantity = req.body.stockQuantity
        stock.inventory = req.body.inventory
        try {
            await stock.save()
            res.json(stock)
        } catch (error) {
            res.status(500).json({ message:error.message })
        }
    }
}

async function findStock(req, res, next) {
    let stock
    try {
        stock = await Stock.findById(req.params.id)
        if(stock == null){
            res.status(404).json({ message: `No stock with id of ${req.params.id}`})
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
    res.stock = stock
    next()
}

module.exports = router