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

router.post('/', (req, res, next) => {
    req.inventory = new Inventory()
    next()
}, saveInventory())

router.put('/:id', (req, res) => {

})

router.delete('/:id', (req, res) => {

})


function saveInventory(){
    return async(req, res) => {
        let inventory = req.inventory

        inventory.name = req.body.name
        inventory.inventoryType = req.body.inventoryType
        inventory.buyingPrice = req.body.buyingPrice
        inventory.sellingPrice = req.body.sellingPrice
        try {
            await inventory.save()
            res.json(inventory)
        } catch (error) {
            res.status(500).json({ message:error.message })
        }
    }
}

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