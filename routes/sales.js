const express = require('express')
const router = express.Router()

const Sales = require('./../models/Sales')
const Stock = require('./../models/Stock')

router.get('/', async (req, res) => {
    try {
        const sales = await Sales.find()
        res.json(sales)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/:id', findSale, (req, res) => {
    res.json(res.sale)
})

router.post('/', checkStockBalance, (req, res, next) => {
    req.sale = new Sales()
    next()
}, saveSale())

router.put('/:id', findSale, (req, res, next) => {
    req.sales = res.sale
    next()
}, saveSale())

router.delete('/:id', findSale, async(req, res) => {
    try {
        await res.sale.remove()
        res.json({ message : "Error removing sale"})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


function saveSale() {
    return async(req, res) => {
        let sale = req.sale
        sale.saleQuantity = req.body.saleQuantity
        sale.inventory = req.body.inventory
        try {
            await sale.save()
            res.json(sale)
        } catch (error) {
            res.status(500).json({ message:error.message })
        }
    }
}

async function findSale(req, res, next) {
    let sale
    try {
        sale = await Sales.findById(req.params.id)
        if(sale == null ){
            res.status(404).json({ message: `No sale with id of ${req.params.id}`})
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
    res.sale = sale
    next()
}

async function checkStockBalance(req, res, next) {
    let totalSales = 0, totalStock  = 0, stockRemainder = 0
    const stock = await Stock.find({ inventory:req.body.inventory })
    stock.forEach(st => {
        totalStock += st.stockQuantity
    });
    const sales = await Sales.find({inventory:req.body.inventory})    
    sales.forEach(s => {
        totalSales += s.saleQuantity        
    });
    stockRemainder = totalStock - totalSales;
    console.log(stockRemainder);
    if (stockRemainder >= req.body.saleQuantity) {
        next()
    }else{
        res.json({message: `Current sale is greater than remaining stock. Remaining stock ${stockRemainder}. Current Sale ${req.body.saleQuantity}`})
    }    
}

module.exports = router