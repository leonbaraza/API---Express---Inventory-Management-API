const mongoose = require('mongoose')

const salesSchema = new mongoose.Schema({
    saleQuantity:{
        type:Number,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
        required:true
    },
    inventory:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Inventory'
    }
})

module.exports = mongoose.model('Sales', salesSchema)