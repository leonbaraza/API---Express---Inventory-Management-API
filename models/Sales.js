const mongoose = require('mongoose')

const salesSchema = new mongoose.Schema({
    saleQuantity:{
        type:Number,
        required:true
    },
    inventory:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Inventory'
    }
}, {timestamps:true})

module.exports = mongoose.model('Sales', salesSchema)