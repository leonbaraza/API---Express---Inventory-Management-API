const express = require('express')
const router = express.Router()

const Inventory = require('./../models/Inventory')

router.get('/', async (req, res) => {
    searchOptions = {}
    if (req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        const inventory = await Inventory.find(searchOptions)
        res.json(inventory)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.get('/:id', (req, res) => {

})

router.post('/', (req, res) => {

})

router.put('/:id', (req, res) => {

})

router.delete('/:id', (req, res) => {

})


module.exports = router