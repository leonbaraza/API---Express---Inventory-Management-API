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

router.get('/:id', getSingleInventory, (req, res) => {
    res.json(res.inventory)
})

router.post('/', (req, res) => {

})

router.put('/:id', (req, res) => {

})

router.delete('/:id', (req, res) => {

})


async function getSingleInventory(req, res, next) {
    let inventory
    try {
        inventory = await Inventory.findById(req.params.id)
        if(inventory == null){
            res.status(404).json({ message: `No inventory with id of ${req.params.id}`})
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
    res.inventory = inventory
    next()
}

module.exports = router