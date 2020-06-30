const mongoose = require('mongoose')

const stockSchema = new mongoose.Schema({
    stockQuantity:{
        type:Number,
        required:true
    },
    inventory:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Inventory'
    }
}, {timestamps:true})

module.exports = mongoose.model('Stock', stockSchema)