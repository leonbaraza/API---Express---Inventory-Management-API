const mongoose = require('mongoose')

const stockSchema = new mongoose.Schema({
    stockQuantity:{
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

module.exports = mongoose.model('Stock', stockSchema)